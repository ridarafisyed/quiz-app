import React, { useState } from 'react'
import Questions from './Questions'
// import Score from './Score'
import {fetchQuestions,  QuestionState,  Difficulty} from './api/API'

//Material ui components 
import {makeStyles,} from '@material-ui/core/styles';
import {Paper, Button,  Container, Typography, CircularProgress } from "@material-ui/core/";

const useStyles = makeStyles({
  button:{
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white',
    display:"flex",
    margin:"auto",
    alignItems:"center",
    
  },
  button_next:{
      background: 'linear-gradient(45deg,#504BF2 30%, #40B38B 90%)',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      display:"flex",
      margin:20,
      alignItems:"center",
      float:"right",
      
  },
  loading:{
      display:"flex",
      margin:"auto",
      alignItems:"center",
      alignContent:"center",

  },
  container:{
      height:150,
  },
  card:{
      margin:"auto",
      alignItems:"center",
      paddingTop:20,
      paddingBottom:10,
      height:200,
}
})

export type AnswerObject = {
    question:string,
    answer:string,
    correct:boolean,
    correctAnswer:string;
}

interface Props{
    id: number,
    name: string,
}

const TOTAL_QUESTIONS = 2;

const StartGame:React.FC<Props> =({id, name}) => {

    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<QuestionState[]>([]);
    const [number, setNumber] = useState(0);
    const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(true);
    const [level, setLevel] = useState(0);
    
    const startQuiz = async () =>{
        // function trigger when start the quiz 
        // here we call the api data 
        setLoading(true);
        setGameOver(false);  

        const difficulty = () =>{
            if (level === 0) return Difficulty.EASY;
            else if (level === 1) return Difficulty.MEDIUM;
            else return Difficulty.HARD
        }  
        
        const newQuestions = await fetchQuestions(TOTAL_QUESTIONS, difficulty(),id);
        setQuestions(newQuestions);
        setScore(0)
        setNumber(0)
        setUserAnswers([])
        setLoading(false);
    }

    const nextLevel = async() => {
        setLoading(true);
        setGameOver(false); 
        setLevel(level + 1) 

        const difficulty = () =>{
            if (level === 0) return Difficulty.EASY;
            else if (level === 1) return Difficulty.MEDIUM;
            else return Difficulty.HARD
        }  
        

        const newQuestions = await fetchQuestions(TOTAL_QUESTIONS, difficulty(),id);
        setQuestions(newQuestions);
        setScore(0)
        setNumber(0)
        setUserAnswers([])
        setLoading(false);
    }

    // function when user select the answer
    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) =>{
        if(!gameOver){
            const answer = e.currentTarget.value;

            const correct = questions[number].correct_answer === answer;
            if(correct) setScore(prev => prev + 1);

            const answerObject = {
                question: questions[number].question,
                answer,
                correct,
                correctAnswer: questions[number].correct_answer
            };
            setUserAnswers(prev => [...prev, answerObject]);
        }
    }

    // funtion for the next question.
    const nextQuestion = () =>{
        const nextQuestion = number + 1;
        if (nextQuestion === TOTAL_QUESTIONS ){
            setLevel(level + 1)
            setGameOver(true);
        }
        else{
            setNumber(nextQuestion);
        }

    }

    return (
        <Container className={classes.container}>
            {/* starting game  */}
            {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
                <Paper elevation={3} className={classes.card}>
                    <Typography variant="h5" component="h3" align="center">
                        {name}
                     </Typography>
                    <Typography align="center">Lets Start Quiz</Typography>
                    <Button className={classes.button} variant="contained" color="primary" onClick={startQuiz}>
                        Start
                    </Button>                    
                    <Typography align="center">Want some other category... </Typography>
                    <Button className={classes.button} variant="contained" color="primary" onClick={()=> window.location.reload(false)}>
                        Categories
                    </Button>
                </Paper>
                ) : null}
            {/* loading game  */}
            {loading ? 
                <div className={classes.loading}>
                    <CircularProgress  /> 
                </div>
            
            : null}

            {/* question card */}
            {!loading && !gameOver && userAnswers.length !== TOTAL_QUESTIONS ? (
            <Questions
                questionNo={number + 1}
                totalQuestions={TOTAL_QUESTIONS}
                question={questions[number].question}
                answers={questions[number].answers}
                userAnswer={userAnswers ? userAnswers[number] : undefined}
                callback={checkAnswer}
                score={score}
                level= {level}
                subject = {name}
            />
            ): null}
            {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          <Button className={classes.button_next} onClick={nextQuestion}>
            Next Question
          </Button>
        ) : null}
        </Container>
    )
}

export default StartGame;
