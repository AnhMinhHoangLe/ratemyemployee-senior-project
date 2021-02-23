import React from "react";
import FormInput from "../../FormInput/FormInput.Component";
import CustomButton from "../../CustomButton/CustomButton.component";
import { createGroup } from "../../../Firebase/firebase.utils";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../../Redux/User/user.selectors";

class AddGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupName: "",
        };
    }

    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value,
        });
    };
    handleSubmit = (event) => {
        event.preventDefault();
        const { currentUser } = this.props;
        const { groupName } = this.state;
        try {
            createGroup(currentUser, "group", groupName);
        } catch (error) {
            console.error();
        }
        this.setState({
            groupName: "",
        });
    };
    render() {
        const { groupName } = this.state;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        handleChange={this.handleChange}
                        placeholder=' Group Name'
                        name='groupName'
                        required
                        value={groupName}
                    />
                    <select handleChange={this.handleChange} name='employee'>
                        <option value='volvo'>Volvo</option>
                        <option value='volvo'>Volvo</option>
                    </select>

                    <CustomButton>Submit</CustomButton>
                </form>
            </div>
        );
    }
}
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(AddGroup);
