import "./App.css";
import React, { Component, useEffect } from "react";
import { createStructuredSelector } from "reselect";
import SignInAndSignUpPage from "./Components/Signin-Signup-Manager/signin-signup.page";
import SignInPage from "./Components/Signin-Signup-Manager/SignIn/SignIn.page";
import SignUpPage from "./Components/Signin-Signup-Manager/SignUp/SignUp.page";
import { Switch, Route, Redirect } from "react-router-dom";
import { auth, createUserProfileDocument } from "./Firebase/firebase.utils";
import { connect } from "react-redux";
import { selectCurrentUser } from "./Redux/User/user.selectors";
import { setCurrentUser } from "./Redux/User/user.action";
import { fetchEmployeeGroupStartAsync } from "./Redux/Individuals/Individuals.actions";
import {Box} from '@mui/material';
import HomePage from "./Components/HomePage/HomePage";
import ChatUI from "./Components/Chat/ChatUI.components";
import Header from "./Components/Header/Header.Components";
import GroupPage from "./Components/Employee/Individuals/EmployeePage.Components";
import UserProfilePage from "./Components/UserProfile/UserProfilePage.Component" 
import EmployeePage from "./Components/Employee/Individual/IndividualPage.Components";
class App extends Component {
  unsubscribeFromAuth = null;
  unsubscribeFromData = null; 
  componentDidMount() {
    const { setCurrentUser, fetchEmployeeGroupStartAsync} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      //  which allows you to subscribe to the users current authentication state, and receive an event whenever that state changes
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        //.get realtime updates, You can listen to a document
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id, // get the id of account
            ...snapShot.data(),
          });
          if (this.unsubscribeFromAuth) {
            fetchEmployeeGroupStartAsync(snapShot.id)
          }

        });
      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  // currentUser, setCurrentUser, fetchEmployeeGroupStartAsync 


  
  render() {
    const { currentUser } = this.props;
    return (
      <Box sx={{backgroundColor:"#E8EEED", height:"100vh"}}>
        <Switch>
          {currentUser ? (
            <div>
              <Header currentUser={currentUser} />
              {/* <Route path="/search" component={SearchPage} /> */}
              <Route exact path="/" component={HomePage} />
              <Route path="/grps" component={GroupPage} />
              <Route path="/emps" component={EmployeePage} />
              <Route exact path="/msg" component={ChatUI} />
              <Route exact path="/user-profile" component={UserProfilePage} />

            </div>
          ) : (
            <div className="signin-signup-page">
              <Route
                exact
                path="/"
                render={() =>
                  currentUser ? <Redirect to="/si" /> : <SignInPage />
                }
              />
              <Route exact path="/si" component={SignInPage} />
              <Route exact path="/su" component={SignUpPage} />
            </div>
          )}
        </Switch>
      </Box>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  fetchEmployeeGroupStartAsync: (currentUserID) =>
    dispatch(fetchEmployeeGroupStartAsync(currentUserID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
