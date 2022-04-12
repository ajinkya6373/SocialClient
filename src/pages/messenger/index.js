import {
    Container,
    ChatMenu,
    MenuWrapper,
    MenuInput,
    ChatBox,
    ChatBoxWrapper,
    ChatOnline,
    OnlineWrapper,
    ChatBoxTop,
    ChatBoxBottom,
    ChatInput,
    ChatSubmitButton,
    Nocoversation

} from "./style/messenger"
import { useState, useEffect, useRef } from 'react'
import { Topbar, Conversetion, Message,OnlineFriend } from '../../components'
import { useStateValue } from "../../context/AuthContext"
import {
    fetchConvesation,
    fetchMessages,
    PostMessage,
} from "../../ApiCall"

export default function MessengerPage() {
    const [conversation, setConversetion] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [message, setMessage] = useState(null)
    const [newMessage, setNewMessage] = useState('')
    const [arrivalMessage, setArrivalMessage] = useState([]);
    // let [arrivalCount, setArrivalCount] = useState(0);
    const [{user,socket,onlineUsers}] = useStateValue()
    const scrollRef = useRef();

    //initialization of socket and get message from socket 
    useEffect(() => {
        socket?.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
                conversationId:data.conversationId,
            }) 
        })
    }, [])

    //set Arrivalmessage to the our message array
    useEffect(() => {
        arrivalMessage &&
          currentChat?.members.includes(arrivalMessage.sender) &&
          setMessage((prev) => [...prev, arrivalMessage]);
        
      }, [arrivalMessage, currentChat]);

    //   useEffect(()=>{
    //     // setArrivalCount(arrivalCount+1)
    //     // console.log(arrivalCount);
    //     console.log(arrivalMessage);
    //     // console.log(currentChat);
    //   },[arrivalMessage])

    //fetch all conversation of user
    useEffect(() => {
        fetchConvesation(user._id).then((res)=>{
            setConversetion(res.data)
        })
    }, [user._id])

    //fetch all messages of currentChat
    useEffect(() => {
        fetchMessages(currentChat?._id).then((res)=>{
            setMessage(res.data)
        })
    }, [currentChat])

    // save new message into the data base and pass to socket server
    const handleSubmit = async (e) => {
        e.preventDefault();

        const receiverId = currentChat.members.find(
            (member) => member !== user._id
        );
        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage,
            conversationId:currentChat._id
        });
        PostMessage(user._id,newMessage,receiverId,currentChat._id).then((res)=>{
            setMessage([...message, res.data])
            setNewMessage('')
        }) 
    }
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [message, newMessage]);
   
    return (
        <>
            <Topbar />
            <Container>
                <ChatMenu>
                    <MenuWrapper>
                        <MenuInput placeholder="Search for friends" />
                        {conversation.map((c) => (
                            <div onClick={() => setCurrentChat(c)} key={c._id}>
                                <Conversetion 
                                conversetion={c} 
                                currentUser={user} 
                                currentChat={currentChat} 
                                arrivalMessage={arrivalMessage}
                               />
                            </div>
                        )
                        )}
                    </MenuWrapper>
                </ChatMenu>
                <ChatBox>
                    <ChatBoxWrapper>
                        {currentChat ?
                            <>
                                <ChatBoxTop>
                                    {message.length !== 0 ? message.map((m) => (
                                        <div ref={scrollRef} key={m._id} >
                                            <Message message={m} key={m._id} />
                                        </div>
                                    )) : <Nocoversation> No previous messages  </Nocoversation>
                                    }
                                </ChatBoxTop>
                                <ChatBoxBottom>
                                    <ChatInput
                                        placeholder="write something..."
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                    />
                                    <ChatSubmitButton onClick={handleSubmit} disabled={newMessage === ''}>
                                        send
                                    </ChatSubmitButton>
                                </ChatBoxBottom>
                            </>
                            : < Nocoversation> Open a conversation to start a chat. </ Nocoversation>}
                    </ChatBoxWrapper>
                </ChatBox>
                <ChatOnline>
                    <OnlineWrapper>
                        <OnlineFriend 
                        setCurrentChat={setCurrentChat}
                        onlineUsers={onlineUsers}/>
                    </OnlineWrapper>
                </ChatOnline>
            </Container>
        </>
    )
}
