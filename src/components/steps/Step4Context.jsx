import React from 'react';
import { useMealPlan } from '../../context/MealPlanContext';

const cities = [
  'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 
  'Hyderabad', 'Pune', 'Ahmedabad', 'Other'
];

function Step4Context() {
  const { state, actions } = useMealPlan();
  const { contextSettings } = state;

  const updateSetting = (key, value) => {
    actions.updateContextSettings({ [key]: value });
  };

  const handleContinue = () => {
    actions.setStep(5);
  };

  const handleBack = () => {
    actions.setStep(3);
  };

  return (
    <div className="step-container">
      <div className="step-header">
        <h1 className="step-header__title">Planning details</h1>
        <p className="step-header__subtitle">
          Help us customize your meal plan
        </p>
      </div>

      <div style={{ display: 'grid', gap: 'var(--space-5)' }}>
        
        {/* Duration */}
        <div className="section">
          <div className="form-label">Plan Duration</div>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            {[1, 2, 3].map((days) => (
              <button
                key={days}
                className={`btn ${contextSettings.numberOfDays === days ? 'btn--primary' : 'btn--secondary'}`}
                onClick={() => updateSetting('numberOfDays', days)}
                style={{ flex: 1 }}
              >
                {days} Day{days > 1 ? 's' : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div className="section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
            <span className="form-label" style={{ marginBottom: 0 }}>Daily Budget</span>
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-accent)' }}>
              ₹{contextSettings.budgetPerDay}
            </span>
          </div>
          <input
            type="range"
            className="form-range"
            min="100"
            max="1000"
            step="50"
            value={contextSettings.budgetPerDay}
            onChange={(e) => updateSetting('budgetPerDay', parseInt(e.target.value))}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-1)' }}>
            <span>₹100</span>
            <span>₹1000</span>
          </div>
        </div>

        {/* City */}
        <div className="section">
          <div className="form-label">Your City</div>
          <select
            className="form-input form-select"
            value={contextSettings.city}
            onChange={(e) => updateSetting('city', e.target.value)}
          >
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Energy */}
        <div className="section">
          <div className="form-label">Energy for Cooking</div>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            {['low', 'medium', 'high'].map((level) => (
              <button
                key={level}
                className={`btn ${contextSettings.energyLevel === level ? 'btn--primary' : 'btn--secondary'}`}
                onClick={() => updateSetting('energyLevel', level)}
                style={{ flex: 1, textTransform: 'capitalize' }}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Time */}
        <div className="section">
          <div className="form-label">Cooking Time Available</div>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            {[
              { id: '15-30', label: '15-30 mins' },
              { id: '30-60', label: '30-60 mins' },
              { id: '60-90', label: '60+ mins' }
            ].map((time) => (
              <button
                key={time.id}
                className={`btn btn--sm ${contextSettings.cookingTimeWindow === time.id ? 'btn--primary' : 'btn--secondary'}`}
                onClick={() => updateSetting('cookingTimeWindow', time.id)}
              >
                {time.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      <div className="btn-group">
        <button className="btn btn--secondary" onClick={handleBack}>Back</button>
        <button className="btn btn--primary" onClick={handleContinue}>Continue</button>
      </div>
    </div>
  );
}

export default Step4Context;
