
import {
    Container,
    Text,
    Img,
} from './style/conversetion'
import { useEffect, useState } from 'react';
import {
    fetchUserById,
    unseenMeaasge,
    markRead,
} from "../../ApiCall"
import Badge from '@mui/material/Badge';

export default function Conversetion({ conversetion, currentUser, currentChat,arrivalMessage}) {
    const [friend, setFriend] = useState(null)
    let [unSeen, setunseen] = useState(0);
    let [notificationCount, setNoticount] = useState(0)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const friendId = conversetion.members.find((m) => m !== currentUser._id)
    useEffect(() => {
        fetchUserById(friendId).then((res) => {
            setFriend(res.data)
        })
    }, [currentUser, conversetion, friendId])

    useEffect(() => {
        unseenMeaasge(friendId).then((res) => {
            setunseen(res.data);
            setNoticount(res.data.count)
        })
    }, [friendId])
    useEffect(()=>{
        if(arrivalMessage?.conversationId == conversetion._id){
            arrivalMessage.conversationId !==  currentChat?._id && setNoticount(notificationCount+1);
        }
    },[arrivalMessage])
    useEffect(() => {
        if (currentChat?._id === conversetion._id) {
            unSeen.message.map((m) => {
              return  markRead(m._id);
            })
            setNoticount(0);
        }

    }, [currentChat?._id,unSeen.message])
  
    return <Container>
        <Img src={friend?.profilePicture.url || PF + "/person/noAvatar.png"} />
        <Text>{friend?.username}</Text>
        {
            notificationCount >0 && <Badge  badgeContent={notificationCount} color="success" />
        }
    </Container>

}
