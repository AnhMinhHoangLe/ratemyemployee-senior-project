import React, { useEffect, useState } from "react";
import { firestore } from "../../Firebase/firebase.utils";
import AddTask from "./AddTask/addTask.Components";
import OverviewTask from "./OverviewTask/OverviewTask.Components";
import { useDispatch, connect } from "react-redux";
// import { createTask } from "../../Firebase/firebase.utils";
import { convertTaskData } from "../../Firebase/firebase.snapshot";
import { addTask } from "../../Redux/Task/Task.actions";
import { createStructuredSelector } from "reselect";
import { selectTask } from "../../Redux/Task/Task.selectors";
const Task = ({ idGroup, task }) => {
  useEffect(() => {
    // console.log("task", convertTaskData(idGroup));
    // addTask(convertTaskData(idGroup));
    try {
      const taskRef = firestore
        .doc(`task/${idGroup}`)
        .onSnapshot(async (snapshot) => {
          const task = snapshot.data();
          if (task) {
            addTask(task);
          }
        });
    } catch (error) {
      console.error();
    }
  });

  
  // console.log(createTask("2Cz9CLnYcRzM336zXynx"));
  return (
    <div className="flex justify-evenly">
      <div>
        <OverviewTask idGroup={idGroup} />
      </div>
      <div>
        <AddTask idGroup={idGroup} />
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  addTask: (task) => dispatch(addTask(task)),
});
const mapStateToProps = createStructuredSelector({
  task: selectTask,
});
export default connect(mapStateToProps, mapDispatchToProps)(Task);
