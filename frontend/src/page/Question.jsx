import "./question.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";

export default function Create() {
  const navigate = useNavigate();
  const { quizId } = useParams(); 
  const [questionBlocks, setQuestionBlocks] = useState([
    { 
      question: "", 
      answers: ["", "", "", ""],
      correctAnswers: [] 
    },
  ]);
  const [quizDetails, setQuizDetails] = useState(null);

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/quiz/${quizId}`);
        setQuizDetails(response.data);
      } catch (error) {
        console.error("Error fetching quiz details:", error);
        alert("Failed to load quiz details");
      }
    };

    if (quizId) {
      fetchQuizDetails();
    }
  }, [quizId]);

  const handleQuestionChange = (index, value) => {
    const updatedBlocks = [...questionBlocks];
    updatedBlocks[index].question = value;
    setQuestionBlocks(updatedBlocks);
  };

  const handleAnswerChange = (questionIndex, answerIndex, value) => {
    const updatedBlocks = [...questionBlocks];
    updatedBlocks[questionIndex].answers[answerIndex] = value;
    setQuestionBlocks(updatedBlocks);
  };

  const handleCorrectAnswerChange = (questionIndex, answerIndex) => {
    const updatedBlocks = [...questionBlocks];
    const currentQuestion = updatedBlocks[questionIndex];
    
    if (currentQuestion.correctAnswers.includes(answerIndex)) {
      currentQuestion.correctAnswers = currentQuestion.correctAnswers.filter(
        i => i !== answerIndex
      );
    } else {
      currentQuestion.correctAnswers = [...currentQuestion.correctAnswers, answerIndex];
    }
    
    setQuestionBlocks(updatedBlocks);
  };

  const addQuestionBlock = () => {
    setQuestionBlocks([
      ...questionBlocks,
      { 
        question: "", 
        answers: ["", "", "", ""],
        correctAnswers: []
      },
    ]);
  };

  const handleFinish = async () => {
    try {
    
      for (const [qIndex, block] of questionBlocks.entries()) {
        if (!block.question.trim()) {
          alert(`Question ${qIndex + 1} cannot be empty`);
          return;
        }

        if (block.correctAnswers.length === 0) {
          alert(`Please select at least one correct answer for Question ${qIndex + 1}`);
          return;
        }

        for (const [aIndex, answer] of block.answers.entries()) {
          if (!answer.trim()) {
            alert(`Answer ${aIndex + 1} in Question ${qIndex + 1} cannot be empty`);
            return;
          }
        }
      }
      
      for (const block of questionBlocks) {
        const questionResponse = await axios.post("http://localhost:4000/api/question", {
          text: block.question,
          quizId: quizId
        });
        
        const questionId = questionResponse.data._id;

        for (const [index, answer] of block.answers.entries()) {
          await axios.post("http://localhost:4000/api/option", {
            text: answer,
            isCorrect: block.correctAnswers.includes(index),
            questionId: questionId
          });
        }
        navigate('/quiz');
      }

      alert("Questions and answers saved successfully!");
      setQuestionBlocks([{ question: "", answers: ["", "", "", ""], correctAnswers: [] }]);
    } catch (error) {
      console.error("Error saving questions:", error);
      alert("Failed to save questions. Please try again.");
    }
  };
  const removeQuestionBlock = (index) => {
  const updatedBlocks = [...questionBlocks];
  updatedBlocks.splice(index, 1);
  setQuestionBlocks(updatedBlocks);
};


  return (
    <div className="question-container">
      <h1>Create Questions</h1>
      
      {quizDetails && (
        <div className="quiz-info">
          <h2>For Quiz: {quizDetails.title}</h2>
          <p>{quizDetails.description}</p>
        </div>
      )}

      {questionBlocks.map((block, index) => (
        <div key={index} className="popup-overlay">
          <div className="popup">
           <div className="question-header">
  <h3>Question {index + 1}</h3>
 
</div>

            <form className="popup-form" onSubmit={(e) => e.preventDefault()}>
              <label>Question</label>
              <br />
              <textarea
                placeholder="Question content"
                className="question-textarea"
                value={block.question}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
              />
              <br />
              <br />
              <label>Answers (check all correct answers)</label>
              <br />

              {block.answers.map((answer, aIndex) => (
                <div className="checkbox-container" key={aIndex}>
                  <label className="container-box">
                    <input 
                      type="checkbox"
                      checked={block.correctAnswers.includes(aIndex)}
                      onChange={() => handleCorrectAnswerChange(index, aIndex)}
                    />
                    <div className="checkmark"></div>
                  </label>
                  <input
                    type="text"
                    placeholder={`Answer ${aIndex + 1}`}
                    className="question-input"
                    value={answer}
                    onChange={(e) =>
                      handleAnswerChange(index, aIndex, e.target.value)
                    }
                  />
                  <br />
                  
                </div>
                
              ))}
            </form>
             {questionBlocks.length > 1 && (
    <button 
      type="button" 
      className="btn-remove" 
      onClick={() => removeQuestionBlock(index)}
    >
      Remove
    </button>
  )}
          </div>
        </div>
      ))}

      <br />
      <button className="btn-modifier" onClick={addQuestionBlock}>
        Add Another Question
      </button>

      <button className="btn-modifier" onClick={handleFinish}>
        Finish
      </button>
    </div>
  );
}