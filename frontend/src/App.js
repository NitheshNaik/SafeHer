import { Route, Routes } from "react-router-dom";
import Login from "./landingPage/loginPage/Login";
import Signup from "./landingPage/signupPage/Signup";
import Home from "./landingPage/home/HomePage";
import ServicesPage from './landingPage/servicesPage/ServicePage';
import AboutPage from './landingPage/aboutPage/AboutPage';
import NotFound from './landingPage/NotFound';
import BMIpage from './landingPage/BMIpage/BMIpage';
import SafetyPage from './landingPage/safetyPage/SafetyPage';
// import CancerPage from './landingPage/cancerPage/CancerPage';
import LegalPage from './landingPage/legalPage/LegalPage';
import ForgotPasswordPage from './landingPage/forgetPass/ForgetPassPage';
import ContactPage from './landingPage/contactPage/ContactPage';
import BreastScanUpload from "./landingPage/cancerPage/BreastCancerUpload";
import Chatbot from "./landingPage/chatBot/Chatbot";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/bmi" element={<BMIpage />} />
        <Route path="/safety" element={<SafetyPage />} />
        <Route path="/cancer" element={<BreastScanUpload />} />
        <Route path="/legal" element={<LegalPage />} />
        <Route path="/forgot" element={<ForgotPasswordPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
