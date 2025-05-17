import { Route, Routes } from "react-router-dom"
import './App.css'
import ProtectedRoute from "../../../Horizon with backend/client/src/components/ProtectedRoute"
import Home from "./page/Home"
import Login from "./page/Login"
import Signup from "./page/Signup"
import Header from "./components/common/Header"
import Quizzes from "./page/quizzes"
import Question from "./page/Question"
import Create from "./page/Create"
import Play from "./page/Play"

import MyQuiz from "./page/MyQuiz"
import Results from "./page/results"
import Profile from "./page/Profile"
import Dashboard from "./page/dashboard"
import ModifyQuestion from "./page/ModifyQuestion"
import QuizAttempts from "./page/QuizAttempt"


function App() {
  
  return (
    <>
        <Header></Header>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={  <Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/quiz" element={<Quizzes/>} />
      <Route path='/create-quiz' element={<Create/>} />
      <Route path="/questions/:quizId" element={<Question />} />
      <Route path="/play/:quizId" element={<Play />} />
      <Route path="/my-quiz" element={<MyQuiz />} />
      <Route path="/results/:id" element={<Results />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/modify-question/:quizId" element={<ModifyQuestion />} />
      <Route path="/quiz-attempts/:quizId" element={<QuizAttempts />} />

       <Route path="/dashboard/*" element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>}
      />
        </Routes>
        
     





    

      
 
     
    </>
  )
}

export default App
