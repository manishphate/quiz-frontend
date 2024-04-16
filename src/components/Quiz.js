import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { Load_Question } from '../Redux/Action';
import axios from 'axios';

const Quiz = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { questionContainer } = useSelector((state) => state.cartReducer);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questions = questionContainer.data;

   
  React.useEffect(() => {

      async function checkUserValidity () {
          try {
              //  await axios.get(`${process.env.REACT_APP_BACKEND_URI}/current-user`, {
              //     withCredentials: true
              // });

              dispatch(Load_Question(level));

          } catch (error) {
              // navigate('/');
          }
      }
      checkUserValidity ();
  }, [dispatch,navigate,level])


  const [isNextButton, setIsNextButton] = useState(false);
  const [isResultButton, setIsResultButton] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [time, setTime] = useState(30);
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [isResult, setIsResult] = useState(false);

  const selectAnswer = (index) => {
    if (currentQuestion === questions.length - 1) {
      setIsNextButton(false);
      setIsResultButton(true);
    } else {
      setIsNextButton(true);
    }
    setSelectedIndex(index);
  };

  const nextQuestion = (index) => {
    if (currentQuestion >= questions.length - 1) {
      addAnswer(index);
      setCurrentQuestion(0);
      setIsResult(true);
    } else {
      setTime(30);
      setIsNextButton(false);
      addAnswer(index);
      setCurrentQuestion(currentQuestion + 1);
      setSelectedIndex();
    }
  };

  const addAnswer = (index) => {
    const selectedAnswer =
      index !== null
        ? questions[currentQuestion].answers[index]
        : {
            answer: "Time's Up",
            trueAnswer: false,
          };
    const newAnswers = [...selectedAnswers, selectedAnswer];
    setSelectedAnswers(newAnswers);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(time - 1);
    }, 1000);
    time <= 5 ? setIsErrorMessage(true) : setIsErrorMessage(false);
    if (time < 0) {
      nextQuestion(null);
    }
    return () => clearInterval(timer);
  }, [time]);

  if (!questions) {
    return navigate('/home');
  }

  return isResult ? (
    navigate("/result", {
      state: {
        answers: selectedAnswers,
        questions: questions,
      },
    })
  ) : (
    <>
    <div className="m-4">
      <div className="progress-box">
        <div className="progress-top">
          <div className="progress-texts">
            <h2 className="progress-title">Quiz Progress</h2>
            <p className="progress-description">
              You are solving {level} Level words quiz
            </p>
          </div>
          <div className="progress-icon">
            <i className="bi bi-bar-chart"></i>
          </div>
        </div>
        <div className="progress-bottom">
          <div
            className="progress-circle"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{
              "--value":
                ((currentQuestion + 1) / questions.length) * 100,
            }}
          >
            <span className="progress-big">{currentQuestion + 1}</span>
            <span className="progress-mini">/{questions.length}</span>
          </div>
          <p className="progress-detail">
            You solve the {currentQuestion + 1}. question out of a total of{" "}
            {questions.length} questions
          </p>
        </div>
      </div>
      <div className="question-box">
        <div className="question-text">
          <h2 className="question-title">Question: {currentQuestion + 1}</h2>
          <h3 className="question">
            {questions[currentQuestion].question}
          </h3>
        </div>
        <div
          className="progress-circle time"
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ "--value": (time / 30) * 100 }}
        >
          <span className="time">{time}</span>
        </div>
      </div>

      <div className="answers-boxes">
        {questions[currentQuestion].answers.map((answer, index) => {
          return (
            <label
              onClick={() => selectAnswer(index)}
              key={index}
              htmlFor={index}
              className={
                selectedIndex === index
                  ? "answer-label selected"
                  : "answer-label"
              }
            >
              {answer.answer}
              <input type="radio" name="answer" id={index} />
            </label>
          );
        })}
      </div>

      {isNextButton ? (
        <div className="next">
          <button
            onClick={() => nextQuestion(selectedIndex)}
            type="button"
            className="next-btn"
          >
            Next Question
            <div className="icon">
              <i className="bi bi-arrow-right"></i>
            </div>
          </button>
        </div>
      ) : null}

      {isResultButton ? (
        <div className="next">
          <button
            onClick={() => nextQuestion(selectedIndex)}
            type="button"
            className="next-btn result-btn"
          >
            See Results
            <div className="icon">
              <i className="bi bi-bar-chart"></i>
            </div>
          </button>
        </div>
      ) : null}

      {isErrorMessage ? (
        <div className="message animation">
          <div className="icon">
            <i className="bi bi-exclamation-triangle"></i>
          </div>
          <span>You must hurry up!</span>
        </div>
      ) : null}
    </div>
    </>
  );
}

export default Quiz;
