// Comprehensive ingredient database with categories
// Supports alphabet-based filtering for autocomplete

export const ingredients = [
  // Vegetables
  { name: 'Tomato', category: 'vegetables' },
  { name: 'Onion', category: 'vegetables' },
  { name: 'Potato', category: 'vegetables' },
  { name: 'Carrot', category: 'vegetables' },
  { name: 'Spinach', category: 'vegetables' },
  { name: 'Cabbage', category: 'vegetables' },
  { name: 'Cauliflower', category: 'vegetables' },
  { name: 'Broccoli', category: 'vegetables' },
  { name: 'Bell Pepper', category: 'vegetables' },
  { name: 'Cucumber', category: 'vegetables' },
  { name: 'Eggplant', category: 'vegetables' },
  { name: 'Green Beans', category: 'vegetables' },
  { name: 'Peas', category: 'vegetables' },
  { name: 'Corn', category: 'vegetables' },
  { name: 'Mushroom', category: 'vegetables' },
  { name: 'Zucchini', category: 'vegetables' },
  { name: 'Lettuce', category: 'vegetables' },
  { name: 'Celery', category: 'vegetables' },
  { name: 'Beetroot', category: 'vegetables' },
  { name: 'Radish', category: 'vegetables' },
  { name: 'Bitter Gourd', category: 'vegetables' },
  { name: 'Bottle Gourd', category: 'vegetables' },
  { name: 'Okra', category: 'vegetables' },
  { name: 'Pumpkin', category: 'vegetables' },
  { name: 'Sweet Potato', category: 'vegetables' },
  
  // Proteins
  { name: 'Chicken', category: 'protein' },
  { name: 'Eggs', category: 'protein' },
  { name: 'Fish', category: 'protein' },
  { name: 'Prawns', category: 'protein' },
  { name: 'Mutton', category: 'protein' },
  { name: 'Paneer', category: 'protein' },
  { name: 'Tofu', category: 'protein' },
  { name: 'Chickpeas', category: 'protein' },
  { name: 'Lentils', category: 'protein' },
  { name: 'Black Beans', category: 'protein' },
  { name: 'Kidney Beans', category: 'protein' },
  { name: 'Soya Chunks', category: 'protein' },
  { name: 'Cottage Cheese', category: 'protein' },
  
  // Grains & Carbs
  { name: 'Rice', category: 'grains' },
  { name: 'Wheat Flour', category: 'grains' },
  { name: 'Bread', category: 'grains' },
  { name: 'Pasta', category: 'grains' },
  { name: 'Oats', category: 'grains' },
  { name: 'Quinoa', category: 'grains' },
  { name: 'Noodles', category: 'grains' },
  { name: 'Roti', category: 'grains' },
  { name: 'Brown Rice', category: 'grains' },
  { name: 'Semolina', category: 'grains' },
  { name: 'Poha', category: 'grains' },
  { name: 'Vermicelli', category: 'grains' },
  { name: 'Corn Flour', category: 'grains' },
  
  // Dairy
  { name: 'Milk', category: 'dairy' },
  { name: 'Yogurt', category: 'dairy' },
  { name: 'Butter', category: 'dairy' },
  { name: 'Cheese', category: 'dairy' },
  { name: 'Cream', category: 'dairy' },
  { name: 'Ghee', category: 'dairy' },
  { name: 'Buttermilk', category: 'dairy' },
  
  // Spices & Seasonings
  { name: 'Salt', category: 'spices' },
  { name: 'Black Pepper', category: 'spices' },
  { name: 'Turmeric', category: 'spices' },
  { name: 'Cumin', category: 'spices' },
  { name: 'Coriander', category: 'spices' },
  { name: 'Garam Masala', category: 'spices' },
  { name: 'Red Chili Powder', category: 'spices' },
  { name: 'Garlic', category: 'spices' },
  { name: 'Ginger', category: 'spices' },
  { name: 'Green Chili', category: 'spices' },
  { name: 'Curry Leaves', category: 'spices' },
  { name: 'Mustard Seeds', category: 'spices' },
  { name: 'Bay Leaves', category: 'spices' },
  { name: 'Cinnamon', category: 'spices' },
  { name: 'Cardamom', category: 'spices' },
  { name: 'Cloves', category: 'spices' },
  { name: 'Paprika', category: 'spices' },
  { name: 'Oregano', category: 'spices' },
  { name: 'Basil', category: 'spices' },
  { name: 'Thyme', category: 'spices' },
  { name: 'Rosemary', category: 'spices' },
  
  // Oils
  { name: 'Cooking Oil', category: 'oils' },
  { name: 'Olive Oil', category: 'oils' },
  { name: 'Mustard Oil', category: 'oils' },
  { name: 'Coconut Oil', category: 'oils' },
  { name: 'Sesame Oil', category: 'oils' },
  
  // Fruits
  { name: 'Apple', category: 'fruits' },
  { name: 'Banana', category: 'fruits' },
  { name: 'Orange', category: 'fruits' },
  { name: 'Mango', category: 'fruits' },
  { name: 'Grapes', category: 'fruits' },
  { name: 'Lemon', category: 'fruits' },
  { name: 'Lime', category: 'fruits' },
  { name: 'Papaya', category: 'fruits' },
  { name: 'Watermelon', category: 'fruits' },
  { name: 'Pineapple', category: 'fruits' },
  { name: 'Pomegranate', category: 'fruits' },
  { name: 'Coconut', category: 'fruits' },
  { name: 'Dates', category: 'fruits' },
  
  // Nuts & Dry Fruits
  { name: 'Almonds', category: 'nuts' },
  { name: 'Cashews', category: 'nuts' },
  { name: 'Peanuts', category: 'nuts' },
  { name: 'Walnuts', category: 'nuts' },
  { name: 'Raisins', category: 'nuts' },
  
  // Others
  { name: 'Sugar', category: 'pantry' },
  { name: 'Honey', category: 'pantry' },
  { name: 'Soy Sauce', category: 'pantry' },
  { name: 'Vinegar', category: 'pantry' },
  { name: 'Tomato Ketchup', category: 'pantry' },
  { name: 'Mayonnaise', category: 'pantry' },
  { name: 'Coconut Milk', category: 'pantry' },
  { name: 'Tamarind', category: 'pantry' },
  { name: 'Jaggery', category: 'pantry' },
  { name: 'Baking Powder', category: 'pantry' },
  { name: 'Yeast', category: 'pantry' },
  { name: 'Vanilla Extract', category: 'pantry' }
];

// Get suggestions based on input (alphabet filtering)
export function getIngredientSuggestions(input) {
  if (!input || input.length < 1) return [];
  
  const lowerInput = input.toLowerCase();
  return ingredients
    .filter(ing => ing.name.toLowerCase().startsWith(lowerInput))
    .slice(0, 8)
    .map(ing => ing.name);
}

// Get all ingredients by category
export function getIngredientsByCategory(category) {
  return ingredients.filter(ing => ing.category === category);
}

// Get category for an ingredient
export function getIngredientCategory(ingredientName) {
  const ingredient = ingredients.find(
    ing => ing.name.toLowerCase() === ingredientName.toLowerCase()
  );
  return ingredient ? ingredient.category : 'other';
}

// Categories for display
export const categories = {
  vegetables: 'Vegetables',
  protein: 'Proteins',
  grains: 'Grains & Carbs',
  dairy: 'Dairy',
  spices: 'Spices & Seasonings',
  oils: 'Oils',
  fruits: 'Fruits',
  nuts: 'Nuts & Dry Fruits',
  pantry: 'Pantry Staples',
  other: 'Other'
};
