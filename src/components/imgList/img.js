
import styled from "styled-components/macro";

export const Wrapper =styled.div`

display:flex;
align-item:center;
justify-content :center;

`
export const Image = styled.img`

    flex:5;
    height: 500px;
    background-color: black;
    object-fit: contain;

    @media (max-width: 768px) {
        max-width:12rem;
      }
`
export const Desc = styled.div`
    display:flex;
    top:0;
    // border:2px solid blue;
    flex-direction:column;
    width: 234px;
    max-width:500px;
    max-height:500px;
    margin-left: 12px;

    // @media (max-width: 768px) {
    //     max-width:5rem;
    //   }
`
export const Text = styled.p`
    flex:4;
    // border:2px solid red;
    font-weight:400;
    font-size:12px;
    overflow:scroll;
    // @media (max-width: 768px) {
    //     max-width:12rem;
    //   }
`
export const SubText = styled.p`
    // flex:0;
    font-size:12px;
    font-weight:450;
    // @media (max-width: 768px) {
    //     max-width:12rem;
    //   }
`

export const DescBottom = styled.div`
    flex:0;
    // font-size:12px;
    // font-weight:450;
    // @media (max-width: 768px) {
    //     max-width:12rem;
    //   }
`

export const Input = styled.input`
border:none;
outline:none;
flex-grow:1;

`
export const Button =styled.button`
      border:none;
      background:none;
      cursor:pointer;
      color:#0095f6;
      
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
`

