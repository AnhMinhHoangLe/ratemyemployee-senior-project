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
class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deadline: "",
      note: null,
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
          note: null,
          priority: "",
          title: "",
        });
      }

    } catch (error) {
      console.error(error);
    }
    this.setState({
      deadline: "",
      note: null,
      priority: "",
      title: "",
    });
  };
  render() {
    const { deadline, note, priority, title } = this.state;
    return (
      <div className="xl:w-3/12 h-11/12 xl:fixed xl:top-40 xl:right-40 bg-white p-5 shadow-lg rounded-xl text-gray-600">
        <h1 className="title-add-employee text-3xl text-center t mb-5 mb-10">
          Add New Task
        </h1>
        <form
          onSubmit={(e) => this.handleSubmit(e)}
          className=" flex flex-col justify-center  items-center gap-4"
        >
          <FormInput
            placeholder="Title"
            name="title"
            required
            handleChange={this.handleChange}
            value={title}
            className="input-add-employee xl:w-80 h-11 rounded-lg text-gray-800 p-3"
          />
          <FormInput
            className="input-add-employee xl:w-80  h-11 rounded-lg text-gray-800 p-3"
            type="date"
            name="deadline"
            required
            handleChange={this.handleChange}
            value={deadline}
            
          />
          <textarea
            className="input-add-employee xl:w-80 h-11 rounded-lg text-gray-800 p-3"
            required
            value={note}
            onChange={(e) => this.handleChange(e)}
            name="note"
            placeholder="Note"
          ></textarea>
          <h1>Priority</h1>

          <div className="flex space-x-9">
            <FormInput
              type="radio"
              name="priority"
              value="red"
              required
              handleChange={this.handleChange}
              className="priority"
              style={{ border: "3px red solid" }}
            />
            <FormInput
              type="radio"
              name="priority"
              value="yellow"
              required
              handleChange={this.handleChange}
              className="priority"
              style={{ border: "3px yellow solid" }}
            />
            <FormInput
              type="radio"
              name="priority"
              value="green"
              required
              handleChange={this.handleChange}
              className="priority"
              style={{ border: "3px green solid" }}
            />
          </div>

          <CustomButton>Submit</CustomButton>
        </form>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  selectKeyOfGroup:selectKeyOfGroup
});
const mapDispatchToProps = (dispatch) => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
