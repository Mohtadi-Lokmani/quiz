import { Link } from "react-router-dom";
import "./quizzes.css";
import { useEffect, useState } from "react";
import Create from "../components/Home/Create";
import Footer from "../components/common/Footer";

export default function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [quizzesRes, categoriesRes] = await Promise.all([
          fetch("http://localhost:4000/api/quiz/"),
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

  const getQuizzesByCategory = (categoryId) => {
    return quizzes.filter(quiz => quiz.categorie === categoryId);
  };

  if (loading) return <div>Loading quizzes...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="quizzes-container">
      <h1 className="card-title">All Quizzes</h1>

      {categories.map(category => {
        const quizzesInCategory = getQuizzesByCategory(category._id);
        if (quizzesInCategory.length === 0) return null;

        return (
          <div key={category._id} className="category-section">
            <h2 className="category-title">
              {category.icon} {category.label}
            </h2>

            <div className="allcards">
              {quizzesInCategory.map(quiz => (
                <div className="card" key={quiz._id}>
                  <div className="card__shine"></div>
                  <div className="card__glow"></div>
                  <div className="card__content">
                    <div className="card__image">
                      <p>{category.icon}</p>
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
          </div>
        );
      })}

      <Create />
      <Footer />
    </div>
  );
}
