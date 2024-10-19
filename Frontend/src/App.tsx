import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupPage from './pages/Signup';
import SignInPage from './pages/SignIn';
import Landing from "./pages/Landing";
import MainPage from "./pages/MainPage";
import Trial from "./pages/Trial";
import MainPage2 from "./components/MainPage2";

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/MainPage" element={<MainPage2 />} />
        <Route path="/SignUp" element={<SignupPage />} />
        <Route path="/SignIn" element={<SignInPage />} />
        <Route path="/trial" element={<Trial />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
