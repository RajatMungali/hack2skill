import React, { useState } from 'react';
import { useMealPlan } from '../../context/MealPlanContext';
import { getIngredientSuggestions } from '../../data/ingredients';

function Step3Pantry() {
  const { state, actions } = useMealPlan();
  const { pantryItems, lockedIngredients, dislikes } = state;
  
  const [pantryInput, setPantryInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setPantryInput(value);
    
    if (value.length >= 1) {
      const allSuggestions = getIngredientSuggestions(value);
      const filtered = allSuggestions.filter(s => 
        !pantryItems.includes(s) && !dislikes.includes(s)
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleAddItem = (item) => {
    actions.addPantryItem(item);
    setPantryInput('');
    setSuggestions([]);
    
    if (lockedIngredients.length < 3 && !lockedIngredients.includes(item)) {
      actions.toggleLockedIngredient(item);
    }
  };

  const handleRemoveItem = (item) => {
    actions.removePantryItem(item);
  };

  const handleToggleLock = (item) => {
    actions.toggleLockedIngredient(item);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && pantryInput.trim()) {
      handleAddItem(pantryInput.trim());
    }
  };

  const handleContinue = () => {
    if (pantryItems.length >= 5 && lockedIngredients.length >= 3) {
      actions.setStep(4);
    }
  };

  const handleBack = () => {
    actions.setStep(2);
  };

  const canContinue = pantryItems.length >= 5 && lockedIngredients.length >= 3;

  return (
    <div className="step-container">
      <div className="step-header">
        <h1 className="step-header__title">What's in your pantry?</h1>
        <p className="step-header__subtitle">
          Add at least 5 ingredients. We'll use at least 3 of them.
        </p>
      </div>

      {/* Progress */}
      <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', marginBottom: 'var(--space-6)' }}>
        <span className={`status-badge ${pantryItems.length >= 5 ? 'status-badge--success' : 'status-badge--warning'}`}>
          {pantryItems.length}/5 added
        </span>
        <span className={`status-badge ${lockedIngredients.length >= 3 ? 'status-badge--success' : 'status-badge--warning'}`}>
          {lockedIngredients.length}/3 locked
        </span>
      </div>

      {/* Input */}
      <div className="section">
        <div className="form-label">Add Ingredients</div>
        <div className="autocomplete">
          <input
            type="text"
            className="form-input"
            placeholder="Type ingredient name..."
            value={pantryInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          
          {suggestions.length > 0 && (
            <div className="autocomplete__dropdown">
              {suggestions.map((suggestion) => (
                <div key={suggestion} className="autocomplete__item" onClick={() => handleAddItem(suggestion)}>
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>

        {pantryItems.length > 0 && (
          <>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-3)' }}>
              Click to lock/unlock. Locked items will be used in meals.
            </p>
            <div className="tags-container">
              {pantryItems.map((item) => {
                const isLocked = lockedIngredients.includes(item);
                return (
                  <span 
                    key={item} 
                    className={`tag ${isLocked ? 'tag--locked' : ''}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleToggleLock(item)}
                  >
                    {isLocked && '🔒 '}{item}
                    <span className="tag__remove" onClick={(e) => { e.stopPropagation(); handleRemoveItem(item); }}>×</span>
                  </span>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Locked summary */}
      {lockedIngredients.length > 0 && (
        <div style={{ 
          padding: 'var(--space-3) var(--space-4)',
          background: 'var(--color-success-light)',
          borderRadius: 'var(--radius-md)',
          fontSize: 'var(--text-sm)',
          color: 'var(--color-text-secondary)'
        }}>
          🔒 Ingredient lock: {lockedIngredients.join(', ')}
        </div>
      )}

      <div className="btn-group">
        <button className="btn btn--secondary" onClick={handleBack}>Back</button>
        <button className="btn btn--primary" onClick={handleContinue} disabled={!canContinue}>
          {canContinue ? 'Continue' : `Need ${Math.max(0, 5 - pantryItems.length)} more`}
        </button>
      </div>
    </div>
  );
}

export default Step3Pantry;
