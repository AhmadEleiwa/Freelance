import { createContext } from "react";


export const  AuthContext = createContext({
    isLoggedIn : false,
    userId: null,
    token:null,
    login: ()=>{},
    logout: ()=>{}
})

export const  CheckContect = createContext({
    email:null,
    password:null,
    username:null,
    image:null,
    code:null
})