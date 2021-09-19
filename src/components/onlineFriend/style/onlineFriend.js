import styled from "styled-components/macro";

export const ChatOnline = styled.div``
export const Friends = styled.div`
    display: flex;
    align-items: center;
    font-weight: 500;
    cursor: pointer;
    margin-top: 10px;
    @media (max-width: 768px) {
        flex-direction:column;
    }
`
export const ImgConatainer = styled.div`
    position: relative;
    margin-right: 10px;
`
export const  Img = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid white;
`
export const  OnlineBadge = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: limegreen;
    position: absolute;
    top: 2px;
    right: 2px;
`
export const  Name = styled.span``