import React, { useState } from 'react'
import Questions from './Questions'
// import Score from './Score'
import {fetchQuestions,  QuestionState,  Difficulty} from './api/API'

//styling

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

const TOTAL_QUESTIONS = 10;


const StartGame:React.FC<Props> =({id, name}) => {

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

    // const nextLevel = async () =>{
        
    //     setLoading(true);
    //     setGameOver(false);  
    //     setLevel(level+1)

    //     const difficulty = () =>{
    //         if (level === 0) return Difficulty.EASY;
    //         else if (level === 1) return Difficulty.MEDIUM;
    //         else return Difficulty.HARD
    //     }  
        

    //     const newQuestions = await fetchQuestions(TOTAL_QUESTIONS, difficulty(),id);
    //     setQuestions(newQuestions);
    //     setScore(0)
    //     setNumber(0)
    //     setUserAnswers([])
    //     setLoading(false);
    // }

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
        <div className ="text-center ">
            {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
                <div>
                    <h3>{name}</h3>
                    <p>Lets Start Quiz</p>
                    <button className='btn btn-success start' onClick={startQuiz}>
                        Start
                    </button>                    
                    <p>Want some other category... </p>
                    <button className='btn btn-success start' onClick={()=> window.location.reload(false)}>
                        Categories
                    </button>
                    
                </div>
                ) : null}
                { level !== 0  ?(
                    <div>
                        <h3>{name}</h3>
                        <p>Lets Start Quiz</p>
                        <button className='btn btn-success start' onClick={startQuiz}>
                            Start
                        </button> 
                        <button className="btn btn-primary start" onClick={nextLevel}> Next Level</button>
                        <p>Want some other category... </p>
                        <button className='btn btn-success start' onClick={()=> window.location.reload(false)}>
                            Categories
                        </button>
                    </div>
                ): null
                
            }

            
            {loading ? <p>Loading Questions...</p> : null}
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
          <button className='btn btn-success next' onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
        </div>
    )
}

export default StartGame;
