import React from 'react';

const EnterAnswer = ({ answer, setAnswer, isCorrect, setIsCorrect }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'answer') {
      setAnswer(value);
    } else if (name === 'isCorrect') {
      setIsCorrect(!isCorrect); // Toggle the value of isCorrect
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="answer">
        Answer
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="answer"
        name="answer"
        type="text"
        placeholder="Enter your answer"
        value={answer}
        onChange={handleInputChange}
      />
      <label className="block text-gray-700 text-sm font-bold mt-2">
        Choose Correct Answer
        <input
          type="checkbox"
          name="isCorrect"
          checked={isCorrect}
          onChange={handleInputChange}
          className="ml-2"
        />
      </label>
    </div>
  );
};

export default EnterAnswer;
