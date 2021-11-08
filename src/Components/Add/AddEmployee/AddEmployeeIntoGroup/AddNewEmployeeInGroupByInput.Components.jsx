import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useHistory, withRouter } from "react-router-dom";
import "./AddEmployee.Styles.scss";
import FormInput from "../../../FormInput/FormInput.Component";
import CustomButton from "../../../CustomButton/CustomButton.component";
import {
	storage,
	createEmployeeInGroup,
	UploadImageIntoStorage,
} from "../../../../Firebase/firebase.utils";
import { selectCurrentUser } from "../../../../Redux/User/user.selectors";
import { selectTriggerSearchAddEmployee } from "../../../../Redux/Option/option.selectors"
// import AddEmployeeBySearch from "./AddEmployeeBySearch/AddEmployeeBySearch.Component";
import ResultAddEmployeeBySearch from "../ResultOfAddEmployeeBySearch/ResultAddEmployeeBySearch.Component"
import { triggerSearchAddEmployeeComp } from '../../../../Redux/Option/option.actions'
// import {fetchEmployeeStartAsync} from "../../../Redux/Individuals/Individuals.actions"
import { Card, Box, Typography, Avatar, FormGroup  } from '@mui/material';

class AddNewEmployeeInGroupByInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			displayName: "",
			email: "",
			avatar: "",
			uploadImage: null,
			position: "",
			groupActive: true,
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
		} = this.state;
		const currentGroupID = this.props.idGroup
		try {
			const employee = await {
				displayName,
				email,
				groupActive, 
				position,
				currentGroupID
			};
			await createEmployeeInGroup(currentUser, "employee", employee);
			this.setState({
				displayName: "",
				email: "",
				position: "",
			});
		} catch (error) {
			console.error(error);
		}

		this.setState({
			displayName: "",
			email: "",
			position: "",
		});
	};
	
	onSearchChange = (event) => {
		event.preventDefault()
		const {dispatch} = this.props
        if (event.target.value.length !== 0) {
            dispatch(triggerSearchAddEmployeeComp(true))
			this.setState({
				searchField: event.target.value, 
			});
        }
		else {
			dispatch(triggerSearchAddEmployeeComp(false))
		}
	};
	render() {
		const {
			displayName,
			email,
			position,
			searchField
		} = this.state;
		const { selectTriggerSearchAddEmployee } = this.props

		return (
			<Card sx={{display: 'flex', flexDirection:"column", textAlign:"center",alignItems: 'center', justifyContent: 'center',  p:3, gap:2, borderRadius:"10px" }}>
			{/* Searching form */}
				<Typography>Add Existing Employee</Typography>
					{/* Add Employee By Search */}
					<FormInput
						name="searchName"
						onChange={this.onSearchChange}
						id="outlined-basic"
						label="Search Name"
						variant="outlined"
						size="small"
						sx={{borderRadius:"20px"}}
					/>

					<Typography sx={{bottomBorder:"1px black solid"}}></Typography>		
					{selectTriggerSearchAddEmployee ? (
						// Result from searching existing employee
						
							<ResultAddEmployeeBySearch search={searchField}/>
						
					) : (
							//Form to input new employee
								<form onSubmit={this.handleSubmit}>
									<Box sx={{ display: 'flex', flexDirection: "column", textAlign: "center", alignItems: 'center', justifyContent: 'center', gap: 2 }}>
										<Typography>Add New Employee </Typography>
										{/* <FormInput
											placeholder="Address"
											name="address"
											handleChange={this.handleChange}
											required
											value={address}
											className="input-add-employee xl:w-80 h-11 rounded-lg text-gray-800 p-3"
										/> */}
										{/* <span className='flex justify-between'>
											<FormInput
												type="radio"
												name="gender"
												value="male"
												label="male"
												required
												handleChange={this.handleChange}
												className="input-add-employee "
											/>
											<FormInput
												type="radio"
												name="gender"
												value="female"
												label="female"
												required
												handleChange={this.handleChange}
											/>
											<FormInput
												type="radio"
												name="gender"
												value="binary"
												label="binary"
												required
												handleChange={this.handleChange}
											/>
										</span> */}
										{/* <FormInput
											type="file"
											name="uploadImage"
											accept="image/png, image/jpeg"
											required
											handleChange={this.handleImageUpload}
											id="uploadFile"
										/> */}

										{/* <FormInput
											type="tel"
											name="phone_number"
											placeholder="888 888 8888"
											pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
											required
											handleChange={this.handleChange}
											value={phone_number}
											className="input-add-employee xl:w-80 h-11 rounded-lg text-gray-800 p-3"
										/>
										*/}
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
										<CustomButton type="submit" sx={{width:"60%", height:"20%", fontSize:"10px"}}>Add Employee</CustomButton>
										</Box>
									</form>
					)}
					
			</Card>
		);
	}
}
const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	selectTriggerSearchAddEmployee: selectTriggerSearchAddEmployee, 
});
export default withRouter(connect(mapStateToProps)(AddNewEmployeeInGroupByInput));
