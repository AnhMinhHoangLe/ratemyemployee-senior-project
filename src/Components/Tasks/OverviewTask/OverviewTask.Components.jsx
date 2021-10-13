import React from "react";
import { connect } from "react-redux";
import "./OverviewTask.styles.scss";
import {
  overviewTask,
} from "../../../Redux/Task/Task.selectors";
import { withRouter } from "react-router";
import PreviewTask from "../PreviewTask/PreviewTask.Components";
import { Box, Typography,Card, Grid, Paper} from "@mui/material"

const OverviewTask = ({
  overviewTask,
  idGroup
}) => {
  return (
    <Box sx={{width: "40%" }}>
      {
        overviewTask.length === 0 ? (
          <h1>Please add your task</h1>
        ) : (
            <Box sx={{display:"flex", flexDirection:"column", gap:2 }}>
              {
                overviewTask.filter(({ statusDone }) => {
                return statusDone === false
                })
                .sort((first, second) => { return Date.parse(first.deadline) > Date.parse(second.deadline) ? 1 : -1 })
                .map(({ createAt, deadline, note, priority, statusDone, title, id }) => (
                    <PreviewTask createAt={createAt} deadline={deadline} note={note} priority={priority} statusDone={statusDone} title={title} id={id} idGroup={idGroup}  key={id}  />
                ))
              }
          </Box>
          
        )
      }
    
    </Box>
  );
};

const mapStateToProps = (state) => ({
  overviewTask: overviewTask(state),
});

export default connect(mapStateToProps)(withRouter(OverviewTask));
