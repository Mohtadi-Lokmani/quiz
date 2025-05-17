import "./question.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ModifyQuestion() {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [quizDetails, setQuizDetails] = useState(null);

  // State for adding new questions in bulk
  const [questionBlocks, setQuestionBlocks] = useState([
    { question: "", answers: ["", "", "", ""], correctAnswers: [] }
  ]);

  useEffect(() => {
    const fetchQuizAndQuestions = async () => {
      try {
        const quizRes = await axios.get(`http://localhost:4000/api/quiz/${quizId}`);
        setQuizDetails(quizRes.data);

        const questionRes = await axios.get(`http://localhost:4000/api/question?quizId=${quizId}`);
        setQuestions(
          questionRes.data.map((q) => ({
            _id: q._id,
            text: q.text,
            options: q.options.map((opt) => ({
              _id: opt._id,
              text: opt.text,
              isCorrect: opt.isCorrect,
            })),
          }))
        );
      } catch (error) {
        console.error("Error loading quiz or questions:", error);
        alert("Failed to load quiz or questions.");
      }
    };

    if (quizId) {
      fetchQuizAndQuestions();
    }
  }, [quizId]);

  // Handlers for modifying existing questions
  const handleQuestionChange = (index, value) => {
    const updated = [...questions];
    updated[index].text = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex].text = value;
    setQuestions(updated);
  };

  const handleCorrectToggle = (qIndex, oIndex) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex].isCorrect = !updated[qIndex].options[oIndex].isCorrect;
    setQuestions(updated);
  };

  // Update a single question and its options
  const updateQuestion = async (index) => {
    const q = questions[index];

    // Validate question text
    if (!q.text.trim()) {
      alert(`Question ${index + 1} cannot be empty.`);
      return;
    }

    // Validate that at least one correct answer is selected
    const hasCorrect = q.options.some(opt => opt.isCorrect);
    if (!hasCorrect) {
      alert(`Please select at least one correct answer for Question ${index + 1}.`);
      return;
    }

    // Validate all answers are not empty
    for (const [aIndex, option] of q.options.entries()) {
      if (!option.text.trim()) {
        alert(`Answer ${aIndex + 1} in Question ${index + 1} cannot be empty.`);
        return;
      }
    }

    try {
      await axios.put(`http://localhost:4000/api/question/${q._id}`, { text: q.text });
      for (const option of q.options) {
        await axios.put(`http://localhost:4000/api/option/${option._id}`, {
          text: option.text,
          isCorrect: option.isCorrect,
        });
      }

      alert("Question updated successfully.");
    } catch (err) {
      console.error("Error updating question:", err);
      alert("Failed to update question.");
    }
  };

  // Delete a question
  const deleteQuestion = async (index) => {
    const q = questions[index];
    if (!window.confirm("Are you sure you want to delete this question?")) return;

    try {
      await axios.delete(`http://localhost:4000/api/question/${q._id}`);
      setQuestions(prev => prev.filter((_, i) => i !== index));
      alert("Question deleted successfully.");
    } catch (err) {
      console.error("Error deleting question:", err);
      alert("Failed to delete question.");
    }
  };

  // Handlers for new question blocks
  const handleNewQuestionChange = (index, value) => {
    const updated = [...questionBlocks];
    updated[index].question = value;
    setQuestionBlocks(updated);
  };

  const handleNewAnswerChange = (qIndex, aIndex, value) => {
    const updated = [...questionBlocks];
    updated[qIndex].answers[aIndex] = value;
    setQuestionBlocks(updated);
  };

  const toggleCorrectAnswer = (qIndex, aIndex) => {
    const updated = [...questionBlocks];
    const correct = updated[qIndex].correctAnswers;
    updated[qIndex].correctAnswers = correct.includes(aIndex)
      ? correct.filter(i => i !== aIndex)
      : [...correct, aIndex];
    setQuestionBlocks(updated);
  };

  const addNewQuestionBlock = () => {
    setQuestionBlocks([...questionBlocks, { question: "", answers: ["", "", "", ""], correctAnswers: [] }]);
  };

  const removeNewQuestionBlock = (index) => {
    setQuestionBlocks(prev => prev.filter((_, i) => i !== index));
  };

  // Save all new questions in bulk
  const saveNewQuestions = async () => {
    try {
      for (const [qIndex, block] of questionBlocks.entries()) {
        if (!block.question.trim()) {
          alert(`Question ${qIndex + 1} is empty.`);
          return;
        }
        if (block.correctAnswers.length === 0) {
          alert(`Select at least one correct answer for Question ${qIndex + 1}.`);
          return;
        }
        for (const [aIndex, answer] of block.answers.entries()) {
          if (!answer.trim()) {
            alert(`Answer ${aIndex + 1} in Question ${qIndex + 1} is empty.`);
            return;
          }
        }
      }

      for (const block of questionBlocks) {
        const questionRes = await axios.post(`http://localhost:4000/api/question`, {
          text: block.question,
          quizId: quizId,
        });

        const questionId = questionRes.data._id;

        const options = await Promise.all(
          block.answers.map((ans, i) =>
            axios.post(`http://localhost:4000/api/option`, {
              text: ans,
              isCorrect: block.correctAnswers.includes(i),
              questionId: questionId,
            })
          )
        );

        setQuestions(prev => [
          ...prev,
          {
            _id: questionId,
            text: block.question,
            options: options.map(res => res.data),
          },
        ]);
      }

      setQuestionBlocks([{ question: "", answers: ["", "", "", ""], correctAnswers: [] }]);
      alert("New questions added successfully.");
    } catch (error) {
      console.error("Error saving new questions:", error);
      alert("Failed to save new questions.");
    }
  };

  return (
    <div className="question-container">
      <h1>Modify Quiz Questions</h1>

      {quizDetails && (
        <div className="quiz-info">
          <h2>Quiz: {quizDetails.title}</h2>
          <p>{quizDetails.description}</p>
        </div>
      )}

      {questions.map((q, qIndex) => (
        <div key={q._id} className="popup-overlay">
          <div className="popup">
            <h3>Question {qIndex + 1}</h3>
            <textarea
              className="question-textarea"
              value={q.text}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
            />
            <label>Answers (check correct ones)</label>
            {q.options.map((opt, oIndex) => (
              <div className="checkbox-container" key={opt._id}>
                <label className="container-box">
                  <input
                    type="checkbox"
                    checked={opt.isCorrect}
                    onChange={() => handleCorrectToggle(qIndex, oIndex)}
                  />
                  <div className="checkmark"></div>
                </label>
                <input
                  type="text"
                  className="question-input"
                  value={opt.text}
                  onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                />
              </div>
            ))}
            <button className="btn-modifier" onClick={() => updateQuestion(qIndex)}>Update Question</button>
            <button className="btn-delete" onClick={() => deleteQuestion(qIndex)}>Delete Question</button>
          </div>
        </div>
      ))}

      {/* New Questions Bulk Add Section */}
      <h3>Add New Questions</h3>
      {questionBlocks.map((block, index) => (
        <div className="popup-overlay" key={index}>
          <div className="popup">
            <h3>New Question {index + 1}</h3>
            <textarea
              className="question-textarea"
              placeholder="Question content"
              value={block.question}
              onChange={(e) => handleNewQuestionChange(index, e.target.value)}
            />
            <label>Answers (check correct ones)</label>
            {block.answers.map((ans, aIndex) => (
              <div className="checkbox-container" key={aIndex}>
                <label className="container-box">
                  <input
                    type="checkbox"
                    checked={block.correctAnswers.includes(aIndex)}
                    onChange={() => toggleCorrectAnswer(index, aIndex)}
                  />
                  <div className="checkmark"></div>
                </label>
                <input
                  type="text"
                  className="question-input"
                  value={ans}
                  placeholder={`Answer ${aIndex + 1}`}
                  onChange={(e) => handleNewAnswerChange(index, aIndex, e.target.value)}
                />
              </div>
            ))}

            {questionBlocks.length > 1 && (
              <button className="btn-delete" onClick={() => removeNewQuestionBlock(index)}>Remove This Question</button>
            )}
          </div>
        </div>
      ))}

      <button className="btn-modifier" onClick={addNewQuestionBlock}>Add Another Question</button>
      <button className="btn-modifier" onClick={saveNewQuestions}>Save New Questions</button>
    </div>
  );
}
