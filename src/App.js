import './App.css';
import React, { Component } from 'react'
import { createStructuredSelector } from "reselect"
import SignInAndSignUpPage from './Components/Signin-Signup/signin-signup.page'
import { Switch, Route, Redirect } from 'react-router-dom';
import { auth, createUserProfileDocument } from './Firebase/firebase.utils';
import { connect } from 'react-redux'
import { selectCurrentUser } from './Redux/User/user.selectors'
import { setCurrentUser } from './Redux/User/user.action';
import HomePage from "./Components/HomePage/HomePage"
import ChatUI from "./Components/Chat/ChatUI.components"
import Header from "./Components/Header/Header.Components"
import EmployeeGroupPage from "./Components/Employee/Group/EmployeeGroupPage"
import EmployeePage from "./Components/Employee/Individuals/EmployeePage.Components"
const HatsPage = () => (
  <div>
    <h1>Hello</h1>
  </div>
)
class App extends Component {
  unsubscribeFromAuth = null
  // clone and get the data from current user
  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => { //  which allows you to subscribe to the users current authentication state, and receive an event whenever that state changes
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)
        //.get realtime updates, You can listen to a document 
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,// get the id of account
            ...snapShot.data()
          })
        })
      }
      setCurrentUser(userAuth);
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { currentUser } = this.props
    return (
      <div>
        <Switch>
          {currentUser ? (
            <>
              <Header />
              <Route exact path="/home" component={HomePage} />
              <Route exact path="/chat" component={ChatUI} />
              <Route exact path="/groups" component={EmployeePage} />
              <Route exact path="/plan" component={EmployeeGroupPage} />

            </>
          ) : (
              <Route exact path='/' render={() =>
                currentUser ? (
                  <Redirect to='/home' />
                ) : (
                    <SignInAndSignUpPage />
                  )
              } />

            )}



        </Switch>
      </div>
    )
  }
}
const mapStateToProps = createStructuredSelector(
  {
    currentUser: selectCurrentUser
  }
)

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
