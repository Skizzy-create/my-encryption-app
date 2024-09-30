import React, { useState } from 'react';
import Landing from './pages/Landing';
import MainPage from './pages/MainPage';
const App: React.FC = () => {
  const [showLandingPage, setShowLandingPage] = useState(true);

  const handleNavigateToMain = () => {
    setShowLandingPage(false);
  };

  const handleNavigateToLanding = () => {
    setShowLandingPage(true);
  };

  return (
    <div>
      {showLandingPage ? (
        <Landing onNavigateToMain={handleNavigateToMain} />
      ) : (
        <MainPage onNavigateToLanding={handleNavigateToLanding} />
      )}
    </div>
  );
};

export default App;