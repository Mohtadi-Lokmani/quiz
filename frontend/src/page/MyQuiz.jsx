import { Link } from "react-router-dom";
import "./quizzes.css";
import { useEffect, useState } from "react";
import Create from "../components/Home/Create";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Quizzes() {
  const {user} = useAuthContext()
  const [quizzes, setQuizzes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [quizzesRes, categoriesRes] = await Promise.all([
          fetch("http://localhost:4000/api/myquiz/",{
            headers: {'Authorization': `Bearer ${user.token}`},

          }),
          fetch("http://localhost:4000/api/categorie/")
        ]);

        if (!quizzesRes.ok || !categoriesRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const quizzesData = await quizzesRes.json();
        const categoriesData = await categoriesRes.json();

        setQuizzes(quizzesData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCategoryIcon = (categoryId) => {
    const category = categories.find(cat => cat._id === categoryId);
    return ( category.icon)
    
  };

  if (loading) return <div>Loading quizzes...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="quizzes-container">
      <h1 className="card-title">Popular Quizzes</h1>
      
      <div className="allcards">
        {quizzes.map((quiz) => (
          <div className="card" key={quiz._id}>
            <div className="card__shine"></div>
            <div className="card__glow"></div>
            <div className="card__content">
              <div className="card__image">
                <p>{getCategoryIcon(quiz.categorie)}</p>
              </div>
              <div className="card__text">
                <p className="card__title">{quiz.title}</p>
                <p className="card__description">{quiz.description}</p>
              </div>
              <div className="card__footer">
                <div className="card__button">
                <Link to={`/play/${quiz._id}`} className="quiz-card-link play-button">
  Play
</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Create />
    </div>
  );
}