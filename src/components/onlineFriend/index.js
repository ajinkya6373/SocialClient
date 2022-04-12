
import {
  ChatOnline,
  Friends,
  ImgConatainer,
  Img,
  OnlineBadge,
  Name,
} from './style/onlineFriend'
import { useEffect, useState } from 'react';
import { fetchFriends } from "../../ApiCall"
import axios from 'axios';
import { useStateValue } from '../../context/AuthContext';

export default function OnlineFriend({ onlineUsers, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [{ user }] = useStateValue();

  useEffect(() => {
    fetchFriends(user?._id).then((res) => {
      setFriends(res.data)
    })
  }, [user._id]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers?.includes(f._id)));
 
  }, [friends, onlineUsers]);
  const handleClick = async (friend) => {
    try {
      const res = await axios.get(
        `/conv/find/${user?._id}/${friend?._id}`

      );
      setCurrentChat(res.data);
      if (res.data === null) {
        const res = await axios.post(`/conv/${friend?._id}`, { senderId: user?._id })
        setCurrentChat(res.data);
      }

    } catch (err) {
      console.log(err);
    }
  };
  return (
    
    <ChatOnline>
      <>
      { onlineFriends.length!==0 ? <div>online</div>: <div>no online Friends</div>}
      {onlineFriends.map((o) => (
        <Friends key={o._id} onClick={() => handleClick(o)}>
          <ImgConatainer>
            <Img src={
              o?.profilePicture
                ? o.profilePicture.url
                : PF + "person/noAvatar.png"
            }
            />
            <OnlineBadge></OnlineBadge>
          </ImgConatainer>
          <Name>{o?.username}</Name>
        </Friends>
      ))
      }
      </>
    </ChatOnline>
  )
}
