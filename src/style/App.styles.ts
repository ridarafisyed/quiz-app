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
        /* background: linear-gradient(-35deg, #660066 0%, #3333cc 100%); */
        background-repeat:no-repeat;
        background-attachment: fixed;
        background-size:cover;
        width:100%;
        height: 100%;
        /* color:; */
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
    .category-card{
        background:linear-gradient(-35deg, #8B008B 10%, #8B008B 100%);
        color:white;
        box-shadow:0px 5px 10px #8B008B;
    }
    h1{
        color:#8B008B;
        /* font-weight:70rem; */
        font-weight:700;
        /* text-shadow: 2px 2px #8B008B; */
        /* border: 2px solid #f0ad4e; */
        /* -webkit-text-fill-color: #8B008B;  */
        /* -webkit-text-stroke-width: 1px; */
        /* -webkit-text-stroke-color: #f0ad4e; */

    }
    
    .heading{
        /* background-color: #FFC034; */
        /* background-image: url("../sources/bubble.svg"); */
        font-weight:0,700;
        padding:5%
    }
`;
export const Wrapper = styled.div`
    width:100%;
    height: 100%;
    

`;
