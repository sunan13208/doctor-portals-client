import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut,onAuthStateChanged,updateProfile } from "firebase/auth";
import app from '../Firebase/firebase.config';

export const AuthContext = createContext()

const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const[user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    const createuser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logout=()=>{
        setLoading(true)
        return signOut(auth)
    }
    const updateName=(userInfo)=>{
        return updateProfile(auth.currentUser,userInfo)
    }

    const authInfo =
    {
        createuser,
        login,
        logout,
        user,
        updateName,
        setLoading,
        loading
    }
    useEffect(()=>{
       const unSubscribe= onAuthStateChanged(auth,user=>{
            setUser(user)
            setLoading(false)
        })
        return ()=>unSubscribe()
    },[])
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;