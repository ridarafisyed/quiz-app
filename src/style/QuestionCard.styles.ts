import styled from "styled-components"

export const Wrapper = styled.div`

    max-width:100%;
    background: #ebfeff;
    border-radius:10px;
    border:2px solid #0085a3;
    box-shadow:0px 5px 10px rgba(0,0,0,0.2);
    text-align: center;

    p{
        font-size:1rem;
    } // for specifing only p in the wrapper 
    .score {} // for class .score
    h1 {} 
`

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
            ? 'linear-gradient(90deg, #8B0000, #8B0000)' 
            : 'linear-gradient(90deg, #8B008B, #8B008B)'
        };
        border: 0.5px solid #fff;
        box-shadow: 1px 2px 0px rgba(0,0,0,0.1);
        color:#fff;
    }
     
`
