import React from 'react';
import { useMealPlan } from '../../context/MealPlanContext';

function Step5Reminders() {
  const { state, actions } = useMealPlan();
  const { reminderSettings } = state;

  const updateSetting = (key, value) => {
    actions.updateReminderSettings({ [key]: value });
  };

  const handleContinue = () => {
    actions.setStep(6);
  };

  const handleBack = () => {
    actions.setStep(4);
  };

  return (
    <div className="step-container">
      <div className="step-header">
        <h1 className="step-header__title">Reminder preferences</h1>
        <p className="step-header__subtitle">
          When should we remind you about cooking?
        </p>
      </div>

      <div style={{ display: 'grid', gap: 'var(--space-5)', maxWidth: '480px', margin: '0 auto' }}>
        
        {/* Time Preference */}
        <div className="section">
          <div className="form-label">Preferred Reminder Time</div>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <div
              className={`card card--selectable ${reminderSettings.preferredTime === 'morning' ? 'card--selected' : ''}`}
              onClick={() => updateSetting('preferredTime', 'morning')}
              style={{ flex: 1, textAlign: 'center', padding: 'var(--space-4)' }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: 'var(--space-2)' }}>🌅</div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>Morning</div>
            </div>
            <div
              className={`card card--selectable ${reminderSettings.preferredTime === 'evening' ? 'card--selected' : ''}`}
              onClick={() => updateSetting('preferredTime', 'evening')}
              style={{ flex: 1, textAlign: 'center', padding: 'var(--space-4)' }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: 'var(--space-2)' }}>🌆</div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>Evening</div>
            </div>
          </div>
        </div>

        {/* Cooking Window */}
        <div className="section">
          <div className="form-label">Dinner Start Time</div>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            {['17:00', '18:00', '19:00', '20:00'].map((time) => {
              const hour = parseInt(time.split(':')[0]);
              const label = `${hour > 12 ? hour - 12 : hour}:00 PM`;
              return (
                <button
                  key={time}
                  className={`btn btn--sm ${reminderSettings.cookingWindow === time ? 'btn--primary' : 'btn--secondary'}`}
                  onClick={() => updateSetting('cookingWindow', time)}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Reminders Per Day */}
        <div className="section">
          <div className="form-label">Reminders Per Day</div>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <div
              className={`card card--selectable ${reminderSettings.remindersPerDay === 1 ? 'card--selected' : ''}`}
              onClick={() => updateSetting('remindersPerDay', 1)}
              style={{ flex: 1, textAlign: 'center', padding: 'var(--space-4)' }}
            >
              <div style={{ fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--color-accent)', marginBottom: 'var(--space-1)' }}>1</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Dinner only</div>
            </div>
            <div
              className={`card card--selectable ${reminderSettings.remindersPerDay === 2 ? 'card--selected' : ''}`}
              onClick={() => updateSetting('remindersPerDay', 2)}
              style={{ flex: 1, textAlign: 'center', padding: 'var(--space-4)' }}
            >
              <div style={{ fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--color-accent)', marginBottom: 'var(--space-1)' }}>2</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Breakfast + Dinner</div>
            </div>
          </div>
        </div>

      </div>

      <div className="btn-group">
        <button className="btn btn--secondary" onClick={handleBack}>Back</button>
        <button className="btn btn--primary" onClick={handleContinue}>
          Generate Meal Plan
        </button>
      </div>
    </div>
  );
}

export default Step5Reminders;
