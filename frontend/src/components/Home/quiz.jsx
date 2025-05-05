import { Link } from "react-router-dom";
import "./quiz.css";


export default function Quiz() {
  return (
    <>
    <h1 className="card-title">Popular Quizzes</h1>
  <div className="card">
  <div className="card__shine"></div>
  <div className="card__glow"></div>
  <div className="card__content">
   
    <div  className="card__image"></div>
    <div className="card__text">
      <p className="card__title">guess the country</p>
      <p className="card__description">Question About Country Flag</p>
    </div>
    <div className="card__footer">
      <div className="card__button">
        
          
      <Link to="/quiz/quiz" className="quiz-card-link">Start </Link>
      </div>
    </div>
  </div>
</div>
<h1 className="card-title">Recent Quizzes</h1>
  <div className="card">
  <div className="card__shine"></div>
  <div className="card__glow"></div>
  <div className="card__content">
   
    <div  className="card__image"></div>
    <div className="card__text">
      <p className="card__title">guess the country</p>
      <p className="card__description">Question About Country Flag</p>
    </div>
    <div className="card__footer">
      <div className="card__button">
        
          
      <Link to="/quiz/quiz" className="quiz-card-link">Start </Link>
      </div>
    </div>
  </div>
</div>
    </>
  )
}