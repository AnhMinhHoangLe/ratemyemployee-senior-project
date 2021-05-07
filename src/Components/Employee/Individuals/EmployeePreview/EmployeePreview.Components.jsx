import React from "react";
import "./EmployeePreview.Styles.scss";
import { withRouter } from "react-router";
import { ReactComponent as Target } from "../../../../Assests/Groups/polygon-4.svg";
import { selectEmployeeForPreview } from "../../../../Redux/Employee/employee.selectors";
import { selectEmployeeInfo } from "../../../../Redux/Individuals/individuals.selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

const PreviewCollection = ({
	id,
	employee_list,
	employeeInfo,
	match,
	history,
}) => {
	return (
		<div
			className="shadow-lg p-6 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 w-full"
			onClick={() => {
				history.push(`${match.url}/${id}`);
			}}
		>
			<h1 className="font-bold text-2xl"> GROUP {id} </h1>
			<span className="flex gap-5 justify-between">
				<ul className="grid grid-cols-2 gap-4">
					{employee_list
						.filter((factor, index) => index < 4)
						.map(({ id }) => (
							<li key={id}>{employeeInfo[id].displayName}</li>
						))}
				</ul>
				<Target />
			</span>
		</div>
	);
};
const mapStateToProps = createStructuredSelector({
	// employee: selectEmployeeForPreview, // 1: {id: "1", employee_list: Array(1)}
	employeeInfo: selectEmployeeInfo,
});

export default withRouter(connect(mapStateToProps)(PreviewCollection));
