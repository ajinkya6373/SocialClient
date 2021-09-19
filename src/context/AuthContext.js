import {createContext,useReducer,useContext}from 'react'
import AuthReducer from "./AuthReducer"

const INITIAL_STATE = {
    user:JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
    deletePost:false,
    post:[],

  
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