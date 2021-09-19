import styled from "styled-components/macro";

export const UpdateContainer = styled.div`
    display:flex;
    align-item:center;
    justify-content:center;
`
export const Container = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    width:80%;
    margin-top:40px;
    padding:2rem 0rem;
    -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
    box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
`
export const Profile = styled.label`
    display:inline-block;
`

export const Form = styled.form`
    width:50%;
    margin-top:8px;
`
export const FormItem = styled.div`
    display:flex;
    flex-direction:column;
    margin-top:8px;
`
export const Label = styled.label``
export const FormInput = styled.input`
    outline:none;
    border:none;
    border-bottom:2px solid black;
`
export const Text = styled.h3`
    color:${props=> props.color || "#1877f2"}; 
    margin:2px 8px;
    diplay :flex;
    align-items:center;
    margin-top:${props=> props.color ? "5px": "10px"};
    justify-content:center;
`
export const PasswordContainer = styled.div`
    margin-top:10px;
    display:${props=>props.display ? "flex" : "none"};
    flex-direction:column;
    align-items:center;
    justify-content:center;
`
export const PasswordInput = styled.input`
    outline:none;
    padding:5px 6px;
    width:400px;
    border-radius:5px;
    margin-top:10px;
`
export const Button = styled.button`
    margin-top:10px;
    margin-bottom: 10px;
    border: none;
    background-color: #1872f2;
    color: white;
    border-radius: 5px;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
`