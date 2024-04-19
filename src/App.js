import './App.css';
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from './Authentication/SignUp';
import SignIn from './Authentication/SignIn';
import Dashboard from './Dashboard/Dashboard';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Home from './components/Home';
import { Provider } from "react-redux";
import store from "./Redux/Store";
import "./assets/css/style.css";
import "./assets/css/result.css";
import "./assets/css/home.css";
import "./assets/css/quiz.css";
import CreateQuestions from './components/CreateQuestions';
import ContinueUI from './Authentication/Continue';
import Auth from './Authentication/Auth';
import ForgotPassword from './Authentication/ForgotPassword';
import ResetPassword from './Authentication/ResetPassword';
import HomeDashboard from './Dashboard/HomeDashboard';





const App = () => {

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Auth />} />
            <Route exact path='/signin' element={<HomeDashboard />} />
            <Route exact path='/sign-in' element={<SignIn />} />
            <Route path='/signUp' element={<SignUp />} />
            <Route path='/continue' element={<ContinueUI />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password/:id/:token' element={<ResetPassword />} />
            <Route exact path='/home-dashboard' element={<HomeDashboard />} />




            <Route path='/dashboard' element={<Dashboard />} />
            <Route path="/home" element={<Home />} />
            <Route path="/quiz/:level" element={<Quiz />} />
            <Route path="/result" element={<Result />} />

            <Route path="/create-question" element={<CreateQuestions />} />

          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
