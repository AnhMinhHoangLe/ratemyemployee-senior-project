import React from "react";
import "./EmployeePreview.Styles.scss";
import { withRouter } from "react-router";
import { deleteGroup } from "../../../../Firebase/firebase.utils"

import { selectEmployeeInfo } from "../../../../Redux/Individuals/individuals.selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import CustomButton from "../../../CustomButton/CustomButton.component";
import {Box, Typography, Card, CardContent, AvatarGroup, Avatar, CardActions } from '@mui/material';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
const PreviewCollection = ({
	id,
	employee_list,
	employeeInfo,
	description,
	match,
	history,
	currentUser,
	idGroup
}) => {
	return (
		<Card sx={{ boxShadow: 3, width: '70%', borderRadius: '20px', p:2}}>
			<CardContent>
				<Box sx={{display:'flex',  justifyContent:'space-between'}}>
					<Typography variant='h4' sx={{ color: '#1DA492', pb: 1 }}> GROUP {id}</Typography>
					<Typography>
						<ModeEditOutlineIcon sx={{color:'#869892', pr:1}}/>
						<DeleteOutlineTwoToneIcon sx={{color:'#869892'}} onClick={() => deleteGroup(currentUser, idGroup, employee_list)} />
					</Typography>

				</Box>
				<Typography variant='h6' sx={{pb:2}}><b>Members: </b>{ employee_list.length}</Typography>
				<Typography variant='h6' sx={{ pb: 2 }}><b>Description:</b> {description.substr(0, 100)}</Typography>
				<Box sx={{display:'flex', justifyContent:'space-between'}}>
						<AvatarGroup max={4}>
								{employee_list
								.map(({ id }, index) => (
										<Avatar  alt={employeeInfo[id].displayName} src={employeeInfo[id].avatar}  />
									))}
							{/* <Target /> */}
						</AvatarGroup>
						<CardActions onClick={() => {
							history.push(`${match.url}/${id}`);
						}} sx={{color: '#1DA492', pb:1, cursor:'pointer'}}>
							Go to this group >
						</CardActions >
					</Box>
			</CardContent>
		</Card>
	);
};
const mapStateToProps = createStructuredSelector({
	// employee: selectEmployeeForPreview, // 1: {id: "1", employee_list: Array(1)}
	employeeInfo: selectEmployeeInfo,
});

export default withRouter(connect(mapStateToProps)(PreviewCollection));
