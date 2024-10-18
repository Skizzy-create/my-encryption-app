import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState } from 'react';
import Landing from './pages/Landing';
import MainPage from './pages/MainPage';
import SignupPage from './pages/Signup';
import SignInPage from './pages/SignIn';

const App: React.FC = () => {
  const [showLandingPage, setShowLandingPage] = useState(true);

  const handleNavigateToMain = () => {
    setShowLandingPage(false);
  };

  const handleNavigateToLanding = () => {
    setShowLandingPage(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            showLandingPage ?
              <Landing onNavigateToMain={handleNavigateToMain} /> :
              <MainPage onNavigateToLanding={handleNavigateToLanding} />
          }
        />
        <Route path="/SignUp" element={<SignupPage />} />
        <Route path="/SignIn" element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
