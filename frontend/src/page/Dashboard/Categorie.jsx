import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import '../dashboard.css';

// ✅ Move Modal OUTSIDE the Categories component
const Modal = ({ onClose, children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default function Categories() {
  const { user } = useAuthContext();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ label: '', icon: '' });

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:4000/api/categorie/");
        if (!response.ok) throw new Error("Failed to fetch data");
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

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/categorie/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(newCategory)
      });

      if (!response.ok) throw new Error("Failed to add category");

      const data = await response.json();
      setCategories([...categories, data]);
      setShowAddModal(false);
      setNewCategory({ label: '', icon: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      const response = await fetch(`http://localhost:4000/api/categorie/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (!response.ok) throw new Error("Failed to delete category");

      setCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== id)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="allcat">
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Categories</h2>
          <button className="add-btn" onClick={() => setShowAddModal(true)}>Add Category</button>
        </div>

        {error && <p className="error">{error}</p>}
        {loading ? (
          <p>Loading categories...</p>
        ) : (
          <div className="card-grid">
            {categories.map(category => (
              <div key={category._id} className="category-card">
                <div className="category-card-header">
                  <span className="category-icon">{category.icon}</span>
                  <h3 className="category-label">{category.label}</h3>
                </div>
                <div className="category-actions">
                  <button className="delete-btn" onClick={() => handleDeleteCategory(category._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showAddModal && (
          <Modal onClose={() => setShowAddModal(false)}>
            <h3>Add New Category</h3>
            <form onSubmit={handleAddCategory}>
              <div className="form-group">
                <label>Label</label>
                <input
                  type="text"
                  value={newCategory.label}
                  onChange={(e) => setNewCategory({ ...newCategory, label: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Icon (emoji or code)</label>
                <input
                  type="text"
                  value={newCategory.icon}
                  onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit">Add Category</button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
}
