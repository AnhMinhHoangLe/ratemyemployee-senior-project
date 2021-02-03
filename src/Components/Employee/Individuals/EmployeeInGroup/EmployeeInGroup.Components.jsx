import React from 'react';
import "./EmployeeInGroup.Styles.css"
import {connect} from "react-redux"
import {selectEmployeeIngroup, selectEmployeeForPreview} from "../../../../Redux/Employee/employee.selectors"
import {withRouter} from "react-router"
const EmployeeInGroup = ({match, history, employee}) =>{
        // console.log(employee)
        // console.log(match.params.employeeId)
        const {id, employee_list} = employee
        return(
                <div >
                        <h1 >Group {id} </h1>
                                {
                                employee_list.map(({id, displayName} )=> (
                                        <div key={id} onClick={() => {history.push(`${match.url}/${id}` )} }>{displayName} </div>
                                 ))
                                }
                </div>
        )
}
//ownProps which is the props of the component that we are wrapping
const mapStateToProps = (state, ownProps) => (
        {
                // (state ) is to pass in selectEmployee => SelectEmployeeInGroup
                employee: selectEmployeeIngroup(ownProps.match.params.employeeId)(state),
        }
)
export default connect(mapStateToProps)(withRouter(EmployeeInGroup))

//Diary: selectEmployeeInGroup sẽ áp dụng function find() để kiểm tra id có trong object
//thì employee sẽ trả lại giá trị của key() muốn tìm