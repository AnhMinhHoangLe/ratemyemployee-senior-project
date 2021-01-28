import React, {Component} from 'react';
import EmployeeDirectoryGroup from './EmployeeDirectoryGroup/EmployeeDirectoryGroup'
import "./EmployeePage.Styles.css"
import { Route } from 'react-router-dom';
import EmployeeOverview from '../Individuals/EmployeeOverview/EmployeeOverview.Components'
// import DATA_EMPLOYEE from "../DATA_EMPLOYEE"
import {connect} from "react-redux"
import {selectDirectoryEmployee} from "../../../Redux/DirectoryEmployee/directory.selectors"
import {createStructuredSelector} from "reselect"

const EmployeeGroupPage = () => {
        // constructor(){
        //         super()
        //         this.state = {
        //                 employee : DATA_EMPLOYEE
        //         }
        // }
        return(

                <div className='employee-page' >
                        <div className='employee-page-title'> EMPLOYEE </div>
                                <div>
                                        {/* <Route exact path={`${match.path}/`} component={EmployeeGroup} />
                                        <Route path={`${match.url}/:employeeId`} component={EmployeeOverview} /> */}
                                        <EmployeeDirectoryGroup  />
                                        
                                        
                                </div>
                        </div>
                )
        }

       






export default EmployeeGroupPage