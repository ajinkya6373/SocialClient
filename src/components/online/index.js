import {
    RightbarFriend,
    RightbarProfileImgContainer,
    RightbarProfileImg,
    RightbarOnline,
    RightbarUsername

}from './style/online'

export default function Online({user}) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <RightbarFriend>
            <RightbarProfileImgContainer>
                <RightbarProfileImg src={PF+user.profilePicture} />
                <RightbarOnline ></RightbarOnline>
            </RightbarProfileImgContainer>
            <RightbarUsername>{user.username}</RightbarUsername>
        </RightbarFriend>
    )
}
