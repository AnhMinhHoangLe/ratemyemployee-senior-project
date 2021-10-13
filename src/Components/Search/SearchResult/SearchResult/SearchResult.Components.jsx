import React from "react";
import {
	selectListEmployee,
	selectEmployeeInfo,
} from "../../../../Redux/Individuals/individuals.selectors";
import { connect } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import {  triggerSearchComp } from "../../../../Redux/Option/option.actions"
import {List, ListItem, ListItemAvatar, ListItemText,  Avatar, Box, Typography} from '@mui/material';

const SearchResult = ({ search, individuals, match, history, dispatch }) => {
	// let history = useHistory();
	// function handleClick(id) {
	// 	const urlEncodedID = encodeURI(id);
	// 	history.push(`/search?find_emp=${urlEncodedID}`);
	// }
	return (
		<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', zIndex:5, position:"absolute", top: "50px", borderRadius:"15px", boxShadow: "0px 4px 10px rgba(48, 46, 46, 0.15)" }}>
			{search ? (
				individuals
				.filter((key) =>
					key.displayName.toUpperCase().includes(search.toUpperCase())
				)
				.map(({ id, displayName, avatar, position }) => (
					<ListItem
						key={id}
						onClick={() => {
							history.push(`/emps/${id}`);
							dispatch(triggerSearchComp(false))
						}}
					>
						<ListItemAvatar>
							<Avatar
								alt={displayName}
								src={avatar}
								sx={{border:"3px solid #2AC28C"}}
							/>
						</ListItemAvatar>
						<ListItemText primary={displayName} secondary={position} />
					</ListItem>
				))
			): (
				<ListItem>
					<ListItemText primary="Not Found" />
				</ListItem>
				
			)}
		</List>
	);
};
const mapStateToProps = (state) => ({
	individuals: selectListEmployee(state),
});
export default withRouter(connect(mapStateToProps)(SearchResult));
