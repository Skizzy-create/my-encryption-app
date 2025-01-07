import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignupPage from './pages/Signup';
import SignInPage from './pages/SignIn';
import Landing from "./pages/Landing";
import Trial from "./pages/Trial";
import MainPage2 from "./pages/MainPage2";

const App: React.FC = () => {
  return (
    <div className="bg-pink-100 min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/MainPage" element={<MainPage2 />} />
          <Route path="/SignUp" element={<SignupPage />} />
          <Route path="/SignIn" element={<SignInPage />} />
          <Route path="/trial" element={<Trial />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
