import React from 'react';
import "./EmployeeGroup.Styles.css"
import { withRouter, Route } from 'react-router-dom';
import EmployeeOverview from '../../Individuals/EmployeeOverview/EmployeeOverview.Components'

// <div className="employee-group-component"  onClick={() => {history.push(`${match.url}/1` );  console.log(match, history) ;}} >

//first_name={first_name} last_name= {last_name} avatar={avatar} phone_number={phone_number}

const  EmployeeGroup = ({match, history, id}) => {
                return(
                                <div onClick={() => {history.push(`${match.url}/${id}` )} }>
                                        {id}
                                </div>
                        )
        }

//onClick={() => {history.push(`${match.url}/${id}`)}}
// const mapStateToProps = (state) => ({
//   employee : employee
// });

export default withRouter(EmployeeGroup)