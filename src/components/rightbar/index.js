import {
    RightbarConatiner,
    Wrapper,
} from './style/rightbar'

import HomeRightbar from '../homeRightbar'
import ProfileRightbar from '../profileRightbar'

export default function Rightbar({user}) {
    return (
     <RightbarConatiner>
         <Wrapper>
             {
                 user ? <ProfileRightbar user={user}/> : <HomeRightbar/>
             }
         </Wrapper>

     </RightbarConatiner>
    )
}
