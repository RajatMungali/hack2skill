import React from 'react';

const steps = [
  { number: 1, label: 'Persona' },
  { number: 2, label: 'Diet' },
  { number: 3, label: 'Pantry' },
  { number: 4, label: 'Context' },
  { number: 5, label: 'Reminders' },
  { number: 6, label: 'Plan' }
];

function ProgressBar({ currentStep }) {
  return (
    <div className="progress-bar">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div 
            className={`progress-step ${
              currentStep === step.number ? 'progress-step--active' : ''
            } ${
              currentStep > step.number ? 'progress-step--completed' : ''
            }`}
          >
            <div className="progress-step__circle">
              {currentStep > step.number ? '✓' : step.number}
            </div>
            <span className="progress-step__label">{step.label}</span>
          </div>
          
          {index < steps.length - 1 && (
            <div 
              className={`progress-connector ${
                currentStep > step.number ? 'progress-connector--active' : ''
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default ProgressBar;
