import { Link, useNavigate } from "react-router-dom";
import './Login.css';
import { useState, useEffect } from "react";
import { useLogin } from "../hooks/useLogin";
import { useAuthContext } from "../hooks/useAuthContext";

function Login() {
  const navigate = useNavigate();
  const { user } = useAuthContext();  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="all">
      
      <div className="login-container">
        <h1 className="login-title">Quizzaroo</h1>
        <h1 className="login-log">Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="login-form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="login-button" disabled={isLoading}>Login</button>
        </form>
      
        <p className="login-text">Don't have an account? <Link to="/signup" className="login-link">Sign Up</Link></p>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}

export default Login;
