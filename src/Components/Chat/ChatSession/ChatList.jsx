import React, { useRef,useEffect} from "react";
import axios from 'axios';
import { ChatEngineWrapper, ChatSocket,  Socket, ChatList} from 'react-chat-engine';
import "firebase/firestore";
import "firebase/auth";
import firebase from "firebase/app";



export default function ChatLists () 
{
    let user = firebase.auth().currentUser;
    const didMountRef = useRef(false);
    useEffect(()=>
    {
        if(!didMountRef.current)
        {
            didMountRef.current = true
            axios.get('https://api.chatengine.io/users/me/',
            { headers: { 
            "project-id": '6c34a123-43fc-41f8-bd5c-fd618ab8b31a',
            "user-name": user.email,
            "user-secret": user.uid
             }})
        .catch(e =>{
        let formdata = new FormData()
        formdata.append('email', user.email)
        formdata.append('username', user.email)
        formdata.append('secret', user.uid)
        axios.post(
        'https://api.chatengine.io/users/',
        formdata,
        { headers: { "private-key": '86e734ff-c7d8-43da-b6b6-6a157f370cb9' }})
        })
    }})

    return(
            <ChatEngineWrapper>
             <Socket
                 height='calc(100vh - 66px)'
                 projectID='6c34a123-43fc-41f8-bd5c-fd618ab8b31a'
                 userName={user.email}
                 userSecret={user.uid}
        
      />
      <ChatList

      />
      </ChatEngineWrapper>
    )

}
