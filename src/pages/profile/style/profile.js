
import styled from "styled-components/macro";
export const Profile = styled.div`
    // display:flex;
    position:relative;
    // display: flex;
    
    // border:2px solid red;
`
export const ProfileRight = styled.div`
    flex: 9;
`
export const ProfileRightTop = styled.div`

`
export const ProfileCover = styled.div`
    height: 320px;
    position: relative;
`
export const CoverImage = styled.img`
    width: 100%;
    height: 250px;
    object-fit: cover;
`

export const ProfileImage = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 150px;
    border: 3px solid white;
    cursor:pointer;
    background-color: white;
`
export const ProfileWrapper = styled.label``
export const Meta = styled.div`
    position:absolute;
    display:none;
    object-fit:cover;
    left:0;
    width:150px;
    height:150px;
    right:0;
    top:150px;
    border-radius:50%;
    margin:auto;
    background-color:#0000008f;
    text-align:center;
    transition: background-color 0.5s ease 0s;
    justify-content:center;

    ${ProfileWrapper}:hover & {
        display:flex;
    }
    
`
export const MetaLabel = styled.label`
    color:white;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:small;
    cursor:pointer;
`

export const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

`
export const ProfileName = styled.h4`
    font-size: 24px;
`
export const Description = styled.span`
    font-weight: 300;
`
export const ProfileRightBottom = styled.div`
    display: flex;  
    // align-items: center;
    justify-content: center;
`
export const Setting = styled.div`
    position:absolute;
    right:8px;
    z-index: 1;
    top: 254px;
`
export const SetCoverpic = styled.label`
    position:absolute;
    right:8px;
    z-index: 1;
    top: 7px;
`
