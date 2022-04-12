
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
import { useEffect, useRef,useState } from "react";
import { fetchPostById } from "../src/ApiCall"
import { io } from "socket.io-client";


function App() {
  const [{ user }, dispatch] = useStateValue()
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef()
  localStorage.setItem("user", JSON.stringify(user))
  useEffect(() => {
    // to connect the user with socket io
    socket.current = io("https://socialapi1.herokuapp.com/")
    dispatch({ type: "SET_SOCKET", payload: socket });
  }, [])

  useEffect(() => {
    socket.current.emit("addUser", user?._id)
    socket.current.on("getUsers", (users) => {
        setOnlineUsers(
            user?.followings.filter((f) => users.some((u) => u.userId === f))
        )
    })
    
}, [user?._id])
useEffect(() => {
  dispatch({ type: "SET_ONLINE_USER", payload: onlineUsers});
},[onlineUsers])


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
            {user ? <MessengerPage socket={socket}/> : < LoginPage />}
          </Route>
          <Route path="/update">
            <UpdatePage />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
