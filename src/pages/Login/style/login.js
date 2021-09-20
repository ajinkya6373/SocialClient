import styled from "styled-components/macro";

export const Container = styled.div`
width: 100vw;
height: 100vh;
background-color: #f0f2f5;
display: flex;
align-items: center;
justify-content: center;

`
export const  Wrapper = styled.div`
width: 70%;
height: 70%;
display: flex;
@media (max-width:850px) {
    flex-direction: column;
    }
`
export const LeftConatainer = styled.div`
flex: 1;
display: flex;
flex-direction: column;
justify-content: center;

`
export const Logo = styled.h3`
font-size: 50px;
font-weight: 800;
color: #1775ee;
margin-bottom: 10px;
@media (max-width:850px) {
    text-align: center;
    font-size: 40px;
    }
`
export const LoginDescription = styled.span`
font-size: 24px;
@media (max-width:850px) {
    text-align: center;
    font-size: 15px;
    }
`
export const  RightContainar = styled(LeftConatainer)``
export const LoginBox = styled.form`
height: 300px;
padding: 20px;
background-color: white;
border-radius: 10px;
display: flex;
flex-direction: column;
justify-content: space-between;


`
export const Input = styled.input`
    height: 50px;
    border-radius: 10px;
    border: 1px solid gray;
    font-size: 18px;
    padding-left: 20px;
    
    &:focus{
    outline: none;
    }
`
export const LoginButton = styled.button`
    height: 50px;
    border-radius: 10px;
    border: none;
    background-color: #1775ee;
    color: white;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;

`
export const ForgotPass= styled.span`
    text-align: center;
    color: #1775ee;
`
export const RegisterButton= styled.button`
    width: 60%;
    margin-left:20%;
    height: 50px;
    border-radius: 10px;
    border: none;
    background-color: #42b72a;
    color: white;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
    @media (max-width:850px) {
        font-size: 15px;
    }
`
