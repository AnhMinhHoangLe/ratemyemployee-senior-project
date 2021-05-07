import React from "react";
import "./AddEmployee.Styles.scss";

import FormInput from "../../FormInput/FormInput.Component";
import CustomButton from "../../CustomButton/CustomButton.component";
import {
	storage,
	createEmployee,
	UploadImageIntoStorage,
} from "../../../Firebase/firebase.utils";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../../Redux/User/user.selectors";
class AddEmployee extends React.Component {
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
		};
	}
	handleChange = (event) => {
		const { value, name } = event.target;
		this.setState({
			[name]: value,
		});
	};
	handleImageUpload = (event) => {
		if (event.target.files[0]) {
			this.setState(
				{
					uploadImage: event.target.files[0],
				},
				() => {
					UploadImageIntoStorage(this.state.uploadImage);
					storage
						.ref("images")
						.child(this.state.uploadImage.name)
						.getDownloadURL()
						.then((downloadURL) => {
							this.setState({
								avatar: downloadURL,
							});
						});
				}
			);
		}
	};
	handleSubmit = (event) => {
		event.preventDefault();
		const { currentUser } = this.props;
		const {
			displayName,
			email,
			avatar,
			// address,
			// gender,
			// phone_number,
			position,
		} = this.state;
		try {
			const employee = {
				displayName,
				email,
				avatar,
				// address,
				// gender,
				// phone_number,
				position,
			};
			createEmployee(currentUser, "employee", employee);
			this.setState({
				displayName: "",
				email: "",
				avatar: "",
				uploadImage: null,
				// address: "",
				// gender: "",
				// image: null,
				// phone_number: "",
				position: "",
			});
			document.getElementById("uploadFile").value = "";
		} catch (error) {
			console.error(error);
		}

		document.getElementById("uploadFile").value = "";
		this.setState({
			displayName: "",
			email: "",
			avatar: "",
			uploadImage: null,
			// address: "",
			// gender: "",
			// phone_number: "",
			position: "",
		});
	};
	render() {
		const {
			displayName,
			email,
			// address,
			// gender,
			// phone_number,
			position,
		} = this.state;

		return (
			<div className="xl:w-3/12 h-11/12 xl:fixed xl:top-40 xl:right-40 bg-white p-5 shadow-lg rounded-xl text-gray-600">
				<h1 className="title-add-employee text-3xl text-center t mb-5 mb-10">
					Add New Employee
				</h1>
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
					{/*<FormInput
						placeholder="Address"
						name="address"
						handleChange={this.handleChange}
						required
						value={address}
						className="input-add-employee xl:w-80 h-11 rounded-lg text-gray-800 p-3"
					/>
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
					/> */}

					<FormInput
						type="file"
						name="uploadImage"
						accept="image/png, image/jpeg"
						required
						handleChange={this.handleImageUpload}
						id="uploadFile"
					/>
					{/*<FormInput
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
		);
	}
}
const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(AddEmployee);
