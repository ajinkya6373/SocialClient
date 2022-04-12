
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL : "https://socialapi1.herokuapp.com/api"
})

export const loginCall = async (userCredential,dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
        const res = await axiosInstance.post("/auth/login", userCredential);
        console.log(res.data);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
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
     await axiosInstance.post("/auth/register",user)
    }catch(err){
        console.log(err)
    }
}

export const fetchUserById = async (userId) =>{
  try { 
      return await axiosInstance.get(`/users?userId=${userId}`)
    }catch(err){
        console.log(err)
    }
}
export const fetchUserByUsername = async (username) =>{
  try { 
      return await axiosInstance.get(`/users?username=${username}`)
    }catch(err){
        console.log(err)
    }
}

export const fetchFriends = async (userId)=>{
    try{
     return await axiosInstance.get("/users/friend/" + userId);

    }catch(err){
        console.log(err)
    }

}
export const fetchPostByName = async (username) =>{
  try { 
      return await axiosInstance.get(`/posts/profile/${username}`)  
    }catch(err){
        console.log(err)
    }
}
export const fetchPostById = async (userId,dispatch) =>{
    dispatch({ type: "SETTING_TIMELINE"});
  try { 
    const res = await axiosInstance.get(`/posts/timeline/${userId}`) 
    let data = res?.data.sort((p2, p1) => {
        return new Date(p1.createdAt) - new Date(p2.createdAt);
    })
    await dispatch({ type: "SET_TIMELINE", payload: data });
    }catch(err){
        console.log(err)
    }
}

export const newPost =async(data,dispatch)=>{
    dispatch({ type: "ADDING_POST" });
    try{
       const res = await axiosInstance.post("/posts",data);
       dispatch({type:"ADD_POST",payload:res.data.post})
    }catch(err){
        console.log(err)
    }
}

export const LikePost = async (postId,userId) =>{
    try{
      return await axiosInstance.put(`/posts/${postId}/like`, { userId: userId})
    }catch(err){
        console.log(err)
    }

}
export const DeletePost = async (postId,userId,dispatch) =>{
    dispatch({ type: "DELETING_POST"});
    try{
     const res = await axiosInstance.delete(`/posts/${postId}/delete`, { userId: userId})
     dispatch({ type: "DELETE_POST", payload: res.data.deletedPost._id})


    }catch(err){
        console.log(err)
    }

}

export const UpdatePost = async (userId,desc,postId,dispatch) => {
    dispatch({type:"UPDATING_POST"});  
    let description ={
        userId:userId,
        desc:desc
    }
    try{
    const res =await axiosInstance.put(`/posts/${postId}`, description);
      let newData ={
        postId:postId,
        desc:desc
      }
      console.log(newData)
      dispatch({type:"UPDATE_POST",payload:newData});  
      return res; 
    }catch(err){
        console.log(err)
    }

}
export const fetchConvesation =async(userId)=>{
    try{
        return await axiosInstance.get(`/conv/${userId}`)
    }catch(err){
        console.log(err)
    }
}

export const fetchMessages = async(chatId)=>{
    try{
     return await axiosInstance.get(`/message/${chatId}`)
    }catch(err){
        console.log(err)
    }

}
export const PostMessage = async(userId,newMessage,receiverId,currentChatId)=>{
    let Message = {
        sender: userId,
        text: newMessage,
        receiver:receiverId,
        conversationId: currentChatId,
    }
    try{
        return await axiosInstance.post('message/',Message)
    }catch(err){
        console.log(err)
    }
}

export const notificationCount = async(userId)=>{
    try{
     let count = await axiosInstance.get(`message/${userId}/notification`)
     return count;
    }catch(err){
        console.log(err)
    }
}
export const markRead = async(messageId)=>{
    try{
        return await axiosInstance.put(`message/${messageId}/`)
    }catch(err){
        console.log(err)
    }
}
export const unseenMeaasge = async(senderId)=>{
    try{
        return await axiosInstance.get(`message/${senderId}/unseen`)
    }catch(err){
        console.log(err)
    }
}

export const updateProfile = async(userId,data)=>{
    try{
     return await axiosInstance.put(`/users/${userId}`, data)
    }catch(err){
        console.log(err)
    }  
}

export const setCoverpic = async(userId,data)=>{
    try{
        return await axiosInstance.put(`/users/${userId}/coverPic`,data)
    }catch(err){
        console.log(err)
    }
}

export const addComment = async(postId,data)=>{
    try{
        return await axiosInstance.post(`/comment/${postId}`,data)
    }catch(err){
        console.log(err)
    }
}

export const PostComments = async(postId)=>{
    try{
        return await axiosInstance.get(`/comment?postId=${postId}`)
    }catch(err) {
        console.log(err)
    }
}

export const getReplies = async(commentId)=>{
    try{
        // return await axiosInstance.get(`/users?username=${username}`)
        return await axiosInstance.get(`/comment?commentId=${commentId}`)
    }catch(err) {
        console.log(err)
    }

}

export const deleteComment = async(commentId,posID) =>{
    try{
        return await axiosInstance.put(`/comment/${commentId}/delete`,{postId:posID})
    }catch(err){
        console.log(err)
    }
}