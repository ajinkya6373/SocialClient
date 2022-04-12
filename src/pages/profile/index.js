
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
    Setting,
    SetCoverpic

} from './style/profile'
import { useStateValue } from '../../context/AuthContext';
import { Link } from "react-router-dom"
import { Topbar, Sidebar, Feed, Rightbar,ModalCustom } from '../../components'
import { useState, useEffect } from 'react';
import { useParams } from "react-router";
import SettingsIcon from '@material-ui/icons/Settings';
import PhotoCameraTwoToneIcon from '@material-ui/icons/PhotoCameraTwoTone';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import EditIcon from '@material-ui/icons/Edit';
import { Button } from "@material-ui/core";
import { Input } from '@mui/material';

import {
    updateProfile,
    fetchUserByUsername,
    setCoverpic
} from "../../ApiCall"

export default function ProfilePage() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({})
    const [profilePreview, setprofilePreview] = useState('');
    const [coverState, setCoverState] = useState(false)
    const [coverPreview, setCoverPreview] = useState('');
    const username = useParams().username;
    const [{ user: currentUser }, dispatch] = useStateValue()
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true)
        setCoverState(true)
    };
    const handleClose = () => {
        setOpen(false)
        setCoverState(false)
        setCoverPreview('')
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
    };
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            coverState ? setCoverPreview(reader.result) : setprofilePreview(reader.result);
        };
    };
    const uploadProfile = async () => {
        const data = {
            userId: currentUser._id,
            img: profilePreview,
        }
        await updateProfile(currentUser._id, data).then((res) => {
            dispatch({ type: "UPDATE_PROFILE", payload: res?.data.res })
        })
        setprofilePreview('')
    }

    const uploadCover = () => {
        const data = {
            userId: currentUser._id,
            img: coverPreview,
        }
        setCoverpic(currentUser._id, data).then((res) => {
            dispatch({ type: "UPDATE_COVERPIC", payload: res?.data.response })
        })
        setOpen(false)
        setCoverPreview('')
    }

    useEffect(() => {
        fetchUserByUsername(username).then((res) => {
            currentUser.username === username ? setUser(currentUser) : setUser(res?.data)
        })
    }, [username,currentUser])
    return (
        <>
            <Topbar />
            <Profile>
                <Setting>
                    {currentUser.username === user?.username &&
                        <Link to="/update">
                            <SettingsIcon htmlColor="blue" />
                        </Link>}

                </Setting>
                {currentUser.username === user?.username &&
                    <SetCoverpic onClick={handleOpen}>
                        <EditIcon style={{
                            backgroundColor: "white",
                            borderRadius: "50%",
                            fontSize: "27px",
                            padding: "3px"
                        }} />
                    </SetCoverpic>}
                <div>
                    <ModalCustom
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                            <Input
                                type="file"
                                accept=".png,.jpeg,.jpg"
                                onChange={handleFileInputChange}
                            />
                            <Button
                                style={{ display: coverPreview ? "block" : "none" }}
                                onClick={uploadCover}>
                                sumbit
                            </Button>
                    </ModalCustom>
                </div>
                {/* <Sidebar /> */}
                <ProfileRight>
                    <ProfileRightTop>
                        <ProfileCover>
                            <CoverImage src={
                                coverPreview
                                    ? coverPreview
                                    : user?.coverPicture
                                        ? user.coverPicture.url
                                        : (PF + "person/noCover.png")} />
                            <ProfileWrapper>
                                <ProfileImage src={profilePreview
                                    ? profilePreview
                                    : user?.profilePicture
                                        ? user.profilePicture.url
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
                                        onChange={handleFileInputChange}
                                        id="Profilefile" />
                                </Meta>}
                            </ProfileWrapper>
                        </ProfileCover>
                        <ProfileInfo>
                            {profilePreview ? <Button variant="contained" color="primary" onClick={uploadProfile}>
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

