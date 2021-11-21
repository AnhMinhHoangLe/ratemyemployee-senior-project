import React from "react";
import FormInput from "../../FormInput/FormInput.Component";
import CustomButton from "../../CustomButton/CustomButton.component";
import { createGroup } from "../../../Firebase/firebase.utils";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../../Redux/User/user.selectors";
import "./AddGroup.Styles.scss";
import {Grid, Box, Typography, Card, CardContent, AvatarGroup, Avatar, CardActions, FormControl } from '@mui/material';

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
			<Card sx={{display:'flex', flexDirection:'column', alignItems:"center",  boxShadow: 3, borderRadius:'15px', width:'80%', pt:5, pb:5}}>
				<CardContent sx={{width:"80%"}}>
					<Typography variant='h5' sx={{textAlign:"center"}} >
						Create New Group
					</Typography>
					<form onSubmit={this.handleSubmit}>
						<Box sx={{ display: 'flex', flexDirection: 'column'}}>
							<Box sx={{ py: 3}}>
								<Typography>Group Name</Typography>
								<FormInput
									handleChange={this.handleChange}
									name="groupName"
									required
									value={groupName}
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
									value={description}
									multiline={true}
								/>
							</Box>
							<Box sx={{ pl: '20%' }}>
								<CustomButton type="submit" sx={{ mt:2, fontSize:16, position:"relative", left:"5%"}}>Create Group</CustomButton>
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
