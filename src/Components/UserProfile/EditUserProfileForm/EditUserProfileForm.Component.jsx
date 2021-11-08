import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { styled } from '@mui/material/styles';

import FormInput from "../../FormInput/FormInput.Component";
import CustomButton from "../../CustomButton/CustomButton.component";
import {
	storage,
	updateEmployeeInfo,
	UploadImageIntoStorage,
} from "../../../Firebase/firebase.utils";
import { Card, Box, Typography, Avatar, FormGroup, FormControlLabel, Radio, RadioGroup, FormLabel, FormControl,IconButton, FilledInput  } from '@mui/material';
import { selectToShowEmployeeInfo } from "../../../Redux/Individuals/individuals.selectors";
import { triggerOpenEditUserProfile } from "../../../Redux/Option/option.actions";

const Input = styled('input')({
	display: 'none',
  });
class EditUserProfileForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			address: "",
			gender: "",	
			phone_number: "",
			displayName: "",
			email: "",
			avatar: null, 
			position: "",
			uploadImage: null,
		};
	}
	componentDidMount() {
		const { individuals } = this.props
		console.log(individuals)
		this.setState({
			address: individuals.address,
			gender: individuals.gender, 	
			phone_number: individuals.phone_number,
			displayName: individuals.displayName,
			email: individuals.email,
			avatar: individuals.avatar,
			position: individuals.position
		})
	}
	handleChange = (event) => {
		const { value, name } = event.target;
		this.setState({
			[name]: value,
		});
	};
	cancelEditingProfile = (event) => {
		this.props.triggerOpenEditUserProfile(false)
	}
	handleImageUpload = (event) => {
		if (event.target.files[0]) {
			this.setState({
				uploadImage: event.target.files[0]
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
		const { individuals } = this.props
		const {
			avatar,
			address,
			gender,
			phone_number, 
			displayName,
			email,
			position
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
			await updateEmployeeInfo(employee,individuals.id);
		} catch (error) {
			console.error(error);
		}
		this.props.triggerOpenEditUserProfile(false)

	};

	render() {
		const {
			avatar, 
			displayName,
			email,
			address,
			gender,
			phone_number,
			position,
		} = this.state;
		const { individuals } = this.props
		return (
			<Card sx={{display: 'flex', flexDirection:"column", textAlign:"center",alignItems: 'center', justifyContent: 'center',  p:3, gap:2, borderRadius:"10px" }}>
								<form onSubmit={this.handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: "column", textAlign: "center", alignItems: 'center', justifyContent: 'center', gap: 2 }}>
											<label htmlFor="uploadFile">
											<Input 
												accept="image/*"
												type="file"
												name="uploadImage"
												onChange={(event) => this.handleImageUpload(event)}
												id="uploadFile"
											/>
											<IconButton aria-label="upload picture" component="span" >
												<Box sx={{border: 3, width: "60px", height: "60px", borderRadius: "50%", borderColor: "#2AC28C"}}>

													<Avatar 
													src={avatar} 
													style={{
														width: "60px",
														height: "60px",
													}} 
													/>
												</Box>	
												</IconButton>
											</label>
										
									{
										individuals.admin === true ?
								(
										<>
											<FormInput
											name="displayName"
											type="text"
											onChange={this.handleChange}
											id="outlined-basic"
											label="Display Name"
											variant="outlined"
											size="small"
											value={displayName}
											disabled={true}

                                        	/>
											<FormInput
												name="position"
												type="text"
												onChange={this.handleChange}
												id="outlined-basic"
												label="Position"
												variant="outlined"
												size="small"
												value={position}
												disabled={true}
											/>
										</>
										) : (
											<>
												<FormInput
												name="displayName"
												type="text"
												onChange={this.handleChange}
												id="outlined-basic"
												label="Display Name"
												variant="outlined"
												size="small"
												value={displayName}
												disabled={true}
												/>
												<FormInput
													name="position"
													type="text"
													onChange={this.handleChange}
													id="outlined-basic"
													label="Position"
													variant="outlined"
													size="small"
													value={position}
													disabled={true}
												/>
											</>
										)}
										<FormInput
												name="id"
												type="text"
												id="outlined-basic"
												label="ID"
												variant="outlined"
												size="small"
												value={individuals.id}
												disabled={true}
											/>
										<FormInput
											name="email"
											type="email"
											onChange={this.handleChange}
											id="outlined-basic"
											label="Email"
											variant="outlined"
											size="small"
											value={email}
                                        />
                                        <FormInput
											type="tel"
											name="phone_number"
											placeholder="888 888 8888"
											pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
											onChange={this.handleChange}
                                            id="outlined-basic"
											label="Phone Number"
											variant="outlined"
											size="small"
											value={phone_number}

										/>
										<FormControl component="fieldset">
											<FormLabel component="legend">Gender</FormLabel>
											<RadioGroup row aria-label="gender" name="gender"  onChange={this.handleChange} value={gender} >
												<FormControlLabel value="female" control={<Radio />} label="Female" />
												<FormControlLabel value="male" control={<Radio />} label="Male" />
												<FormControlLabel value="other" control={<Radio />} label="Other" />
											</RadioGroup>
										</FormControl>
                                        <FormInput
											name="address"
											onChange={this.handleChange}
                                            id="outlined-basic"
											label="Address"
											variant="outlined"
											size="small"
											value={address}
										/>
                                        <Box sx={{ display: "flex" }}>
                                            <CustomButton type="submit" sx={{width:"60%", height:"20%", fontSize:"10px"}}>Save</CustomButton>
                                            <CustomButton  sx={{width:"60%", height:"20%", fontSize:"10px"}} onClick={this.cancelEditingProfile}>Cancel</CustomButton>
                                        </Box>
										
										</Box>
									</form>
					
			</Card>
		);
	}
}
const mapStateToProps = (state, ownProps) => ({
	individuals: selectToShowEmployeeInfo(ownProps.idUser)(
		state
	  ),
});
const mapDispatchToProps = (dispatch) => ({
	triggerOpenEditUserProfile:(trigger_open_edit_user_profile) => dispatch(triggerOpenEditUserProfile(trigger_open_edit_user_profile))
  })
export default connect( mapStateToProps, mapDispatchToProps)(EditUserProfileForm);


// https://stackoverflow.com/questions/54914774/how-can-i-make-an-avatar-chooser-with-material-ui