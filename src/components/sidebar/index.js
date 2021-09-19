import React from 'react'
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend"
import {
    RssFeed,
    Chat,
    PlayCircleFilledOutlined,
    Group,
    Bookmark,
    HelpOutline,
    WorkOutline,
    Event,
    School,
} from "@material-ui/icons";
import {
    SidebarConatiner,
    Wrapper,
    List,
    ListItem,
    Icon,
    Text,
    SidebarButton,
    Divider,
    FriendList,
} from "./style/sidebar"



export default function Sidebar() {
    return (
        <SidebarConatiner>
            <Wrapper>
                <List>
                    <ListItem>
                        <Icon><RssFeed /></Icon>
                        <Text>Feed</Text>
                    </ListItem>
                    <ListItem>
                        <Icon><Chat /></Icon>
                        <Text>Chats</Text>
                    </ListItem>
                    <ListItem>
                        <Icon><PlayCircleFilledOutlined /></Icon>
                        <Text>Videos</Text>
                    </ListItem>
                    <ListItem>
                        <Icon><Group /></Icon>
                        <Text>Groups</Text>
                    </ListItem>
                    <ListItem>
                        <Icon><Bookmark /></Icon>
                        <Text>Bookmarks</Text>
                    </ListItem>
                    <ListItem>
                        <Icon><HelpOutline /></Icon>
                        <Text>Questions</Text>
                    </ListItem>
                    <ListItem>
                        <Icon><WorkOutline /></Icon>
                        <Text>Jobs</Text>
                    </ListItem>
                    <ListItem>
                        <Icon><Event /></Icon>
                        <Text>Events</Text>
                    </ListItem>
                    <ListItem>
                        <Icon><School /></Icon>
                        <Text>Courses</Text>
                    </ListItem>
                </List>
                <SidebarButton>Show More</SidebarButton>
                <Divider />
                <FriendList>
                   
                    {
                        Users.map((friend) => {
                           return <CloseFriend key ={friend.id} user={friend}/>
                        })
                    }
                    {
                        Users.map((friend) => {
                           return <CloseFriend key ={friend.id} user={friend}/>
                        })
                    }

                </FriendList>
            </Wrapper>

        </SidebarConatiner>
    )
}
