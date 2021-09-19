

 const AuthReducer=(state,action)=> {
    switch (action.type) {
        case "LOGIN_START":
            return{
                user:null,
                isFetching:true,
                error:false,
            }
        case "LOGIN_SUCCESS":
            return{
                user:action.payload,
                isFetching:false,
                error:false,
            }
        case "LOGIN_FAILURE":
            return{
                user:null,
                isFetching:false,
                error:true,
            }
        case "LOG_OUT":
            return{
                user:null,
                isFetching:false,
                error:false,
            }
        case "UPDATE_USER":
            return{
                ...state,
                user:action.payload,

            }
        case "UPDATE_PROFILE":
            return{
                ...state,
                user:{
                    ...state.user,
                    profilePicture:action.payload,
                }


            }
        case "FOLLOW":
            return{
                ...state,
                user:{
                    ...state.user,
                    followings:[...state.user.followings,action.payload]

                }
            }
        case "UNFOLLOW":
            return{
                ...state,
                user:{
                    ...state.user,
                    followings:state.user.followings.filter((following)=>following!==action.payload)
                }
            }
        case "USERS_POSTS":
            return{
                ...state,
                post:action.payload
            }
        case "DELETE_POST":
            return{
                ...state,
                post:state.post.filter((i)=>i._id!==action.payload._id)
            }

        
        default:
            return state;
    }   
}

export default AuthReducer ;