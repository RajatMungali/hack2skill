// Meal database with diet types, ingredients, times, and substitutions
// Each meal has: name, type (breakfast/lunch/dinner), diet, ingredients, prepTime, cookTime, budgetTier, substitutions

export const meals = [
  // =====================
  // BREAKFAST OPTIONS
  // =====================
  {
    id: 'b1',
    name: 'Masala Omelette',
    type: 'breakfast',
    diet: 'non-veg',
    ingredients: ['Eggs', 'Onion', 'Tomato', 'Green Chili', 'Cooking Oil', 'Salt'],
    prepTime: 5,
    cookTime: 10,
    budgetTier: 'low',
    complexity: 'simple',
    substitutions: [
      { original: 'Eggs', replacement: 'Tofu Scramble', note: 'for veg option' },
      { original: 'Green Chili', replacement: 'Black Pepper', note: 'for less spice' }
    ]
  },
  {
    id: 'b2',
    name: 'Poha',
    type: 'breakfast',
    diet: 'veg',
    ingredients: ['Poha', 'Onion', 'Potato', 'Peanuts', 'Curry Leaves', 'Turmeric', 'Mustard Seeds', 'Green Chili', 'Lemon', 'Cooking Oil'],
    prepTime: 10,
    cookTime: 15,
    budgetTier: 'low',
    complexity: 'simple',
    substitutions: [
      { original: 'Peanuts', replacement: 'Cashews', note: 'for richer taste' },
      { original: 'Potato', replacement: 'Sweet Potato', note: 'healthier option' }
    ]
  },
  {
    id: 'b3',
    name: 'Vegetable Upma',
    type: 'breakfast',
    diet: 'veg',
    ingredients: ['Semolina', 'Onion', 'Carrot', 'Peas', 'Curry Leaves', 'Mustard Seeds', 'Green Chili', 'Ghee'],
    prepTime: 10,
    cookTime: 15,
    budgetTier: 'low',
    complexity: 'simple',
    substitutions: [
      { original: 'Semolina', replacement: 'Oats', note: 'for healthier version' },
      { original: 'Ghee', replacement: 'Cooking Oil', note: 'lighter option' }
    ]
  },
  {
    id: 'b4',
    name: 'Aloo Paratha',
    type: 'breakfast',
    diet: 'veg',
    ingredients: ['Wheat Flour', 'Potato', 'Green Chili', 'Cumin', 'Coriander', 'Ghee', 'Salt'],
    prepTime: 20,
    cookTime: 15,
    budgetTier: 'low',
    complexity: 'moderate',
    substitutions: [
      { original: 'Potato', replacement: 'Cauliflower', note: 'gobhi paratha' },
      { original: 'Ghee', replacement: 'Butter', note: 'similar richness' }
    ]
  },
  {
    id: 'b5',
    name: 'Idli with Sambar',
    type: 'breakfast',
    diet: 'veg',
    ingredients: ['Rice', 'Lentils', 'Curry Leaves', 'Mustard Seeds', 'Onion', 'Tomato', 'Turmeric', 'Tamarind'],
    prepTime: 30,
    cookTime: 20,
    budgetTier: 'low',
    complexity: 'complex',
    substitutions: [
      { original: 'Tamarind', replacement: 'Lemon', note: 'for tanginess' },
      { original: 'Lentils', replacement: 'Chickpeas', note: 'different flavor' }
    ]
  },
  {
    id: 'b6',
    name: 'Bread Toast with Eggs',
    type: 'breakfast',
    diet: 'non-veg',
    ingredients: ['Bread', 'Eggs', 'Butter', 'Salt', 'Black Pepper'],
    prepTime: 5,
    cookTime: 10,
    budgetTier: 'low',
    complexity: 'simple',
    substitutions: [
      { original: 'Butter', replacement: 'Olive Oil', note: 'healthier fat' },
      { original: 'Eggs', replacement: 'Cheese', note: 'for veg option' }
    ]
  },
  {
    id: 'b7',
    name: 'Dosa with Chutney',
    type: 'breakfast',
    diet: 'veg',
    ingredients: ['Rice', 'Lentils', 'Coconut', 'Green Chili', 'Cooking Oil', 'Curry Leaves'],
    prepTime: 20,
    cookTime: 15,
    budgetTier: 'low',
    complexity: 'moderate',
    substitutions: [
      { original: 'Coconut', replacement: 'Peanuts', note: 'peanut chutney' },
      { original: 'Lentils', replacement: 'Oats', note: 'instant oats dosa' }
    ]
  },
  {
    id: 'b8',
    name: 'Oatmeal with Fruits',
    type: 'breakfast',
    diet: 'veg',
    ingredients: ['Oats', 'Milk', 'Banana', 'Honey', 'Almonds'],
    prepTime: 5,
    cookTime: 10,
    budgetTier: 'medium',
    complexity: 'simple',
    substitutions: [
      { original: 'Milk', replacement: 'Yogurt', note: 'creamier texture' },
      { original: 'Banana', replacement: 'Apple', note: 'different fruit' }
    ]
  },
  {
    id: 'b9',
    name: 'Paneer Bhurji',
    type: 'breakfast',
    diet: 'veg',
    ingredients: ['Paneer', 'Onion', 'Tomato', 'Green Chili', 'Turmeric', 'Cumin', 'Coriander', 'Cooking Oil'],
    prepTime: 10,
    cookTime: 15,
    budgetTier: 'medium',
    complexity: 'simple',
    substitutions: [
      { original: 'Paneer', replacement: 'Tofu', note: 'lower calorie' },
      { original: 'Cooking Oil', replacement: 'Butter', note: 'richer taste' }
    ]
  },
  {
    id: 'b10',
    name: 'Egg Fried Rice',
    type: 'breakfast',
    diet: 'non-veg',
    ingredients: ['Rice', 'Eggs', 'Onion', 'Carrot', 'Peas', 'Soy Sauce', 'Garlic', 'Cooking Oil'],
    prepTime: 10,
    cookTime: 15,
    budgetTier: 'low',
    complexity: 'simple',
    substitutions: [
      { original: 'Eggs', replacement: 'Tofu', note: 'veg version' },
      { original: 'Soy Sauce', replacement: 'Salt', note: 'if unavailable' }
    ]
  },

  // =====================
  // LUNCH OPTIONS
  // =====================
  {
    id: 'l1',
    name: 'Dal Rice',
    type: 'lunch',
    diet: 'veg',
    ingredients: ['Rice', 'Lentils', 'Onion', 'Tomato', 'Turmeric', 'Cumin', 'Garlic', 'Ghee'],
    prepTime: 10,
    cookTime: 25,
    budgetTier: 'low',
    complexity: 'simple',
    substitutions: [
      { original: 'Lentils', replacement: 'Chickpeas', note: 'chana dal' },
      { original: 'Ghee', replacement: 'Butter', note: 'similar taste' }
    ]
  },
  {
    id: 'l2',
    name: 'Chicken Curry with Rice',
    type: 'lunch',
    diet: 'non-veg',
    ingredients: ['Chicken', 'Rice', 'Onion', 'Tomato', 'Ginger', 'Garlic', 'Garam Masala', 'Turmeric', 'Red Chili Powder', 'Cooking Oil', 'Yogurt'],
    prepTime: 15,
    cookTime: 35,
    budgetTier: 'medium',
    complexity: 'moderate',
    substitutions: [
      { original: 'Chicken', replacement: 'Paneer', note: 'veg option' },
      { original: 'Yogurt', replacement: 'Cream', note: 'richer curry' }
    ]
  },
  {
    id: 'l3',
    name: 'Rajma Chawal',
    type: 'lunch',
    diet: 'veg',
    ingredients: ['Kidney Beans', 'Rice', 'Onion', 'Tomato', 'Ginger', 'Garlic', 'Garam Masala', 'Cumin', 'Cooking Oil'],
    prepTime: 15,
    cookTime: 40,
    budgetTier: 'low',
    complexity: 'moderate',
    substitutions: [
      { original: 'Kidney Beans', replacement: 'Black Beans', note: 'similar texture' },
      { original: 'Rice', replacement: 'Roti', note: 'lower carbs' }
    ]
  },
  {
    id: 'l4',
    name: 'Paneer Butter Masala',
    type: 'lunch',
    diet: 'veg',
    ingredients: ['Paneer', 'Tomato', 'Onion', 'Butter', 'Cream', 'Garam Masala', 'Ginger', 'Garlic', 'Cashews'],
    prepTime: 15,
    cookTime: 25,
    budgetTier: 'medium',
    complexity: 'moderate',
    substitutions: [
      { original: 'Cream', replacement: 'Yogurt', note: 'lighter version' },
      { original: 'Cashews', replacement: 'Almonds', note: 'for thickening' }
    ]
  },
  {
    id: 'l5',
    name: 'Vegetable Biryani',
    type: 'lunch',
    diet: 'veg',
    ingredients: ['Rice', 'Potato', 'Carrot', 'Peas', 'Onion', 'Yogurt', 'Garam Masala', 'Bay Leaves', 'Cinnamon', 'Cardamom', 'Ghee'],
    prepTime: 20,
    cookTime: 35,
    budgetTier: 'medium',
    complexity: 'complex',
    substitutions: [
      { original: 'Rice', replacement: 'Quinoa', note: 'healthier option' },
      { original: 'Ghee', replacement: 'Cooking Oil', note: 'lighter version' }
    ]
  },
  {
    id: 'l6',
    name: 'Fish Curry',
    type: 'lunch',
    diet: 'non-veg',
    ingredients: ['Fish', 'Coconut Milk', 'Onion', 'Tomato', 'Turmeric', 'Red Chili Powder', 'Curry Leaves', 'Mustard Seeds', 'Cooking Oil'],
    prepTime: 15,
    cookTime: 25,
    budgetTier: 'medium',
    complexity: 'moderate',
    substitutions: [
      { original: 'Fish', replacement: 'Prawns', note: 'seafood swap' },
      { original: 'Coconut Milk', replacement: 'Yogurt', note: 'different flavor' }
    ]
  },
  {
    id: 'l7',
    name: 'Chole Bhature',
    type: 'lunch',
    diet: 'veg',
    ingredients: ['Chickpeas', 'Wheat Flour', 'Onion', 'Tomato', 'Ginger', 'Garlic', 'Garam Masala', 'Cumin', 'Cooking Oil'],
    prepTime: 20,
    cookTime: 30,
    budgetTier: 'low',
    complexity: 'moderate',
    substitutions: [
      { original: 'Wheat Flour', replacement: 'Rice', note: 'chole chawal' },
      { original: 'Chickpeas', replacement: 'Kidney Beans', note: 'different legume' }
    ]
  },
  {
    id: 'l8',
    name: 'Egg Curry',
    type: 'lunch',
    diet: 'non-veg',
    ingredients: ['Eggs', 'Onion', 'Tomato', 'Ginger', 'Garlic', 'Turmeric', 'Red Chili Powder', 'Garam Masala', 'Cooking Oil'],
    prepTime: 10,
    cookTime: 20,
    budgetTier: 'low',
    complexity: 'simple',
    substitutions: [
      { original: 'Eggs', replacement: 'Paneer', note: 'veg version' },
      { original: 'Tomato', replacement: 'Yogurt', note: 'different base' }
    ]
  },
  {
    id: 'l9',
    name: 'Pasta Primavera',
    type: 'lunch',
    diet: 'veg',
    ingredients: ['Pasta', 'Bell Pepper', 'Zucchini', 'Tomato', 'Garlic', 'Olive Oil', 'Oregano', 'Basil', 'Cheese'],
    prepTime: 15,
    cookTime: 20,
    budgetTier: 'medium',
    complexity: 'simple',
    substitutions: [
      { original: 'Pasta', replacement: 'Noodles', note: 'Asian fusion' },
      { original: 'Cheese', replacement: 'Cream', note: 'creamy version' }
    ]
  },
  {
    id: 'l10',
    name: 'Chicken Fried Rice',
    type: 'lunch',
    diet: 'non-veg',
    ingredients: ['Rice', 'Chicken', 'Eggs', 'Carrot', 'Peas', 'Onion', 'Soy Sauce', 'Garlic', 'Cooking Oil'],
    prepTime: 15,
    cookTime: 20,
    budgetTier: 'medium',
    complexity: 'simple',
    substitutions: [
      { original: 'Chicken', replacement: 'Prawns', note: 'seafood version' },
      { original: 'Rice', replacement: 'Noodles', note: 'noodle version' }
    ]
  },

  // =====================
  // DINNER OPTIONS
  // =====================
  {
    id: 'd1',
    name: 'Roti with Mixed Vegetables',
    type: 'dinner',
    diet: 'veg',
    ingredients: ['Wheat Flour', 'Potato', 'Cauliflower', 'Carrot', 'Peas', 'Onion', 'Tomato', 'Turmeric', 'Cumin', 'Cooking Oil'],
    prepTime: 15,
    cookTime: 25,
    budgetTier: 'low',
    complexity: 'simple',
    substitutions: [
      { original: 'Wheat Flour', replacement: 'Rice', note: 'rice option' },
      { original: 'Cauliflower', replacement: 'Broccoli', note: 'different veggie' }
    ]
  },
  {
    id: 'd2',
    name: 'Butter Chicken',
    type: 'dinner',
    diet: 'non-veg',
    ingredients: ['Chicken', 'Butter', 'Cream', 'Tomato', 'Onion', 'Ginger', 'Garlic', 'Garam Masala', 'Cashews', 'Yogurt'],
    prepTime: 20,
    cookTime: 30,
    budgetTier: 'high',
    complexity: 'moderate',
    substitutions: [
      { original: 'Cream', replacement: 'Yogurt', note: 'lighter version' },
      { original: 'Chicken', replacement: 'Paneer', note: 'veg alternative' }
    ]
  },
  {
    id: 'd3',
    name: 'Palak Paneer',
    type: 'dinner',
    diet: 'veg',
    ingredients: ['Paneer', 'Spinach', 'Onion', 'Tomato', 'Garlic', 'Ginger', 'Cream', 'Cumin', 'Garam Masala'],
    prepTime: 15,
    cookTime: 25,
    budgetTier: 'medium',
    complexity: 'moderate',
    substitutions: [
      { original: 'Paneer', replacement: 'Tofu', note: 'vegan option' },
      { original: 'Spinach', replacement: 'Broccoli', note: 'different green' }
    ]
  },
  {
    id: 'd4',
    name: 'Khichdi',
    type: 'dinner',
    diet: 'veg',
    ingredients: ['Rice', 'Lentils', 'Ghee', 'Cumin', 'Turmeric', 'Ginger', 'Salt'],
    prepTime: 10,
    cookTime: 25,
    budgetTier: 'low',
    complexity: 'simple',
    substitutions: [
      { original: 'Ghee', replacement: 'Butter', note: 'similar taste' },
      { original: 'Lentils', replacement: 'Chickpeas', note: 'different texture' }
    ]
  },
  {
    id: 'd5',
    name: 'Grilled Fish with Vegetables',
    type: 'dinner',
    diet: 'non-veg',
    ingredients: ['Fish', 'Lemon', 'Garlic', 'Olive Oil', 'Bell Pepper', 'Zucchini', 'Oregano', 'Salt', 'Black Pepper'],
    prepTime: 15,
    cookTime: 20,
    budgetTier: 'high',
    complexity: 'simple',
    substitutions: [
      { original: 'Fish', replacement: 'Chicken', note: 'poultry option' },
      { original: 'Olive Oil', replacement: 'Butter', note: 'richer flavor' }
    ]
  },
  {
    id: 'd6',
    name: 'Aloo Gobi',
    type: 'dinner',
    diet: 'veg',
    ingredients: ['Potato', 'Cauliflower', 'Onion', 'Tomato', 'Turmeric', 'Cumin', 'Coriander', 'Green Chili', 'Cooking Oil'],
    prepTime: 15,
    cookTime: 25,
    budgetTier: 'low',
    complexity: 'simple',
    substitutions: [
      { original: 'Cauliflower', replacement: 'Cabbage', note: 'aloo bandh gobi' },
      { original: 'Potato', replacement: 'Sweet Potato', note: 'healthier carb' }
    ]
  },
  {
    id: 'd7',
    name: 'Mutton Keema',
    type: 'dinner',
    diet: 'non-veg',
    ingredients: ['Mutton', 'Onion', 'Tomato', 'Ginger', 'Garlic', 'Garam Masala', 'Red Chili Powder', 'Peas', 'Cooking Oil'],
    prepTime: 15,
    cookTime: 40,
    budgetTier: 'high',
    complexity: 'moderate',
    substitutions: [
      { original: 'Mutton', replacement: 'Chicken', note: 'lighter meat' },
      { original: 'Peas', replacement: 'Potato', note: 'different texture' }
    ]
  },
  {
    id: 'd8',
    name: 'Stir Fried Noodles',
    type: 'dinner',
    diet: 'veg',
    ingredients: ['Noodles', 'Cabbage', 'Carrot', 'Bell Pepper', 'Onion', 'Soy Sauce', 'Garlic', 'Cooking Oil'],
    prepTime: 15,
    cookTime: 15,
    budgetTier: 'low',
    complexity: 'simple',
    substitutions: [
      { original: 'Noodles', replacement: 'Rice', note: 'fried rice' },
      { original: 'Soy Sauce', replacement: 'Vinegar', note: 'tangy version' }
    ]
  },
  {
    id: 'd9',
    name: 'Prawn Masala',
    type: 'dinner',
    diet: 'non-veg',
    ingredients: ['Prawns', 'Coconut Milk', 'Onion', 'Tomato', 'Curry Leaves', 'Mustard Seeds', 'Red Chili Powder', 'Turmeric', 'Cooking Oil'],
    prepTime: 15,
    cookTime: 20,
    budgetTier: 'high',
    complexity: 'moderate',
    substitutions: [
      { original: 'Prawns', replacement: 'Fish', note: 'different seafood' },
      { original: 'Coconut Milk', replacement: 'Cream', note: 'north Indian style' }
    ]
  },
  {
    id: 'd10',
    name: 'Mushroom Curry',
    type: 'dinner',
    diet: 'veg',
    ingredients: ['Mushroom', 'Onion', 'Tomato', 'Ginger', 'Garlic', 'Cream', 'Garam Masala', 'Cumin', 'Cooking Oil'],
    prepTime: 10,
    cookTime: 20,
    budgetTier: 'medium',
    complexity: 'simple',
    substitutions: [
      { original: 'Cream', replacement: 'Coconut Milk', note: 'vegan option' },
      { original: 'Mushroom', replacement: 'Paneer', note: 'different protein' }
    ]
  },
  {
    id: 'd11',
    name: 'Dal Fry with Rice',
    type: 'dinner',
    diet: 'veg',
    ingredients: ['Lentils', 'Rice', 'Onion', 'Tomato', 'Garlic', 'Cumin', 'Ghee', 'Red Chili Powder', 'Coriander'],
    prepTime: 10,
    cookTime: 25,
    budgetTier: 'low',
    complexity: 'simple',
    substitutions: [
      { original: 'Ghee', replacement: 'Butter', note: 'similar richness' },
      { original: 'Lentils', replacement: 'Chickpeas', note: 'chana dal' }
    ]
  },
  {
    id: 'd12',
    name: 'Tandoori Chicken',
    type: 'dinner',
    diet: 'non-veg',
    ingredients: ['Chicken', 'Yogurt', 'Lemon', 'Ginger', 'Garlic', 'Garam Masala', 'Red Chili Powder', 'Turmeric', 'Cooking Oil'],
    prepTime: 30,
    cookTime: 30,
    budgetTier: 'medium',
    complexity: 'moderate',
    substitutions: [
      { original: 'Chicken', replacement: 'Paneer', note: 'tandoori paneer' },
      { original: 'Yogurt', replacement: 'Cream', note: 'different marinade' }
    ]
  }
];

