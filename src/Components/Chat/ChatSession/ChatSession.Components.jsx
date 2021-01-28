import React, {Component} from 'react';
import TitleChat from '../Title/TitleChat.Components'
import ChatView from './ChatView/ChatView.Components'
import ReplyBox from './ReplyBox/ReplyBox.Components'
import "./ChatSession.styles.css"
class ChatSession extends Component{
        constructor(props) {
                super(props)
                this.state={
                        message:'', 
                        postMessage: []
                }
        }

        handleChange = (event) => {
                this.setState({message:event.target.value})
                console.log(this.state.message)
        }
        handleSubmit = (event) =>{
                event.preventDefault()
                try{
                        this.setState({
                                postMessage: [...this.state.postMessage, this.state.message], 
                                message: ""
                        })
                }
                catch(error) {
                        console.error(error)
                }

                console.log(this.state.message, this.state.postMessage )
        }
        render(){
                return(
                        <div className="ChatSession-container">
                                <span className="titleChat-component"><TitleChat /></span>
                                <span className="chatview-component"><ChatView  postMessage={this.state.postMessage} /></span>
                                <span className="replybox-component"><ReplyBox   handleChange={this.handleChange} handleSubmit={this.handleSubmit} message={this.state.message} /></span>
                        </div>
                )
        }
}
       

export default ChatSession