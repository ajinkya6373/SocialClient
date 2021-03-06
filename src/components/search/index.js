import { 
    Container,
    Img,
    Text
 } from "./style/search"
export default function SearchContainer({searchData}) {
    const PF =process.env.REACT_APP_PUBLIC_FOLDER 
    return (
        <Container>
                <Img src={searchData.profilePicture ? searchData.profilePicture.url : PF+"person/noAvatar.png"}/>
                <Text>{searchData.username}</Text>
        </Container>
    )
}
