import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import './bootstrap-override.scss';
import reportWebVitals from './reportWebVitals';
//import UserSignUpPage from './pages/UserSignUpPage';
import UserLoginPage from './pages/UserLoginPage';

ReactDOM.render(
  <React.StrictMode>
    <UserLoginPage />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();