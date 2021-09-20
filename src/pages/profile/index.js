
import {
    Profile,
    ProfileRight,
    ProfileRightTop,
    ProfileCover,
    CoverImage,
    ProfileImage,
    ProfileInfo,
    ProfileName,
    Description,
    ProfileRightBottom,
    Meta,
    ProfileWrapper,
    MetaLabel,
    Setting
} from './style/profile'
import { useStateValue } from '../../context/AuthContext';
import { Link } from "react-router-dom"
import { Topbar, Sidebar, Feed, Rightbar } from '../../components'
import { useState, useEffect } from 'react';
import { useParams } from "react-router";
import SettingsIcon from '@material-ui/icons/Settings';
import PhotoCameraTwoToneIcon from '@material-ui/icons/PhotoCameraTwoTone';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Button } from "@material-ui/core";
import {
    uploadProfile,
    updateProfile,
    fetchUserByUsername,
    axiosInstace
} from "../../ApiCall"

export default function ProfilePage() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({})
    const [File, setFileProfile] = useState(false)
    const username = useParams().username;
    const [{ user: currentUser }, dispatch] = useStateValue()

    const updatePhoto = async () => {
        const fileName = "person/" + Date.now() + File.name;
        const Profiledata = new FormData();
        Profiledata.append("name", fileName)
        Profiledata.append("file", File);
        const data = {
            userId: currentUser._id,
            profilePicture: fileName,
        }
            uploadProfile(Profiledata,fileName,dispatch)
            updateProfile(currentUser._id,data)
            await axiosInstace.post('/deleteImage',{postName:currentUser?.profilePicture})
    }

    useEffect(() => {
        fetchUserByUsername(username).then((res)=>{
            setUser(res.data) 
        })
    }, [username])

    return (
        <>
            <Topbar />
            <Profile>
                <Setting>
                    {currentUser.username === user.username &&
                        <Link to="/update">
                            <SettingsIcon htmlColor="blue" />
                        </Link>}
                </Setting>
                <Sidebar />
                <ProfileRight>

                    <ProfileRightTop>
                        <ProfileCover>
                            <CoverImage src={user?.coverPicture ? (PF + user?.coverPicture) : (PF + "person/noCover.png")} />
                            <ProfileWrapper>
                                <ProfileImage src={File
                                    ? URL.createObjectURL(File)
                                    : user.profilePicture
                                    ? PF + user.profilePicture
                                    : PF + "person/noAvatar.png"} />
                                {currentUser.username === user.username && <Meta >
                                    <MetaLabel htmlFor="Profilefile" >
                                        change profile
                                        <PhotoCameraTwoToneIcon style={{ marginLeft: "3px" }} />
                                    </MetaLabel >
                                    <input
                                        style={{ display: "none" }}
                                        type="file"
                                        accept=".png,.jpeg,.jpg"
                                        onChange={(e) => setFileProfile(e.target.files[0])}
                                        id="Profilefile" />
                                </Meta>}
                            </ProfileWrapper>
                        </ProfileCover>
                        <ProfileInfo>
                            {File ? <Button variant="contained" color="primary" onClick={updatePhoto}>
                                <KeyboardArrowUpIcon />
                                upload
                            </Button>
                                : <>
                                    <ProfileName>{user.username}</ProfileName>
                                    <Description>{user?.desc}</Description>
                                </>}
                        </ProfileInfo>
                    </ProfileRightTop>
                    <ProfileRightBottom>
                        <Feed username={username} />
                        <Rightbar user={user} />
                    </ProfileRightBottom>
                </ProfileRight>
            </Profile>
        </>
    )
}
