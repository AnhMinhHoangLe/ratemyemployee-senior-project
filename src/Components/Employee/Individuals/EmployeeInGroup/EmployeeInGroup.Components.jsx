import React from "react";
import "./EmployeeInGroup.Styles.scss";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { selectEmployeeIngroup } from "../../../../Redux/Employee/employee.selectors";
import { selectEmployeeInfo } from "../../../../Redux/Individuals/individuals.selectors";
import { Link } from "react-router-dom";
import { ReactComponent as Target } from "../../../../Assests/EmployeeIngroup/Polygon 6.svg";
import AddEmployee from "../../../Add/AddEmployee/AddEmployee.Components";
import ReactStars from "react-rating-stars-component";
import { ratingStar } from "../../../../Firebase/firebase.utils";
import { selectRateInfo } from "../../../../Redux/Rate/rate.selectors";
import { OptionBetweenGroupAndTask } from "../../../../Redux/Option/option.actions";
import CustomButton from "../../../CustomButton/CustomButton.component";
import { selectOptionBetweenGroupAndTask } from "../../../../Redux/Option/option.selectors";
import Task from "../../../Tasks/Task.Components";
class EmployeeInGroup extends React.Component {
	// unsubscribeRatingFromSnapshot = null;
	// componentDidMount() {
	// 	const {employee_list } = this.props.employee;
	// 	console.log(id);
	// 	console.log(employee_list);
	// }
	ratingChanged = (newRating, idEmployee) => {
		const { idGroup } = this.props.employee;
		ratingStar(idEmployee, idGroup, newRating);
	};
	render() {
		const {
			employee,
			employeeInfo,
			match,
			history,
			rate,
			dispatch,
			optionGroupAndTask,
		} = this.props;
		// console.log(employee);
		// console.log(match.params.employeeId)
		console.log("rate", rate);
		const { id, employee_list } = employee; // id group and employee list
		return (
			<div className="flex flex-col p-10">
				<div className="grid grid-cols-6 mb-10">
					<div className="col-start-1 col-span-2">
						<Link to="/grps" className="flex gap-3">
								<Target className="w-5 target-employee-in-group" />
								<h1 className="font-bold text-3xl title-employee-in-group">
									Group {id}
								</h1>
							</Link>
						</div>
					<div  className="col-start-5 col-span-2 flex justify-evenly ">
						<span>
							<CustomButton onClick={() => {
										dispatch(OptionBetweenGroupAndTask(true));
									}}>
								Employee
							</CustomButton>
						</span>
						<span>
							<CustomButton
								onClick={() => {
									dispatch(OptionBetweenGroupAndTask(false));
								}}
							>
								Task
							</CustomButton>	
						</span>
									
					</div>
				</div>
				
					{optionGroupAndTask ? (
						<div className="grid grid-cols-6 ">
							<div className="col-start-1 col-span-3 flex gap-5 ">
								{employee_list.map(({ id }) => (
									<div
										key={id}
										className="shadow-lg rounded-xl p-8 flex flex-col bg-green-500 gap-3 justify-center"
									>
										<span
											className="text-center"
											onClick={() => {
												history.push(`${match.url}/${id}`);
											}}
										>
											<img src={employeeInfo[id].avatar} />
											<h1 className="text-lg ">{employeeInfo[id].displayName}</h1>
											<p className="text-lg ">{employeeInfo[id].position}</p>
										</span>
										<span>
											<ReactStars
												count={5}
												onChange={(newRating) =>
													this.ratingChanged(newRating, id)
												}
												size={24}
												// isHalf={true}
												value={3.5}
												emptyIcon={<i className="far fa-star"></i>}
												halfIcon={<i className="fa fa-star-half-alt"></i>}
												fullIcon={<i className="fa fa-star"></i>}
												activeColor="#fa6607"
											/>
										</span>
									</div>
								))}
							</div>

							<div className="col-start-5 col-span-2 ">
								<AddEmployee />
							</div>
						</div>
					) : (
						<div>
							<Task />
						</div>
					)}
			</div>
		);
	}
}
//ownProps which is the props of the component that we are wrapping
const mapStateToProps = (state, ownProps) => ({
	employeeInfo: selectEmployeeInfo(state),
	// (state ) is to pass in selectEmployee => SelectEmployeeInGroup
	employee: selectEmployeeIngroup(ownProps.match.params.employeeId)(state),
	rate: selectRateInfo(state),
	optionGroupAndTask: selectOptionBetweenGroupAndTask(state),
});

export default connect(mapStateToProps)(withRouter(EmployeeInGroup));

//Diary: selectEmployeeInGroup sẽ áp dụng function find() để kiểm tra id có trong object
//thì employee sẽ trả lại giá trị của key() muốn tìm
