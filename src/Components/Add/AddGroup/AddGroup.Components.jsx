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
			description: null,
		};
	}

	handleChange = (event) => {
		const { value, name } = event.target;
		this.setState({
			[name]: value,
		});
	};
	handleSubmit = (e) => {
		e.preventDefault();
		const { currentUser } = this.props;
		const { groupName, description } = this.state;
		try {
			createGroup(currentUser, "group", groupName, description);
			this.setState({
				groupName: "",
				description: ''
			});
		} catch (error) {
			console.error();
		}
		this.setState({
			groupName: "",
			description: '', 
		});
	};
	render() {
		const { groupName, description } = this.state;

		return (
			<div className="xl:w-3/12  xl:fixed xl:top-40 xl:right-40 bg-white p-5 shadow-lg rounded-xl">
				<h1 className="text-3xl text-center title-add-group mb-5 mb-10">
					Add Group
				</h1>
				<div>
					<form onSubmit={(e) => this.handleSubmit(e)}>
						<div className=" flex flex-col justify-center  items-center gap-4">
							<span>
								<p className="mb-2">Group Name</p>
								<FormInput
								handleChange={this.handleChange}
								placeholder=" Group Name"
								name="groupName"
								required
								value={groupName}
								className="input-add-group xl:w-80 h-11 w-80 rounded-lg text-gray-800 p-3"
								/>
							</span>
							<span>
								<p className="mb-2">Group Description</p>
								<textarea
									onChange={(e) => this.handleChange(e) }
									required
								placeholder="eg: This group is"
								name="description"
								value={description}
								className="input-add-group xl:w-80 w-80 rounded-lg text-gray-800 p-3"
								/>
							</span>
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
