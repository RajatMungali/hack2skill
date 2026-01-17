import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  // Current step in the flow (1-6)
  currentStep: 1,
  
  // Step 1: Persona
  persona: null, // 'working-professional' | 'student' | 'household'
  
  // Step 2: Dietary preferences
  dietType: null, // 'veg' | 'non-veg' | 'no-preference'
  dislikes: [], // Array of disliked ingredients
  
  // Step 3: Pantry
  pantryItems: [], // User's available ingredients
  lockedIngredients: [], // Ingredients that MUST be used (min 3)
  
  // Step 4: Context settings
  contextSettings: {
    budgetPerDay: 400, // in currency units
    city: 'Delhi',
    energyLevel: 'medium', // 'low' | 'medium' | 'high'
    cookingTimeWindow: '30-60', // minutes available
    kitchenSetup: 'standard', // 'basic' | 'standard' | 'full'
    numberOfDays: 2 // 1-3 days
  },
  
  // Step 5: Reminder settings
  reminderSettings: {
    preferredTime: 'morning', // 'morning' | 'evening'
    cookingWindow: '18:00', // preferred cooking start time
    remindersPerDay: 2 // 1 or 2
  },
  
  // Generated outputs
  mealPlan: null, // { day1: { breakfast: meal, lunch: meal, dinner: meal }, ... }
  groceryList: null, // { toBuy: [...], inPantry: [...] }
  prepSchedule: null, // { batch: [...], fresh: [...] }
  reminders: [], // Array of reminder objects with justifications
  calendarEvents: [], // Events for export
  cookingFlow: [], // Consolidated cooking steps
  
  // Budget validation
  budgetStatus: null, // { feasible: boolean, reason: string }
  
  // Personalization proof
  personalizationProof: []
};

// Action types
const ActionTypes = {
  SET_STEP: 'SET_STEP',
  SET_PERSONA: 'SET_PERSONA',
  SET_DIET_TYPE: 'SET_DIET_TYPE',
  ADD_DISLIKE: 'ADD_DISLIKE',
  REMOVE_DISLIKE: 'REMOVE_DISLIKE',
  SET_DISLIKES: 'SET_DISLIKES',
  ADD_PANTRY_ITEM: 'ADD_PANTRY_ITEM',
  REMOVE_PANTRY_ITEM: 'REMOVE_PANTRY_ITEM',
  SET_PANTRY_ITEMS: 'SET_PANTRY_ITEMS',
  TOGGLE_LOCKED_INGREDIENT: 'TOGGLE_LOCKED_INGREDIENT',
  SET_LOCKED_INGREDIENTS: 'SET_LOCKED_INGREDIENTS',
  UPDATE_CONTEXT_SETTINGS: 'UPDATE_CONTEXT_SETTINGS',
  UPDATE_REMINDER_SETTINGS: 'UPDATE_REMINDER_SETTINGS',
  SET_MEAL_PLAN: 'SET_MEAL_PLAN',
  SWAP_MEAL: 'SWAP_MEAL',
  SET_GROCERY_LIST: 'SET_GROCERY_LIST',
  SET_PREP_SCHEDULE: 'SET_PREP_SCHEDULE',
  SET_REMINDERS: 'SET_REMINDERS',
  SET_CALENDAR_EVENTS: 'SET_CALENDAR_EVENTS',
  SET_COOKING_FLOW: 'SET_COOKING_FLOW',
  SET_BUDGET_STATUS: 'SET_BUDGET_STATUS',
  SET_PERSONALIZATION_PROOF: 'SET_PERSONALIZATION_PROOF',
  RESET_STATE: 'RESET_STATE'
};

