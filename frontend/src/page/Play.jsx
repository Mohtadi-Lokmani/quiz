import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './play.css';

export default function Play() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchQuizData = async () => {
      setLoading(true);
      try {
        const { data: quizData } = await axios.get(`http://localhost:4000/api/quiz/${quizId}`);
        const { data: questionData } = await axios.get(`http://localhost:4000/api/question?quizId=${quizId}`);
        setQuiz(quizData);
        setQuestions(questionData);
        
        const initialSelected = questionData.reduce((acc, { _id }) => ({ ...acc, [_id]: [] }), {});
        setSelectedOptions(initialSelected);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load quiz');
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [quizId]);

  const handleOptionSelect = (questionId, optionId) => {
    setSelectedOptions(prev => ({
      ...prev,
      [questionId]: prev[questionId].includes(optionId)
        ? prev[questionId].filter(id => id !== optionId)
        : [...prev[questionId], optionId]
    }));
  };

  const calculateScore = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(`http://localhost:4000/api/quiz/${quizId}/submit`, { answers: selectedOptions });
      alert(`Your score: ${data.score}/${questions.length}`);
      navigate('/quizzes');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit quiz');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading quiz...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!quiz) return <div className="error">Quiz not found</div>;

  return (
    <div className="play-container">
      <h1 className="quiz-title">{quiz.title}</h1>
      <p className="quiz-description">{quiz.description}</p>

      <div className="questions-container">
        {questions.map(({ _id, text, options }) => (
          <div key={_id} className="question-card">
            <h3>Question: {text}</h3>
            {options.length > 0 ? (
              <div className="options-list">
                {options.map(({ _id: optionId, text, isCorrect }) => (
                  <div key={optionId} className="option-item">
                    <label className="option-label">
                      <input
                        type="checkbox"
                        checked={selectedOptions[_id]?.includes(optionId)}
                        onChange={() => handleOptionSelect(_id, optionId)}
                        className="option-checkbox"
                      />
                      <span className="option-text">{text}</span>
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-options">No options available</p>
            )}
          </div>
        ))}
      </div>

      <button onClick={calculateScore} disabled={loading} className="submit-btn">
        {loading ? 'Calculating...' : 'Finish Quiz'}
      </button>
    </div>
  );
}
