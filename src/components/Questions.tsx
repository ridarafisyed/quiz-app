import React from 'react'
import {AnswerObject} from './StartGame'

// styling 

import {QuestionCard, ButtonWrapper} from "../style/QuestionCard.styles"

type Props ={
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNo: number;
    totalQuestions: number;
    score: number;
    level: number;
    subject: string;
};

 const Questions:React.FC<Props> =({question,answers,callback,userAnswer,questionNo,totalQuestions,score,level, subject }) => (

  
        <div className="container text-center">
            <div>
                <h3>{subject}</h3>
            </div>

            {/* game status */}
            <div className="row">
                <div className="col-6">
                    <p>Score: {score} </p>
                </div>
                <div className="col-6">
                    <p>Level {level +1}/3</p>
                </div>
               
            </div>
            
            {/* question card */}
            <QuestionCard className="row">
               <div className="question  col-sm-6 col-xs-12">
                   <div className="">
                       <h6>Question # {questionNo + 1} - {totalQuestions}</h6>
                       <h5 className ="" dangerouslySetInnerHTML ={{__html:question}}/>
                    </div>  
                </div>
                <div className=" options col-sm-6 col-xs-12  mx-auto d-block">
                    {answers.map((answer)=> (
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
          </QuestionCard>
        </div>
        

  
 );

export default Questions;

