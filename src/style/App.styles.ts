import styled, {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`

    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,300;1,500&display=swap');
    *{
        box-sizing:border-box;
        font-family: 'Roboto', sans-serif;
    }

    html {
        height:100%;
        width:100%

    }
    body{
        /* background-color: #F5F4E1; */
        background-size:cover;
        width:100%;
        margin:0;
        padding: 0 20px;
        display:flex;
        justify-content: center;

    }
    .btn{
        background-color:#FFC034;
        font-weight:500;
        border: none;
    }

    
    .jumbotron{
        background-color: #FFC034;
        font-weight:1,700;
    }
`;

