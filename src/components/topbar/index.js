
import {
    TopbarContainer,
    TopbarLeft,
    Logo,
    TopbarCenter,
    SearchIcon,
    Input,
    SearchBar,
    TopbarRight,
    TobarIcons,
    TobarIconItem,
    TobarIconBadge,
    Image,
    ResultBox,
    CancelIcon

} from "./style/topbar"
import { Search, Person, Chat, Notifications, Cancel } from "@material-ui/icons";
import { Link } from "react-router-dom"
import { useStateValue } from "../../context/AuthContext"
import { SearchContainer } from "../../components"
import axios from "axios"
import { useState } from "react";

export default function Topbar() {
    const [searchInput, setSearchInput] = useState('')
    const [searchResult, setSearchResult] = useState(null)
    const [showResult, setShowResult] = useState(false)

    const search = async (e) => {
        setSearchInput(e)
        try {

            let { data, status, message } = await axios.post('/users/search', { name: searchInput })
            setSearchInput('')
            console.log(message)
            if (status === 200) {
                setSearchResult(data.searchResult)
            }
            else {
                setSearchResult([])
            }
        } catch (err) {
            console.log(err)
        }
    }

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [{ user }] = useStateValue()
    return (
        <TopbarContainer>
            <TopbarLeft>
                <Link to="/" style={{ textDecoration: "none" }} >
                    <Logo>JixSocial</Logo>
                </Link>
            </TopbarLeft>

            <TopbarCenter>
                <SearchBar >
                    <Input
                        placeholder="Search for friend, post or video"
                        onChange={(e) => search(e.target.value)}
                        onFocus={() => setShowResult(true)}
                    />
                    <SearchIcon onClick={search}>
                        <Search />
                    </SearchIcon>
                </SearchBar>
                <CancelIcon onClick={() => setShowResult(false)} showResult={showResult}  >
                    <Cancel />
                </CancelIcon>
                < ResultBox showResult={showResult} onClick={() => setShowResult(false)} >
                    {
                        searchResult
                            ? searchResult?.map((s) => (
                                <Link key={s._id} to={`/profile/${s.username}`}
                                    style={{ listStyle: "none", textDecoration: "none", color: "black", display: "contents" }}>
                                    <SearchContainer searchData={s} />
                                </Link>
                            ))
                            : <div style={{ textAlign: "center" }}> No result Found </div>
                    }
                </ResultBox>
            </TopbarCenter>
            <TopbarRight>
                <TobarIcons>
                    <TobarIconItem>
                        <Person />
                        <TobarIconBadge>1</TobarIconBadge>
                    </TobarIconItem>
                    <Link to='/messenger' style={{ textDecoration: "none", color: "white" }}>
                        <TobarIconItem >
                            <Chat />
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
