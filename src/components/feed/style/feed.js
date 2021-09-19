import styled from "styled-components/macro";

export const FeedContainer =styled.div`
    flex:5.5;

    @media (max-width:768px) {
        flex:4.5;
        width:100%;
      }
`

export const Wrapper = styled.div`
    padding: 20px;
    @media (max-width:354px) {
      padding-left:6px;
      }
`
export const  Nofeed = styled.span`
    display : flex;
    justify-content: center;
    margin-top: 89px;
    font-size: 50px;
    color: rgb(224, 220, 220);
    cursor: default;
`