import React, { Component, useState, useRef, useEffect} from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import "./Search.Styles.scss";
import FormInput from "../../FormInput/FormInput.Component";
import SearchResult from "../SearchResult/SearchResult/SearchResult.Components";
import { ReactComponent as SearchIcon } from "../../../Assests/SearchBar/search.svg";
import { selectTriggerSearch } from "../../../Redux/Option/option.selectors"
import {  triggerSearchComp } from "../../../Redux/Option/option.actions"


const SearchBox = ({selectTriggerSearch, dispatch}) => {
	const [searchField, setSearchField] = useState('')
	// Handle in case click outside
	useEffect(() => {
		// add when mounted
		document.addEventListener("mousedown", handleClick);
		// return function to be called when unmounted
		return () => {
		  document.removeEventListener("mousedown", handleClick);
		};
	}, []);
	const handleClick = e => {
		if (node.current.contains(e.target)) {
			return;
		}
		dispatch(triggerSearchComp(false));
	};
	
	const onSearchChange = (e) => {
		setSearchField(e.target.value);
	};
	const node = useRef()
	return (
		<div className="searchbox-container" ref={node}>
			<div class="flex">
				<FormInput
					class="min-w-full text-white-700 p-2 "
					className="searchbox-component"
					type="input"
					placeholder="Search"
					onChange={(e) => { onSearchChange(e) }}
					onClick={() => { dispatch(triggerSearchComp(true)); }}
				/>
				<SearchIcon className="search-icon" class="w-auto"/>
			</div>
			<div className='absolute shadow-xl bg-white	from-black'>
				{selectTriggerSearch ? <SearchResult search={searchField} /> : ''}
			</div>
		</div>
	);
}

const mapStateToProps = createStructuredSelector({
	selectTriggerSearch: selectTriggerSearch
  })
export default connect(mapStateToProps)(SearchBox);
