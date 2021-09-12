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
			<div className=" bg-white p-5 shadow-lg rounded-xl text-gray-600">
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
										
										<FormInput
											placeholder="Employee Position"
											type="text"
											name="position"
											required
											handleChange={this.handleChange}
											value={position}
											className="input-add-employee xl:w-80 h-11 rounded-lg text-gray-800 p-3"
										/>
										
					<select onChange={this.handleSelect} value={currentGroupID}>
										<option>Select option</option>
										{
											employee.length > 0 ? 
											(
												employee.map(({ idGroup, id }) => (
																<option key={id} value={idGroup}>Group {id}</option>
												))
											): (<option></option>)
											
										}
										</select>
										<CustomButton>Submit</CustomButton>
								</form>
			</div>
		);
	}
}
const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	employee: selectEmployeeForPreview, // 1: {id: "1", employee_list: Array(1)}

});
export default withRouter(connect(mapStateToProps)(AddNewIndividualEmployee));


