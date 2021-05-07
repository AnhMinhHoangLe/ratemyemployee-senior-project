import React from "react";
import { selectToShowEmployeeInfo } from "../../../../Redux/Individuals/individuals.selectors";
import { connect } from "react-redux";
import EmployeeInfoForm from "../../../EmployeeInfoForm/EmployeeInfoForm.Components";
import "./IndividualInfoPage.styles.scss";
const IndividualInfoPage = ({ individuals }) => {
	const {
		displayName,
		email,
		// gender,
		avatar,
		position,
		phone_number,
		// address,
	} = individuals;
	return (
		<div className="grid grid-rows-2 grid-col-2 gap-4 individualInfo-component">
			<span className="col-span-1 border-8">
				<EmployeeInfoForm
					displayName={displayName}
					email={email}
					// gender={gender}
					// address={address}
					avatar={avatar}
					position={position}
					phone_number={phone_number}
				/>
			</span>
			<span className="col-span-1 border-8">Employee Rating</span>
			<span className="col-span-2 border-8">Rating history</span>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => ({
	individuals: selectToShowEmployeeInfo(ownProps.match.params.employeeInfoID)(
		state
	),
});
export default connect(mapStateToProps)(IndividualInfoPage);
