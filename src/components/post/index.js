
import {
    PostContainer,
    Wrapper,
    PostTop,
    PostTopLeft,
    UserProfile,
    UserName,
    DateOfPost,
    PostTopRight,
    PostCenter,
    Description,
    PostImage,
    PostBottom,
    PostBottomLeft,
    LikeIcon,
    PostLikeCounter,
    PostBottomRight,
    PostComments,
    DropDown,
    Container,
    OptionList,
    Text,
    UpdateContainer,
    Input,
    Button
} from './style/post'
import { useStateValue } from '../../context/AuthContext';
import { useState, useEffect ,useRef} from 'react'
import { MoreVert } from "@material-ui/icons";
import { format } from 'timeago.js';
import { Link } from "react-router-dom"
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios"
import {
    fetchUserById,
    LikePost,
    DeletePost,
    UpdatePost,
    // RemoveImage
} from "../../ApiCall"

export default function Post({ post }) {
    const [{ user: currentUser }, dispatch] = useStateValue();
    const [like, setLike] = useState(post.likes.length)
    const [isliked, setIsLiked] = useState(false)
    const [edit, setEdit] = useState(false)
    const updateDes = useRef()
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({})

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id))
    }, [post.likes, currentUser._id])

    useEffect(() => {
          fetchUserById(post.userId).then((res)=>
          setUser(res.data)
          )
    }, [post.userId])
    const likeHandler = () => {
        setLike(isliked ? like - 1 : like + 1)
        setIsLiked(!isliked);
        LikePost(post._id,currentUser._id)
    }

    const deletePost =  async() => {
        await axios.post('/deleteImage',{postName:post.img})
        DeletePost(post._id,currentUser._id ,dispatch,post.img)
        window.location.reload();
    }

    const updatePost = () => {
        UpdatePost(currentUser._id,updateDes.current.value,post._id,)
        setEdit(false);
    }
    return (
        <PostContainer>
            <Wrapper>
                <PostTop>
                    <PostTopLeft>
                        <Link to={`/profile/${user?.username}`}>
                            <UserProfile src={PF + (user?.profilePicture ? user?.profilePicture : "person/noAvatar.png")} />
                        </Link>
                        <UserName>{user?.username}</UserName>
                        <DateOfPost>{format(post.createdAt)}</DateOfPost>
                    </PostTopLeft>
                    <PostTopRight >
                        {currentUser._id === post.userId && <MoreVert />}
                        <DropDown>
                            <Container >
                                <OptionList onClick={()=>setEdit(!edit)}>
                                    < EditIcon htmlColor="blue" style={{ marginRight: "3px" }} />
                                    <Text>Edit</Text>
                                </OptionList>
                                <OptionList onClick={deletePost}>
                                    <DeleteIcon htmlColor="red" />
                                    <Text>delete</Text>
                                </OptionList>
                            </Container>
                        </DropDown>
                    </PostTopRight>
               { edit &&  <UpdateContainer>
                        <Input type="string" placeholder="Enter Description" ref={updateDes}/>
                        <Button onClick={updatePost} >Submit</Button>
                    </UpdateContainer>  }
                </PostTop>
                <PostCenter>
                    <Description>{post?.desc}</Description>
                    <PostImage src={PF + post.img} />
                </PostCenter>
                <PostBottom>
                    <PostBottomLeft>
                        <LikeIcon src={`${PF}like.png`} onClick={likeHandler} />
                        <LikeIcon src={`${PF}heart.png`} onClick={likeHandler} />
                        <PostLikeCounter>{like} people like it</PostLikeCounter>
                    </PostBottomLeft>
                    <PostBottomRight>
                        <PostComments>{post?.comment}</PostComments>
                    </PostBottomRight>
                </PostBottom>
            </Wrapper>
        </PostContainer>

    )
}
