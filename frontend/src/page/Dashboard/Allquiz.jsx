import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import '../Dashboard.css';

export default function AllQuizzes() {
  const { user } = useAuthContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    _id: '',
    title: '',
    description: '',
    categorie: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [quizzesRes, categoriesRes] = await Promise.all([
          fetch("http://localhost:4000/api/quiz/"),
          fetch("http://localhost:4000/api/categorie/"),
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
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.icon : 'No icon';
  };

  const handleEdit = (quiz) => {
    setFormData({
      _id: quiz._id,
      title: quiz.title,
      description: quiz.description,
      categorie: quiz.categorie,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (quizId) => {
    if (!window.confirm("Are you sure you want to delete this Quiz?")) return;
    const res = await fetch(`http://localhost:4000/api/quiz/${quizId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
    });

    if (res.ok) {
      setQuizzes((prev) => prev.filter((quiz) => quiz._id !== quizId));
    }
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
                <div className="card__buttonn">
                  <button onClick={() => handleEdit(quiz)} className="mod">Modify</button>
                  <button onClick={() => handleDelete(quiz._id)} className="del">Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-popup">
            <button className="btn-close" onClick={() => setIsModalOpen(false)}>×</button>
            <h2>Modify Quiz</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const res = await fetch(`http://localhost:4000/api/myquiz/${formData._id}`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                  },
                  body: JSON.stringify(formData),
                });

                if (res.ok) {
                  const updated = await res.json();
                  setQuizzes((prev) => prev.map((q) => (q._id === updated._id ? updated : q)));
                  setIsModalOpen(false);
                }
              }}
            >
              <label>Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
              <label>Category</label>
              <select
                value={formData.categorie}
                onChange={(e) => setFormData({ ...formData, categorie: e.target.value })}
              >
                {categories.map((cat) => (
                  <option value={cat._id} key={cat._id}>
                    {cat.icon}
                  </option>
                ))}
              </select>
              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
