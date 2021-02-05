import React from 'react'
import {selectListEmployee, selectEmployeeInfo} from "../../../../Redux/Individuals/individuals.selectors"
import {connect} from "react-redux"
import {createStructuredSelector} from "reselect"
import {withRouter} from "react-router-dom"
import OptionBetweenGroupAndIndividual from "../../OptionBetweenGroupAndIndividual/OptionBetweenGroupAndIndividual.Component"

const IndividualList = ({individuals, employeeInfo,  match, history}) =>{
        const id = Object.keys(employeeInfo)
        return(

                <div>
                        <OptionBetweenGroupAndIndividual  />
                        {
                                
                                individuals.map(({displayName, avatar}, index) => 
                                        <div key={id[index]} onClick={() => {history.push(`${match.url}/${id[index]}` )}} >
                                                <img src={avatar} />
                                                <h1>Name: {displayName}</h1>
                                                <p>ID: {id[index]}</p>
                                        </div>
                                        ) 
                        }

                </div>
        )
}
const mapStateToProps = createStructuredSelector({
        employeeInfo : selectEmployeeInfo, 
        individuals : selectListEmployee
})
export default withRouter(connect(mapStateToProps)(IndividualList))