import "./App.css";
import React, { Component } from "react";
import { createStructuredSelector } from "reselect";
import SignInAndSignUpPage from "./Components/Signin-Signup-Manager/signin-signup.page";
import SignInAndSignUpEmployeePage from "./Components/Signin-Signup-Employee/signin-signup-employee.page";

import { Switch, Route, Redirect } from "react-router-dom";
import { auth, createUserProfileDocument } from "./Firebase/firebase.utils";
import { connect } from "react-redux";
import { selectCurrentUser } from "./Redux/User/user.selectors";
import { setCurrentUser } from "./Redux/User/user.action";
import HomePage from "./Components/HomePage/HomePage";
import ChatUI from "./Components/Chat/ChatUI.components";
import Header from "./Components/Header/Header.Components";
import GroupPage from "./Components/Employee/Individuals/EmployeePage.Components";
import SearchPage from "./Components/Search/SearchPage.Components";
import SearchResult from "./Components/Search/SearchResult/SearchResult.Components";
import InfoSearch from "./Components/Search/InfoSearch/InfoSearch.Components";
import EmployeePage from "./Components/Employee/Individual/IndividualPage.Components";
class App extends Component {
	unsubscribeFromAuth = null;
	// clone and get the data from current user
	componentDidMount() {
		const { setCurrentUser } = this.props;
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
				});
			}
			setCurrentUser(userAuth);
		});
	}

	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}

	render() {
		const { currentUser } = this.props;
		return (
			<div>
				<Switch>
					{currentUser ? (
						<div>
							<Header />
							<Route path="/search" component={SearchPage} />
							<Route exact path="/" component={HomePage} />
							<Route path="/grps" component={GroupPage} />
							<Route path="/emps" component={EmployeePage} />
							<Route exact path="/msg" component={ChatUI} />
							<Route
								exact
								path="/siuemp"
								component={SignInAndSignUpEmployeePage}
							/>
							{/* if you want to make nested route, dont add exact to the route 
							<Route exact path="/plan" component={AddPage} />*/}
						</div>
					) : (
						<div>
							<Route
								exact
								path="/"
								render={() =>
									currentUser ? <Redirect to="/hm" /> : <SignInAndSignUpPage />
								}
							/>
							<Route
								exact
								path="/siuemp"
								component={SignInAndSignUpEmployeePage}
							/>
						</div>
					)}
				</Switch>
			</div>
		);
	}
}
const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
