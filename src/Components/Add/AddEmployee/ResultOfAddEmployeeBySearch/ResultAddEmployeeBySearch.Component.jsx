import React, { useState } from 'react';

import {
	selectListEmployee,
	selectEmployeeInfo,
} from "../../../../Redux/Individuals/individuals.selectors";
import { selectCurrentUser } from "../../../../Redux/User/user.selectors";
import { connect } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import ErrorComponent from "../../../ErrorComponent/ErrorComponent"
import CustomButton from "../../../CustomButton/CustomButton.component";
import {addEmployeeToList, removeEmployeeToList, clearAllEmployeeInList} from "../../../../Redux/SearchToAddEmployee/search.actions"
const ResultAddEmployeeBySearch = ({ search, individuals, addEmployee }) => {
    const [errorStt, setErrorStt] = useState('There is no result')
    
    return (
        <div className="from-black">
			{!search ? (
                <div></div>
            ) : (
                        
                            individuals.filter((key) => {
                                return key.displayName.toUpperCase().includes(search.toUpperCase()) && key.groupActive === false
                            }).length !== 0 ? (
                            <div>
                                {
                                individuals
                                    .filter((key) => {
                                        return key.displayName.toUpperCase().includes(search.toUpperCase()) && key.groupActive === false
                                    })
                                    .map(({ id, displayName, avatar, position },index) => (
                                        <div className="flex gap-4 " key={index}>
                                            <img className="rounded-full h-14 w-14" src={avatar} />
                                            <p className="self-center">{displayName}</p>
                                            <CustomButton  className="self-center checkbox" onClick={()=> addEmployee({ id, displayName, avatar, position })}>Adding</CustomButton>
                                        </div>
                                    ))
                            }
                            </div>  
                    ) : (
                            <ErrorComponent statusError={errorStt}/>
                    )
			)}
		</div>
    )
}

const mapStateToProps = (state) => ({
    employeeInfo: selectEmployeeInfo(state),
    individuals: selectListEmployee(state),
    currentUser: selectCurrentUser(state),
});
const mapDispatchToProps = (dispatch) => ({
    addEmployee: (employeeListInGroupTemp) => dispatch(addEmployeeToList(employeeListInGroupTemp))
})
export default  connect(mapStateToProps, mapDispatchToProps)(ResultAddEmployeeBySearch)