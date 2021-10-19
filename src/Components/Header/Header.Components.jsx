import React from "react";
import { ReactComponent as Logo } from "../../Assests/logo/logo.svg";
import { Link} from "react-router-dom";
import SearchBox from "../Search/SearchBox/Search.Components";
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import Avatar from '@mui/material/Avatar';
import { connect } from "react-redux";
import {selectTriggerDropDownMenu} from "../../Redux/Option/option.selectors"
import { triggerSelectDropDownHeader } from "../../Redux/Option/option.actions"
import DropDownHeader from "../PopUp/dropdown-header/DropDownHeader.Component"
const useStyles = makeStyles({
	Container: {
		position:'relative', 
		flexGrow: 1,
		color: '#869892',
	},
	list: {
		display: 'flex',
	},
	listItem: {
		position: 'relative',
		top: 5,
	},
	AppBar: {
		background: '#FFFFFF',
		height: '10ch',
		padding:'5px'
	},
	ToolBar: {
		display: 'flex', 
		justifyContent:'center'
	},
	Link: {
		padding:'5px', 

		color: "#869892",
		fontSize: 20,
		'&:hover': {
			color: 'black',
		},
	
	},
	userPage: {
		display: 'flex',
		alignItems: 'center',
		backgroundColor: '#E0E0E0',
		borderRadius: '100px',
	}
  });

const Header = ({currentUser, selectTriggerDropDownMenu, dispatch}) => {
	// let history = useHistory();
	// function handleClick(id) {
	// 	const urlEncodedID = encodeURI(id);
	// 	history.push(`/search?find_emp=${urlEncodedID}`);

	// }
	const classes = useStyles();

	return (
		<Box className={classes.Container}>
			<AppBar position="static" className={classes.AppBar}>
				<Toolbar className={classes.Toolbar}>
					<Typography component="div" sx={{ flexGrow: 1 }} className={classes.list}>
						<Typography component="div" sx={{ flexGrow: 1 }}  className={classes.logo}><Link to="/"><Logo /></Link></Typography>
						<Typography component="div" sx={{ flexGrow: 1 }} className={classes.listItem}><Link to="/grps" className={classes.Link}>Groups</Link></Typography>
						<Typography component="div" sx={{ flexGrow: 1 }} className={classes.listItem}><Link to="/emps" className={classes.Link}>Employees</Link></Typography>
						<Typography component="div" sx={{ flexGrow: 1 }} className={classes.listItem}><Link to="/msg" className={classes.Link}>Messages</Link></Typography>
					</Typography>
					<Box sx={{ flexGrow: 1 }} />
					<Typography sx={{pr:3}}>
						<SearchBox />
					</Typography>
					<Box sx={{ flexGrow: 1 }} />
					<Typography component="div" className={classes.userPage} onClick={()=>{dispatch(triggerSelectDropDownHeader(!selectTriggerDropDownMenu))}}>
								<Avatar src={currentUser.photoURL} />
								<Typography sx={{color:'black', flexGrow:1, pr:2, pl:2}}>{currentUser.displayName}</Typography>
					</Typography>
					{selectTriggerDropDownMenu ? (<DropDownHeader/>):('')}

				</Toolbar>
			</AppBar>
			
		</Box>
	);
};
const mapStateToProps = (state) => ({
	selectTriggerDropDownMenu:selectTriggerDropDownMenu(state)
})
export default connect(mapStateToProps)(Header);