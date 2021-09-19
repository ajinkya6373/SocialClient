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
import axios from "axios"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useStateValue } from '../../context/AuthContext'


export default function ProfileRightbar({ user }) {
    const [{ user: currentUser }, dispatch] = useStateValue()
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [following, setFollowing] = useState([])
    const [Follow, setFollow] = useState(false)
    useEffect(() => {
        setFollow(currentUser.followings.includes(user._id))
        const FetchFollowing = async () => {
            const res = await axios.get(`/users/friend/${user._id}`)
            setFollowing(res.data);
        }
        FetchFollowing()
    }, [user._id, currentUser.followings])

    const clickHandle = () => {
        localStorage.removeItem("user")
        dispatch({ type: "LOG_OUT" });
    }

    const followHandler = async () => {
        try {
            if (Follow) {
                await axios.put(`/users/${user._id}/unfollow`, { userId: currentUser._id })
                dispatch({ type: "UNFOLLOW", payload: user._id })

            } else {
                await axios.put(`/users/${user._id}/follow`, { userId: currentUser._id });
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
            </Info>
            <Title>{user.username}'s friends</Title>
            <Followings>
                {
                    following.map((i) => (
                        <Link to={`/profile/${i.username}`} style={{ textDecoration: "none" }} key={i._id}>
                            <Following >
                                <Image src={
                                    i.profilePicture
                                        ? PF + i.profilePicture
                                        : PF + "person/noAvatar.png"
                                } />
                                <Name>{i.username}</Name>
                            </Following>
                        </Link>
                    ))

                }

            </Followings>
        </>
    )
}
