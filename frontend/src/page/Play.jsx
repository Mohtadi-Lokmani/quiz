import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './play.css';

export default function Play() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!user) return;

    const fetchQuizData = async () => {
      setLoading(true);
      try {
        const [quizRes, questionsRes] = await Promise.all([
          axios.get(`http://localhost:4000/api/quiz/${quizId}`, {
            headers: { Authorization: `Bearer ${user.token}` }
          }),
          axios.get(`http://localhost:4000/api/question?quizId=${quizId}`, {
            headers: { Authorization: `Bearer ${user.token}` }
          })
        ]);

        setQuiz(quizRes.data);
        setQuestions(questionsRes.data);

       
        const initialSelected = questionsRes.data.reduce((acc, { _id }) => {
          acc[_id] = [];
          return acc;
        }, {});
        setSelectedOptions(initialSelected);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load quiz');
        console.error('Quiz loading error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [quizId, user]);

  const handleOptionSelect = (questionId, optionId) => {
    setSelectedOptions(prev => ({
      ...prev,
      [questionId]: prev[questionId].includes(optionId)
        ? prev[questionId].filter(id => id !== optionId)
        : [...prev[questionId], optionId]
    }));
  };

  const handleSubmit = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
     
      const answers = questions.flatMap(question => {
        return (selectedOptions[question._id] || []).map(optionId => {
          const option = question.options.find(o => o._id === optionId);
          return {
            questionId: question._id,
            optionId: optionId,
            isCorrect: option ? option.isCorrect : false
          };
        });
      });

     
      const correctAnswersCount = answers.filter(answer => answer.isCorrect).length;
      const finalScore = correctAnswersCount * 3 ;

     
      const response = await axios.post('http://localhost:4000/api/attempt', {
        userId: user._id,
        quizId,
        answers,
        score: finalScore
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });

      navigate(`/results/${response.data._id}`, {
        state: {
          score: finalScore,
          correctAnswers: correctAnswersCount,
          totalQuestions: questions.length,
          quizTitle: quiz.title
        },
        replace: true
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit quiz');
      console.error('Quiz submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  if (loading) return (
    <div className="loading-screen">
      <div className="spinner"></div>
      <p>Loading quiz...</p>
    </div>
  );

  if (error) return (
    <div className="error-screen">
      <h2>Error Loading Quiz</h2>
      <p>{error}</p>
      <button onClick={() => window.location.reload()}>Try Again</button>
    </div>
  );

  if (!quiz) return (
    <div className="error-screen">
      <h2>Quiz Not Found</h2>
      <button onClick={() => navigate('/')}>Return Home</button>
    </div>
  );

  return (
    <div className="play-container">
      <h1 className="quiz-title">{quiz.title}</h1>
      <p className="quiz-description">{quiz.description}</p>

      <div className="questions-container">
        {questions.map(({ _id, text, options }) => (
          <div key={_id} className="question-card">
            <h3>Question: {text}</h3>
            {options?.length > 0 ? (
              <div className="options-list">
                {options.map(({ _id: optionId, text, isCorrect }) => (
                  <div key={optionId} className="option-item">
                    <label className="option-label">
                      <input
                        type="checkbox"
                        checked={selectedOptions[_id]?.includes(optionId)}
                        onChange={() => handleOptionSelect(_id, optionId)}
                        className="option-checkbox"
                        disabled={isSubmitting}
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

      <div className="quiz-footer">
        {error && <p className="submit-error">{error}</p>}
        <button 
          onClick={handleSubmit} 
          className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
          disabled={isSubmitting || Object.values(selectedOptions).every(opt => opt.length === 0)}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span> Submitting...
            </>
          ) : 'Finish Quiz'}
        </button>
      </div>
    </div>
  );
}