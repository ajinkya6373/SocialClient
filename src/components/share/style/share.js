import styled from "styled-components/macro";

export const ShareContainer = styled.div`
    width: 100%;
    border-radius: 10px;
    -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
    box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
`
export const  Wrapper = styled.div`
padding: 10px;

`
export const  ShareTop = styled.div`
display: flex;
align-items: center;

`
export const  Image = styled.img`
width: 50px;
height: 50px;
border-radius: 50%;
object-fit: cover;
margin-right: 10px;

`
export const  Input = styled.input`
border: none;
width: 80%;

&:focus{
    outline: none;
}
`
export const  Divider= styled.hr`
margin: 20px;
`
export const   ShareImgContainer= styled.div`
padding: 0 20px 10px 20px;
position: relative;
`
export const  ShareImg= styled.img`
width: 100%;
object-fit: cover;
`
export const  ShareCancelImg = styled.label`
position: absolute;
top: 0;
right: 20px;
cursor: pointer;
opacity: 0.7;
`
export const  ShareBottom = styled.form`
display: flex;
align-items: center;
justify-content: space-between;
width:100%;
`
export const ShareOptions = styled.div`
    display: flex;
    margin-left: 20px;
    @media (max-width: 730px) {
        margin-left: 0px;
      }
`
export const ShareOption = styled.label`
    display: flex;
    align-items: center;
    margin-right: 15px;
    cursor: pointer;
`
export const Icon = styled.span`
    font-size: 18px;
    margin-right: 3px;
    color:${({ color }) => color};
`
export const Text= styled.span`
    font-size: 14px;
    font-weight: 500;
    @media (max-width: 730px) {
        font-size: 10px;
      }
    @media (max-width: 444px) {
      display:none;
      }
    
`
export const ShareButton = styled.button`
    border: none;
    padding: 7px;
    border-radius: 5px;
    background-color: green;
    font-weight: 500;
    margin-right: 20px;
    cursor: pointer;
    color: white;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

`
