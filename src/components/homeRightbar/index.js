
import {
    // BirthdayContainer,
    // BirthdayImage,
    // BirthdayText,
    RightbarTitle,
    RightbarFriendList

} from './style/homeRightbar'

import Online from "../online"
import { Users} from "../../dummyData"
export default function HomeRightbar() {
    return <>
        {/* <BirthdayContainer>
            <BirthdayImage src="assets/gift.png"/>
            <BirthdayText>
            <b>Soham</b> and <b>3 other friends</b> have a birhday today.
            </BirthdayText>
        </BirthdayContainer> */}
        <RightbarTitle>Online Friends</RightbarTitle>
        <RightbarFriendList>
          {
              Users.map((u)=>(
                <Online key ={u.id} user={u} />
              ))
          }

        </RightbarFriendList>
    </>
    
 
    
}
