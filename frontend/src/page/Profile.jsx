import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const { id } = useParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [attempts, setAttempts] = useState([]);
  const [loadingAttempts, setLoadingAttempts] = useState(true);
  const [errorAttempts, setErrorAttempts] = useState(null);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [updateSuccess, setUpdateSuccess] = useState("");
  const [updateError, setUpdateError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!user) return;

    const fetchAttempts = async () => {
      setLoadingAttempts(true);
      try {
        const res = await fetch(
          `http://localhost:4000/api/myattempt?userId=${user._id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to fetch attempts");
        setAttempts(data);
      } catch (err) {
        setErrorAttempts(err.message);
      } finally {
        setLoadingAttempts(false);
      }
    };

    fetchAttempts();
  }, [user]);

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account?"))
      return;

    try {
      const res = await fetch(`http://localhost:4000/api/user/${user._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete account");

      localStorage.removeItem("user");
      window.location.href = "/login";
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdateError("");
    setUpdateSuccess("");

    try {
      const res = await fetch(`http://localhost:4000/api/user/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update profile");

      // Update localStorage & context
      const updatedUser = { ...user, name: data.name, email: data.email };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUpdateSuccess("Profile updated successfully.");
    } catch (err) {
      setUpdateError(err.message);
    }
  };

  return (
    <>
      <div className="profile-container">
        <h2>Your Profile</h2>
        <h3>Update Profile</h3>
        <form className="update-form" onSubmit={handleUpdateProfile}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <button type="submit">Update Profile</button>
        </form>
        {updateSuccess && <p className="success">{updateSuccess}</p>}
        {updateError && <p className="error">{updateError}</p>}

        <h3>Your Quiz Attempts</h3>
        {loadingAttempts && <p>Loading attempts...</p>}
        {errorAttempts && <p className="error">Error: {errorAttempts}</p>}

        <div className="attempt-cards">
          {attempts.map((attempt) => (
            <div
              key={attempt._id}
              className="attempt-card"
              onClick={() => navigate(`/results/${attempt._id}`)}>
              <div className="attempt-info">
                {attempt.quizId?.title ? (
                  <h4>{attempt.quizId.title}</h4>
                ) : (
                  <>
                    <h4>Untitled Quiz</h4>
                    <p className="untilted">This quiz has been deleted</p>
                  </>
                )}

                <p>Score: {attempt.score}%</p>
                <p>Date: {new Date(attempt.createdAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="delete-account">
          <button className="btn-delete-account" onClick={handleDeleteAccount}>
            Delete My Account
          </button>
        </div>
      </div>

      {user && user.role === 'admin' && (
  <div className="dashboard-link">
    <Link to="/dashboard/quizzes">Go to Dashboard</Link>
  </div>
)}

    </>
  );
}
