
import {
  Homepage,
  ProfilePage,
  LoginPage,
  RegisterPage,
  UpdatePage,
  MessengerPage
} from "./pages"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useStateValue } from "./context/AuthContext"
import { useEffect } from "react"
import axios from 'axios';

function App() {
  const [{ user}, dispatch] = useStateValue()
  localStorage.setItem("user", JSON.stringify(user))
  useEffect(() => {
    const userPost = async () => {
      const res = user&& await axios.get(`/posts/profile/${user.username}`)
       user && dispatch({ type: "USERS_POSTS", payload: res.data })
    }
    userPost()
  }, [user, dispatch])

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            {user ? <Homepage /> : < LoginPage />}
          </Route>
          <Route path="/login">
            {user ? <Redirect to="/" /> : <LoginPage />}
            </Route>
          <Route path="/register">
            {user ? <Redirect to="/" /> : <RegisterPage />}
          </Route>
          <Route path="/profile/:username">
            {user ? <ProfilePage /> : < LoginPage />}
          </Route>
          <Route path="/messenger">
            {user ? <MessengerPage /> : < LoginPage />}
          </Route>
          <Route path="/update">
            <UpdatePage/>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
