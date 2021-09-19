
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
import{ uploadPost,newPost} from "../../ApiCall"

export default function Share() {
    const [{user}] = useStateValue()
    const [file,setFile] = useState(false)
    const [desc,setDesc] = useState('')
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const Invalid = desc.length<5 && file === false;
    const sumbitHandler = async(e)=>{
        e.preventDefault()
        const newPostdata ={
            userId:user._id,
            desc:desc,
        };
        if(file){
            const data = new FormData();
            const fileName = "post/" + Date.now() + file.name;
            data.append("name",fileName)
            data.append("file",file);
            newPostdata.img = fileName;
            uploadPost(data)

        }
        newPost(newPostdata)

    }

    return (
        <ShareContainer>
            <Wrapper>
                <ShareTop>
                    <Image src={
                        user.profilePicture
                       ? PF+user.profilePicture
                       : PF+"/person/noAvatar.png"
                    } />
                    <Input placeholder={`${user.username} Say something`} onChange={(e)=>setDesc(e.target.value)} />
                </ShareTop>
                <Divider />
                {
                    file &&(
                        <ShareImgContainer>
                            <ShareImg src={URL.createObjectURL(file)}/>
                            <ShareCancelImg onClick={()=>setFile(false)}><Cancel/></ShareCancelImg>
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
                            onChange={(e)=>setFile(e.target.files[0])}
                            accept=".png,.jpeg,.jpg"/>
                        <ShareOption>
                            <Icon color="blue"><Label/></Icon>
                            <Text>Tag</Text>
                        </ShareOption>
                        <ShareOption>
                            <Icon color="green"><Room/></Icon>
                            <Text>Location</Text>
                        </ShareOption>
                        <ShareOption>
                            <Icon color="goldenrod"><EmojiEmotions/></Icon>
                            <Text>Feelings</Text>
                        </ShareOption>
                    </ShareOptions>
                    <ShareButton type="submit" disabled={Invalid}>Share</ShareButton>
                </ShareBottom>
            </Wrapper>
        </ShareContainer>
    )
}
