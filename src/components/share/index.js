
import {
    ShareContainer,
    Wrapper,
    ShareTop,
    Image,
    Input,
    Divider,
    ShareImgContainer,
    ShareImg,
    ShareCancelImg,
    ShareBottom,
    ShareOptions,
    ShareOption,
    Icon,
    Text,
    ShareButton,

} from "./style/share"
import { PermMedia, Label, Room, EmojiEmotions,Cancel} from "@material-ui/icons"
import { useStateValue } from "../../context/AuthContext"
import { useState} from "react";

import{newPost} from "../../ApiCall"
export default function Share() {
    const [{user},dispatch] = useStateValue()
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [desc,setDesc] = useState('')
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const Invalid = fileInputState === '';

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setFileInputState(e.target.value);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };
    const sumbitHandler = async(e)=>{
        e.preventDefault()
        const newPostdata ={
            userId:user._id,
            desc:desc,
        };
        if(previewSource){
            newPostdata.data = previewSource;
        }
        newPost(newPostdata,dispatch);
    }
    const clearStates =()=>{
        setFileInputState('');
        setPreviewSource('')
        setDesc('')
    }
    return (
        <ShareContainer>
            <Wrapper>
                <ShareTop>
                    <Image src={
                        user.profilePicture
                       ? user.profilePicture.url
                       : PF+"/person/noAvatar.png"
                    } />
                    <Input placeholder={`${user.username} Say something`} onChange={(e)=>setDesc(e.target.value)}  value={desc}/>
                </ShareTop>
                <Divider />
                {
                    previewSource &&(
                        <ShareImgContainer>
                            <ShareImg src={previewSource}/>
                            <ShareCancelImg onClick={clearStates}><Cancel/></ShareCancelImg>
                        </ShareImgContainer>
                    )
                }
                <ShareBottom onSubmit={sumbitHandler}>
                    <ShareOptions>
                        <ShareOption htmlFor="file">
                            <Icon color="tomato"><PermMedia /></Icon>
                            <Text>Photo or Video</Text>
                        </ShareOption>
                            <input 
                            style={{display:"none"}} 
                            type="file" 
                            id = "file" 
                            onChange={handleFileInputChange}
                            value={fileInputState}
                            accept=".png,.jpeg,.jpg"/>
    
                    </ShareOptions>
                    <ShareButton type="submit" disabled={Invalid}>Share</ShareButton>
                </ShareBottom>
            </Wrapper>
        </ShareContainer>
    )
}
