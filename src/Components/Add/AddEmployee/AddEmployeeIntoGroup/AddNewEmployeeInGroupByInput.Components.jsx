import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useHistory, withRouter } from "react-router-dom";
import "./AddEmployee.Styles.scss";
import FormInput from "../../../FormInput/FormInput.Component";
import CustomButton from "../../../CustomButton/CustomButton.component";
import {
	storage,
	createEmployee,
	UploadImageIntoStorage,
} from "../../../../Firebase/firebase.utils";
import { selectCurrentUser } from "../../../../Redux/User/user.selectors";
import { selectTriggerSearchAddEmployee } from "../../../../Redux/Option/option.selectors"
// import AddEmployeeBySearch from "./AddEmployeeBySearch/AddEmployeeBySearch.Component";
import ResultAddEmployeeBySearch from "../ResultOfAddEmployeeBySearch/ResultAddEmployeeBySearch.Component"
import { triggerSearchAddEmployeeComp } from '../../../../Redux/Option/option.actions'
// import {fetchEmployeeStartAsync} from "../../../Redux/Individuals/Individuals.actions"
class AddNewEmployeeInGroupByInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			displayName: "",
			email: "",
			// address: "",
			// gender: "",
			avatar: "",
			uploadImage: null,
			// phone_number: "",
			position: "",
			groupActive: true, 
			searchField: ""
		};
	}
	handleChange = (event) => {
		const { value, name } = event.target;
		this.setState({
			[name]: value,
		});
	};
	// handleImageUpload = (event) => {
	// 	if (event.target.files[0]) {
	// 		this.setState(
	// 			{
	// 				uploadImage: event.target.files[0],
	// 			},
	// 			() => {
	// 				UploadImageIntoStorage(this.state.uploadImage);
	// 				storage
	// 					.ref("images")
	// 					.child(this.state.uploadImage.name)
	// 					.getDownloadURL()
	// 					.then((downloadURL) => {
	// 						this.setState({
	// 							avatar: downloadURL,
	// 						});
	// 					});
	// 			}
	// 		);
	// 	}
	// };
	handleSubmit = async (event) => {
		event.preventDefault();
		const { currentUser } = this.props;
		const {
			displayName,
			email,
			// avatar,
			// address,
			// gender,
			// phone_numb
			groupActive, 
			position,
		} = this.state;
		const idGroup = this.props.idGroup
		try {
			const employee = await {
				displayName,
				email,
				// avatar,
				// address,
				// gender,
				groupActive, 
				position,
				idGroup
			};
			await createEmployee(currentUser, "employee", employee);
			// await fetchEmployeeStartAsync(currentUser)
			this.setState({
				displayName: "",
				email: "",
				// avatar: "",
				// uploadImage: null,
				// address: "",
				// gender: "",
				// image: null,
				// phone_number: "",
				position: "",
			});
			// document.getElementById("uploadFile").value = "";
		} catch (error) {
			console.error(error);
		}

		// document.getElementById("uploadFile").value = "";
		this.setState({
			displayName: "",
			email: "",
			// avatar: "",
			// uploadImage: null,
			// address: "",
			// gender: "",
			// phone_number: "",
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
			// address,
			// gender,
			// phone_number,
			position,
			searchField
		} = this.state;
		const { selectTriggerSearchAddEmployee } = this.props

		return (
			<div className="xl:w-3/12 h-11/12 xl:fixed xl:top-40 xl:right-40 bg-white p-5 shadow-lg rounded-xl text-gray-600">
				{/* Searching form */}
				<div>
					<h1 className="title-add-employee text-3xl text-center t mb-5 mb-10">Add Existing Employee</h1>
					
					{/* Add Employee By Search */}
					<FormInput
						placeholder="Search Name"
						name="searchName"
						className="input-add-employee xl:w-80 h-11 rounded-lg text-gray-800 p-3"
						onChange={this.onSearchChange}
					/>
				</div>

				<br /><hr /><br />
				
				<div>
					{selectTriggerSearchAddEmployee ? (
						// Result from searching existing employee
						
							<ResultAddEmployeeBySearch search={searchField}/>
						
					) : (
							//Form to input new employee
						<div>
								<h1 className="title-add-employee text-3xl text-center t mb-5 mb-10">Add New Employee </h1>
								<form
									onSubmit={this.handleSubmit}
									className=" flex flex-col justify-center  items-center gap-4"
								>
										<FormInput
											placeholder="Display Name"
											name="displayName"
											required
											handleChange={this.handleChange}
											value={displayName}
											className="input-add-employee xl:w-80 h-11 rounded-lg text-gray-800 p-3"
										/>
										<FormInput
											placeholder="Email"
											name="email"
											type="email"
											required
											handleChange={this.handleChange}
											value={email}
											className="input-add-employee xl:w-80 h-11 rounded-lg text-gray-800 p-3"
										/>
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
											placeholder="Employee Position"
											type="text"
											name="position"
											required
											handleChange={this.handleChange}
											value={position}
											className="input-add-employee xl:w-80 h-11 rounded-lg text-gray-800 p-3"
										/>
										<CustomButton>Submit</CustomButton>
									</form>
							</div>
					)}
					
					</div>
			</div>
		);
	}
}
const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	selectTriggerSearchAddEmployee: selectTriggerSearchAddEmployee, 
});
export default withRouter(connect(mapStateToProps)(AddNewEmployeeInGroupByInput));
