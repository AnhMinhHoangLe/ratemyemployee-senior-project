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
import {Grid, Box} from '@mui/material';

import HomePage from "./Components/HomePage/HomePage";
import ChatUI from "./Components/Chat/ChatUI.components";
import Header from "./Components/Header/Header.Components";
import GroupPage from "./Components/Employee/Individuals/EmployeePage.Components";
// import SearchPage from "./Components/Search/SearchPage.Components";
// import InfoSearch from "./Components/Search/InfoSearch/InfoSearch.Components";
import EmployeePage from "./Components/Employee/Individual/IndividualPage.Components";
const App = ({currentUser, setCurrentUser, fetchEmployeeGroupStartAsync }) => {
  // unsubscribeFromAuth = null;
  // componentDidMount() {
  //   // const { setCurrentUser, collectionsArray } = this.props;
  //   const { setCurrentUser } = this.props;

  //   this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
  //     if (userAuth) {
  //       const userRef = await createUserProfileDocument(userAuth);

  //       userRef.onSnapshot((snapShot) => {
  //         setCurrentUser({
  //           id: snapShot.id,
  //           ...snapShot.data(),
  //         });
  //       });
  //     }

  //     setCurrentUser(userAuth);

  //     // addCollectionsAndDocument('collections', collectionsArray.map(({ title, items }) => ({ title, items })))
  //   });
  // }

  // componentWillUnmount() {
  //   this.unsubscribeFromAuth();
  // }

  
  // render() {
  //   const  {currentUser, setCurrentUser, fetchEmployeeGroupStartAsync } = this.props

    // clone and get the data from current user

  //Solution for unmount https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
  useEffect(() => {
      let isMounted = true;               // note mutable flag
      auth.onAuthStateChanged(async (userAuth) => {
        //  which allows you to subscribe to the users current authentication state, and receive an event whenever that state changes
      
        if (userAuth) {
          if (isMounted) {
            const userRef = await createUserProfileDocument(userAuth);
            //.get realtime updates, You can listen to a document
            userRef.onSnapshot((snapShot) => {
              setCurrentUser({
                id: snapShot.id, // get the id of account
                ...snapShot.data(),
              });
              fetchEmployeeGroupStartAsync(snapShot.id)

            });
            await setCurrentUser(userAuth);

          }
        }      });
      return () => { isMounted = false };
    }, [])

    return (
      <Box >
        <Switch>
          {currentUser ? (
            <div>
              <Header currentUser={currentUser} />
              {/* <Route path="/search" component={SearchPage} /> */}
              <Route exact path="/" component={HomePage} />
              <Route path="/grps" component={GroupPage} />
              <Route path="/emps" component={EmployeePage} />
              <Route exact path="/msg" component={ChatUI} />
              {/* if you want to make nested route, dont add exact to the route 
							<Route exact path="/plan" component={AddPage} />*/}
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

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  fetchEmployeeGroupStartAsync: (currentUserID) =>
    dispatch(fetchEmployeeGroupStartAsync(currentUserID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
