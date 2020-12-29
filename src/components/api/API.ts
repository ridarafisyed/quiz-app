import axios from "axios" 
import {shuffleArray} from '../utils/utils'

export type Question ={
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question:string;
    type: string;
}
export type QuestionState = Question & {
    answers: string[]
} 

export type CategoryList = {
    id: number;
    name: string;
}
export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
}
// const ref_link =" https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple"

export const fetchQuestions = async (amount:number,difficulty: Difficulty, category:number) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(endpoint)).json();
    return data.results.map((question: Question) => ({
        ...question,
        answers: shuffleArray([...question.incorrect_answers, question.correct_answer])

      }))
}

//fucntion to fetch all the categories 
export const fetchCategoties = async () => {
    const cat = `https://opentdb.com/api_category.php`;
    const cat_data = await(await fetch(cat)).json();

    return cat_data.trivia_categories.map((category: CategoryList)=>(
        {
            ...category,
        }
    ))

    
}
  
