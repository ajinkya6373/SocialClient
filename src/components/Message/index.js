import { useStateValue } from '../../context/AuthContext'
import {
    MessageConatainer,
    Top,
    Img,
    Text,
    Bottom
} from './style/message'
import { format } from 'timeago.js'
import { useState,useEffect} from 'react'
import {fetchUserById} from "../../ApiCall"

export default function Message({message}) {
    const [{user:currentUser}] = useStateValue()
    const [user,setUser] = useState()
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    useEffect(() => {
    fetchUserById(message.sender).then((res)=>{
        setUser(res.data)
    })
    }, [message])
    return (
        <MessageConatainer own={message.sender===currentUser._id}>
            <Top>
                <Img src= {user?.profilePicture? PF + user?.profilePicture: PF+"person/noAvatar.png" }/>
                <Text>{message.text}</Text>
            </Top>
            <Bottom> {format(message.createdAt)} </Bottom>
        </MessageConatainer>
    )
}
