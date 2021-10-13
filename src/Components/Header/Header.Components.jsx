import React from "react";
import { ReactComponent as Logo } from "../../Assests/logo/logo.svg";
import { Link} from "react-router-dom";
import { auth } from "../../Firebase/firebase.utils";
import SearchBox from "../Search/SearchBox/Search.Components";
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import Avatar from '@mui/material/Avatar';

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
		width:'10%'
	}
  });

export default function Header({currentUser}) {


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
					<Typography sx={{ flexGrow: 1, display: 'flex', pl: 5 }} >
					<Typography component="div" sx={{ flexGrow: 1}} className={classes.userPage}>
							<Avatar sx={{mr:2}}>N</Avatar>
							<Typography sx={{color:'black'}}>{ currentUser.displayName}</Typography>
					</Typography>
					<Typography component="div" sx={{ flexGrow: 1 }} >
							<Link onClick={() => auth.signOut()} to="/">
									Log out
							</Link>
					</Typography>
					</Typography>
				</Toolbar>
			</AppBar>
			
		</Box>
	);
};
