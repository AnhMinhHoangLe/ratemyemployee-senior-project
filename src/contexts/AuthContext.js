import React, {useContext, useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import "firebase/auth";
import auth from "../Firebase/firebase.utils";

const AuthContext= React.createContext();
export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider ({ children}){
    const [user] = useState();

const value = {user};

return (
    <AuthContext.Provider value ={value}>
        {children}
    </AuthContext.Provider>
)
}