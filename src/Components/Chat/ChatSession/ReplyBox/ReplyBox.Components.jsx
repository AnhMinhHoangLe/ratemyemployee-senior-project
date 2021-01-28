import React, {Component} from 'react';
import CustomButton from '../../../CustomButton/CustomButton.component'
import FormInput from '../../../FormInput/FormInput.Component'
import "./replyBox.styles.css"
const ReplyBox =({handleSubmit, handleChange, message}) => {
                  return(
                <div className='replybox-container'>
                        <form onSubmit={handleSubmit}>
                                <textarea  placeholder="Enter your message..." className="replybox-typing"  onChange={handleChange} value={message} />
                                <CustomButton className="reply-confirm-button">Submit</CustomButton>
                        </form>
                </div>
        )
        }
export default ReplyBox