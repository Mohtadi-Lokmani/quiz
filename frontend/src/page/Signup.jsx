import './Signup.css'
import { Link } from "react-router-dom"
import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const { signup, error, isLoading } = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    

   
    await signup(name, email, password,confirmPassword)
  }

  return (
    <div className="all">
      <div className="signup-container">
        <h1 className="signup-title">Quizzaroo</h1>
        <h1 className="signup-log">Sign-Up</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-form-group">
            <label>Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="signup-form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="signup-form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="signup-form-group">
            <label>Retype Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} />
          </div>
          <button type="submit" className="signup-button" disabled={isLoading}>Sign up</button>
     
          {error && <div className="error">{error}</div>}
        </form>

        <p className="signup-text">You Already Have Account? <Link to="/login" className="signup-link">Login</Link></p>
      </div>
    </div>
  )
}

export default Signup
