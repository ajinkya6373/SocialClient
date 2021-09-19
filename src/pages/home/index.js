import { 
   Topbar,
   Sidebar,
   Feed,
   Rightbar} from "../../components"
import{HomepageContainer} from "./style/home"

export default function Homepage() {
    return <>
         <Topbar/>
         <HomepageContainer>
            <Sidebar/>
            <Feed/>
            <Rightbar/>
         </HomepageContainer>
      </>
    
}
