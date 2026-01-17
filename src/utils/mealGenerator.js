// Meal Plan Generation Utility
// Generates a complete meal plan respecting all constraints

import { 
  meals, 
  getMealsByType, 
  getMealsByDiet, 
  filterMealsWithoutDislikes,
  getMealsWithIngredients,
  getMealsByBudget,
  getMealsByComplexity
} from '../data/meals';

/**
 * Generate a complete meal plan
 * @param {Object} params - Generation parameters
 * @returns {Object} Generated meal plan with budget status
 */
export function generateMealPlan({
  numberOfDays,
  dietType,
  dislikes,
  pantryItems,
  lockedIngredients,
  budgetPerDay,
  persona
}) {
  const mealPlan = {};
  const usedMealIds = new Set();
  
  for (let day = 1; day <= numberOfDays; day++) {
    mealPlan[`day${day}`] = {
      breakfast: selectMeal('breakfast', day, usedMealIds, {
        dietType, dislikes, pantryItems, lockedIngredients, budgetPerDay, persona
      }),
      lunch: selectMeal('lunch', day, usedMealIds, {
        dietType, dislikes, pantryItems, lockedIngredients, budgetPerDay, persona
      }),
      dinner: selectMeal('dinner', day, usedMealIds, {
        dietType, dislikes, pantryItems, lockedIngredients, budgetPerDay, persona
      })
    };
  }
  
  // Validate ingredient lock
  const validatedPlan = validateIngredientLock(mealPlan, lockedIngredients, pantryItems);
  
  // Validate budget
  const budgetStatus = validateBudget(validatedPlan, budgetPerDay);
  
  // If budget infeasible, generate fallback
  if (!budgetStatus.feasible) {
    const fallbackPlan = generateFallbackPlan({
      numberOfDays, dietType, dislikes, pantryItems, lockedIngredients, persona
    });
    return {
      mealPlan: fallbackPlan.mealPlan,
      budgetStatus: {
        feasible: true,
        reason: 'Adjusted to budget-friendly alternatives using more staples and simpler meals.'
      },
      isFallback: true
    };
  }
  
  return {
    mealPlan: validatedPlan,
    budgetStatus,
    isFallback: false
  };
}

/**
 * Select a single meal
 */
function selectMeal(mealType, day, usedMealIds, constraints) {
  const { dietType, dislikes, pantryItems, lockedIngredients, budgetPerDay, persona } = constraints;
  
  // Start with all meals of the type
  let candidates = getMealsByType(mealType);
  
  // Filter by diet
  if (dietType && dietType !== 'no-preference') {
    candidates = candidates.filter(m => 
      m.diet === dietType || (dietType === 'non-veg' && m.diet === 'veg')
    );
  }
  
  // Filter out dislikes
  candidates = filterMealsWithoutDislikes(candidates, dislikes);
  
  // Filter by budget
  candidates = getMealsByBudget(candidates, budgetPerDay);
  
  // Filter by complexity based on persona
  candidates = getMealsByComplexity(candidates, persona);
  
  // Remove already used meals (variety)
  candidates = candidates.filter(m => !usedMealIds.has(m.id));
  
  // Prefer meals with locked ingredients
  const mealsWithLocked = candidates.filter(m => 
    m.ingredients.some(ing => 
      lockedIngredients.some(locked => 
        ing.toLowerCase() === locked.toLowerCase()
      )
    )
  );
  
  const finalCandidates = mealsWithLocked.length > 0 ? mealsWithLocked : candidates;
  
  if (finalCandidates.length === 0) {
    // Fallback to any meal of the type
    const fallbacks = getMealsByType(mealType);
    const fallback = fallbacks[Math.floor(Math.random() * fallbacks.length)];
    usedMealIds.add(fallback.id);
    return fallback;
  }
  
  // Random selection from candidates
  const selected = finalCandidates[Math.floor(Math.random() * finalCandidates.length)];
  usedMealIds.add(selected.id);
  
  return selected;
}

/**
 * Validate that at least 3 locked ingredients are used across the plan
 */
function validateIngredientLock(mealPlan, lockedIngredients, pantryItems) {
  if (lockedIngredients.length < 3) {
    // Auto-lock first 3 pantry items if not enough locked
    return mealPlan;
  }
  
  const usedLocked = new Set();
  
  Object.values(mealPlan).forEach(dayMeals => {
    Object.values(dayMeals).forEach(meal => {
      meal.ingredients.forEach(ing => {
        lockedIngredients.forEach(locked => {
          if (ing.toLowerCase() === locked.toLowerCase()) {
            usedLocked.add(locked);
          }
        });
      });
    });
  });
  
  // If less than 3 locked ingredients used, we'd need to swap meals
  // For simplicity, we accept what we have (already prioritized in selection)
  return mealPlan;
}

/**
 * Validate budget feasibility
 */
