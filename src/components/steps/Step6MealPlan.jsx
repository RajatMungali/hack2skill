import React, { useEffect, useState } from 'react';
import { useMealPlan } from '../../context/MealPlanContext';
import { generateMealPlan, getAlternativeMeal, reoptimizePlan, countLockedIngredientsUsed } from '../../utils/mealGenerator';
import { generateGroceryList } from '../../utils/groceryGenerator';
import { generateReminders, generatePrepSchedule } from '../../utils/reminderGenerator';
import { generateCalendarEvents, generateICSFile, downloadICSFile } from '../../utils/calendarGenerator';
import { generateCookingFlow, formatCookingFlowForDisplay } from '../../utils/cookingFlow';

function Step6MealPlan() {
  const { state, actions } = useMealPlan();
  const [isGenerating, setIsGenerating] = useState(true);
  const [activeTab, setActiveTab] = useState('meals');
  
  const {
    persona, dietType, dislikes, pantryItems, lockedIngredients,
    contextSettings, reminderSettings, mealPlan, groceryList, reminders, budgetStatus, cookingFlow
  } = state;

  useEffect(() => {
    if (!mealPlan) {
      generatePlan();
    } else {
      setIsGenerating(false);
    }
  }, []);

  const generatePlan = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const { mealPlan: newPlan, budgetStatus: newBudgetStatus } = generateMealPlan({
        numberOfDays: contextSettings.numberOfDays,
        dietType, dislikes, pantryItems, lockedIngredients,
        budgetPerDay: contextSettings.budgetPerDay, persona
      });
      
      actions.setMealPlan(newPlan);
      actions.setBudgetStatus(newBudgetStatus);
      
      const newGroceryList = generateGroceryList(newPlan, pantryItems);
      actions.setGroceryList(newGroceryList);
      
      const newPrepSchedule = generatePrepSchedule(newPlan, persona, contextSettings.energyLevel);
      actions.setPrepSchedule(newPrepSchedule);
      
      const newReminders = generateReminders({
        mealPlan: newPlan, groceryList: newGroceryList, prepSchedule: newPrepSchedule,
        reminderSettings, contextSettings
      });
      actions.setReminders(newReminders);
      
      const newCalendarEvents = generateCalendarEvents({ mealPlan: newPlan, reminders: newReminders, startDate: new Date() });
      actions.setCalendarEvents(newCalendarEvents);
      
      const newCookingFlow = generateCookingFlow(newPlan, lockedIngredients);
      actions.setCookingFlow(newCookingFlow);
      
      actions.setPersonalizationProof(generatePersonalizationProof());
      setIsGenerating(false);
    }, 1200);
  };

  const generatePersonalizationProof = () => {
    const labels = { 'working-professional': 'Working Professional', 'student': 'Student', 'household': 'Household/Family' };
    return [
      `Optimized for ${labels[persona]} with ${contextSettings.energyLevel} energy cooking`,
      `Staying within ₹${contextSettings.budgetPerDay}/day budget in ${contextSettings.city}`,
      `Cooking time kept under ${contextSettings.cookingTimeWindow} minutes per meal`
    ];
  };

  const handleSwapMeal = (day, mealType) => {
    const currentMeal = mealPlan[day][mealType];
    const newMeal = getAlternativeMeal(currentMeal, { dietType, dislikes, pantryItems, lockedIngredients, budgetPerDay: contextSettings.budgetPerDay, persona });
    
    actions.swapMeal(day, mealType, newMeal);
    const updatedPlan = { ...mealPlan, [day]: { ...mealPlan[day], [mealType]: newMeal } };
    const newGroceryList = generateGroceryList(updatedPlan, pantryItems);
    actions.setGroceryList(newGroceryList);
    
    const newReminders = generateReminders({ mealPlan: updatedPlan, groceryList: newGroceryList, prepSchedule: state.prepSchedule, reminderSettings, contextSettings });
    actions.setReminders(newReminders);
  };

  const handleReoptimize = (optimizeFor) => {
    setIsGenerating(true);
    setTimeout(() => {
      const newPlan = reoptimizePlan(mealPlan, { dietType, dislikes, pantryItems, lockedIngredients, budgetPerDay: contextSettings.budgetPerDay, persona }, optimizeFor);
      actions.setMealPlan(newPlan);
      
      const newGroceryList = generateGroceryList(newPlan, pantryItems);
      actions.setGroceryList(newGroceryList);
      
      const newReminders = generateReminders({ mealPlan: newPlan, groceryList: newGroceryList, prepSchedule: state.prepSchedule, reminderSettings, contextSettings });
      actions.setReminders(newReminders);
      
      const newCookingFlow = generateCookingFlow(newPlan, lockedIngredients);
      actions.setCookingFlow(newCookingFlow);
      setIsGenerating(false);
    }, 600);
  };

  const handleDownloadCalendar = () => {
    const icsContent = generateICSFile(state.calendarEvents);
    downloadICSFile(icsContent, 'meal-plan.ics');
  };

  const handleStartOver = () => {
    actions.resetState();
  };

  if (isGenerating) {
    return (
      <div className="step-container" style={{ textAlign: 'center', padding: 'var(--space-16) 0' }}>
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <div className="skeleton" style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-lg)', margin: '0 auto' }} />
        </div>
        <h2 style={{ marginBottom: 'var(--space-2)' }}>Generating your plan...</h2>
        <p style={{ color: 'var(--color-text-muted)' }}>Optimizing for your preferences</p>
      </div>
    );
  }

  const usedLockedIngredients = mealPlan ? countLockedIngredientsUsed(mealPlan, lockedIngredients) : [];

  return (
    <div className="step-container" style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-5)', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
        <div>
          <h1 style={{ marginBottom: 'var(--space-1)' }}>Your {contextSettings.numberOfDays}-Day Meal Plan</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>Customized for your preferences</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
          {budgetStatus && (
            <span className={`status-badge ${budgetStatus.feasible ? 'status-badge--success' : 'status-badge--warning'}`}>
              {budgetStatus.feasible ? '✓ Budget OK' : '⚠ Over Budget'}
            </span>
          )}
          <button className="btn btn--ghost btn--sm" onClick={handleStartOver}>Start Over</button>
        </div>
      </div>

      {/* Budget reason */}
      {budgetStatus && (
        <div style={{ 
          padding: 'var(--space-3) var(--space-4)', background: 'var(--color-bg)', 
          borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-4)', 
          fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' 
        }}>
          {budgetStatus.reason}
        </div>
      )}

      {/* Locked ingredients */}
      {usedLockedIngredients.length > 0 && (
        <div style={{ 
          padding: 'var(--space-2) var(--space-3)', background: 'var(--color-success-light)',
          borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-4)',
          fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)'
        }}>
          🔒 Using: {usedLockedIngredients.join(', ')}
        </div>
      )}

      {/* Optimization */}
      <div className="optimization-controls">
        <span className="optimization-controls__label">Re-optimize:</span>
        <button className="btn btn--ghost btn--sm" onClick={() => handleReoptimize('cheapest')}>Cheapest</button>
        <button className="btn btn--ghost btn--sm" onClick={() => handleReoptimize('fastest')}>Fastest</button>
        <button className="btn btn--ghost btn--sm" onClick={() => handleReoptimize('protein')}>More Protein</button>
        <button className="btn btn--ghost btn--sm" onClick={() => generatePlan()}>Regenerate</button>
      </div>

      {/* Tabs - Underline style */}
      <div className="tabs">
        {[
          { id: 'meals', label: 'Meals' },
          { id: 'grocery', label: 'Grocery' },
          { id: 'reminders', label: 'Reminders' },
          { id: 'cooking', label: 'Cooking Flow' },
          { id: 'calendar', label: 'Calendar' }
        ].map(tab => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'tab--active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'meals' && <MealsTab mealPlan={mealPlan} onSwapMeal={handleSwapMeal} />}
      {activeTab === 'grocery' && <GroceryTab groceryList={groceryList} />}
      {activeTab === 'reminders' && <RemindersTab reminders={reminders} />}
      {activeTab === 'cooking' && <CookingTab cookingFlow={cookingFlow} />}
      {activeTab === 'calendar' && <CalendarTab calendarEvents={state.calendarEvents} onDownload={handleDownloadCalendar} />}

      {/* Personalization */}
      <div className="personalization" style={{ marginTop: 'var(--space-8)' }}>
        <div className="personalization__title">Why this plan fits you</div>
        <ul className="personalization__list">
          {state.personalizationProof?.map((proof, i) => (
            <li key={i} className="personalization__item">{proof}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MealsTab({ mealPlan, onSwapMeal }) {
  return (
    <div>
      {Object.entries(mealPlan).map(([day, meals]) => (
        <div key={day} className="day-section">
          <div className="day-header">
            <div className="day-header__number">{day.replace('day', '')}</div>
            <h2 className="day-header__title">Day {day.replace('day', '')}</h2>
          </div>
          <div className="day-meals">
            {Object.entries(meals).map(([mealType, meal]) => (
              <MealCard key={mealType} meal={meal} mealType={mealType} onSwap={() => onSwapMeal(day, mealType)} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function MealCard({ meal, mealType, onSwap }) {
  const labels = { breakfast: 'Breakfast', lunch: 'Lunch', dinner: 'Dinner' };
  return (
    <div className="meal-card">
      <div className="meal-card__header">
        <span className="meal-card__type">{labels[mealType]}</span>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{meal.prepTime + meal.cookTime}m</span>
      </div>
      <div className="meal-card__body">
        <h3 className="meal-card__name">{meal.name}</h3>
        <div className="meal-card__meta">
          <span className="meal-card__meta-item">Prep: {meal.prepTime}m</span>
          <span className="meal-card__meta-item">Cook: {meal.cookTime}m</span>
        </div>
        <div className="meal-card__ingredients">
          {meal.ingredients.slice(0, 5).map((ing, i) => <span key={i} className="tag">{ing}</span>)}
          {meal.ingredients.length > 5 && <span className="tag">+{meal.ingredients.length - 5}</span>}
        </div>
        <div className="meal-card__substitutions">
          <div className="meal-card__substitutions-title">Substitutions</div>
          {meal.substitutions.map((sub, i) => (
            <div key={i} style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', padding: '2px 0' }}>
              {sub.original} → <span style={{ color: 'var(--color-accent)' }}>{sub.replacement}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="meal-card__footer">
        <button className="btn btn--secondary btn--sm btn--full" onClick={onSwap}>Swap</button>
      </div>
    </div>
  );
}

function GroceryTab({ groceryList }) {
  if (!groceryList) return null;
  return (
    <div className="section">
      <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
        <span className="status-badge status-badge--warning">{groceryList.summary.itemsToBuy} to buy</span>
        <span className="status-badge status-badge--success">{groceryList.summary.itemsInPantry} in pantry</span>
      </div>
      <div style={{ display: 'grid', gap: 'var(--space-6)', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
        <div>
          <div className="form-label" style={{ marginBottom: 'var(--space-3)' }}>To Buy</div>
          {Object.entries(groceryList.toBuy).map(([category, items]) => (
            <div key={category} className="grocery-category">
              <div className="grocery-category__title">{category}</div>
              {items.map((item, i) => (
                <div key={i} className="grocery-item">
                  <div className="grocery-item__checkbox" />
                  <span className="grocery-item__name">{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div>
          <div className="form-label" style={{ marginBottom: 'var(--space-3)' }}>In Pantry</div>
          {Object.entries(groceryList.inPantry).map(([category, items]) => (
            <div key={category} className="grocery-category">
              <div className="grocery-category__title">{category}</div>
              {items.map((item, i) => (
                <div key={i} className="grocery-item">
                  <div className="grocery-item__checkbox grocery-item__checkbox--pantry">✓</div>
                  <span className="grocery-item__name grocery-item__name--pantry">{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RemindersTab({ reminders }) {
  const grouped = reminders.reduce((acc, r) => {
    const key = r.day === 0 ? 'Before Day 1' : `Day ${r.day}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(r);
    return acc;
  }, {});

  return (
    <div className="section">
      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-5)' }}>
        Each reminder includes a justification
      </p>
      {Object.entries(grouped).map(([day, dayReminders]) => (
        <div key={day} style={{ marginBottom: 'var(--space-5)' }}>
          <div className="form-label" style={{ marginBottom: 'var(--space-3)' }}>{day}</div>
          {dayReminders.map((r) => (
            <div key={r.id} className="reminder">
              <div className="reminder__time">
                <div className="reminder__time-value">{formatTime(r.time)}</div>
                <div className="reminder__time-period">{parseInt(r.time.split(':')[0]) < 12 ? 'AM' : 'PM'}</div>
              </div>
              <div className="reminder__content">
                <div className="reminder__type">{r.type}</div>
                <div className="reminder__title">{r.title}</div>
                <div className="reminder__justification">{r.justification}</div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function formatTime(t) {
  const h = parseInt(t.split(':')[0]);
  return `${h > 12 ? h - 12 : h}:00`;
}

function CookingTab({ cookingFlow }) {
  if (!cookingFlow) return null;
  const sections = formatCookingFlowForDisplay(cookingFlow);
  return (
    <div className="section">
      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-5)' }}>
        10-20 actionable steps
      </p>
      {sections.map((section) => (
        <div key={section.title} className="cooking-section">
          <div className="cooking-section__title">{section.title}</div>
          {section.steps.map((step) => (
            <div key={step.number} className="cooking-step">
              <div className="cooking-step__number">{step.number}</div>
              <div className="cooking-step__text">{step.text}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function CalendarTab({ calendarEvents, onDownload }) {
  return (
    <div className="section">
      <div className="calendar-export">
        <div className="calendar-export__icon">📅</div>
        <h3 style={{ marginBottom: 'var(--space-2)' }}>Calendar Integration</h3>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' }}>
          Download .ics file for Google Calendar, Apple Calendar, or Outlook
        </p>
        <button className="btn btn--primary" onClick={onDownload}>Download .ics</button>
      </div>
      <div style={{ marginTop: 'var(--space-6)' }}>
        <div className="form-label" style={{ marginBottom: 'var(--space-3)' }}>Events Preview</div>
        {calendarEvents?.slice(0, 6).map((e) => (
          <div key={e.id} style={{ 
            display: 'flex', gap: 'var(--space-4)', padding: 'var(--space-2) 0',
            borderBottom: '1px solid var(--color-divider)', fontSize: 'var(--text-sm)'
          }}>
            <span style={{ minWidth: '70px', color: 'var(--color-text-muted)' }}>{e.startTime}</span>
            <span>{e.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Step6MealPlan;
