import React from "react";
import { connect } from "react-redux";
import "./OverviewTask.styles.scss";
import { selectTask } from "../../../Redux/Task/Task.selectors";

const OverviewTask = ({ showTask }) => {
	return (<div>{console.log("task", showTask)}</div>);
};

const mapStateToProps = (state, ownProps) => ({
	showTask: selectTask(state)
});
export default connect(mapStateToProps)(OverviewTask);
