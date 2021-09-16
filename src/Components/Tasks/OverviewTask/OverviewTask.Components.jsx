import React from "react";
import { connect } from "react-redux";
import "./OverviewTask.styles.scss";
import {
  overviewTask,
} from "../../../Redux/Task/Task.selectors";
import { withRouter } from "react-router";
import PreviewTask from "../PreviewTask/PreviewTask.Components";

const OverviewTask = ({
  overviewTask,
  idGroup
}) => {
  return (
    <div>
      {
        overviewTask.length === 0 ? (
          <h1>Please add your task</h1>
        ) : (
          overviewTask.filter(({ statusDone }) => {
                return statusDone === false
          })
              .sort((first, second) => { return Date.parse(first.deadline) > Date.parse(second.deadline) ? 1 : -1 })
              .map(({ createAt, deadline, note, priority, statusDone, title, id }) => (
            <div key={id}>
              <PreviewTask createAt={createAt} deadline={deadline} note={note} priority={priority} statusDone={statusDone} title={title} id={id} idGroup={idGroup} />
            </div>
          ))
        )
      }
    
    </div>
  );
};

const mapStateToProps = (state) => ({
  overviewTask: overviewTask(state),
});

export default connect(mapStateToProps)(withRouter(OverviewTask));
