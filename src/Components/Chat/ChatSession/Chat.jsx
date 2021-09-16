import React, { useRef, useState, useEffect, Children } from "react";
import axios from 'axios';
import {ChatEngine} from 'react-chat-engine';
import {createUserProfileDocument, createEmployee} from '../../../Firebase/firebase.utils';
import "firebase/firestore";
import "firebase/auth";
import { AuthProvider,user } from "../../../contexts/AuthContext"; 



export default function Chats () 
{
    const {user} = AuthProvider(Children);
    const didMountRef = useRef(false);
    useEffect(()=>
    {
        if(!didMountRef.current)
        {
            didMountRef.current = true
            axios.get('https://api.chatengine.io/users/me/',
            { headers: { 
            "project-id": '6c34a123-43fc-41f8-bd5c-fd618ab8b31a',
            "user-name": '.',
            "user-secret": '.' }})
        .catch(e =>{
        let formdata = new FormData()
        formdata.append('email', '.')
        formdata.append('username', '.')
        formdata.append('secret', '.')
        axios.post(
        'https://api.chatengine.io/users/',
        formdata,
        { headers: { "private-key": '86e734ff-c7d8-43da-b6b6-6a157f370cb9' }})
        })
    }})

    return(
        <div>
             <ChatEngine 
        height='calc(100vh - 66px)'
        projectID='6c34a123-43fc-41f8-bd5c-fd618ab8b31a'
        userName='.'
        userSecret='.'
      />
        </div>
    )
}
