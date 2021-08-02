import React, { useEffect, useState, useRef } from 'react'
import {connect} from "react-redux"
import FormInput from '../../../FormInput/FormInput.Component'
import {triggerSearchAddEmployeeComp} from '../../../../Redux/Option/option.actions'
const AddEmployeeBySearch = ({dispatch}) => {
    const [searchField, setSearchField] = useState('')
	
    const onSearchChange = (e) => {
        if (e.target.value.length !== 0) {
            dispatch(triggerSearchAddEmployeeComp(true))
            setSearchField(e.target.value);
        }
        else {
            dispatch(triggerSearchAddEmployeeComp(false))
        }
	};
    return (
        <div className="flex flex-col justify-center  items-center gap-4">
            <FormInput
                placeholder="Search Name"
				name="searchName"
                className="input-add-employee xl:w-80 h-11 rounded-lg text-gray-800 p-3"
                onChange={(e) => { onSearchChange(e) }}
            />
        </div>
    )
}
export default connect()(AddEmployeeBySearch)