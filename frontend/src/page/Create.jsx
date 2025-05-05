import './create.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Create() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [categorie, setCategories] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:4000/api/categorie/");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !selectedCategory) {
      setError("Please fill in all fields");
      return;
    }

    

  
    const newQuiz = {
      title,
      description,
      categorie: selectedCategory,
    };

    try {
      setLoading(true);
      const res = await fetch('http://localhost:4000/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuiz),
      });

      if (!res.ok) {
        throw new Error('Failed to create quiz');
      }

  
      navigate('/question');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-container">
      <h1 className="create-title">Create Quiz</h1>

      <form className="create-form" onSubmit={handleSubmit}>
        <div className="create-form">
          <label htmlFor="createquiz">Quiz Title</label><br />
          <input
            type="text"
            id="createquiz"
            name="createquiz"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="create-form">
          <label htmlFor="create-desc">Quiz Description</label><br />
          <input
            type="text"
            id="create-desc"
            name="create-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="create-form">
          <label>Quiz Category</label>
          <div className="radio-container">
            <div className="radio-tile-group">
              {categorie.map((cat, index) => (
                <div className="input-container" key={index}>
                  <input
                    id={`cat-${index}`}
                    className="radio-button"
                    type="radio"
                    name="radio"
                    value={cat._id} 
                    checked={selectedCategory === cat._id}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  />
                  <div className="radio-tile">
                    <div className="icon">{cat.icon}</div>
                    <label htmlFor={`cat-${index}`} className="radio-tile-label">{cat.label}</label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="create-button" disabled={loading}>
          {loading ? 'Creating Quiz...' : 'Create Quiz'}
        </button>
      </form>
    </div>
  );
}
