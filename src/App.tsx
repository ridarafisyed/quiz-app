import React, { useState,useEffect } from 'react';
import axios from 'axios';

// css styling 
import "./style/css/bootstrap.min.css"
import StartGame from './components/StartGame';
import {GlobalStyle, Wrapper} from "./style/App.styles"



const App = () => {
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
    <>
      <GlobalStyle/>
      <Wrapper>
        <header className="heading text-center">
          <h1>Quiz Trivia </h1>
        </header>
        
        {cat_id === 0 ? 
          <div className="row">


            <div className="card-deck">
            {
            categories.map( ({id , name}, key) => {
            return (
              <div className="col-md-4 col-sm-12" key={id}>
                  <div className=" category-card card border-warning  text-center"  >
                      <div className="card-body">
                        <div className="card-title" style={{height:"50px"}}>
                          {name}
                        </div>
                          <button className="btn btn-warning" onClick={e => {setCatId(id); setCatName(name); }} key={id}>Start Quiz</button>
                      </div>
                      {/* <div className="card-footer"></div> */}
                    </div>
                    <br/>
                    <br/>
                </div>
                )
                })}
              </div>
              

          </div> 
          : 
          <StartGame id={cat_id} name={cat_name}/>
          }

      
      </Wrapper>
    </>
  );
}

export default App;
