import "./play.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Play() {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [quizTitle, setQuizTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const quizRes = await axios.get(`http://localhost:4000/api/quiz/${quizId}`);
        setQuizTitle(quizRes.data.title);

        const questionsRes = await axios.get(`http://localhost:4000/api/question/quiz/${quizId}`);
        setQuestions(questionsRes.data);
      } catch (err) {
        setError("Failed to load quiz or questions.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [quizId]);

  if (loading) return <div className="play-container">Loading...</div>;
  if (error) return <div className="play-container">{error}</div>;

  return (
    <div className="play-container">
      <h1 className="play-title">Play Quiz: {quizTitle}</h1>
      {questions.map((q, index) => (
        <div key={q._id}>
          <h3 className="question-play">Question {index + 1}: {q.text}</h3>
          <div className="answers-container">
            {q.options.map((opt, idx) => (
              <div key={idx} className="answer-option">
                <input type="radio" name={`question-${index}`} id={`q-${index}-opt-${idx}`} />
                <label htmlFor={`q-${index}-opt-${idx}`}>{opt.text}</label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
