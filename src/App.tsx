import React, { useState,useEffect } from 'react';
import axios from 'axios';

// Application Components
import StartGame from './components/StartGame';

// Material UI Components 
import { makeStyles, } from '@material-ui/core/styles';
import {Grid, Paper, Button, Card,  Container, CardContent, Typography, } from "@material-ui/core/";



// css styling 
import "./style/css/bootstrap.min.css"

const useStyles = makeStyles({
  body:{
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white',
    
  },
  root: {
   
  },
  header:{
    margin:"auto",
    color: 'white',
    padding: 75,
      },

  button:{
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color:"white",
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    display:"flex",
    margin:"auto",
    alignItems:"center",
  },
  cardContainer:{
    padding:20,
  },
  card:{
    height: 175,
  },

});



const App = () => {
  const classes = useStyles();
  const [cat_id, setCatId] = useState(0);
  const [cat_name, setCatName] = useState("")
  const [categories, setCategories] = useState([]);

  // getting the categories from API. 
  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php")
      .then(res =>{
        setCategories(res.data.trivia_categories)
      })
      .catch(err =>{
      })
  }, [])
  

  return (
    <div className={classes.body}>
        <Container >
          <Grid item xs className={classes.header}>
              <header className="heading text-center">
                <h1>Quiz Trivia </h1>
              </header>
          </Grid>
          {cat_id === 0 ? 
            <Grid container spacing={3} className={classes.cardContainer}>            
              {
              categories.map( ({id , name}, key) => {
              return (
                <Grid item xs={12} sm={4}   key={id}>
                  <Paper elevation={3} style={{alignContent:"center"}}square >
                    <Card className={classes.card}>
                      <CardContent  style={{alignItems:"center"}}>
                        <Typography variant="h5" component="h3" align="center">
                        {name}
                        </Typography>
                        </CardContent>
                        <Button 
                          className={classes.button}
                          variant="contained" 
                          color="primary" 
                          onClick={e => {setCatId(id); setCatName(name); }} 
                          key={id}>
                            Start Quiz
                            </Button>
                    
                      
                      </Card>       
                    </Paper>
                  </Grid>
                  )
                  })}
            </Grid> 
            : 
            <StartGame id={cat_id} name={cat_name}/>
            }
       </Container>
     </div>
  );
}

export default App;
