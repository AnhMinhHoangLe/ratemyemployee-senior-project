import React from "react";
import { connect } from "react-redux";
import "./OverviewTask.styles.scss";
import {
  overviewTask,
  indicateSpecificGroup,
  selectTask,
} from "../../../Redux/Task/Task.selectors";
import { withRouter } from "react-router";
import PreviewTask from "../PreviewTask/PreviewTask.Components";

const OverviewTask = ({
  selectTask,
  overviewTask,
  idGroup,
  showTask,
  match,
}) => {
  console.log(selectTask);
  return (
    <div>
      {overviewTask.map((key, id) => (
        <div key={id}>{console.log("key", key)}</div>
      ))}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  // showTask: indicateSpecificGroup(ownProps.idGroup)(state),
  selectTask: selectTask(state),
  overviewTask: overviewTask(state),
});

export default connect(mapStateToProps)(withRouter(OverviewTask));
