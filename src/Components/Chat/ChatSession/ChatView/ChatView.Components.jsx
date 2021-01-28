import React from 'react';
const ChatView = ({postMessage}) =>{
        return(
              <div>
                {
                        postMessage
                        .filter((item, idx) => idx < 5)
                        .map((msg) =>(
                               ( <p key={msg.id} >{msg}</p>)
                        ))
                }
                </div>  
        )
        
}
export default ChatView