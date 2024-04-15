import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../assets/css/home.css'
import '../assets/css/style.css'
import { useDispatch } from 'react-redux';
import { Load_Question } from "../Redux/Action";



const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleStartQuiz = async (subject) => {
      await dispatch(Load_Question(subject));
      navigate(`/quiz/${subject}`);

  }

  return (
    <>
    
      <div className="home">
        <div className="intro-box">
          <div className="intro-texts">
            <h1 className="intro-title">Programming Languages Quizzes</h1>
            <p className="intro-description">Choose the quiz you want to solve</p>
          </div>
          <div className="intro-icon">
            <i className="bi bi-question-circle"></i>
          </div>
        </div>

        <div className="level-boxes">
          <div className="level-box">
            <div className="level-text">
              <h2 className="level-name">Java</h2>
              {/* <span>Level</span> */}
            </div>
            <button className="level-link" onClick={() => handleStartQuiz("Java")}>
              <span>Start Quiz</span> <i className="bi bi-arrow-right"></i>
            </button>
          </div>
          <div className="level-box">
            <div className="level-text">
              <h2 className="level-name">Python</h2>
              {/* <span>Level</span> */}
            </div>
            <button className="level-link" onClick={() => handleStartQuiz("Python")}>
              <span>Start Quiz</span> <i className="bi bi-arrow-right"></i>
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default Home;
