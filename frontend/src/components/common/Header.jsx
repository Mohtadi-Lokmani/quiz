import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Header() {

  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
  };

 

  

  return (
    <>
      <header>
         <Link to="/" className="linkquizzaroo">
              <h2>Quizzaroo</h2>
            </Link>
        <nav className="navheader">
          <ul>
            <CustomLink to="/" className="link">
              Home
            </CustomLink>
            <CustomLink to="/quiz" className="link">
              Quiz
            </CustomLink>
            <CustomLink to="/my-quiz" className="link">
              My Quizzes
            </CustomLink>
            {!user && (
              <CustomLink to="/login" className="link" id="login">
                Login
              </CustomLink>
            )}

            {user && (
              <>
              <div className="user-info">
               <Link to="/profile" className="user_name"> <span className="user-name">{user.name}</span></Link>
                <FontAwesomeIcon icon={faCircleUser} className="user-icon" />
               
                </div>
                 <button onClick={handleClick} className="Logout">
                 Log Out
               </button></>
              
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
