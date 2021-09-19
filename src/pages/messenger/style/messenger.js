import styled from "styled-components/macro";

export const Container = styled.div`
height:calc(100vh - 50px);
display:flex;
`
export const ChatMenu = styled.div`
flex:3.5;
@media (max-width: 768px) {
    flex: 1;
  }


`
export const MenuWrapper = styled.div`
    padding: 10px;
    height: 100%;
    @media (max-width: 768px) {
        padding: 10px 2px;
      }
`
export const MenuInput = styled.input`
    width: 90%;
    padding: 10px 0;
    border: none;
    border-bottom: 1px solid gray;
    outline:none;
    @media (max-width: 768px) {
        display: none;
      }
`
export const ChatBox = styled.div`
    flex:5.5;
    @media (max-width: 768px) {
        flex: 10;
      }
 
`
export const ChatBoxTop=styled.div`
    height: 100%;
    overflow-y: scroll;
    padding-right: 10px;
    &::-webkit-scrollbar{
        width: 5px;
    }
    &::-webkit-scrollbar-track {
        background-color: #f1f1f1;
      }
    &::-webkit-scrollbar-thumb {
        background-color: rgb(179, 179, 179);
      }
      
`
export const ChatBoxBottom=styled.div`

    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;

`
export const ChatInput=styled.textarea`
    width: 80%;
    height: 90px;
    padding: 10px;
`
export const ChatSubmitButton=styled.button`
    width: 70px;
    height: 40px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: teal;
    color: white;
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
`
export const ChatBoxWrapper = styled(MenuWrapper)`
display: flex;
flex-direction: column;
justify-content: space-between;
position: relative;
`
export const ChatOnline = styled.div`
    flex:3;
    @media (max-width: 768px) {
        flex: 1px;
      }
`
export const OnlineWrapper = styled(MenuWrapper)``
export const  Nocoversation = styled.span`
    position: absolute;
    top: 10%;
    font-size: 50px;
    color: rgb(224, 220, 220);
    cursor: default;
`