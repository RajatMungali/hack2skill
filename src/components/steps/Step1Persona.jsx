import React from 'react';
import { useMealPlan } from '../../context/MealPlanContext';

const personas = [
  {
    id: 'working-professional',
    icon: '💼',
    title: 'Working Professional',
    description: 'Busy schedule, quick and efficient meals'
  },
  {
    id: 'student',
    icon: '📚',
    title: 'Student',
    description: 'Budget-conscious, simple recipes'
  },
  {
    id: 'household',
    icon: '🏠',
    title: 'Household / Family',
    description: 'Planning for multiple people'
  }
];

function Step1Persona() {
  const { state, actions } = useMealPlan();
  const { persona } = state;

  const handleSelect = (personaId) => {
    actions.setPersona(personaId);
  };

  const handleContinue = () => {
    if (persona) {
      actions.setStep(2);
    }
  };

  return (
    <div className="step-container">
      <div className="step-header">
        <h1 className="step-header__title">Let's plan your meals</h1>
        <p className="step-header__subtitle">
          Tell us a bit about how you live
        </p>
      </div>

      <div className="card-grid">
        {personas.map((p) => (
          <div
            key={p.id}
            className={`card card--selectable ${persona === p.id ? 'card--selected' : ''}`}
            onClick={() => handleSelect(p.id)}
          >
            <div className="card__icon">{p.icon}</div>
            <h3 className="card__title">{p.title}</h3>
            <p className="card__description">{p.description}</p>
          </div>
        ))}
      </div>

      <div className="btn-group">
        <button
          className="btn btn--primary btn--lg"
          onClick={handleContinue}
          disabled={!persona}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default Step1Persona;
