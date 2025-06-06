require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//import routes
const quizRoutes = require('./routes/quiz')
const userRoutes = require('./routes/user')
const questionRoutes = require('./routes/question')
const optionRoutes = require('./routes/option')
const attemptRoutes = require('./routes/attempt')
const categorieRoutes = require('./routes/categorie')
const myquizRoutes = require('./routes/myquiz')
const myattemptRoutes = require('./routes/myattempt')
const userattemptRoutes =require('./routes/userAttempt')




//express app
const app = express();


app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next ) => {
    console.log(req.path,req.method)
    next()})


//routes

app.use('/api/user', userRoutes)
app.use('/api/quiz', quizRoutes)
app.use('/api/question', questionRoutes)
app.use('/api/option', optionRoutes)
app.use('/api/categorie', categorieRoutes)
app.use('/api/attempt', attemptRoutes)
app.use('/api/myquiz', myquizRoutes)
app.use('/api/myattempt', myattemptRoutes)
app.use('/api/userattempt', userattemptRoutes)




//connect to db

mongoose.connect(process.env.MONGO_URL)
.then (() => console.log("Connected to DB" ))
.catch((error) => console.log("mongo db connection error",error))



//request
const PORT = process.env.PORT || 4000
app.listen(PORT, () =>{ 
    console.log(`Server running on port ${PORT}`)
});
