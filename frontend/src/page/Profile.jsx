import React, { useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './Profile.css';

export default function Profile() {
  const { id } = useParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [attempts, setAttempts] = React.useState([]);
  const [loadingAttempts, setLoadingAttempts] = React.useState(true);
  const [errorAttempts, setErrorAttempts] = React.useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!user) return;
    const fetchAttempts = async () => {
      setLoadingAttempts(true);
      try {
        const res = await fetch(`http://localhost:4000/api/attempt?userId=${user._id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch attempts');
        setAttempts(data);
      } catch (err) {
        setErrorAttempts(err.message);
      } finally {
        setLoadingAttempts(false);
      }
    };
    fetchAttempts();
  }, [user]);

  if (!user) return null;

  return (
    <>
    <div className="profile-container">
      <h2>Your Profile</h2>
      <div className="profile-details">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

    
    

      <h3>Your Quiz Attempts</h3>
      {loadingAttempts && <p>Loading attempts...</p>}
      {errorAttempts && <p className="error">Error: {errorAttempts}</p>}
      <div className="attempt-cards">
        {attempts.map(attempt => (
          <div
            key={attempt._id}
            className="attempt-card"
            onClick={() => navigate(`/results/${attempt._id}`)}
          >
            <div className="attempt-info">
              <h4>{attempt.quizId?.title || 'Quiz'}</h4>
              <p>Score: {attempt.score}%</p>
              <p>Date: {new Date(attempt.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
      
    </div>
      {user.role === 'admin' && (
        <div className="dashboard-link">
          <Link to="/dashboard/quizzes">Go to Dashboard</Link>
        </div>
      )}
      </>
  );
}
