import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import FormInput from "../../FormInput/FormInput.Component";
import CustomButton from "../../CustomButton/CustomButton.component";
import {
	storage,
	createEmployeeInGroup,
	UploadImageIntoStorage,
} from "../../../Firebase/firebase.utils";
import { selectTriggerSearchAddEmployee } from "../../../Redux/Option/option.selectors"
import { Card, Box, Typography, Avatar, FormGroup  } from '@mui/material';

class EditUserProfileForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			address: "",
			gender: "",	
			phone_number: "",
			displayName: "",
			email: "",
			avatar: "",
			position: "",
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this)
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
	handleSubmit = async (event) => {
		event.preventDefault();
		const { currentUser } = this.props;
		const {
			avatar,
			address,
			gender,
			phone_number, 
			displayName,
			email,
			position,
		} = this.state;
		try {
			const employee = await {
				displayName,
				email,
				avatar,
				address,
				gender,
                phone_number, 
				position,
			};
			// await createEmployeeInGroup(currentUser, "employee", employee);
			// await fetchEmployeeStartAsync(currentUser)
			this.setState({
				displayName: "",
				email: "",
				avatar: "",
				uploadImage: null,
				address: "",
				gender: "",
				image: null,
				phone_number: "",
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
			address: "",
			gender: "",
			phone_number: "",
			position: "",
		});
	};
	
	render() {
		const {
			displayName,
			email,
			address,
			gender,
			phone_number,
			position,
		} = this.state;
		const {  } = this.props

		return (
			<Card sx={{display: 'flex', flexDirection:"column", textAlign:"center",alignItems: 'center', justifyContent: 'center',  p:3, gap:2, borderRadius:"10px" }}>
								<form onSubmit={this.handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: "column", textAlign: "center", alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                                        <FormInput
                                                                type="file"
                                                                name="uploadImage"
                                                                accept="image/png, image/jpeg"
                                                                required
                                                                handleChange={this.handleImageUpload}
                                                                id="uploadFile"
                                            />
                                        <Typography varian="h4">DIsplay Name</Typography>
                                        <Typography varian="h6">Position</Typography>
                                        <Typography varian="h6">Id</Typography>
										<FormInput
											name="email"
											type="email"
											required
											handleChange={this.handleChange}
											// value={email}
											id="outlined-basic"
											label="Email"
											variant="outlined"
											size="small"
                                        />
                                        <FormInput
											type="tel"
											name="phone_number"
											placeholder="888 888 8888"
											pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
											required
											handleChange={this.handleChange}
											// value={phone_number}
                                            id="outlined-basic"
											label="Phone Number"
											variant="outlined"
											size="small"
										/>
                                        <Box sx={{display: 'flex'}}>
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
										</Box>
                                        <FormInput
											name="address"
											handleChange={this.handleChange}
                                            required
                                            id="outlined-basic"
											label="Address"
											variant="outlined"
											size="small"
											// value={address}
										/>
                                        <Box sx={{ display: "flex" }}>
                                            <CustomButton type="submit" sx={{width:"60%", height:"20%", fontSize:"10px"}}>Save</CustomButton>
                                            <CustomButton  sx={{width:"60%", height:"20%", fontSize:"10px"}}>Cancel</CustomButton>
                                        </Box>
										
										</Box>
									</form>
					
			</Card>
		);
	}
}
const mapStateToProps = createStructuredSelector({
});
export default connect(mapStateToProps)(EditUserProfileForm);
