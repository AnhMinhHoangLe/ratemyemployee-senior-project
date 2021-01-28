import React from 'react';
import "./Header.Styles.css"
import { Link } from 'react-router-dom';
import {auth} from "../../Firebase/firebase.utils"
const Header = () =>{
        return(
                
                <div className="header-container">
                        <Link onClick={() =>auth.signOut() } to="/" >Log out</Link>
                        <Link  to="/chat" >Messages </Link>
                        <Link  to="/groups" >Groups</Link>
                        <Link  to="/plan" >Plan</Link>
                </div>
            
        )
}
export default Header