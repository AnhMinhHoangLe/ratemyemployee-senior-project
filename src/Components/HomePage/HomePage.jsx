import React, { Component } from "react";
import "./HomePage.Styles.css";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { firestore } from "../../Firebase/firebase.utils";
import {
	convertDataEmployeeSnapShot,
	convertDataGroupSnapShot,
	convertDataRateSnapShot,
} from "../../Firebase/firebase.snapshot";
import { selectCurrentUser } from "../../Redux/User/user.selectors";
import { updateEmployee } from "../../Redux/Individuals/Individuals.actions";
import { updateGroup } from "../../Redux/Employee/employee.actions";
import { updateRate } from "../../Redux/Rate/rate.actions";
import { selectListEmployee } from "../../Redux/Individuals/individuals.selectors";

class HomePage extends Component {
	unsubscribeEmployeeFromSnapshot = null;
	unsubscribeGroupFromSnapshot = null;
	unsubscribeRatingFromSnapshot = null;

	componentDidMount() {
		const {
			currentUser,
			updateEmployee,
			updateGroup,
			updateRate,
			individuals,
		} = this.props;

		/**
		 * FOR EMPLOYEE ***********************************************************************
		 */
		const listEmployeeRef = firestore
			.doc(`users/${currentUser.id}`)
			.collection("employee");
		this.unsubscribeEmployeeFromSnapshot = listEmployeeRef.onSnapshot(
			async (snapshot) => {
				const employeeMap = convertDataEmployeeSnapShot(snapshot); // return the array list of id in Users/.../Employee
				//Query to get the data in collection Employee by compare the id in array list and id of Collection Employee
				try {
					firestore
						.collection("employee")
						.where("id", "in", employeeMap)
						//use onSnapShot will automatically update the new data if the data got update from db
						.onSnapshot(async (snapshot) => {
							const employeeRef = snapshot.docs.map((doc) => {
								const {
									address,
									avatar,
									displayName,
									email,
									gender,
									phone_number,
									id,
									position,
								} = doc.data(); // get the data by data()
								return {
									address,
									avatar,
									displayName,
									email,
									id,
									position,
									gender,
									phone_number,
								};
							});
							console.log("employeeRef:", employeeRef);
							const result = employeeRef.reduce((accumulator, collection) => {
								accumulator[collection.id] = collection;
								return accumulator;
							}, {});
							console.log("result", result);
							updateEmployee(result); // dispatch the data to the state of Individual
						});
				} catch (error) {
					console.error();
				}
			}
		);
		/**
		 * **********************************************************************
		 */
		const groupRef = firestore
			.doc(`users/${currentUser.id}`)
			.collection("group"); // to make the link for lead to the database

		//on Snapshot is like a summary of data
		this.unsubscribeGroupFromSnapshot = groupRef.onSnapshot(
			//listening for any changes in this collection.
			async (snapshot) => {
				const groupMap = convertDataGroupSnapShot(snapshot);
				updateGroup(groupMap);
			}
		);
		/**
		 * *********************FOR RATING*************************************************
		 */
	}
	componentDidUpdate(prevProps) {
		if (prevProps.individuals) {
			this.unsubscribeRatingFromSnapshot = convertDataRateSnapShot(
				prevProps.individuals
			);
			updateRate(this.unsubscribeRatingFromSnapshot);
		}
	}
	render() {
		return (
			<div>
				<h1> Home</h1>
			</div>
		);
	}
}

//!NOTE: tomorrow move the mapDispatchToProps to each section group and individual page and try again to fox bug
const mapDispatchToProps = (dispatch) => ({
	updateEmployee: (employeeMap) => dispatch(updateEmployee(employeeMap)),
	updateGroup: (groupMap) => dispatch(updateGroup(groupMap)),
	updateRate: (rateInfo) => dispatch(updateRate(rateInfo)),
});
const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	individuals: selectListEmployee,
});
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
