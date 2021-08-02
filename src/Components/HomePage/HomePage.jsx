import React, { Component } from "react";
import "./HomePage.Styles.css";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { firestore } from "../../Firebase/firebase.utils";
import {
  convertDataEmployeeSnapShot,
  convertDataRateSnapShot,
} from "../../Firebase/firebase.snapshot";
import { selectCurrentUser } from "../../Redux/User/user.selectors";
// import { updateEmployee } from "../../Redux/Individuals/Individuals.actions";
import { fetchEmployeeGroupStartAsync } from "../../Redux/Individuals/Individuals.actions";
import {} from "../../Redux/Rate/rate.actions";
import { selectListEmployee } from "../../Redux/Individuals/individuals.selectors";

class HomePage extends Component {
  componentDidMount() {
    const { currentUser, fetchEmployeeGroupStartAsync } = this.props;
    fetchEmployeeGroupStartAsync(currentUser.id);
  }

  render() {
    return (
      <div>
        <h1> Home</h1>
      </div>
    );
  }
}

//!NOTE: tomorrow move the mapDispatchToProps to each section group and individual page and try again to fox bug
const mapDispatchToProps = (dispatch) => ({
  fetchEmployeeGroupStartAsync: (currentUserID) =>
    dispatch(fetchEmployeeGroupStartAsync(currentUserID)),
});
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  individuals: selectListEmployee,
});
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
