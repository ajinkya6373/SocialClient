
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
import { SearchContainer,DisplayNotification } from "../../components"
import { useState ,useEffect} from "react";
import axios from "axios"
import {notificationCount,axiosInstance} from "../../ApiCall"

const CancelToken = axios.CancelToken;
let source = CancelToken.source();
export default function Topbar() {
    const [searchInput, setSearchInput] = useState('')
    const [searchResult, setSearchResult] = useState(null);
    const [showResult, setShowResult] = useState(false);
    let [messNotification, setMessNotification] = useState(0);
    // const [notifications, setNotifications] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [{ user,socket}] = useStateValue()

    useEffect(()=>{
        notificationCount(user._id).then((res)=>{
            setMessNotification(res?.data.length);
        })
    },[])
    
    const search = async (e) => {
        setSearchInput(e)
        source && source.cancel('Operation canceled due to new request.');
        source = axios.CancelToken.source();
        try {
            let { data, status} = await axiosInstance.post('/users/search',{ name: searchInput },{
                cancelToken: source.token
              })
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

    // useEffect(() => {
    //     socket?.current.on("getNotification", (data) => {
    //       setNotifications((prev) => [...prev, data]);
    //     });
    //   }, [socket]);
    // console.log(notifications);
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
                        value = {searchInput}
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
                    {/* <TobarIconItem>
                        <Person />
                        <TobarIconBadge>1</TobarIconBadge>
                    </TobarIconItem> */}
                    <Link to='/messenger' style={{ textDecoration: "none", color: "white" }}>
                        <TobarIconItem >
                            <Chat />
                        { messNotification>0 && <TobarIconBadge>{messNotification}</TobarIconBadge> }
                        </TobarIconItem>
                    </Link>
                    <TobarIconItem>
                        <Notifications />
                        <TobarIconBadge>4</TobarIconBadge>
                    </TobarIconItem>
                </TobarIcons>
                <Link to={`/profile/${user.username}`}>
                    <Image src={user.profilePicture
                        ?  user.profilePicture.url
                        : (PF + "person/noAvatar.png")} />
                </Link>
            </TopbarRight>
        </TopbarContainer>
    )
}
