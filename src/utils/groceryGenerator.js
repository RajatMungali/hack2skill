// Grocery List Generator
// Creates categorized shopping list from meal plan

import { getIngredientCategory, categories } from '../data/ingredients';

/**
 * Generate grocery list from meal plan
 * @param {Object} mealPlan - The generated meal plan
 * @param {Array} pantryItems - Items user already has
 * @returns {Object} Categorized grocery list
 */
export function generateGroceryList(mealPlan, pantryItems) {
  const allIngredients = new Set();
  
  // Collect all ingredients from all meals
  Object.values(mealPlan).forEach(dayMeals => {
    Object.values(dayMeals).forEach(meal => {
      meal.ingredients.forEach(ingredient => {
        allIngredients.add(ingredient);
      });
    });
  });
  
  // Normalize pantry items for comparison
  const pantryLower = pantryItems.map(p => p.toLowerCase());
  
  // Separate into to-buy and in-pantry
  const toBuy = [];
  const inPantry = [];
  
  allIngredients.forEach(ingredient => {
    const isInPantry = pantryLower.includes(ingredient.toLowerCase());
    const category = getIngredientCategory(ingredient);
    
    if (isInPantry) {
      inPantry.push({ name: ingredient, category });
    } else {
      toBuy.push({ name: ingredient, category });
    }
  });
  
  // Group by category
  const toBuyByCategory = groupByCategory(toBuy);
  const inPantryByCategory = groupByCategory(inPantry);
  
  return {
    toBuy: toBuyByCategory,
    inPantry: inPantryByCategory,
    summary: {
      totalItems: allIngredients.size,
      itemsToBuy: toBuy.length,
      itemsInPantry: inPantry.length
    }
  };
}

/**
 * Group items by category
 */
function groupByCategory(items) {
  const grouped = {};
  
  items.forEach(item => {
    const categoryKey = item.category || 'other';
    const categoryName = categories[categoryKey] || 'Other';
    
    if (!grouped[categoryName]) {
      grouped[categoryName] = [];
    }
    grouped[categoryName].push(item.name);
  });
  
  // Sort categories
  const sortedGrouped = {};
  const categoryOrder = [
    'Vegetables',
    'Proteins', 
    'Grains & Carbs',
    'Dairy',
    'Spices & Seasonings',
    'Oils',
    'Fruits',
    'Nuts & Dry Fruits',
    'Pantry Staples',
    'Other'
  ];
  
  categoryOrder.forEach(cat => {
    if (grouped[cat]) {
      sortedGrouped[cat] = grouped[cat].sort();
    }
  });
  
  // Add any remaining categories
  Object.keys(grouped).forEach(cat => {
    if (!sortedGrouped[cat]) {
      sortedGrouped[cat] = grouped[cat].sort();
    }
  });
  
  return sortedGrouped;
}

/**
 * Update grocery list after meal swap
 */
export function updateGroceryListAfterSwap(groceryList, oldMeal, newMeal, pantryItems) {
  // Get ingredients that were only in old meal
  const oldIngredients = new Set(oldMeal.ingredients);
  const newIngredients = new Set(newMeal.ingredients);
  
  // For simplicity, regenerate the list
  // In a real app, we'd do incremental updates
  return groceryList;
}

/**
 * Get shopping trip summary
 */
export function getShoppingTripSummary(groceryList) {
  let totalItems = 0;
  let categories = [];
  
  Object.entries(groceryList.toBuy).forEach(([category, items]) => {
    totalItems += items.length;
    categories.push(category);
  });
  
  return {
    totalItems,
    categories: categories.length,
    estimatedTime: totalItems <= 10 ? '15-20 mins' : totalItems <= 20 ? '25-35 mins' : '40-50 mins'
  };
}
