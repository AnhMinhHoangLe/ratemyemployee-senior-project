// import React from "react";
// import CustomButton from "../../CustomButton/CustomButton.component";
// import {
// 	selectListEmployee,
// 	selectEmployeeInfo,
// } from "../../../Redux/Individuals/individuals.selectors";
// import { connect } from "react-redux";
// import { createStructuredSelector } from "reselect";
// import FormInput from "../../FormInput/FormInput.Component";
// import { selectCurrentUser } from "../../../Redux/User/user.selectors";
// import { addEmployeeToGroup } from "../../../Firebase/firebase.utils";
// class AddingForm extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			array: [],
// 		};
// 	}
// 	//submit
// 	handleChange = (event) => {
// 		if (!this.state.array.includes(event.target.value)) {
// 			this.setState({
// 				array: [...this.state.array, event.target.value],
// 			});
// 		}
// 	};

// 	handleSubmit = (event) => {
// 		const { individuals, currentUser } = this.props;

// 		event.preventDefault();

// 		let checkboxes = document.getElementsByClassName("checkbox");
// 		for (let i = 0; i < individuals.length; i++) {
// 			if (checkboxes[i].checked == true) checkboxes[i].checked = false;
// 		}
// 		addEmployeeToGroup(
// 			currentUser,
// 			"group",
// 			"tue3toaKsmumwWtSEmdA",
// 			this.state.array
// 		);
// 	};
// 	//!TODO: cần phải ghi điều kiện để check trong employee list có employee đó chứa. nếu có thì không nên hiện nó thêm môt lần nưa. Muốn làm vậy thì dời function includes() cho vao render
// 	render() {
// 		const { individuals, employeeInfo } = this.props;
// 		const id = Object.keys(employeeInfo);
// 		return (
// 			<div>
// 				<form onSubmit={this.handleSubmit}>
// 					{individuals.map(({ displayName }, index) => (
// 						<FormInput
// 							key={index}
// 							handleChange={this.handleChange}
// 							label={displayName}
// 							type="checkbox"
// 							className="checkbox"
// 						/>
// 					))}
// 					<CustomButton>Submit</CustomButton>
// 				</form>
// 			</div>
// 		);
// 	}
// }
// const mapStateToProps = createStructuredSelector({
// 	employeeInfo: selectEmployeeInfo,
// 	individuals: selectListEmployee,
// 	currentUser: selectCurrentUser,
// });
// export default connect(mapStateToProps)(AddingForm);
