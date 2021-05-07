import React from "react";
import {
	selectListEmployee,
	selectEmployeeInfo,
} from "../../../Redux/Individuals/individuals.selectors";
import { connect } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
const SearchResult = ({ search, individuals, match, history }) => {
	// let history = useHistory();
	// function handleClick(id) {
	// 	const urlEncodedID = encodeURI(id);
	// 	history.push(`/search?find_emp=${urlEncodedID}`);
	// }
	return (
		<div>
			{!search ? (
				<div></div>
			) : (
				individuals
					.filter((key) =>
						key.displayName.toUpperCase().includes(search.toUpperCase())
					)
					.map(({ id, displayName, avatar }) => (
						<div
							key={id}
							onClick={() => {
								history.push(`${match.url}/${id}`);
							}}
						>
							<img src={avatar} />
							<h1>{displayName}</h1>
						</div>
					))
			)}
		</div>
	);
};
const mapStateToProps = (state) => ({
	individuals: selectListEmployee(state),
});
export default withRouter(connect(mapStateToProps)(SearchResult));
