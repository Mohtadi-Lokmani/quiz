
import '../Dashboard.css';
import { Link, useNavigate, useParams } from "react-router-dom";
import "../myquiz.css";
import { useEffect, useState} from "react";
import Create from "../../components/Home/Create";
import { useAuthContext } from "../../hooks/useAuthContext";


export default function Quizzes() {
 const {quizId}=useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [quizzes, setQuizzes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ 
    title: '', 
    description: '', 
    categorie: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!user) return;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        const [quizzesRes, categoriesRes] = await Promise.all([
          fetch("http://localhost:4000/api/quiz/", {
            headers: {'Authorization': `Bearer ${user.token}`},
          }),
          fetch("http://localhost:4000/api/categorie/", {
            headers: {'Authorization': `Bearer ${user.token}`},
          })
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
  }, [user]); 

  const getCategoryIcon = (categoryId) => {
    const category = categories.find(cat => cat._id === categoryId);
    return category?.icon || '';
  };

  const handleEdit = (quiz) => {
    setFormData(quiz);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this quiz?')) {
      try {
        const res = await fetch(`http://localhost:4000/api/myquiz/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });

        if (res.ok) {
          setQuizzes(prev => prev.filter(q => q._id !== id));
        } else {
          throw new Error("Failed to delete quiz");
        }
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:4000/api/myquiz/${formData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const updated = await res.json();
        setQuizzes(prev => prev.map(q => q._id === updated._id ? updated : q));
        setIsModalOpen(false);
      } else {
        throw new Error("Failed to update quiz");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (!user) {
    return null; 
  }

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

               <button onClick={() => navigate(`/quiz-attempts/${quiz._id}`)} className="see">
  See People
</button>

                  <button onClick={() => handleEdit(quiz)} className="mod">Modify</button>
                  <button onClick={() => handleDelete(quiz._id)} className="del">Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Create />

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-popup">
            <button className="btn-close" onClick={() => setIsModalOpen(false)}>×</button>
            <h2>Modify Quiz</h2>
            <form onSubmit={handleUpdate}>
              <label>Title</label>
              <input 
                type="text" 
                value={formData.title} 
                onChange={(e) => setFormData({...formData, title: e.target.value})} 
                required
              />
              <label>Description</label>
              <textarea 
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
              ></textarea>
              <label>Category</label>
              <select 
                value={formData.categorie} 
                onChange={(e) => setFormData({...formData, categorie: e.target.value})}
                required
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option value={cat._id} key={cat._id}>
                    {cat.icon} {cat.label}
                  </option>
                ))}
              </select>
              <button type="submit">Update</button>
           {formData._id && (
  <Link to={`/modify-question/${formData._id}`} className="link-modify-question">
    Modify Question
  </Link>
)}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}