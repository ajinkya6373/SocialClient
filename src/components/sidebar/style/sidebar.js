import styled from "styled-components/macro";

export const SidebarConatiner = styled.div`
    position: sticky;
    top: 50px;
    flex:3;
    height:calc(100vh - 50px);
    overflow-y: scroll;

    &::-webkit-scrollbar{
        width: 5px;
    }
    &::-webkit-scrollbar-track {
        background-color: #f1f1f1;
      }
    &::-webkit-scrollbar-thumb {
        background-color: rgb(179, 179, 179);
      }

      @media (max-width:768px) {
        display:none;
      }

      

`
export const Wrapper = styled.div`
    padding: 20px;  
`
export const List = styled.ul`
    padding: 0;
    margin: 0;
    list-style: none;
`
export const ListItem = styled.li`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`
export const Icon = styled.span`
    margin-right: 15px; 
    cursor:pointer;
`
export const Text = styled.span``
export const SidebarButton = styled.button`
    width: 150px;
    border: none;
    padding: 10px;
    border-radius: 5px;
    font-weight: 500;
    cursor:pointer;
`

export const Divider = styled.hr`
    margin: 20px 0;
`
export const FriendList = styled(List)``





