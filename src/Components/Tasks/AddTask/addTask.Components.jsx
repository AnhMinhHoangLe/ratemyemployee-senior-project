import React from "react";
import "./addTask.styles.scss";
import FormInput from "../../FormInput/FormInput.Component";
import CustomButton from "../../CustomButton/CustomButton.component";
// import { addTask } from "../../../Redux/Task/Task.actions";
import {
	createTask,
} from "../../../Firebase/firebase.utils";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectKeyOfGroup } from "../../../Redux/Task/Task.selectors"
import {convertTheID, checkDateInput} from "../Task_Utils/tasks.utils"
import { Card, Box, Typography, FormGroup, TextField} from '@mui/material';

class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deadline: "",
      note: "",
      priority: "",
      title: "",
      statusDone: false,
    };
  }
  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
    [name]: value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { deadline, note, priority, title } = this.state;
    const {idGroup, selectKeyOfGroup} = this.props; 
    try {
      const task = {
        deadline,
        note,
        priority,
        title,
      };

      const checkValidDateInput = checkDateInput(deadline)
      const idForTask = convertTheID(selectKeyOfGroup)
      if (checkValidDateInput === true) {
        createTask(idGroup, task, idForTask);
        this.setState({
          deadline: "",
          note: "",
          priority: "",
          title: "",
        });
      }

    } catch (error) {
      console.error(error);
    }
    this.setState({
      deadline: "",
      note: "",
      priority: "",
      title: "",
    });
  };
  render() {
    const { deadline, note, priority, title } = this.state;
    return (
      <Card sx={{ display: 'flex', flexDirection:"column",  p:3, gap:2, borderRadius:"10px"}}>
        <Typography sx={{ textAlign: 'center'}}>Create New Task</Typography>
        <form
          onSubmit={(e) => this.handleSubmit(e)}>
          <Box sx={{ display: 'flex', flexDirection:"column", gap:2, justifyContent: 'center'}}>
            <Typography variant="h7">Title</Typography>
            <FormInput
              name="title"
              required
              onChange={(e)=>this.handleChange(e)}
              value={title}
              id="outlined-basic"
              variant="outlined"
              size="small"

            />
            <Typography variant="h7">Due Date</Typography>
            <FormInput
              type="date"
              name="deadline"
              required
              onChange={(e)=>this.handleChange(e)}
              value={deadline}
              id="outlined-basic"
              variant="outlined"
              size="small"
              sx={{width:"100%"}}
            />
            <Typography variant="h7">Priority</Typography>
            <Box sx={{ display: 'flex', flexDirection: "row", textAlign: "center", alignItems: 'center', justifyContent: 'center', gap: 2 }}>
              <input
                type="radio"
                name="priority"
                value="red"
                required
                onChange={(e)=>this.handleChange(e)}
                className="priority"
                style={{ border: "3px red solid" }}
              />
              <input
                type="radio"
                name="priority"
                value="yellow"
                required
                onChange={(e)=>this.handleChange(e)}
                className="priority"
                style={{ border: "3px yellow solid" }}
              />
              <input
                type="radio"
                name="priority"
                value="green"
                required
                onChange={(e)=>this.handleChange(e)}
                className="priority"
                style={{ border: "3px green solid" }}
              />
            </Box>
            <Typography variant="h7">Descriptions</Typography>
            <FormInput
              required
              value={note}
              onChange={(e) => this.handleChange(e)}
              name="note"
              placeholder="eg: Working on the ..."
              multiline={true}
              variant="outlined"
              sx={{width:"100%"}}
            />
            <CustomButton type="submit">Create Task</CustomButton>
          </Box>
        </form>
      </Card>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  selectKeyOfGroup:selectKeyOfGroup
});
const mapDispatchToProps = (dispatch) => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
