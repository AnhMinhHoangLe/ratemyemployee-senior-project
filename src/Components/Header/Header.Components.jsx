import React from "react";
import "./Header.Styles.scss";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../Firebase/firebase.utils";
import SearchBox from "../Search/SearchBox/Search.Components";
const Header = () => {
	// let history = useHistory();
	// function handleClick(id) {
	// 	const urlEncodedID = encodeURI(id);
	// 	history.push(`/search?find_emp=${urlEncodedID}`);
	// }
	return (
		<div class="grid grid-cols-4 p-3 header-container gap-4">
			<ul class="flex justify-between gap-3">
				<li className="header-items">
					<Link to="/" class="fot-semibold text-xl ">
						EMA
					</Link>
				</li>
				<li className="header-items">
					<Link to="/grps">Groups</Link>
				</li>
				<li className="header-items">
					<Link to="/emps">Employees</Link>
				</li>
				<li className="header-items">
					<Link to="/msg">Messages</Link>
				</li>
			</ul>
			<div class="flex justify-end col-span-2">
				{/* <Link to="/search"> */}
					<SearchBox />
				{/* </Link> */}
			</div>
			<div class="flex justify-end gap-4">
				<Link to="/">
					<img className="img" />
				</Link>

				<Link onClick={() => auth.signOut()} to="/">
					<button className="button-logout">Log out</button>
				</Link>
			</div>
		</div>
	);
};
export default Header;
