import styled from "styled-components/macro";

export const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    margin-top: 3px;
    &:hover{
        background-color: rgb(245, 243, 243);
    }

 
`
export const Img = styled.img`       
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 20px;
    @media (max-width: 390px) {
        margin-right: 2px;
      }
`
export const Text = styled.span`
    font-weight: 500;
    @media (max-width:390px) {
        font-size: 11px;
      }
`