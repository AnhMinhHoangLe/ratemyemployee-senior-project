import React from 'react';
import {selectListEmployee, selectEmployeeInfo} from "../../../Redux/Individuals/individuals.selectors"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
const SearchResult = ({ search, individuals, history, match}) =>{
        return(
                <div>    
                {
                                !search.length ? (null) : ( 
                                        individuals.filter((key => key.displayName.toUpperCase().includes(search.toUpperCase()))).map(({id , displayName, avatar}) => (
                                                <div  key={id} onClick={() => {history.push(`${match.url}/${id}` )}}>
                                                        <img src={avatar} />
                                                        <h1>{displayName}</h1>
                                                        <p>ID: {id}</p>
                                                </div>
                                        
                                        )
                                )
                        )
                }
                </div>
        )
}
const mapStateToProps = (state) => (
        {
               individuals :  selectListEmployee(state)
        }
)
export default withRouter(connect(mapStateToProps)(SearchResult))