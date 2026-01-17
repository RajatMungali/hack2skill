import React, { useState } from 'react';
import { useMealPlan } from '../../context/MealPlanContext';
import { getIngredientSuggestions } from '../../data/ingredients';

const dietOptions = [
  { id: 'veg', icon: '🥬', title: 'Vegetarian' },
  { id: 'non-veg', icon: '🍗', title: 'Non-Vegetarian' },
  { id: 'no-preference', icon: '🍽️', title: 'No Preference' }
];

function Step2Dietary() {
  const { state, actions } = useMealPlan();
  const { dietType, dislikes } = state;
  
  const [dislikeInput, setDislikeInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleDietSelect = (diet) => {
    actions.setDietType(diet);
  };

  const handleDislikeInputChange = (e) => {
    const value = e.target.value;
    setDislikeInput(value);
    setSuggestions(value.length >= 1 ? getIngredientSuggestions(value) : []);
  };

  const handleAddDislike = (ingredient) => {
    actions.addDislike(ingredient);
    setDislikeInput('');
    setSuggestions([]);
  };

  const handleRemoveDislike = (ingredient) => {
    actions.removeDislike(ingredient);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && dislikeInput.trim()) {
      handleAddDislike(dislikeInput.trim());
    }
  };

  const handleContinue = () => {
    if (dietType) {
      actions.setStep(3);
    }
  };

  const handleBack = () => {
    actions.setStep(1);
  };

  return (
    <div className="step-container">
      <div className="step-header">
        <h1 className="step-header__title">Dietary Preferences</h1>
        <p className="step-header__subtitle">
          Select your diet type and any ingredients to avoid
        </p>
      </div>

      {/* Diet Type */}
      <div className="section">
        <div className="form-label">Diet Type</div>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          {dietOptions.map((diet) => (
            <div
              key={diet.id}
              className={`card card--selectable ${dietType === diet.id ? 'card--selected' : ''}`}
              onClick={() => handleDietSelect(diet.id)}
              style={{ flex: 1, padding: 'var(--space-4)', textAlign: 'center' }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: 'var(--space-2)' }}>{diet.icon}</div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>{diet.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Dislikes */}
      <div className="section">
        <div className="form-label">Ingredients to Avoid</div>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-3)' }}>
          These will never appear in your meal plan
        </p>

        <div className="autocomplete">
          <input
            type="text"
            className="form-input"
            placeholder="Type to search..."
            value={dislikeInput}
            onChange={handleDislikeInputChange}
            onKeyDown={handleKeyDown}
          />
          
          {suggestions.length > 0 && (
            <div className="autocomplete__dropdown">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion}
                  className="autocomplete__item"
                  onClick={() => handleAddDislike(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>

        {dislikes.length > 0 && (
          <div className="tags-container">
            {dislikes.map((dislike) => (
              <span key={dislike} className="tag tag--selected">
                {dislike}
                <span className="tag__remove" onClick={() => handleRemoveDislike(dislike)}>×</span>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="btn-group">
        <button className="btn btn--secondary" onClick={handleBack}>Back</button>
        <button className="btn btn--primary" onClick={handleContinue} disabled={!dietType}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default Step2Dietary;
