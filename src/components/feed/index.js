import Share from "../share"
import { useState, useEffect } from "react"
import Post from "../post"
import { useStateValue } from '../../context/AuthContext';
import { fetchPostById} from "../../ApiCall";
import StandardImageList from "../../components/imgList/ImgList"

import {
    FeedContainer,
    Wrapper,
} from "./style/feed"

export default function Feed({ username }) {
    const [{ user,timeLine,addingPost,deletePost,settingTimeline,updatingPost}, dispatch] = useStateValue();
    const [posts, setPosts] = useState([]);
    useEffect(() => {
          fetchPostById(user?._id,dispatch).then(()=>{
                setPosts(timeLine)
          })
    }, []);


    useEffect(()=>{
        setPosts(timeLine);
    },[addingPost,deletePost,settingTimeline,updatingPost])

    return (

        <FeedContainer>
            <Wrapper>
                {username === undefined ? <Share username={username} /> : user.username === username ? <Share username={username} /> : null}
                {
                 username ? <StandardImageList username={username} currentUser={user}/> : posts?.map((i) => {
                        return <Post key={i._id} post={i} />
                    })
                }
            </Wrapper>
        </FeedContainer>

    )
}


