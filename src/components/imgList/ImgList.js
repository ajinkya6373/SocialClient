import { useState, useEffect, useRef } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Divider from '@mui/material/Divider';
import { SearchContainer, ModalCustom, CommentBox } from "../../components"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { pink } from '@mui/material/colors';
import InputEmoji from "react-input-emoji";
import {
  Image,
  Text,
  Desc,
  SubText,
  Wrapper,
  Button,
  Input,
  DescBottom
} from "./img"
import {
  PostComments,
  addComment,
  LikePost,
  fetchPostByName
} from "../../ApiCall"

import { useStateValue } from '../../context/AuthContext';

export default function StandardImageList({ username, currentUser }) {
  const [{timeLine,addingPost,deletePost}] = useStateValue();
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState('');
  const [itemData,setImgdata] = useState([]);
  const [commentList, setComList] = useState([]);
  const [comment, setComment] = useState('')
  const [isliked, setIsLiked] = useState(false);
  const [commentId ,setCommentId] = useState("");

  let disabled = comment === '';
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false);
  const d = new Date(post.createdAt);
  const date = d.toDateString();
  const scrollRef = useRef();
  useEffect(() => {
    setIsLiked(post?.likes?.includes(currentUser._id))
  }, [post?.likes, currentUser._id])

    useEffect(()=>{
        if(username == currentUser.username){
          setImgdata(timeLine);
        }else{
          fetchPostByName(username).then((res)=>{
            setImgdata(res.data);
          })
        }
    },[username,addingPost,deletePost])

  useEffect(() => {
    PostComments(post?._id).then(res => {
      setComList(res?.data);
    })
  }, [post])


  const clickHandler = () => {
    let data = {
      text: comment,
      userId: currentUser._id,
    }
    if(commentId){
       const newData = {...data, commentId: commentId};
       data = newData;
    }
    if(comment?.length>0){
      addComment(post._id, data);
    !commentId && setComList((prev) => [...prev, data])
      setComment("");
      setCommentId("");
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [commentList]);

  const likeHandler = () => {
    LikePost(post._id, currentUser._id)
    setIsLiked(!isliked);
  }

  return (
    <>
      <ImageList sx={{ maxWidth: 800, paddingTop: 2,}} cols={3} gap={20} >
        {itemData?.map((item) => (
          <ImageListItem key={item._id} style={{ position: "relative",boxShadow:" 0px 0px 16px -8px rgb(0 0 0 / 68%)" }} onClick={() => setPost(item)} >
            <img className='Image'
              src={`${item.img.url}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${item.img.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={item.desc}
              loading="lazy"
              onClick={handleOpen}
            />
          </ImageListItem>

        ))}
      </ImageList>

      <ModalCustom
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Wrapper>
          <Image src={post.img?.url} />
          <Desc>
            <SubText>{date}</SubText>
            <Text >
              {post?.desc}
              <Divider />
              {  commentList?.length >0 ? commentList?.map((c) => {
                  return <div ref={scrollRef} key={c._id+c.text} >
                    <CommentBox data={c} setCommentId={setCommentId} />
                  </div>
                })
                :<div>no commnets</div>
              }
            </Text>
            <Divider />
            <DescBottom>
              <div style={{ display: "flex",position:"relative",top:"0.9rem"}}>

                {
                  isliked ?
                    <FavoriteIcon sx={{ color: pink[500], cursor: "pointer" }} onClick={likeHandler} />
                    : <FavoriteBorderIcon sx={{ cursor: "pointer" }} onClick={likeHandler} />
                }
                <Text style={{marginLeft:"0.8rem"}}>{post?.likes?.length} like this post</Text>
              </div>
              <div style={{ display: "flex", marginTop: "5%" }}>
                <InputEmoji 
                placeholder='add a comment'
                onChange={setComment} 
                cleanOnEnter
                onEnter={clickHandler} />
                <Button disabled={disabled} onClick={clickHandler}>post</Button>
              </div>
            </DescBottom>
   
          </Desc>
        </Wrapper>
      </ModalCustom>
    </>

  );
}