// Get meals by type
export function getMealsByType(type) {
  return meals.filter(meal => meal.type === type);
}

// Get meals by diet
export function getMealsByDiet(diet) {
  if (diet === 'no-preference') return meals;
  return meals.filter(meal => meal.diet === diet || meal.diet === 'veg');
}

// Filter meals excluding disliked ingredients
export function filterMealsWithoutDislikes(mealList, dislikes) {
  const dislikesLower = dislikes.map(d => d.toLowerCase());
  return mealList.filter(meal => {
    return !meal.ingredients.some(ing => 
      dislikesLower.includes(ing.toLowerCase())
    );
  });
}

// Get meals that use specific ingredients (for ingredient lock)
export function getMealsWithIngredients(mealList, requiredIngredients, minCount = 1) {
  const requiredLower = requiredIngredients.map(i => i.toLowerCase());
  return mealList.filter(meal => {
    const matchCount = meal.ingredients.filter(ing => 
      requiredLower.includes(ing.toLowerCase())
    ).length;
    return matchCount >= minCount;
  });
}

// Get meals by budget tier
export function getMealsByBudget(mealList, maxBudget) {
  const budgetTiers = { low: 1, medium: 2, high: 3 };
  const maxTier = maxBudget < 300 ? 'low' : maxBudget < 500 ? 'medium' : 'high';
  const maxTierValue = budgetTiers[maxTier];
  
  return mealList.filter(meal => budgetTiers[meal.budgetTier] <= maxTierValue);
}

// Get meals by complexity based on persona
export function getMealsByComplexity(mealList, persona) {
  const complexityMap = {
    'working-professional': ['simple', 'moderate'],
    'student': ['simple'],
    'household': ['simple', 'moderate', 'complex']
  };
  const allowedComplexities = complexityMap[persona] || ['simple', 'moderate'];
  return mealList.filter(meal => allowedComplexities.includes(meal.complexity));
}
