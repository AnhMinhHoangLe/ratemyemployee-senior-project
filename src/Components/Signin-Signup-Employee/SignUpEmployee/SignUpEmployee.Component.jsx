import React, { Component } from "react";
import FormInput from "../../FormInput/FormInput.Component";
import CustomButton from "../../CustomButton/CustomButton.component";
import {
	auth,
	createEmployeeProfileDocument,
	UploadImageIntoStorage,
	storage,
} from "../../../Firebase/firebase.utils";
import "./SignUp.Styles.css";
class SignUpEmployee extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displayName: "",
			email: "",
			password: "",
			confirmPassword: "",
			position: "",
			uploadImage: null,
			avatar: "", // get link of image and set to the Employee DB
		};
	}

	//submit
	handleSubmit = async (event) => {
		event.preventDefault(); //stops the default action of an element from happening.
		const {
			displayName,
			email,
			password,
			confirmPassword,
			position,
			avatar,
		} = this.state;
		if (password !== confirmPassword) {
			alert("Passwords do not match!");
			return;
		}
		try {
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password
			);
			await createEmployeeProfileDocument(user, {
				displayName,
				position,
				avatar,
			});
			this.setState({
				displayName: "",
				email: "",
				password: "",
				confirmPassword: "",
				position: "",
				avatar: "",
			});
			document.getElementById("uploadFile").value = "";
		} catch (error) {
			console.error(error);
		}
		document.getElementById("uploadFile").value = "";
		this.setState({
			displayName: "",
			email: "",
			password: "",
			confirmPassword: "",
			position: "",
			avatar: "",
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
	//set the value for state
	handleChange = (event) => {
		const { value, name } = event.target;
		this.setState({
			[name]: value,
		});
	};
	render() {
		const {
			displayName,
			email,
			password,
			confirmPassword,
			position,
		} = this.state;
		return (
			<div className="text-black">
				<h2 className="title">I do not have a account</h2>
				<span>Sign up with your email and password</span>
				<form onSubmit={this.handleSubmit}>
					<FormInput
						label="Display Name"
						type="text"
						name="displayName"
						handleChange={this.handleChange}
						value={displayName}
						required
					/>
					<FormInput
						label="Email"
						type="email"
						name="email"
						handleChange={this.handleChange}
						value={email}
						required
					/>
					<FormInput
						label="Password"
						type="password"
						name="password"
						handleChange={this.handleChange}
						value={password}
						required
					/>

					<FormInput
						label="Confirm Password"
						type="password"
						name="confirmPassword"
						handleChange={this.handleChange}
						value={confirmPassword}
						required
					/>
					<FormInput
						type="file"
						name="uploadImage"
						accept="image/png, image/jpeg"
						required
						handleChange={this.handleImageUpload}
						id="uploadFile"
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
					<CustomButton type="submit">Sign Up</CustomButton>
				</form>
			</div>
		);
	}
}
export default SignUpEmployee;
