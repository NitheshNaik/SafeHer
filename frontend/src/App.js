import { Route, Routes } from "react-router-dom";
import Login from "./landingPage/loginPage/Login";
import Signup from "./landingPage/signupPage/Signup";
import Home from "./landingPage/home/HomePage";

import Navbar from './landingPage/Navbar';
import ServicesPage from './landingPage/servicesPage/ServicePage';
import AboutPage from './landingPage/aboutPage/AboutPage';
import Footer from './landingPage/Footer';
import NotFound from './landingPage/NotFound';
import BMIpage from './landingPage/BMIpage/BMIpage';
import SafetyPage from './landingPage/safetyPage/SafetyPage';
import CancerPage from './landingPage/cancerPage/CancerPage';
import LegalPage from './landingPage/legalPage/LegalPage';
// import LoginPage from './landingPage/loginPage/Login';
import ForgotPasswordPage from './landingPage/forgetPass/ForgetPassPage';
import ContactPage from './landingPage/contactPage/ContactPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/" element={<HomePage/>} /> */}
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/bmi" element={<BMIpage />} />
        <Route path="/safety" element={<SafetyPage />} />
        <Route path="/cancer" element={<CancerPage />} />
        <Route path="/legal" element={<LegalPage />} />
        {/* <Route path="/signup" element={<Signup/>} />
      <Route path="/login" element={<LoginPage/>} /> */}
        <Route path="/forgot" element={<ForgotPasswordPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
