import React, { } from 'react'
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useHistory, withRouter } from "react-router-dom";
import "./AddIndividual.Styles.scss";
import FormInput from "../../../FormInput/FormInput.Component";
import CustomButton from "../../../CustomButton/CustomButton.component";
import {
	storage,
	createEmployee,
	UploadImageIntoStorage,
} from "../../../../Firebase/firebase.utils";
import { selectCurrentUser } from "../../../../Redux/User/user.selectors";
import { selectEmployeeForPreview } from "../../../../Redux/Employee/employee.selectors";
import { Card, Box, Typography, Avatar, FormGroup, InputLabel, MenuItem, Select, FormControl } from '@mui/material';

class AddNewIndividualEmployee extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			displayName: "",
			email: "",
			avatar: "",
			uploadImage: null,
			position: "",
			groupActive: true,
			currentGroupID: null
		};
	}
	handleChange = (event) => {
		const { value, name } = event.target;
		this.setState({
			[name]: value,
		});
	};

	handleSubmit = async (event) => {
		event.preventDefault();
		const { currentUser } = this.props;
		const {
			displayName,
			email,
			groupActive, 
			position,
			currentGroupID, 
		} = this.state;
		try {
			const employee = await {
				displayName,
				email,
				groupActive, 
				position,
				currentGroupID
			};
			await createEmployee(currentUser, "employee", employee);
			this.setState({
				displayName: "",
				email: "",
				position: "",
				currentGroupID: null
			});
		} catch (error) {
			console.error(error);
		}

		this.setState({
			displayName: "",
			email: "",
			position: "",
			currentGroupID: null

		});
	};
	handleSelect = (event) => {
		this.setState({
			currentGroupID: event.target.value
		})
	}
	
	render() {
		const {
			displayName,
			email,
			position,
			currentGroupID
		} = this.state;
		const {employee
		} = this.props
		console.log(employee)
		return (
			<Card sx={{display: 'flex', flexDirection:"column", textAlign:"center",alignItems: 'center', justifyContent: 'center',  p:3, gap:2, borderRadius:"10px" }}>
								<form
									onSubmit={this.handleSubmit}
								>
					<Box sx={{ display: 'flex', flexDirection: "column", textAlign: "center", alignItems: 'center', justifyContent: 'center', gap: 2 }}>
									<Typography>Add New Employee </Typography>
									<FormInput
											name="displayName"
											required
											handleChange={this.handleChange}
											value={displayName}
											id="outlined-basic"
											label="Name"
											variant="outlined"
											size="small"
										/>
										<FormInput
											name="email"
											type="email"
											required
											handleChange={this.handleChange}
											value={email}
											id="outlined-basic"
											label="Email"
											variant="outlined"
											size="small"
										/>
										
										<FormInput
											name="position"
											required
											handleChange={this.handleChange}
											value={position}
											id="outlined-basic"
											label="Position"
											variant="outlined"
											size="small"
										/>
										<FormControl  sx={{ m: 1, minWidth: "100%"}}>
											<InputLabel id="demo-simple-select-label">Group Selection</InputLabel>
											<Select
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												value={currentGroupID}
												label="Group Selection"
												onChange={this.handleSelect}
											>
											{/* <select id="demo-simple-select-label" onChange={this.handleSelect} value={currentGroupID}>
											<option>Select option</option> */}
												{
													employee.length > 0 ? 
													(
														employee.map(({ idGroup, id }) => (
																		<MenuItem  key={id} value={idGroup}>Group {id}</MenuItem>
														))
													): (<MenuItem></MenuItem>)
													
												}
											</Select>
										</FormControl>
										{/* </select> */}
										<CustomButton type="submit" sx={{width:"60%", height:"20%", fontSize:"10px"}}>Add Employee</CustomButton>
									</Box>

										
								</form>
			</Card>
		);
	}
}
const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	employee: selectEmployeeForPreview, // 1: {id: "1", employee_list: Array(1)}

});
export default withRouter(connect(mapStateToProps)(AddNewIndividualEmployee));


