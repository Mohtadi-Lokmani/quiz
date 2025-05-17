import React, { useEffect, useState } from 'react';
import { useParams, useNavigate,Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import './QuizAttempts.css';

export default function QuizAttempts() {
  const { quizId } = useParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return navigate('/login');

    const fetchAttempts = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/userattempt/${quizId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Failed to load attempts');

        setAttempts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAttempts();
  }, [user, quizId, navigate]);

  return (
    <div className="quiz-attempts-container">
      <h2>People Who Played This Quiz</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {attempts.length === 0 ? (
        <p>No one has attempted this quiz yet.</p>
      ) : (
        <div className="attempts-list">
          {attempts.map((a) => (
            <div key={a._id} className="attempt-card">
              <p><strong>Name:</strong> {a.userId?.name || 'Unknown User'}</p>
              <p><strong>Email:</strong> {a.userId?.email || 'N/A'}</p>
              <p><strong>Score:</strong> {a.score}%</p>
              <p><strong>Date:</strong> {new Date(a.createdAt).toLocaleString()}</p>
            
            
            </div>
            
          ))}
        </div>
      )}
    </div>
  );
}
