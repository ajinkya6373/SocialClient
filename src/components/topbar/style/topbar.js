import styled from "styled-components/macro"

export const TopbarContainer = styled.div`
    height: 50px;
    width: 100%;
    background-color: #1877f2;
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 999;

    
`
export const TopbarLeft = styled.div`
    flex:3;
    @media (max-width:480px) {
        flex:1;
      }

`
export const Logo = styled.span`
    font-size: 24px;
    margin-left: 20px;
    font-weight: bold;
    color: white;
    cursor: pointer;

`
export const TopbarCenter = styled.div`
    flex: 5;
    @media (max-width:490px) {
        display:none;
      }
    
`
export const SearchBar = styled.div`
    width: 100%;
    height: 30px;
    background-color: white;
    border-radius: 30px;
    display: flex;
    align-items: center;

`
export const SearchIcon = styled.div`
    font-size: 20px !important;
    margin-left: 10px;
    margin-top:7px;
    display :inline-block;
`

export const Input = styled.input`
    border: none;
    width: 70%;

&:focus{
    outline: none;
}
`

export const TopbarRight = styled.div`
    flex: 4;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: white;
    @media (max-width:580px) {
        justify-content: right;
        margin: 0px 24px;
      }
`

export const TopbarLinks = styled.div`
@media (max-width:580px) {
    display:none;
  }
`

export const Topbarlink = styled.span`
margin-right: 10px;
font-size: 14px;
cursor: pointer;

`

export const TobarIcons = styled.div`
display: flex;

`

export const TobarIconItem = styled.div`
    margin-right: 15px;
    cursor: pointer;
    position: relative;


`

export const TobarIconBadge = styled.span`
    width: 15px;
    height: 15px;
    background-color: red;
    border-radius: 50%;
    color: white;
    position: absolute;
    top: -5px;
    right: -5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;

` 

export const Image = styled.img`
width: 32px;
height: 32px;
border-radius: 50%;
object-fit: cover;
cursor: pointer;

`