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
import { selectTriggerSearchAddEmployee } from "../../../../Redux/Option/option.selectors"

class AddNewIndividualEmployee extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			displayName: "",
			email: "",
			avatar: "",
			uploadImage: null,
			position: "",
			groupActive: false, 
			searchField: ""
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
		try {
			const employee = await {
				displayName,
				email,
				groupActive, 
				position,
			};
			await createEmployee(currentUser, "employee", employee);
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
	render() {
		const {
			displayName,
			email,
			position,
		} = this.state;

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
										<CustomButton>Submit</CustomButton>
								</form>
			</div>
		);
	}
}
const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
});
export default withRouter(connect(mapStateToProps)(AddNewIndividualEmployee));

