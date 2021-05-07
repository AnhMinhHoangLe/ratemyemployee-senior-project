import React from "react";
import FormInput from "../../FormInput/FormInput.Component";
import CustomButton from "../../CustomButton/CustomButton.component";
import { createGroup } from "../../../Firebase/firebase.utils";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../../Redux/User/user.selectors";
import "./AddGroup.Styles.scss";
class AddGroup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			groupName: "",
		};
	}

	handleChange = (event) => {
		const { value, name } = event.target;
		this.setState({
			[name]: value,
		});
	};
	handleSubmit = (event) => {
		event.preventDefault();
		const { currentUser } = this.props;
		const { groupName } = this.state;
		try {
			createGroup(currentUser, "group", groupName);
		} catch (error) {
			console.error();
		}
		this.setState({
			groupName: "",
		});
	};
	render() {
		const { groupName } = this.state;

		return (
			<div className="xl:w-3/12 h-80 xl:fixed xl:top-40 xl:right-40 bg-white p-5 shadow-lg rounded-xl">
				<h1 className="text-3xl text-center title-add-group mb-5 mb-10">
					Add Group
				</h1>
				<div>
					<form onSubmit={this.handleSubmit}>
						<div className=" flex flex-col justify-center  items-center gap-4">
							<FormInput
								handleChange={this.handleChange}
								placeholder=" Group Name"
								name="groupName"
								required
								value={groupName}
								className="input-add-group xl:w-80 h-11 rounded-lg text-gray-800 p-3"
							/>
							<span className="button-add-group   ">
								<CustomButton>Submit</CustomButton>
							</span>
						</div>
					</form>
				</div>
			</div>
		);
	}
}
const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(AddGroup);
