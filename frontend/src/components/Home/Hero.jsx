import { Link } from "react-router-dom";
import "./Hero.css";
import back from "../../image/hero.jpg"
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Hero() {
   const { user } = useAuthContext();

  return (
    <>
   
    <div className="allhero">
  
    <div className="hero-container">
      <h2 className="hero-subtitle">Welcome To <span className="highlight">Quizzaroo</span></h2>
      <h1 className="hero-title">Test your knowledge <br />and have fun!</h1>
      
      <p className="hero-desc">
        Play quizzes, create your own challenges, and join a community of learners!
      </p>

      <div className="hero-buttons">
        {!user && ( <Link to="/signup" className="signupbtn">Start Now</Link>)}
        {user && ( <Link to="/quiz" className="signupbtn">Start Now</Link>)}
        
      </div>
    </div>
    <div className="heroback"><img src={back} alt="" /></div>
    </div>
    </>
  )
}
