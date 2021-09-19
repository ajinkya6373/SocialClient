import styled  from "styled-components/macro";
export const BirthdayContainer = styled.div`
    display: flex;
    align-items: center;
    @media (max-width: 768px) {
        display: none;
      }
`
export const BirthdayImage = styled.img`
    width: 40px;
    height: 40px;
    margin-right: 10px;
    @media (max-width: 768px) {
        display: none;
      }

`
export const BirthdayText= styled.span`
    font-weight: 300;
    font-size: 15px;
`
export const RightbarAd= styled.img`
    width: 100%;
    border-radius: 10px;
    margin: 30px 0;
    @media (max-width: 768px) {
        display: none;
      }

`
export const RightbarTitle= styled.span`
margin-bottom: 20px;
`
export const RightbarFriendList = styled.ul`
    padding: 0;
    margin: 0;
    list-style: none;
`