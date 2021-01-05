import React, { useState } from 'react'
import {AnswerObject} from './StartGame'

// Material UI Components 
import {makeStyles,} from '@material-ui/core/styles';
import {Paper, Button, Grid, Card, CardContent, CardActions, Container, Typography} from "@material-ui/core/";

const useStyles = makeStyles({
  button:{
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white',
    display:"flex",
    margin:"auto",
    alignItems:"center",
    width:"100%",
    
  },
  button_correct:{
      background:"green",
      color:"white",
  },
  button_false:{
      background:"red",
      color:"white",
  },
  question:{
      margin:30,
      marginTop:40,
  },
  container:{
      height:200,
  },
  card:{
      margin:"auto",
      alignItems:"center",
      paddingTop:20,
      paddingBottom:10,
      height:"auto",
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
}
})

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

 const Questions:React.FC<Props> =({question,answers,callback,userAnswer,questionNo,totalQuestions,score,level, subject }) => {
     const classes = useStyles();
     const [selectionStyle, setSlectionStyle] = useState("linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)");

     const onSelectOption = (e: React.MouseEvent<HTMLButtonElement>) =>{
          const selection = e.currentTarget.value;
          if (userAnswer?.correctAnswer === selection){
              setSlectionStyle('green');
          }else if(userAnswer?.correctAnswer !== selection){
              setSlectionStyle('red');
          }
          else {
              setSlectionStyle('linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)')
          }
          callback(e);
     }
     return (
         <Container>
             <Typography variant="h4" component="h2" align="center" >{subject}</Typography>
             <Grid container >
                 <Grid item xs={6} sm={6}>
                    <Typography variant="h6" component="h4" align="center" >
                        Score: {score} 
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <Typography variant="h6" component="h4" align="center">
                        Level {level +1}/3
                    </Typography>
                </Grid>
            </Grid>
             <Card className={classes.card}>
                <Grid container>
                    <Grid item xs={12} sm={6} >
                        <CardContent>
                            <Typography variant="h6" component="h4" align="center">
                                Question No: {questionNo } - {totalQuestions}
                            </Typography>
                            <Typography variant="h5" component="h3" align="center" className={classes.question} dangerouslySetInnerHTML ={{__html:question}}/>
                        </CardContent>        
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <CardContent >
                            {answers.map((answer)=> (
                                <CardActions key = {answer}> 
                                    <Button 
                                        className={classes.button} variant="contained" color="primary"
                                        disabled={!!userAnswer} value={answer} onClick={onSelectOption}>
                                        <span dangerouslySetInnerHTML={{__html: answer}}></span>
                                    </Button>
                                </CardActions>
                                ) )}
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
        </Container>  
    )
}

export default Questions;

