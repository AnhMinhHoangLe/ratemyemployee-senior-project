import React from "react";
import "./EmployeeInfo.Styles.css";
import EmployeeInfoForm from "../../../EmployeeInfoForm/EmployeeInfoForm.Components";
import { selectToShowEmployeeInfo } from "../../../../Redux/Individuals/individuals.selectors";
import { selectEmployeeIngroup } from "../../../../Redux/Employee/employee.selectors";
import { connect } from "react-redux";
const EmployeeInfo = ({ individuals, employee, match }) => {
	const {
		displayName,
		email,
		gender,
		address,
		avatar,
		phone_number,
	} = individuals;
	const { employee_list } = employee;
	const { rate, position } = employee_list.find(
		(key) => key.id === match.params.employeeInfoID
	);
	return (
		<div>
			{
				<div>
					<div className="grid grid-rows-2 grid-col-2 gap-4 individualInfo-component">
						<span className="col-span-1 border-8">
							<EmployeeInfoForm
								displayName={displayName}
								email={email}
								// gender={gender}
								// address={address}
								avatar={avatar}
								phone_number={phone_number}
								position={position}
							/>
						</span>
						<span className="col-span-1 border-8">Rate: {rate} </span>
						<span className="col-span-2 border-8">Rating history</span>
					</div>
				</div>
			}
		</div>
	);
};

const mapStateToProps = (state, ownProps) => ({
	individuals: selectToShowEmployeeInfo(ownProps.match.params.employeeInfoID)(
		state
	),
	employee: selectEmployeeIngroup(ownProps.match.params.employeeId)(state),

	//       employeeInfoID
});
export default connect(mapStateToProps)(EmployeeInfo);
