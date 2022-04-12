
const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                error: false,
            }
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            }
        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: true,
            }
        case "LOG_OUT":
            return {
                user: null,
                isFetching: false,
                error: false,
            }
        case "SET_POSTS":
            return {
                ...state,
                posts: action.payload,
            }
        case "SETTING_TIMELINE":
            return {
                ...state,
                settingTimeline:true,
            }
        case "SET_TIMELINE":
            return {
                ...state,
                timeLine: action.payload,
                settingTimeline:false,
            }
        case "DELETING_POST":
            return{
                ...state,
                deletePost:true,
            }
        case "DELETE_POST":
            return {
                ...state,
                timeLine: state.timeLine.filter((i) => i._id !== action.payload),
                deletePost:false,
            }
        case "ADDING_POST":
            return {
            ...state,
            addingPost:true
        }
        case "ADD_POST":
            return {
                ...state,
                timeLine: [action.payload,...state.timeLine],
                addingPost:false,
            }
        case "UPDATING_POST":
            return{
                ...state,
                updatingPost:true
            }
        case "UPDATE_POST":
            let FindPost = state.timeLine.find((i) =>i._id===action.payload.postId);
            const {desc,...other} =FindPost;
            let updatedPost ={...other,...action.payload};
            const{ postId,...newData} =updatedPost;
            let newPosts = [];
            state.timeLine.map((i)=>{
                if(i._id ===action.payload.postId){
                    newPosts.push(newData);
                }else{
                    newPosts.push(i);
                }
                return newPosts;
            })
            return {
                ...state,
                updatingPost:false,
                timeLine: newPosts,
            }
        case "UPDATE_USER":
            return {
                ...state,
                user: action.payload,

            }
        case "UPDATE_PROFILE":
            return {
                ...state,
                user: {
                    ...state.user,
                    profilePicture: action.payload,
                }
            }
        case "UPDATE_COVERPIC":
            return {
                ...state,
                user: {
                    ...state.user,
                    coverPicture: action.payload,
                }
            }
        case "FOLLOW":
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: [...state.user.followings, action.payload]

                }
            }
        case "UNFOLLOW":
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: state.user.followings.filter((following) => following !== action.payload)
                }
            }
        case "SET_SOCKET":
            return {
                ...state,
                socket:action.payload,
            }
        case "SET_ONLINE_USER":
            return {
                ...state,
                onlineUsers:action.payload,
            }
        default:
            return state;
    }
}

export default AuthReducer;