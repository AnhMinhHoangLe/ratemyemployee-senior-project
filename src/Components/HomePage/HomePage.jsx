import React, {Component} from 'react';
import "./HomePage.Styles.css"
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from "../Header/Header.Components"
import ChatUI from "../Chat/ChatUI.components"

class HomePage  extends Component{
       
        render(){
                 return(
               <div>
                       <h1> Home</h1>            
                </div>
        )
        }
}



export default HomePage