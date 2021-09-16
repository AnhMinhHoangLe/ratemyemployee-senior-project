import React, { Component } from 'react';
import Chat from "./ChatSession/Chat";
import "./chatUI.styles.css"
class  ChatUI extends Component{

        render() {
                 return(
                        <div>
                                <span className="chatSession-component">
                                       <Chat/>  
                                </span>
                               
                        </div>
        )
        }
}
       
export default ChatUI