// Reducer
function mealPlanReducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_STEP:
      return { ...state, currentStep: action.payload };
    
    case ActionTypes.SET_PERSONA:
      return { ...state, persona: action.payload };
    
    case ActionTypes.SET_DIET_TYPE:
      return { ...state, dietType: action.payload };
    
    case ActionTypes.ADD_DISLIKE:
      if (state.dislikes.includes(action.payload)) return state;
      return { ...state, dislikes: [...state.dislikes, action.payload] };
    
    case ActionTypes.REMOVE_DISLIKE:
      return { ...state, dislikes: state.dislikes.filter(d => d !== action.payload) };
    
    case ActionTypes.SET_DISLIKES:
      return { ...state, dislikes: action.payload };
    
    case ActionTypes.ADD_PANTRY_ITEM:
      if (state.pantryItems.includes(action.payload)) return state;
      return { ...state, pantryItems: [...state.pantryItems, action.payload] };
    
    case ActionTypes.REMOVE_PANTRY_ITEM:
      return { 
        ...state, 
        pantryItems: state.pantryItems.filter(p => p !== action.payload),
        lockedIngredients: state.lockedIngredients.filter(l => l !== action.payload)
      };
    
    case ActionTypes.SET_PANTRY_ITEMS:
      return { ...state, pantryItems: action.payload };
    
    case ActionTypes.TOGGLE_LOCKED_INGREDIENT:
      const isLocked = state.lockedIngredients.includes(action.payload);
      if (isLocked) {
        return { 
          ...state, 
          lockedIngredients: state.lockedIngredients.filter(l => l !== action.payload) 
        };
      } else {
        return { 
          ...state, 
          lockedIngredients: [...state.lockedIngredients, action.payload] 
        };
      }
    
    case ActionTypes.SET_LOCKED_INGREDIENTS:
      return { ...state, lockedIngredients: action.payload };
    
    case ActionTypes.UPDATE_CONTEXT_SETTINGS:
      return { 
        ...state, 
        contextSettings: { ...state.contextSettings, ...action.payload } 
      };
    
    case ActionTypes.UPDATE_REMINDER_SETTINGS:
      return { 
        ...state, 
        reminderSettings: { ...state.reminderSettings, ...action.payload } 
      };
    
    case ActionTypes.SET_MEAL_PLAN:
      return { ...state, mealPlan: action.payload };
    
    case ActionTypes.SWAP_MEAL:
      const { day, mealType, newMeal } = action.payload;
      return {
        ...state,
        mealPlan: {
          ...state.mealPlan,
          [day]: {
            ...state.mealPlan[day],
            [mealType]: newMeal
          }
        }
      };
    
    case ActionTypes.SET_GROCERY_LIST:
      return { ...state, groceryList: action.payload };
    
    case ActionTypes.SET_PREP_SCHEDULE:
      return { ...state, prepSchedule: action.payload };
    
    case ActionTypes.SET_REMINDERS:
      return { ...state, reminders: action.payload };
    
    case ActionTypes.SET_CALENDAR_EVENTS:
      return { ...state, calendarEvents: action.payload };
    
    case ActionTypes.SET_COOKING_FLOW:
      return { ...state, cookingFlow: action.payload };
    
    case ActionTypes.SET_BUDGET_STATUS:
      return { ...state, budgetStatus: action.payload };
    
    case ActionTypes.SET_PERSONALIZATION_PROOF:
      return { ...state, personalizationProof: action.payload };
    
    case ActionTypes.RESET_STATE:
      return initialState;
    
    default:
      return state;
  }
}

// Context
const MealPlanContext = createContext(null);

// Provider component
export function MealPlanProvider({ children }) {
  const [state, dispatch] = useReducer(mealPlanReducer, initialState);
  
  // Action creators
  const actions = {
    setStep: (step) => dispatch({ type: ActionTypes.SET_STEP, payload: step }),
    setPersona: (persona) => dispatch({ type: ActionTypes.SET_PERSONA, payload: persona }),
    setDietType: (dietType) => dispatch({ type: ActionTypes.SET_DIET_TYPE, payload: dietType }),
    addDislike: (ingredient) => dispatch({ type: ActionTypes.ADD_DISLIKE, payload: ingredient }),
    removeDislike: (ingredient) => dispatch({ type: ActionTypes.REMOVE_DISLIKE, payload: ingredient }),
    setDislikes: (dislikes) => dispatch({ type: ActionTypes.SET_DISLIKES, payload: dislikes }),
    addPantryItem: (item) => dispatch({ type: ActionTypes.ADD_PANTRY_ITEM, payload: item }),
    removePantryItem: (item) => dispatch({ type: ActionTypes.REMOVE_PANTRY_ITEM, payload: item }),
    setPantryItems: (items) => dispatch({ type: ActionTypes.SET_PANTRY_ITEMS, payload: items }),
    toggleLockedIngredient: (item) => dispatch({ type: ActionTypes.TOGGLE_LOCKED_INGREDIENT, payload: item }),
    setLockedIngredients: (items) => dispatch({ type: ActionTypes.SET_LOCKED_INGREDIENTS, payload: items }),
    updateContextSettings: (settings) => dispatch({ type: ActionTypes.UPDATE_CONTEXT_SETTINGS, payload: settings }),
    updateReminderSettings: (settings) => dispatch({ type: ActionTypes.UPDATE_REMINDER_SETTINGS, payload: settings }),
    setMealPlan: (plan) => dispatch({ type: ActionTypes.SET_MEAL_PLAN, payload: plan }),
    swapMeal: (day, mealType, newMeal) => dispatch({ type: ActionTypes.SWAP_MEAL, payload: { day, mealType, newMeal } }),
    setGroceryList: (list) => dispatch({ type: ActionTypes.SET_GROCERY_LIST, payload: list }),
    setPrepSchedule: (schedule) => dispatch({ type: ActionTypes.SET_PREP_SCHEDULE, payload: schedule }),
    setReminders: (reminders) => dispatch({ type: ActionTypes.SET_REMINDERS, payload: reminders }),
    setCalendarEvents: (events) => dispatch({ type: ActionTypes.SET_CALENDAR_EVENTS, payload: events }),
    setCookingFlow: (flow) => dispatch({ type: ActionTypes.SET_COOKING_FLOW, payload: flow }),
    setBudgetStatus: (status) => dispatch({ type: ActionTypes.SET_BUDGET_STATUS, payload: status }),
    setPersonalizationProof: (proof) => dispatch({ type: ActionTypes.SET_PERSONALIZATION_PROOF, payload: proof }),
    resetState: () => dispatch({ type: ActionTypes.RESET_STATE })
  };
  
  return (
    <MealPlanContext.Provider value={{ state, actions }}>
      {children}
    </MealPlanContext.Provider>
  );
}

// Custom hook to use the context
export function useMealPlan() {
  const context = useContext(MealPlanContext);
  if (!context) {
    throw new Error('useMealPlan must be used within a MealPlanProvider');
  }
  return context;
}

export { ActionTypes };
