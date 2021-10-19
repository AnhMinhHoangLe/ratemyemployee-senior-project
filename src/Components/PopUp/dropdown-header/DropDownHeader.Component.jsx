import React from "react";
import { auth } from "../../../Firebase/firebase.utils";
import {triggerSelectDropDownHeader} from "../../../Redux/Option/option.actions"
import { Link} from "react-router-dom";
import { connect } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import {List, ListItem, ListItemAvatar, ListItemText,  Avatar, Box, Typography} from '@mui/material';

const DropDownHeader = ({ match, history, dispatch }) => {
    const logOut = (event) => {
        dispatch(triggerSelectDropDownHeader(false))
        auth.signOut()
    }
	return (
		<List sx={{ width: '100%', maxWidth: "10%", bgcolor: 'background.paper', zIndex:5, position:"absolute", top: "70px", right:"23px", borderRadius:"15px", boxShadow: "0px 4px 10px rgba(48, 46, 46, 0.15)"}}>
					<ListItem sx={{ display:"flex", flexDirection: "column", gap:2}}>
                        <Link onClick={(event) => logOut(event)} to="/">
                                        Log out
                        </Link>
                        <Typography component="div" onClick={()=>dispatch(triggerSelectDropDownHeader(false))}><Link to="/user-profile">Profile</Link></Typography>

					</ListItem>
		</List>
	);
};
const mapStateToProps = (state) => ({

});
export default withRouter(connect(mapStateToProps)(DropDownHeader));
