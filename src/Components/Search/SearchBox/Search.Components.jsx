import React, {Component} from 'react';
import FormInput from "../../FormInput/FormInput.Component"
import SearchResult from "../SearchResult/SearchResult.Components"
class SearchBox  extends Component {
        constructor() {
                super()
                this.state = {
                        searchField: "", 
                }
        }
        onSearchChange = (event) =>{
                this.setState({searchField: event.target.value})
        }
        render() {
               return(
                        <div>
                                <FormInput type="search"   placeholder='Search Employee' onChange={this.onSearchChange} />
                                <SearchResult search={this.state.searchField} />
                        </div>
                )
        } 
}
        
export default SearchBox
