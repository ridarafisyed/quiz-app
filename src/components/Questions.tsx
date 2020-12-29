import React from 'react'
import {AnswerObject} from './StartGame'

// styling 

import {Wrapper, ButtonWrapper} from "../style/QuestionCard.styles"

type Props ={
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNo: number;
    totalQuestions: number;
    score: number;
};

 const Questions:React.FC<Props> =({question,answers,callback,userAnswer,questionNo,totalQuestions,score,}) => (

  
        <div className="container text-center">

            <div className="row">
                <div className="col-6">
                    <p>Score: {score} </p>
                </div>
                <div className="col-6">
                    <p>Questions {questionNo}/{totalQuestions}</p>
                </div>
             
            </div>
            
            <div className=" row g-2">
               <div className="card col-12">
                <div className="card-body">
                    <h5 className ="card-title" dangerouslySetInnerHTML ={{__html:question}}/></div>  
                    <div className="">
                    {
                    answers.map((answer)=> (
                            <ButtonWrapper key = {answer}
                            correct={userAnswer?.correctAnswer === answer}
                            userClicked={userAnswer?.answer === answer}> 
                                <button className=" btn btn-primary" style={{width:"100%"}} disabled={!!userAnswer} value={answer} onClick={callback}>
                                    <span dangerouslySetInnerHTML={{__html: answer}}></span>
                                </button>
                                <br/>
                                <br/>
                            </ButtonWrapper>
                        ) )}
                        </div>
             </div>
            </div>
           
        </div>
        

  
 );

export default Questions;

