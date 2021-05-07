import React, { Component } from "react";
import FormInput from "../../FormInput/FormInput.Component";
import SearchResult from "../SearchResult/SearchResult.Components";
import "./Search.Styles.scss";
import { ReactComponent as SearchIcon } from "../../../Assests/SearchBar/search.svg";
class SearchBox extends Component {
	constructor() {
		super();
		this.state = {
			searchField: "",
		};
	}
	onSearchChange = (event) => {
		this.setState({ searchField: event.target.value });
		// this.props.search(this.state.searchField);
	};
	render() {
		return (
			<div className="searchbox-container">
				<div class="flex">
					<FormInput
						class=" min-w-full text-white-700 p-2 "
						className="searchbox-component"
						type="search"
						placeholder="Search"
						onChange={this.onSearchChange}
					/>

					<span>
						<SearchIcon className="search-icon" class="w-auto" />
					</span>
				</div>
				<SearchResult search={this.state.searchField} />
			</div>
		);
	}
}

export default SearchBox;
