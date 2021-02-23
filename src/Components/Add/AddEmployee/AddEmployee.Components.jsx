import React from "react";
import FormInput from "../../FormInput/FormInput.Component";
import CustomButton from "../../CustomButton/CustomButton.component";
import { createEmployee } from "../../../Firebase/firebase.utils";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../../Redux/User/user.selectors";
class AddEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: "",
            email: "",
            address: "",
            gender: "",
            // image: null,
            phone_number: "",
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
        const {
            displayName,
            email,
            address,
            gender,
            phone_number,
        } = this.state;
        const employee = { displayName, email, address, gender, phone_number };
        try {
            createEmployee(currentUser, "employee", employee);
            this.setState({
                displayName: "",
                email: "",
                address: "",
                gender: "",
                // image: null,
                phone_number: "",
            });
        } catch (error) {
            console.error(error);
        }
        this.setState({
            displayName: "",
            email: "",
            address: "",
            gender: "",
            // image: null,
            phone_number: "",
        });
    };
    render() {
        const {
            displayName,
            email,
            address,
            gender,
            phone_number,
        } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        placeholder='Display Name'
                        name='displayName'
                        required
                        handleChange={this.handleChange}
                        value={displayName}
                    />
                    <FormInput
                        placeholder='Email'
                        name='email'
                        type='email'
                        required
                        handleChange={this.handleChange}
                        value={email}
                    />
                    <FormInput
                        placeholder='Address'
                        name='address'
                        handleChange={this.handleChange}
                        required
                        value={address}
                    />
                    <FormInput
                        type='radio'
                        name='gender'
                        value='male'
                        label='male'
                        required
                        handleChange={this.handleChange}
                    />
                    <FormInput
                        type='radio'
                        name='gender'
                        value='female'
                        label='female'
                        required
                        handleChange={this.handleChange}
                    />
                    <FormInput
                        type='radio'
                        name='gender'
                        value='binary'
                        label='binary'
                        required
                        handleChange={this.handleChange}
                    />

                    {/* <FormInput
                        type='file'
                        name='Image'
                        accept='image/png, image/jpeg'
                        required
                    /> */}
                    <FormInput
                        type='tel'
                        name='phone_number'
                        placeholder='888 888 8888'
                        pattern='[0-9]{3} [0-9]{3} [0-9]{4}'
                        required
                        handleChange={this.handleChange}
                        value={phone_number}
                    />
                    <CustomButton>Submit</CustomButton>
                </form>
            </div>
        );
    }
}
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(AddEmployee);
