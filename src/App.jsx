import React from 'react';
import { MealPlanProvider, useMealPlan } from './context/MealPlanContext';
import ProgressBar from './components/ProgressBar';
import Step1Persona from './components/steps/Step1Persona';
import Step2Dietary from './components/steps/Step2Dietary';
import Step3Pantry from './components/steps/Step3Pantry';
import Step4Context from './components/steps/Step4Context';
import Step5Reminders from './components/steps/Step5Reminders';
import Step6MealPlan from './components/steps/Step6MealPlan';

function AppContent() {
  const { state } = useMealPlan();
  const { currentStep } = state;

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1Persona />;
      case 2: return <Step2Dietary />;
      case 3: return <Step3Pantry />;
      case 4: return <Step4Context />;
      case 5: return <Step5Reminders />;
      case 6: return <Step6MealPlan />;
      default: return <Step1Persona />;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__inner">
          <div className="app-logo">
            <div className="app-logo__icon">📋</div>
            <span className="app-logo__text">Meal Planner</span>
          </div>
        </div>
      </header>

      <main className="app-main">
        {currentStep < 6 && <ProgressBar currentStep={currentStep} />}
        {renderStep()}
      </main>

      <footer style={{ 
        textAlign: 'center', 
        padding: 'var(--space-4)', 
        borderTop: '1px solid var(--color-border)',
        color: 'var(--color-text-muted)',
        fontSize: 'var(--text-xs)'
      }}>
        AI-Powered Meal Planning Assistant
      </footer>
    </div>
  );
}

function App() {
  return (
    <MealPlanProvider>
      <AppContent />
    </MealPlanProvider>
  );
}

export default App;
