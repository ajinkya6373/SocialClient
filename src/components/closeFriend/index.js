import {
    List,
    Image,
    Name
} from "./style/closeFriend"


export default function CloseFriend({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <List>
            <Image src={PF+user.profilePicture} />
            <Name>{user.username}</Name>
        </List>
    )
}
