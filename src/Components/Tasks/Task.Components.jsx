import React, { useEffect, useState } from "react";
import AddTask from "./AddTask/addTask.Components";
import OverviewTask from "./OverviewTask/OverviewTask.Components";
import { useDispatch, connect } from "react-redux";
// import { createTask } from "../../Firebase/firebase.utils";
import { convertTaskData } from "../../Firebase/firebase.snapshot";
import { createStructuredSelector } from "reselect";
import { overviewTask } from "../../Redux/Task/Task.selectors";
import { fetchingTaskStartAsync } from "../../Redux/Task/Task.actions"
import { Box, Typography,Card, Grid, Paper} from "@mui/material"

const Task = ({ idGroup, overviewTask, fetchingTaskStartAsync }) => {
  useEffect(() => {
    fetchingTaskStartAsync(idGroup)
  }, []);

  // console.log(createTask("2Cz9CLnYcRzM336zXynx"));
  return (
    <Box sx={{display: 'flex', direction:"columns", justifyContent:"space-evenly", flexWrap: 'wrap'}} >
        <OverviewTask idGroup={idGroup} />
        <AddTask idGroup={idGroup} />
    </Box>
  );
};
const mapDispatchToProps = (dispatch) => ({
  fetchingTaskStartAsync:(groupID) => dispatch(fetchingTaskStartAsync(groupID))
});

export default connect(null, mapDispatchToProps)(Task);
