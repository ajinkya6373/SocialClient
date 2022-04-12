import {
    Title,
    Info,
    InfoItem,
    InfoKey,
    InfoValue,
    Followings,
    Following,
    Image,
    Name,
    LogOutButton,
    Text,
    Icon,
    FollowButton

} from './style/profileRightbar'
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import { axiosInstance} from "../../ApiCall"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useStateValue } from '../../context/AuthContext'
import Button from '@mui/material/Button';
import { SearchContainer ,ModalCustom} from "../../components"

export default function ProfileRightbar({ user }) {
    const [{ user: currentUser }, dispatch] = useStateValue()
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([])
    const [Follow, setFollow] = useState(false)
    const [open, setOpen] = useState(false);
    let [flagModal, setFlagModal] = useState('following')
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        setFollow(currentUser.followings.includes(user._id))
        const FetchFollowing = async () => {
            const res = await axiosInstance.get(`/users/friend/${user._id}`)
            setFollowing(res.data);
        }
        const FetchFollowers = async () => {
            const res = await axiosInstance.get(`/users/followers/${user._id}`)
            setFollowers(res.data);
        }
        FetchFollowing()
        FetchFollowers()
    }, [user._id, currentUser.followings])

    const clickHandle = () => {
        localStorage.removeItem("user")
        dispatch({ type: "LOG_OUT" });
    }

    const followHandler = async () => {
        try {
            if (Follow) {
                await axiosInstance.put(`/users/${user._id}/unfollow`, { userId: currentUser._id })
                dispatch({ type: "UNFOLLOW", payload: user._id })

            } else {
                await axiosInstance.put(`/users/${user._id}/follow`, { userId: currentUser._id });
                dispatch({ type: "FOLLOW", payload: user._id });
            }
            setFollow(!Follow)

        } catch (err) {
            console.log(err)
        }
    }


    return (
        <>
            {
                currentUser.username === user.username ? (
                    <LogOutButton onClick={clickHandle}>
                        <Icon><ExitToAppIcon /></Icon>
                        <Text>log out</Text>
                    </LogOutButton>
                )
                    : (
                        <FollowButton onClick={followHandler}>
                            {Follow ? <RemoveIcon /> : <AddIcon />}
                            {Follow ? "unfollow" : "follow"}
                        </FollowButton>
                    )
            }
            <Title>{user.username}'s information</Title>
            <Info>
                <InfoItem>
                    <InfoKey>City:</InfoKey>
                    <InfoValue>{user.city}</InfoValue>
                </InfoItem>
                <InfoItem>
                    <InfoKey>Form:</InfoKey>
                    <InfoValue>{user.from}</InfoValue>
                </InfoItem>
                <InfoItem>
                    <InfoKey>Relationship:</InfoKey>
                    <InfoValue>{user.relationship === 1 ? "single" : user.relationship === 2 ? "Married" : '-'}</InfoValue>
                </InfoItem>
                <span onClick={() => setFlagModal('following')}>
                    <Button onClick={handleOpen} >following {following.length}</Button>
                </span>
                <Info onClick={() => setFlagModal("followers")}>
                    <Button onClick={handleOpen} >followers {followers.length}</Button>
                </Info>
            </Info>
            <ModalCustom onClose={handleClose} open={open} profileModel>
                {
                   <>
                   
                        {flagModal == 'following' ? following.map((i) => (
                            <Link to={`/profile/${i.username}`} style={{ textDecoration: "none" }} key={i._id}>
                                <SearchContainer searchData={i} />
                            </Link>
                        )) : followers.map((i) => (
                            <Link to={`/profile/${i.username}`} style={{ textDecoration: "none" }} key={i._id}>
                                <SearchContainer searchData={i} />
                            </Link>
                        ))}
                </>
                }
            </ModalCustom>
        </>
    )
}
