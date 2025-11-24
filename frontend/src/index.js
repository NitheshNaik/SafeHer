import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import Footer from './landingPage/Footer';
import App from './App';


export {default as Login} from './landingPage/loginPage/Login'
export {default as Signup} from './landingPage/signupPage/Signup'
export {default as Home} from './landingPage/home/HomePage'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <CookiesProvider>
    <App/>
    <Footer/>
    </CookiesProvider>
  </BrowserRouter>
);


