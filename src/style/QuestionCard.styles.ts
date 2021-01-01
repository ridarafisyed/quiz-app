import styled from "styled-components"


export const QuestionCard = styled.div`
    border-radius:10px;

    margin:2% 0 5% 0;
    border:2px yellow;
    box-shadow:0px 5px 10px #8B008B;
    
    .question{
        background-color: #8B008B;
        color: white;
        border-radius:10px 0px 0px 10px;
        margin:0;
        padding:auto;

        text-align: center;
    }
    .options{
        margin:auto;        
        padding-top:auto;
    }
`;

type ButtonWrapperProps ={
    correct: boolean;
    userClicked: boolean
}
export const ButtonWrapper = styled.div<ButtonWrapperProps>`
    transition: all 0.3s ease;

    :hover{
        opacity: 0.8;
    }
    :disabled{
        opacity:0.9;
    }
    button{
        cursor: pointer;
        user-select:none;
        font-size:0.8rem;
        width:100%;
        height: 40px;
        margin:5px 0;
        background:${({correct, userClicked})=>
            correct 
            ?'linear-gradient(90deg, #006400, #006400)' //green
            : !correct && userClicked 
            ? 'linear-gradient(90deg, #8B0000, #8B0000)' //red
            : 'linear-gradient(90deg, #8B008B, #8B008B)' //purple
        };
        border: 0.5px solid #fff;
        box-shadow: 1px 2px 0px rgba(0,0,0,0.1);
        color:#fff;
    }
     
`
