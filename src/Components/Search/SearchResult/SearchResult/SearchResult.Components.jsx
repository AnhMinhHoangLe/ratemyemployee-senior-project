import React from "react";
import {
	selectListEmployee,
	selectEmployeeInfo,
} from "../../../../Redux/Individuals/individuals.selectors";
import { connect } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import {  triggerSearchComp } from "../../../../Redux/Option/option.actions"

const SearchResult = ({ search, individuals, match, history, dispatch }) => {
	// let history = useHistory();
	// function handleClick(id) {
	// 	const urlEncodedID = encodeURI(id);
	// 	history.push(`/search?find_emp=${urlEncodedID}`);
	// }
	return (
		<div className="from-black">
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
								history.push(`/emps/${id}`);
								dispatch(triggerSearchComp(false))
							}}
						>
							<img
								width="100"
								height="100"
								src={avatar }
							/>
							<p>{displayName}</p>
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
