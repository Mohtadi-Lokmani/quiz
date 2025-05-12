import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext'; 
import Users from './Dashboard/User';
import Categories from './Dashboard/Categorie';
import AllQuizzes from './Dashboard/Allquiz';
import './Dashboard.css';
import Dashcreate from './Dashboard/Dashcreate';

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthContext();


  if (!user || user.role !== 'admin') {
    console.log('User is not admin or not logged in, redirecting to login...');
    navigate('/login'); 
    return null; 
  }



  const isActive = (path) => location.pathname.includes(path) ? 'active' : '';

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="logo">
          <i className="fa-solid fa-gear" /> Quizzaroo Admin
        </div>
        <nav>
          <ul>
            <li><Link to="/dashboard/quizzes" className={isActive('quizzes')}>All Quizzes</Link></li>
            <li><Link to="/dashboard/create" className={isActive('create')}>Create Quiz</Link></li>
            <li><Link to="/dashboard/categories" className={isActive('categories')}>Categories</Link></li>
            <li><Link to="/dashboard/users" className={isActive('users')}>Users</Link></li>
            <li>
              
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <h1>Welcome, Admin</h1>
        <p className="dashboard-description">
          Use this panel to manage quizzes, categories, users and view messages.
        </p>

        <Routes>
          <Route path="quizzes" element={<AllQuizzes />} />
          <Route path="create" element={<Dashcreate />} />
          <Route path="categories" element={<Categories />} />
          <Route path="users" element={<Users />} />
        </Routes>
      </main>
    </div>
  );
}
