import React from "react";
import { Route } from "react-router-dom";
import InfoSearch from "./InfoSearch/InfoSearch.Components";
import SearchBox from "./SearchBox/Search.Components";
const SearchPage = ({ match }) => {
	return (
		<div>
			<Route exact component={SearchBox} path={`${match.path}/`} />
			<Route component={InfoSearch} path={`${match.path}/:employeeID`} />
		</div>
	);
};
export default SearchPage;
