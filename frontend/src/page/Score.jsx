import { Route, Routes } from "react-router-dom"
import './Score.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';



export default function Score() {
    const quizId=useParams().quizId
    

  
  return (
    <>
        <div className="score-container">
            <h1>Your Score</h1>
            <p>Congratulations! You have completed the quiz.</p>
            <p>Your score is: <strong>85</strong></p>
            <p>Thank you for participating!</p>
            <button onClick={() => window.location.href = '/quizzes'}>Back to Quizzes</button>
        </div>
     
    </>
  )
}


