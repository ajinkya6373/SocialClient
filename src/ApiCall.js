
import axios from "axios"

export const axiosInstace = axios.create({
    baseURL : "https://socialapi1.herokuapp.com/api"
})

export const loginCall = async (userCredential,dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
        const res = await axiosInstace.post("/auth/login", userCredential);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        console.log("logged in user", res.data)
    } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err });
    }

}

export const Register =  async (username,email,password)=>{
    let user={
        username:username,
        email:email,
        password:password,
    }
    try{
     await axiosInstace.post("/auth/register",user)
    }catch(err){
        console.log(err)
    }
}

export const fetchUserById = async (userId) =>{
  try { 
      return await axiosInstace.get(`/users?userId=${userId}`)
    }catch(err){
        console.log(err)
    }
}
export const fetchUserByUsername = async (username) =>{
  try { 
      return await axiosInstace.get(`/users?username=${username}`)
    }catch(err){
        console.log(err)
    }
}

export const fetchFriends = async (userId)=>{
    try{
     return await axiosInstace.get("/users/friend/" + userId);

    }catch(err){
        console.log(err)
    }

}
export const fetchPostByName = async (username) =>{
  try { 
      return await axiosInstace.get(`/posts/profile/${username}`)  
    }catch(err){
        console.log(err)
    }
}
export const fetchPostById = async (userId) =>{
  try { 
      return await axiosInstace.get(`/posts/timeline/${userId}`) 
    }catch(err){
        console.log(err)
    }
}

export const newPost =async(data)=>{
    try{
        await axiosInstace.post("/posts",data)
        window.location.reload();
    }catch(err){
        console.log(err)
    }

}

export const LikePost = async (postId,userId) =>{
    try{
        await axiosInstace.put(`/posts/${postId}/like`, { userId: userId})
    }catch(err){
        console.log(err)
    }

}
export const DeletePost = async (postId,userId,dispatch) =>{
    try{
     const res = await axiosInstace.delete(`/posts/${postId}/delete`, { userId: userId})
    
     dispatch({ type: "DELETE_POST", payload: res.data})
    //  window.location.reload()

    }catch(err){
        console.log(err)
    }

}



export const UpdatePost = async (userId,desc,postId,) => {
    let description ={
        userId:userId,
        desc:desc
    }
    try{
        await axiosInstace.put(`/posts/${postId}`, description)
        window.location.reload()
    }catch(err){
        console.log(err)
    }

}
export const fetchConvesation =async(userId)=>{
    try{
        return await axiosInstace.get(`/conv/${userId}`)
    }catch(err){
        console.log(err)
    }
}

export const fetchMessages = async(chatId)=>{
    try{
     return await axiosInstace.get(`/message/${chatId}`)
    }catch(err){
        console.log(err)
    }

}

export const PostMessage = async(userId,newMessage,currentChatId)=>{
    let Message = {
        sender: userId,
        text: newMessage,
        conversationId: currentChatId,
    }
    try{
        return await axiosInstace.post('message/',Message)
    }catch(err){
        console.log(err)
    }
}

export const uploadProfile =async(Profiledata,fileName,dispatch)=>{
    try{
        await axiosInstace.post("/upload",Profiledata)
        dispatch({ type: "UPDATE_PROFILE", payload: fileName })
    }catch(err){
        console.log(err)
    }
} 
export const uploadPost =async(data)=>{
    try{
        await axiosInstace.post("/upload",data)
    }catch(err){
        console.log(err)
    }
} 
export const updateProfile = async(userId,data)=>{
    try{
        return await axiosInstace.put(`/users/${userId}`, data)
    }catch(err){
        console.log(err)
    }
   
}
