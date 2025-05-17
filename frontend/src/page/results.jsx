import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './score.css';

export default function Result() {
  const { id } = useParams();
  const [attempt, setAttempt] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchAttempt = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/attempt/${id}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch attempt');
      }

      const answersByQuestion = {};
      const answeredQuestionIds = new Set();
      let correctOptions = 0;

      data.answers.forEach(answer => {
        answeredQuestionIds.add(answer.questionId._id);

        if (!answersByQuestion[answer.questionId._id]) {
          answersByQuestion[answer.questionId._id] = {
            questionText: answer.questionId.text,
            options: [],
            isCorrect: true
          };
        }

        answersByQuestion[answer.questionId._id].options.push({
          text: answer.optionId.text,
          isCorrect: answer.isCorrect
        });

        if (!answer.isCorrect) {
          answersByQuestion[answer.questionId._id].isCorrect = false;
        } else {
          correctOptions += 1;
        }
      });

      const answeredQuestions = Object.values(answersByQuestion);
      const correctQuestions = answeredQuestions.filter(q => q.isCorrect).length;
      const totalAnsweredQuestions = answeredQuestions.length;
      const totalQuestions = data.answers.reduce((total, answer) => {
        return total + (answer.questionId ? 1 : 0);
      }, 0);
      const pointsEarned = correctOptions * 100;

      setAttempt({
        ...data,
        answersByQuestion,
        correctQuestions,
        correctOptions,
        totalAnsweredQuestions,
        totalQuestions,
        pointsEarned
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchAttempt();
}, [id]);


  if (loading) return <div className="loading">Loading results...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!attempt) return <div className="no-result">No result found.</div>;

  return (
    <div className="allscore">
    <div className="result-container">
      <h1 className="result-title">Quiz Results</h1>

      <div className="score-summary">
  <div className="score-card">
    <h3>Points Earned</h3>
    <p className="points">{attempt.pointsEarned}</p>
    <p className="total-questions">(100 points per correct option)</p>
  </div>

  <div className="score-card">
    <h3>Correct Questions</h3>
    <p className="correct-count">
      {attempt.correctQuestions}/{attempt.totalAnsweredQuestions} answered
    </p>
    <p className="total-questions">
      (out of {attempt.totalQuestions} total options)
    </p>
  </div>

  <div className="score-card">
    <h3>Percentage</h3>
    <p className="percentage">
      {attempt.totalAnsweredQuestions > 0 
        ? Math.round((attempt.correctQuestions / attempt.totalAnsweredQuestions) * 100)
        : 0}%
    </p>
    <p className="percentage-note">of answered questions</p>
  </div>
</div>


      <div className="answers-list">
        <h2>Question Breakdown</h2>
        {Object.entries(attempt.answersByQuestion).map(([questionId, questionData], index) => (
          <div 
            key={questionId} 
            className={`answer-item ${questionData.isCorrect ? 'correct' : 'incorrect'}`}
          >
            <div className="question-header">
              <span className="question-number">Q{index + 1}</span>
              <span className="question-text">{questionData.questionText}</span>
            </div>
            
            <div className="answer-details">
              <p><strong>Your answers:</strong></p>
              <ul className="selected-options">
                {questionData.options.map((option, optIndex) => (
                  <li key={optIndex} className={option.isCorrect ? 'correct-option' : 'incorrect-option'}>
                    {option.text} {option.isCorrect ? '✓' : '✗'}
                  </li>
                ))}
              </ul>
              <p className="result-indicator">
                {questionData.isCorrect ? (
                  <span className="correct"></span>
                ) : (
                  <span className="incorrect">✗ Contains Incorrect Answers</span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}