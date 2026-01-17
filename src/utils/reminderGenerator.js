// Reminder Generator
// Creates reminders with mandatory justifications

/**
 * Generate all reminders based on meal plan and preferences
 * @param {Object} params - Generation parameters
 * @returns {Array} Array of reminder objects
 */
export function generateReminders({
  mealPlan,
  groceryList,
  prepSchedule,
  reminderSettings,
  contextSettings
}) {
  const reminders = [];
  const { preferredTime, cookingWindow, remindersPerDay } = reminderSettings;
  const { numberOfDays } = contextSettings;
  
  // Determine base times
  const morningTime = '08:00';
  const eveningTime = '17:00';
  
  // Generate shopping reminders first
  const shoppingReminders = generateShoppingReminders(
    groceryList,
    mealPlan,
    preferredTime
  );
  reminders.push(...shoppingReminders);
  
  // Generate prep reminders
  const prepReminders = generatePrepReminders(
    mealPlan,
    prepSchedule,
    cookingWindow,
    numberOfDays
  );
  reminders.push(...prepReminders);
  
  // Generate cooking reminders
  const cookingReminders = generateCookingReminders(
    mealPlan,
    cookingWindow,
    remindersPerDay
  );
  reminders.push(...cookingReminders);
  
  // Sort by date and time
  reminders.sort((a, b) => {
    if (a.day !== b.day) return a.day - b.day;
    return a.time.localeCompare(b.time);
  });
  
  return reminders;
}

/**
 * Generate shopping reminders
 */
function generateShoppingReminders(groceryList, mealPlan, preferredTime) {
  const reminders = [];
  
  // Check if there are items to buy
  const itemsToBuy = groceryList?.summary?.itemsToBuy || 0;
  
  if (itemsToBuy > 0) {
    // Find first meal needing purchased ingredients
    const firstDay = Object.keys(mealPlan)[0];
    const firstMealNeeding = findFirstMealNeedingPurchase(mealPlan, groceryList);
    
    reminders.push({
      id: `shop-${Date.now()}`,
      type: 'shopping',
      day: 0, // Day before
      time: preferredTime === 'morning' ? '09:00' : '18:00',
      title: `Shop for ${itemsToBuy} ingredients`,
      description: `Get ${itemsToBuy} items from the grocery list before cooking starts.`,
      justification: `Scheduled because ${firstMealNeeding || 'Day 1 meals'} requires fresh vegetables and ingredients that are not in your pantry.`,
      associatedMeal: firstMealNeeding
    });
  }
  
  return reminders;
}

/**
 * Find first meal that needs purchased ingredients
 */
function findFirstMealNeedingPurchase(mealPlan, groceryList) {
  if (!groceryList?.toBuy) return 'Day 1 breakfast';
  
  const toBuyFlat = Object.values(groceryList.toBuy).flat().map(i => i.toLowerCase());
  
  for (const [day, meals] of Object.entries(mealPlan)) {
    for (const [mealType, meal] of Object.entries(meals)) {
      const needsPurchase = meal.ingredients.some(ing => 
        toBuyFlat.includes(ing.toLowerCase())
      );
      if (needsPurchase) {
        return `${day.replace('day', 'Day ')} ${mealType}`;
      }
    }
  }
  
  return 'Day 1 breakfast';
}

/**
 * Generate prep reminders
 */
function generatePrepReminders(mealPlan, prepSchedule, cookingWindow, numberOfDays) {
  const reminders = [];
  
  // Parse cooking window
  const [hours] = cookingWindow.split(':').map(Number);
  const prepTime = formatTime(hours - 2, 0); // 2 hours before cooking
  
  // Evening before Day 1 prep reminder
  reminders.push({
    id: `prep-0-${Date.now()}`,
    type: 'prep',
    day: 0,
    time: '20:00',
    title: 'Prep for tomorrow\'s meals',
    description: 'Wash and chop vegetables, soak lentils if needed, organize ingredients.',
    justification: 'Scheduled evening before to reduce morning cooking time and align with your energy level for next-day efficiency.',
    associatedMeal: 'Day 1 meals'
  });
  
  // Daily prep reminders
  for (let day = 1; day <= numberOfDays; day++) {
    const dayMeals = mealPlan[`day${day}`];
    if (!dayMeals) continue;
    
    const dinner = dayMeals.dinner;
    
    if (dinner && (dinner.prepTime >= 15 || dinner.complexity === 'moderate' || dinner.complexity === 'complex')) {
      reminders.push({
        id: `prep-${day}-${Date.now()}`,
        type: 'prep',
        day: day,
        time: prepTime,
        title: `Start prep for ${dinner.name}`,
        description: `Begin prep work for dinner - approximately ${dinner.prepTime} mins needed.`,
        justification: `Scheduled ${2} hours before dinner because ${dinner.name} requires ${dinner.prepTime} minutes of prep time and you marked your energy as limited.`,
        associatedMeal: dinner.name
      });
    }
  }
  
  return reminders;
}

