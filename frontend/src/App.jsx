import { Route, Routes } from "react-router-dom"
import './App.css'

import Home from "./page/Home"
import Login from "./page/Login"
import Signup from "./page/Signup"
import Header from "./components/common/Header"
import Quizzes from "./page/quizzes"
import Question from "./page/Question"
import Create from "./page/Create"

function App() {
  
  return (
    <>
        <Header></Header>
      <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/quiz" element={<Quizzes/>} />
      <Route path='/create-quiz' element={<Create/>} />
      <Route path="/question/:id" element={<Quizzes/>} />
      <Route path="/quiz/:id" element={<Quizzes/>} />
      <Route path="/question" element={<Question/>} />

      
      </Routes>
     
    </>
  )
}

export default App
