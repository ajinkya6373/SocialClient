
import { useEffect, useState } from "react";
import {
    Wrapper,
    BoxLeft,
    Image,
    BoxRight,
    RightTop,
    Name,
    CommentText,
    RightBottom,
    Reply,
    View,
    Option,
    DeleteBox,
    Dltitem

} from "./style/comentBox";
import { fetchUserById, getReplies,deleteComment } from "../../ApiCall";
import { CommentBox as ReplayBox, ModalCustom } from "../../components"
import CircularProgress from '@mui/material/CircularProgress';
import { format } from 'timeago.js';
import Divider from '@mui/material/Divider';
import { useStateValue } from '../../context/AuthContext';


export default function CommentBox({ data, setCommentId }) {
    const [{ user: currentUser } ] = useStateValue();
    const [user, setUser] = useState();
    const [open, setOpen] = useState(false);
    const [replyBox, SetreplyBox] = useState(false);
    const [Allreplies, setReplies] = useState([]);
    const [loader, setLoder] = useState(true);
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false);
    useEffect(() => {
      data &&  fetchUserById(data?.userId).then((res) => (
            setUser(res.data)
        ))
    }, [data?.userId])

    const reply = () => {
        setCommentId(data?._id);
    }
    const clickHandler = () => {
        setTimeout(() => {
            setLoder(false);
        }, 1000);
        SetreplyBox(() => !replyBox);
        getReplies(data?._id).then((res) => {
            if(res?.data!=null && res?.data!=undefined){
                setReplies(res.data);
            }
        })
    }
    const weeksBetween = () => {
        let d2 = new Date();
        let d1 = new Date(data?.createdAt);
        return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
    }

    const dltCom =()=>{
        deleteComment(data?._id,data.postId).then((res)=>{
            if(res.data!=null && res.data!=undefined){
                data.text = res.data.message;
                data.replies = 0;
            }
         
        });
     
    }

    let date = weeksBetween() > 0 ? weeksBetween() + "W" : format(data?.createdAt);
    return (
        <>  
       { <Wrapper>
                <BoxLeft>
                    <Image src={user?.profilePicture.url} />
                </BoxLeft>
                <BoxRight>
                    <RightTop>
                        <Name> {user?.username}</Name>
                        <CommentText>{data?.text}</CommentText>
                    </RightTop>
                    <RightBottom >
                        <Reply onClick={reply}>Reply</Reply>
                        <Option style={{ margin: "0px 0px 0px 0.4rem" }}>{date}</Option>
                        {  data?.userId == currentUser?._id && <Option onClick={handleOpen}>...</Option>}
                    </RightBottom>
                </BoxRight>
            </Wrapper>

        }
            { <ModalCustom
                open={open}
                onClose={handleClose}>
                <DeleteBox style={{border:"none",}}>
                <Dltitem delete ={"delete"} onClick={dltCom}>Delete</Dltitem>
                <Divider/> 
                <Dltitem onClick={handleClose}>Cancel</Dltitem>
            </DeleteBox>

            </ModalCustom>}
            {data?.replies?.length > 0 &&
                <View>
                    <Divider onClick={clickHandler}> {replyBox ? "hide replies" : 'view replies'}</Divider>
                </View>
            }

            {replyBox && <div>
                {loader
                    ? < CircularProgress style={{ margin: "0px 0px  0px 25px" }} color="inherit" size={20} />
                    : Allreplies.map((c) => {
                        return <div style={{ margin: "0px 0px  0px 15px" }}>
                            <ReplayBox data={c} setCommentId={setCommentId} />
                        </div>
                    })}
            </div>
            }
        </>
    )
}