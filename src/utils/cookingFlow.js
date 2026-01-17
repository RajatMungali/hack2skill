// Cooking Flow Generator
// Creates consolidated, actionable cooking steps

/**
 * Generate cooking execution flow
 * @param {Object} mealPlan - The meal plan
 * @param {Array} lockedIngredients - User's locked ingredients
 * @returns {Object} Structured cooking flow
 */
export function generateCookingFlow(mealPlan, lockedIngredients) {
  const flow = {
    usingYourIngredients: [],
    prepChecklist: [],
    dayWiseCooking: {},
    wrapUp: []
  };
  
  // Section 1: Using Your Ingredients
  flow.usingYourIngredients = generateIngredientSteps(mealPlan, lockedIngredients);
  
  // Section 2: Prep Checklist
  flow.prepChecklist = generatePrepChecklist(mealPlan);
  
  // Section 3: Day-wise Cooking Sequence
  Object.entries(mealPlan).forEach(([day, meals]) => {
    const dayNumber = day.replace('day', '');
    flow.dayWiseCooking[`Day ${dayNumber}`] = generateDayCookingSteps(meals, dayNumber);
  });
  
  // Section 4: Wrap-up
  flow.wrapUp = generateWrapUpSteps();
  
  return flow;
}

/**
 * Generate ingredient preparation steps
 */
function generateIngredientSteps(mealPlan, lockedIngredients) {
  const steps = [];
  const usedIngredients = new Set();
  
  // Collect all used ingredients
  Object.values(mealPlan).forEach(dayMeals => {
    Object.values(dayMeals).forEach(meal => {
      meal.ingredients.forEach(ing => usedIngredients.add(ing));
    });
  });
  
  // Steps for key ingredients
  if (usedIngredients.has('Rice')) {
    steps.push('Rinse rice thoroughly under cold water until water runs clear');
  }
  
  if (usedIngredients.has('Lentils') || usedIngredients.has('Chickpeas') || usedIngredients.has('Kidney Beans')) {
    steps.push('Soak legumes in water for 4-6 hours or overnight');
  }
  
  if (usedIngredients.has('Paneer')) {
    steps.push('Cut paneer into cubes and keep refrigerated until use');
  }
  
  if (usedIngredients.has('Chicken') || usedIngredients.has('Fish') || usedIngredients.has('Mutton')) {
    steps.push('Clean and marinate proteins, store covered in refrigerator');
  }
  
  // Locked ingredients
  lockedIngredients.forEach(ing => {
    if (!steps.some(s => s.toLowerCase().includes(ing.toLowerCase()))) {
      steps.push(`Prepare ${ing} as needed for multiple meals`);
    }
  });
  
  return steps.slice(0, 5); // Max 5 steps
}

/**
 * Generate prep checklist
 */
function generatePrepChecklist(mealPlan) {
  const steps = [];
  const allIngredients = new Set();
  
  Object.values(mealPlan).forEach(dayMeals => {
    Object.values(dayMeals).forEach(meal => {
      meal.ingredients.forEach(ing => allIngredients.add(ing));
    });
  });
  
  // Common prep items
  if (allIngredients.has('Onion')) {
    steps.push('Dice or slice onions and store in airtight container');
  }
  
  if (allIngredients.has('Tomato')) {
    steps.push('Blanch and puree tomatoes for curries');
  }
  
  if (allIngredients.has('Ginger') || allIngredients.has('Garlic')) {
    steps.push('Make ginger-garlic paste for quick cooking');
  }
  
  if (allIngredients.has('Green Chili')) {
    steps.push('Wash and slit green chilies, store in freezer');
  }
  
  if (allIngredients.has('Coriander')) {
    steps.push('Wash and chop fresh coriander, store wrapped in paper');
  }
  
  // Add vegetable prep
  const veggies = ['Carrot', 'Potato', 'Cauliflower', 'Cabbage', 'Bell Pepper'];
  const usedVeggies = veggies.filter(v => allIngredients.has(v));
  
  if (usedVeggies.length > 0) {
    steps.push(`Wash and chop vegetables: ${usedVeggies.slice(0, 3).join(', ')}`);
  }
  
  return steps.slice(0, 6); // Max 6 steps
}

/**
 * Generate cooking steps for a day
 */
function generateDayCookingSteps(meals, dayNumber) {
  const steps = [];
  
  // Breakfast
  if (meals.breakfast) {
    steps.push(`Start with ${meals.breakfast.name} - heat pan and gather ingredients`);
    steps.push(`Cook ${meals.breakfast.name} following the recipe sequence`);
  }
  
  // Lunch
  if (meals.lunch) {
    steps.push(`Begin ${meals.lunch.name} prep 30 minutes before lunch`);
    steps.push(`Complete ${meals.lunch.name} and serve hot`);
  }
  
  // Dinner
  if (meals.dinner) {
    steps.push(`Start ${meals.dinner.name} prep during evening`);
    steps.push(`Cook ${meals.dinner.name} and plate for serving`);
  }
  
  return steps;
}

/**
 * Generate wrap-up steps
 */
function generateWrapUpSteps() {
  return [
    'Store leftovers in labeled containers in refrigerator',
    'Clean cooking surfaces and wash all utensils',
    'Take inventory of remaining ingredients for next plan'
  ];
}

/**
 * Get total step count
 */
export function getTotalStepCount(cookingFlow) {
  let count = 0;
  
  count += cookingFlow.usingYourIngredients.length;
  count += cookingFlow.prepChecklist.length;
  
  Object.values(cookingFlow.dayWiseCooking).forEach(steps => {
    count += steps.length;
  });
  
  count += cookingFlow.wrapUp.length;
  
  return count;
}

/**
 * Format cooking flow for display
 */
export function formatCookingFlowForDisplay(cookingFlow) {
  const sections = [];
  let stepNumber = 1;
  
  // Using Your Ingredients
  if (cookingFlow.usingYourIngredients.length > 0) {
    sections.push({
      title: 'Using Your Ingredients',
      steps: cookingFlow.usingYourIngredients.map(step => ({
        number: stepNumber++,
        text: step
      }))
    });
  }
  
  // Prep Checklist
  if (cookingFlow.prepChecklist.length > 0) {
    sections.push({
      title: 'Prep Checklist',
      steps: cookingFlow.prepChecklist.map(step => ({
        number: stepNumber++,
        text: step
      }))
    });
  }
  
  // Day-wise Cooking
  Object.entries(cookingFlow.dayWiseCooking).forEach(([day, steps]) => {
    if (steps.length > 0) {
      sections.push({
        title: `${day} Cooking Sequence`,
        steps: steps.map(step => ({
          number: stepNumber++,
          text: step
        }))
      });
    }
  });
  
  // Wrap-up
  if (cookingFlow.wrapUp.length > 0) {
    sections.push({
      title: 'Wrap-up',
      steps: cookingFlow.wrapUp.map(step => ({
        number: stepNumber++,
        text: step
      }))
    });
  }
  
  return sections;
}
