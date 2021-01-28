import React, { Component } from 'react';
import ListChat from './ListChat/ListChat.Components'
import ChatSession from "./ChatSession/ChatSession.Components"
import "./chatUI.styles.css"
class  ChatUI extends Component{
        // constructor(props) {
        //         super(props)
        //         message: ''
        // }
        render() {
                 return(
                        <div className='chatui-container'>
                                <span className="listChat-component">
                                        <ListChat />
                                </span>
                                <span className="chatSession-component">
                                       <ChatSession />  
                                </span>
                               
                        </div>
        )
        }
}
       
export default ChatUI