/**
 * Generate cooking reminders
 */
function generateCookingReminders(mealPlan, cookingWindow, remindersPerDay) {
  const reminders = [];
  const [hours, mins] = cookingWindow.split(':').map(Number);
  
  const numberOfDays = Object.keys(mealPlan).length;
  
  for (let day = 1; day <= numberOfDays; day++) {
    const dayMeals = mealPlan[`day${day}`];
    if (!dayMeals) continue;
    
    // Morning cooking reminder
    if (remindersPerDay >= 1) {
      const breakfast = dayMeals.breakfast;
      const startTime = formatTime(7, 30);
      
      reminders.push({
        id: `cook-breakfast-${day}-${Date.now()}`,
        type: 'cooking',
        day: day,
        time: startTime,
        title: `Make ${breakfast.name}`,
        description: `Start cooking breakfast - ${breakfast.cookTime} mins cooking time.`,
        justification: `Scheduled at 7:30 AM to have breakfast ready by 8:00 AM based on your ${breakfast.cookTime} minute cook time.`,
        associatedMeal: breakfast.name
      });
    }
    
    // Dinner cooking reminder
    if (remindersPerDay >= 2) {
      const dinner = dayMeals.dinner;
      const dinnerStartTime = formatTime(hours, mins);
      
      reminders.push({
        id: `cook-dinner-${day}-${Date.now()}`,
        type: 'cooking',
        day: day,
        time: dinnerStartTime,
        title: `Cook ${dinner.name}`,
        description: `Begin cooking dinner - ${dinner.cookTime} mins cooking time.`,
        justification: `Scheduled at ${dinnerStartTime} to align with your preferred cooking window and have dinner ready within ${dinner.cookTime + 15} minutes.`,
        associatedMeal: dinner.name
      });
    }
  }
  
  return reminders;
}

/**
 * Generate prep schedule
 */
export function generatePrepSchedule(mealPlan, persona, energyLevel) {
  const batch = [];
  const fresh = [];
  
  Object.entries(mealPlan).forEach(([day, meals]) => {
    Object.entries(meals).forEach(([mealType, meal]) => {
      // Determine if can be batched
      const canBatch = meal.complexity === 'simple' && 
                       meal.ingredients.some(i => 
                         ['Rice', 'Lentils', 'Chickpeas', 'Kidney Beans'].includes(i)
                       );
      
      if (canBatch) {
        batch.push({
          meal: meal.name,
          day,
          mealType,
          batchItems: meal.ingredients.filter(i => 
            ['Rice', 'Lentils', 'Chickpeas', 'Kidney Beans', 'Potato'].includes(i)
          ),
          reason: 'Base ingredients can be prepared in advance'
        });
      } else {
        fresh.push({
          meal: meal.name,
          day,
          mealType,
          reason: meal.complexity === 'simple' ? 
            'Quick to make fresh' : 
            'Best prepared just before serving'
        });
      }
    });
  });
  
  return { batch, fresh };
}

/**
 * Format time as HH:MM
 */
function formatTime(hours, mins) {
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

/**
 * Update reminders after meal swap
 */
export function updateRemindersAfterSwap(reminders, day, mealType, newMeal) {
  return reminders.map(reminder => {
    if (reminder.day === parseInt(day.replace('day', '')) && 
        reminder.associatedMeal) {
      // Update associated meal if it matches
      return {
        ...reminder,
        title: reminder.title.includes('Cook') || reminder.title.includes('Make') ?
          reminder.title.replace(/Cook|Make/, match => match) + ` ${newMeal.name}` :
          reminder.title,
        associatedMeal: newMeal.name
      };
    }
    return reminder;
  });
}
