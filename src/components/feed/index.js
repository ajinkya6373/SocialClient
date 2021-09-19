import Share from "../share"
import { useState,useEffect } from "react"
import Post from "../post"
import { useStateValue } from '../../context/AuthContext';
import {fetchPostByName,fetchPostById} from "../../ApiCall"

import {
    FeedContainer,
    Wrapper,
    Nofeed
} from "./style/feed"

export default function Feed({username}) {
    const [{user}] = useStateValue();
    const [posts,setPosts] = useState([])

    useEffect(() => {
        if(username){
            fetchPostByName(username).then((res)=>{
                setPosts(res?.data.sort((p2,p1)=>{
                    return new Date(p1.createdAt) - new Date(p2.createdAt);
                }))
            })
        }
        else{
            fetchPostById(user?._id).then((res)=>{
                setPosts(res?.data.sort((p2,p1)=>{
                    return new Date(p1.createdAt) - new Date(p2.createdAt);
                }))
            })
        }
    }, [username,user._id])

    return (
        <FeedContainer>
{ posts.length ?        
    <Wrapper>
               {username === undefined ? <Share username={username}/> : user.username === username ?  <Share username={username}/> :null} 
                {
                    posts?.map((i) => {
                        return  <Post key={i._id} post={i} />
                    })
                }
            </Wrapper> 
            : <Wrapper>
            {username === undefined ? <Share username={username}/> : user.username === username ?  <Share username={username}/> :null} 
            <Nofeed>
                 add your first post
            </Nofeed>
            </Wrapper>}
        </FeedContainer>

    )
}