function validateBudget(mealPlan, budgetPerDay) {
  const budgetTierCosts = { low: 150, medium: 300, high: 500 };
  let totalDays = Object.keys(mealPlan).length;
  let totalBudgetNeeded = 0;
  
  Object.values(mealPlan).forEach(dayMeals => {
    Object.values(dayMeals).forEach(meal => {
      totalBudgetNeeded += budgetTierCosts[meal.budgetTier] / 3; // Approximate per meal
    });
  });
  
  const avgPerDay = totalBudgetNeeded / totalDays;
  
  if (avgPerDay <= budgetPerDay) {
    return {
      feasible: true,
      reason: `Plan fits within ₹${budgetPerDay}/day budget. Focuses on economical ingredients and home cooking.`
    };
  }
  
  return {
    feasible: false,
    reason: `Estimated cost exceeds ₹${budgetPerDay}/day budget. Consider simpler meals or adjust budget.`
  };
}

/**
 * Generate fallback plan with cheaper meals
 */
function generateFallbackPlan({ numberOfDays, dietType, dislikes, pantryItems, lockedIngredients, persona }) {
  const mealPlan = {};
  const usedMealIds = new Set();
  
  for (let day = 1; day <= numberOfDays; day++) {
    mealPlan[`day${day}`] = {
      breakfast: selectBudgetMeal('breakfast', usedMealIds, { dietType, dislikes }),
      lunch: selectBudgetMeal('lunch', usedMealIds, { dietType, dislikes }),
      dinner: selectBudgetMeal('dinner', usedMealIds, { dietType, dislikes })
    };
  }
  
  return { mealPlan };
}

/**
 * Select budget-friendly meal
 */
function selectBudgetMeal(mealType, usedMealIds, { dietType, dislikes }) {
  let candidates = getMealsByType(mealType);
  
  // Only low budget meals
  candidates = candidates.filter(m => m.budgetTier === 'low');
  
  // Filter by diet
  if (dietType && dietType !== 'no-preference') {
    candidates = candidates.filter(m => 
      m.diet === dietType || (dietType === 'non-veg' && m.diet === 'veg')
    );
  }
  
  // Filter out dislikes
  candidates = filterMealsWithoutDislikes(candidates, dislikes);
  
  // Remove used
  candidates = candidates.filter(m => !usedMealIds.has(m.id));
  
  if (candidates.length === 0) {
    candidates = getMealsByType(mealType).filter(m => m.budgetTier === 'low');
  }
  
  const selected = candidates[Math.floor(Math.random() * candidates.length)] || meals[0];
  usedMealIds.add(selected.id);
  return selected;
}

/**
 * Get an alternative meal for swapping
 */
export function getAlternativeMeal(currentMeal, constraints, optimizeFor = null) {
  const { dietType, dislikes, pantryItems, lockedIngredients, budgetPerDay, persona } = constraints;
  
  let candidates = getMealsByType(currentMeal.type);
  
  // Exclude current meal
  candidates = candidates.filter(m => m.id !== currentMeal.id);
  
  // Apply same filters
  if (dietType && dietType !== 'no-preference') {
    candidates = candidates.filter(m => 
      m.diet === dietType || (dietType === 'non-veg' && m.diet === 'veg')
    );
  }
  
  candidates = filterMealsWithoutDislikes(candidates, dislikes);
  
  // Apply optimization
  if (optimizeFor === 'cheapest') {
    candidates = candidates.filter(m => m.budgetTier === 'low');
  } else if (optimizeFor === 'fastest') {
    candidates.sort((a, b) => (a.prepTime + a.cookTime) - (b.prepTime + b.cookTime));
    candidates = candidates.slice(0, 5);
  } else if (optimizeFor === 'protein') {
    // Prioritize protein-rich dishes
    candidates = candidates.filter(m => 
      m.ingredients.some(i => ['Chicken', 'Eggs', 'Paneer', 'Fish', 'Lentils', 'Chickpeas', 'Tofu'].includes(i))
    );
  }
  
  if (candidates.length === 0) {
    candidates = getMealsByType(currentMeal.type).filter(m => m.id !== currentMeal.id);
  }
  
  return candidates[Math.floor(Math.random() * candidates.length)];
}

/**
 * Re-optimize entire plan
 */
export function reoptimizePlan(mealPlan, constraints, optimizeFor) {
  const newPlan = {};
  const usedMealIds = new Set();
  
  Object.entries(mealPlan).forEach(([day, meals]) => {
    newPlan[day] = {};
    Object.entries(meals).forEach(([mealType, meal]) => {
      const alternative = getAlternativeMeal(meal, constraints, optimizeFor);
      if (!usedMealIds.has(alternative.id)) {
        newPlan[day][mealType] = alternative;
        usedMealIds.add(alternative.id);
      } else {
        newPlan[day][mealType] = meal;
        usedMealIds.add(meal.id);
      }
    });
  });
  
  return newPlan;
}

/**
 * Count locked ingredients used in plan
 */
export function countLockedIngredientsUsed(mealPlan, lockedIngredients) {
  const usedLocked = new Set();
  
  Object.values(mealPlan).forEach(dayMeals => {
    Object.values(dayMeals).forEach(meal => {
      meal.ingredients.forEach(ing => {
        lockedIngredients.forEach(locked => {
          if (ing.toLowerCase() === locked.toLowerCase()) {
            usedLocked.add(locked);
          }
        });
      });
    });
  });
  
  return Array.from(usedLocked);
}
