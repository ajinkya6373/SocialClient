
import {
    Container,
    Text,
    Img,
} from './style/conversetion'
import { useEffect, useState } from 'react';
import{fetchUserById} from "../../ApiCall"
export default function Conversetion({ conversetion, currentUser }) {
    const [friend, setFriend] = useState(null)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const friendId = conversetion.members.find((m) => m !== currentUser._id)
    useEffect(() => {
            fetchUserById(friendId).then((res)=>{
                setFriend(res.data)
            })
    }, [currentUser, conversetion,friendId])
    return <Container>
           <Img src={friend?.profilePicture 
            ? PF+friend.profilePicture 
            : PF + "/person/noAvatar.png" } />
            <Text>{friend?.username}</Text>
        </Container>
    
}
