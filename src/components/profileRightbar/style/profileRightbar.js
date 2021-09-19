import styled from "styled-components/macro";

export const Title = styled.h4`
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 10px;
    @media (max-width:570px) {
        font-size:12px;
      }
      @media (max-width:390px) {
        display:none;
      }
`
export const  Info = styled.div`
margin-bottom: 30px;
@media (max-width:390px) {
    display:none;
  }

`
export const  InfoItem = styled.div`
margin-bottom: 10px;
`
export const InfoKey = styled.span`
font-weight: 500;
margin-right: 15px;
color: #555;
@media (max-width:570px) {
    margin-right: 2px;
    font-size:11px;
  }
`
export const InfoValue = styled.span`
font-weight: 300;
@media (max-width:570px) {
    font-size:11px;
  }
`
export const Followings = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-evenly;
`
export const Following = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    cursor: pointer;
`
export const Image = styled.img`
width: 100px;
height: 100px;
object-fit: cover;
border-radius: 5px;
@media (max-width:520px) {
    width: 50px;
    height: 50px;
  }
`
export const Name = styled.span`
@media (max-width:520px) {
    font-size: 11px;
  }
`
export const LogOutButton = styled.button`
display:flex;
align-items:center;
background-color: white;
justify-content:center;
border:none;
border-radius: 5px;
cursor: pointer;
padding:2px 0px;
margin-bottom:10px;
@media (max-width:520px) {
    flex-direction: column;
  }
`
export const Icon = styled.span`
margin-top:3px;
color:blue;
`
export const Text = styled.span`
color:black;
font-size: 17px;
margin-left:2px;
font-weight: 600;
`
export const FollowButton = styled.button`
margin-top: 30px;
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