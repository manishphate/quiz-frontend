import React, { useState } from 'react';
import EnterAnswer from './EnterAnswer'; // Import the modified EnterAnswer component
import axios from "axios"

const CreateQuestions = () => {
  const initQuestion = {
    question: "",
    answers: [{ answer: "", isCorrect: false }, { answer: "", isCorrect: false }, { answer: "", isCorrect: false }, { answer: "", isCorrect: false }],
    selectedCategory:""
  };

  const [question, setQuestion] = useState(initQuestion);
 
  
  const handleCategoryChange = (e) => {
    setQuestion({ ...question, selectedCategory: e.target.value });
  };

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...question.answers];
    updatedAnswers[index].answer = value;
    setQuestion({ ...question, answers: updatedAnswers });
  };

  const handleIsCorrectChange = (index) => {
    const updatedAnswers = [...question.answers];
    updatedAnswers[index].isCorrect = !updatedAnswers[index].isCorrect;
    setQuestion({ ...question, answers: updatedAnswers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your axios request here to submit the question with answers

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URI}/create-question`, question, {
        withCredentials: true
      });

      alert("Submitted")
      window.location.reload();

    } catch (error) {
      console.error("Error:", error);

    }
  };

  return (
    <>
      <div className="container mx-auto mt-4">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-4">Create Question</h2>
          <form onSubmit={handleSubmit}>

          <div className='mb-4'>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                Select Category
              </label>
              <select
                id="category"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={question.selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">Select a category</option>
                {/* <option value="Javascript">JavaScript</option> */}
                <option value="Java">Java</option>
                <option value="Python">Python</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="question">
                Question
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="question"
                type="text"
                placeholder="Enter your question"
                value={question.question}
                onChange={(e) => setQuestion({ ...question, question: e.target.value })}
              />
            </div>
            {question.answers.map((answer, index) => (
              <EnterAnswer
                key={index}
                answer={answer.answer}
                isCorrect={answer.isCorrect}
                setAnswer={(value) => handleAnswerChange(index, value)}
                setIsCorrect={() => handleIsCorrectChange(index)}
              />
            ))}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateQuestions;
