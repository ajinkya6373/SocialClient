
import styled from "styled-components/macro";

export const Wrapper = styled.div`
    display:flex;
    padding: 2px 10px;
`
export const BoxLeft = styled.div`
`

export const Image  = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-top:5px;
`
export const BoxRight = styled.div`
    margin-left: 15px;
    margin-top: 3px;
`
export const RightTop = styled.div`
    
`
export const Name = styled.span`
font-weight: 500;
`
export const CommentText = styled.span`
margin-left: 5px;
`

export const RightBottom= styled.div`
margin-top: 7px;
opacity: 0.5;
display:flex;
cursor:pointer;
`
export const Reply= styled.text``
export const Option = styled.div`
    margin-left:5px;
`
export const View = styled.div`
    cursor:pointer;
    opacity: 0.5;
`
export const DeleteBox = styled.div`
line-height: 48px;
width: 21rem;
text-align: center;
`
export const Dltitem = styled.div`
color: ${props=>props.delete ?"red": "black"};
font-size: 20px;
font-weight: 700;
letter-spacing: 0.02em;
cursor:pointer;
`