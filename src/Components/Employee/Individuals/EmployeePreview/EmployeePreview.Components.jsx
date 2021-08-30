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
	description,
	match,
	history,
}) => {
	return (
		<div
			className="shadow-lg p-6 rounded-lg w-4/5 text-xl cursor-default"
		>
			<h1 className="font-bold text-3xl text-green-600 mb-4"> GROUP {id} </h1>
			<p className="mb-4"><span className="font-bold">Members: </span><span>{ employee_list.length}</span></p>
			<p className="mb-4"><span className="font-bold">Description: </span> <span>{description.substr(0, 100)}</span></p>
			<span className="flex gap-5 justify-between">
				<ul className="grid grid-cols-2 relative">
					{employee_list
						.filter((factor, index) => index < 4)
						.map(({ id }, index) => (
							<li className={`h-10 w-10 rounded-full border border-gray-100`}><img width="100" height="100" src={employeeInfo[id].avatar !== "" ? employeeInfo[id].avatar : 'https://firebasestorage.googleapis.com/v0/b/rate-my-employee-d7636.appspot.com/o/images%2Ftree-736885__340.jpg?alt=media&token=4aea820d-9eba-4c4f-b9fd-e85915dd0463'} /></li>
						))}
				</ul>
				{/* <Target /> */}
				<p onClick={() => {
					history.push(`${match.url}/${id}`);
				}} className="text-green-600 text-right	text-xl cursor-pointer z-0">
					Go to this group >
				</p>
			</span>
		</div>
	);
};
const mapStateToProps = createStructuredSelector({
	// employee: selectEmployeeForPreview, // 1: {id: "1", employee_list: Array(1)}
	employeeInfo: selectEmployeeInfo,
});

export default withRouter(connect(mapStateToProps)(PreviewCollection));
