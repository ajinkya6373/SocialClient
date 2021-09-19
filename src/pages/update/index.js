
import {
    UpdateContainer,
    Container,
    Profile,
    Form,
    FormItem,
    Label,
    FormInput,
    Text,
    PasswordContainer,
    PasswordInput,
    Button
} from "./style/update"
import { useState ,useRef} from 'react'
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import { useStateValue } from '../../context/AuthContext';
import {uploadProfile,updateProfile} from "../../ApiCall"

export default function Update() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const History = useHistory()
    const [{user},dispatch] = useStateValue()
    const [file, setFile] = useState( false)
    const userName = useRef()
    const bio = useRef()
    const City = useRef()
    const From = useRef()
    const relationShip = useRef()
    const sumbitHandler = async(e)=>{
        e.preventDefault();
        const fileName = "person/" + Date.now() + file.name;
        if(file){
            const Profiledata = new FormData();
            Profiledata.append("name",fileName)
            Profiledata.append("file",file);
            uploadProfile(Profiledata,fileName,dispatch)
            
        }
        let data ={
            userId:user._id,
            profilePicture:file ? fileName  : user.profilePicture,
            username:userName.current.value,
            desc:bio.current.value,
            city:City.current.value,
            from:From.current.value,
            relationship:relationShip.current.value,
        }
        const {username,desc,city,from,relationship,profilePicture,...other} = user
  
        updateProfile(user._id,data).then((res)=>{
            const newData= res.data;
            const updatedUser = {...other,...newData}
              dispatch({type:"UPDATE_USER",payload:updatedUser})
              History.push("/")
        })
       
    }
    return (
    <UpdateContainer>
        <Container>
            <Profile htmlFor="file" >
                <Avatar src={file ? URL.createObjectURL(file) : PF+user.profilePicture}
                    style={{ width: "150px", height: "150px", objectFit: "contain",}}/>
                <input
                    style={{ display: "none" }}
                    type="file"
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) => setFile(e.target.files[0])}
                    id="file" />
            </Profile>

            <Form onSubmit={sumbitHandler}>
                <FormItem >
                    <Label>username</Label>
                    < FormInput type="string" ref={userName} defaultValue={user.username}/>
                </FormItem>
                <FormItem >
                    <Label>bio</Label>
                    < FormInput type="string" ref={bio} defaultValue={user.desc}/>
                </FormItem>
                <FormItem >
                    <Label>City</Label>
                    < FormInput type="string" ref={City} defaultValue={user.city}/>
                </FormItem>
                <FormItem >
                    <Label>Form</Label>
                    < FormInput type="string" ref={From} defaultValue={user.from}/>
                </FormItem>
                <FormItem >
                    <Label>relationship</Label>
                    < FormInput type="string" ref={relationShip} defaultValue={user.relationship}/>
                </FormItem>
                <Button type="submit">Update</Button>
            </Form>
                <Text  >change password</Text >
            <PasswordContainer display={false}>
                <PasswordInput type="string" placeholder="enter old password" />
                <PasswordInput type="string" placeholder="enter new password" />
            </PasswordContainer>
            <Text color={"tomato"}>delete account</Text>
        </Container>
    </UpdateContainer>


    )
}
