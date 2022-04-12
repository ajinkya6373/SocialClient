import styled from "styled-components/macro"

export  const Text= styled.p`
padding: 10px;
border-radius: 20px;
background-color: gray;
color: white;
max-width: 300px;
`
export const MessageConatainer = styled.div`
display: flex;
flex-direction: column;
margin-top: 20px;
align-items:${props =>props.own && "flex-end"};
${props =>props.own} && ${Text}{
    background-color: blue;
}
`
export  const Top= styled.div`
display: flex;
`
export  const Img= styled.img`
width: 32px;
height: 32px;
border-radius: 50%;
object-fit: cover;
margin-right: 10px;
`

export  const Bottom= styled.div`
font-size: 12px;
margin-top: 10px;
`