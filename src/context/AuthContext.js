import {createContext,useReducer,useContext}from 'react'
import AuthReducer from "./AuthReducer"

const INITIAL_STATE = {
    user:JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
    deletePost:false,
    addingPost:false,
    settingTimeline:false,
    updatingPost:false,
    timeLine:[]
  };

export const AuthContext = createContext();

export const AuthContextProvider =({children})=> {
    return (
        <AuthContext.Provider value={useReducer(AuthReducer,INITIAL_STATE)}>
            {children}
        </AuthContext.Provider>
    )
}

export const useStateValue = ()=> useContext(AuthContext)