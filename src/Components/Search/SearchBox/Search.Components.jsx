import React, { Component, useState, useRef, useEffect} from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import SearchResult from "../SearchResult/SearchResult/SearchResult.Components";
// import { ReactComponent as SearchIcon } from "../../../Assests/SearchBar/search.svg";
import { selectTriggerSearch } from "../../../Redux/Option/option.selectors"
import {  triggerSearchComp } from "../../../Redux/Option/option.actions"
import SearchIcon from '@mui/icons-material/Search';
import {SearchComponent, IconContainer, SearchInput} from "./Search.styles"
import { Box} from '@mui/material';

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
		setSearchField('')
		dispatch(triggerSearchComp(false));
	};
	
	const onSearchChange = (e) => {
		setSearchField(e.target.value);
	};
	const node = useRef()
	return (
		<SearchComponent ref={node} >
			<IconContainer>
				<SearchIcon sx={{color:"#313836"}}/>
			</IconContainer>
			<SearchInput
					placeholder="Type to find something here..."
					onChange={(e) => { onSearchChange(e) }}
					onClick={() => { dispatch(triggerSearchComp(true)); }}
					value={searchField}
				/>
			<Box>
				{selectTriggerSearch && searchField ? <SearchResult search={searchField} /> : ''}
			</Box>
		</SearchComponent>
	);
}

const mapStateToProps = createStructuredSelector({
	selectTriggerSearch: selectTriggerSearch
  })
export default connect(mapStateToProps)(SearchBox);
