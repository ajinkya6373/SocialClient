import { useStateValue } from '../../context/AuthContext'
import {
    MessageConatainer,
    Top,
    Text,
    Bottom
} from './style/message'
import { format } from 'timeago.js';


export default function Message({message}) {
    const [{user:currentUser}] = useStateValue()
    return (
        <MessageConatainer own={message.sender===currentUser._id}>
            <Top>
                <Text>{message.text}</Text>
            </Top>
            <Bottom> {format(message.createdAt)} </Bottom>
        </MessageConatainer>
    )
}
