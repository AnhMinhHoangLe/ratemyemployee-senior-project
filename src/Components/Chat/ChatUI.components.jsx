import React, { Component } from 'react';
import Chat from "./ChatSession/Chat";
import "./chatUI.styles.css"
class  ChatUI extends Component{
        // constructor(props) {
        //         super(props)
        //         message: ''
        // }
        render() {
                 return(
                        <div className='chatui-container'>
                                <span className="chatSession-component">
                                       <Chat/>  
                                </span>
                               
                        </div>
        )
        }
}
       
export default ChatUI