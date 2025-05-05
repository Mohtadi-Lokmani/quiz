import "./question.css";
import { useState } from "react";
import React from "react";

export default function Create() {
  const [questionBlocks, setQuestionBlocks] = useState([
    { question: "", answers: ["", "", "", ""] },
  ]);

  const addQuestionBlock = () => {
    setQuestionBlocks([
      ...questionBlocks,
      { question: "", answers: ["", "", "", ""] },
    ]);
  };

  const handleFinish = () => {
    console.log("Submitted Questions:", questionBlocks);
    // You can send questionBlocks to your backend here
  };

  const handleQuestionChange = (index, value) => {
    const updated = [...questionBlocks];
    updated[index].question = value;
    setQuestionBlocks(updated);
  };

  const handleAnswerChange = (qIndex, aIndex, value) => {
    const updated = [...questionBlocks];
    updated[qIndex].answers[aIndex] = value;
    setQuestionBlocks(updated);
  };

  const handleCheckboxChange = (qIndex, aIndex) => {
    const updated = [...questionBlocks];
    updated[qIndex].answers[aIndex] = !updated[qIndex].answers[aIndex];
    setQuestionBlocks(updated);
  };
  return (
    <>
      <div className="question-container">
        <h1>Créer des Questions</h1>

        {questionBlocks.map((block, index) => (
          <div key={index} className="popup-overlay">
            <div className="popup">
              <h3>Question {index + 1}</h3>
              <form className="popup-form" onSubmit={(e) => e.preventDefault()}>
                <label>Question</label>
                <br />
                <textarea
                  placeholder="Contenu de la question"
                  className="question-textarea"
                  value={block.question}
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                />
                <br />
                <br />
                <label>Réponses</label>
                <br />

                {block.answers.map((answer, aIndex) => (
                  <div className="checkbox-container" key={aIndex}>
                    <label class="container-box">
                      <input type="checkbox" />
                      <div class="checkmark"></div>
                    </label>
                    <input
                      key={aIndex}
                      type="text"
                      placeholder={`Réponse ${aIndex + 1}`}
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
            </div>
          </div>
        ))}

        <br />
        <button className="btn-modifier" onClick={addQuestionBlock}>
          Add Other Question
        </button>

        <button className="btn-modifier" onClick={handleFinish}>
          Finish
        </button>
      </div>
    </>
  );
}
