
import {
    TopbarContainer,
    TopbarLeft,
    Logo,
    TopbarCenter,
    SearchIcon,
    Input,
    SearchBar,
    TopbarRight,
    TopbarLinks,
    Topbarlink,
    TobarIcons,
    TobarIconItem,
    TobarIconBadge,
    Image,

} from "./style/topbar"
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom"
import {useStateValue} from "../../context/AuthContext"

export default function Topbar() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [{user}] = useStateValue() 
    return (
        <TopbarContainer>
            <TopbarLeft>
                <Link to="/" style ={{textDecoration:"none"}}>
                    <Logo>JixSocial</Logo>
                </Link>
            </TopbarLeft>

            <TopbarCenter>
                <SearchBar>
                    <SearchIcon>
                        <Search />
                    </SearchIcon>
                    <Input placeholder="Search for friend, post or video" />
                </SearchBar>
            </TopbarCenter>
            <TopbarRight>
                <TopbarLinks>
                    <Topbarlink>Homepage</Topbarlink>
                    <Topbarlink>Timeline</Topbarlink>
                </TopbarLinks>
                <TobarIcons>
                    <TobarIconItem>
                        <Person />
                        <TobarIconBadge>1</TobarIconBadge>
                    </TobarIconItem>
                    <Link to='/messenger' style={{textDecoration:"none" ,color:"white"}}>
                        <TobarIconItem >
                            <Chat/>
                            <TobarIconBadge>2</TobarIconBadge>
                        </TobarIconItem>
                    </Link>
                    <TobarIconItem>
                        <Notifications />
                        <TobarIconBadge>4</TobarIconBadge>
                    </TobarIconItem>
                </TobarIcons>
                <Link to={`/profile/${user.username}`}>
                    <Image src={user.profilePicture
                        ? (PF + user.profilePicture)
                        : (PF + "person/noAvatar.png")} />
                </Link>
            </TopbarRight>
        </TopbarContainer>
    )
}
