import React from "react";
import FormInput from "../../FormInput/FormInput.Component";
import CustomButton from "../../CustomButton/CustomButton.component";
import { createGroup } from "../../../Firebase/firebase.utils";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../../Redux/User/user.selectors";
import "./AddGroup.Styles.scss";
import {Grid, Box, Typography, Card, CardContent, AvatarGroup, Avatar, CardActions } from '@mui/material';

class AddGroup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			groupName: "",
			description: null,
		};
	}

	handleChange = (event) => {
		const { value, name } = event.target;
		this.setState({
			[name]: value,
		});
	};
	handleSubmit = (e) => {
		e.preventDefault();
		const { currentUser } = this.props;
		const { groupName, description } = this.state;
		try {
			createGroup(currentUser, "group", groupName, description);
			this.setState({
				groupName: "",
				description: ''
			});
		} catch (error) {
			console.error();
		}
		this.setState({
			groupName: "",
			description: '', 
		});
	};
	render() {
		const { groupName, description } = this.state;
		return (
			<Card sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', boxShadow: 3, borderRadius:'15px', width:'70%'}}>
				<CardContent>
					<Typography variant='h5' >
						Create New Group
					</Typography>
					<form onSubmit={this.handleSubmit}>
						<Box sx={{ display: 'flex', flexDirection: 'column' }}>
							<Box sx={{ py: 3 }}>
								<Typography>Group Name</Typography>
								<FormInput
								handleChange={this.handleChange}
								name="groupName"
								required
								id="outlined-size-small"
								defaultValue={groupName}
								size="small"
								/>
							</Box>
								
							<Box sx={{ pb: 3 }}>
								<Typography>Group Description</Typography>
								<FormInput
									onChange={(e) => this.handleChange(e) }
									required
									placeholder="eg: This group is"
									name="description"
									defaultValue={description}
									multiline={true}
									sx={{ width: '100%' }}
								/>
							</Box>
							<Box sx={{ pl: '20%' }}>
								<CustomButton type="submit" sx={{ width:'80%', fontSize:12 }}>Create Group</CustomButton>
							</Box>
							
						</Box>
					</form>
				</CardContent>
			</Card>
		);
	}
}
const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(AddGroup);
