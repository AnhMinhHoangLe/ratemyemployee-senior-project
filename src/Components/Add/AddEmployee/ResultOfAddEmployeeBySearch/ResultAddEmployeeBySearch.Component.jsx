import React, {useState} from 'react';
import {
	selectListEmployee,
	selectEmployeeInfo,
} from "../../../../Redux/Individuals/individuals.selectors";
import { connect } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import ErrorComponent from "../../../ErrorComponent/ErrorComponent"
const ResultAddEmployeeBySearch = ({ search, individuals }) => {
    const [errorStt, setErrorStt] = useState('There is no result')
    return (
        <div className="from-black">
			{!search ? (
                <div></div>
            ) : (
                    individuals.filter((key) => {
                        return key.displayName.toUpperCase().includes(search.toUpperCase()) && key.groupActive === false
                    }).length !== 0  ? (
                        individuals
                        .filter((key) => {
                        return key.displayName.toUpperCase().includes(search.toUpperCase()) && key.groupActive === false
                        })
                        
					.map(({ id, displayName, avatar }) => (
                        <div key={id}>
							<img  src={avatar ? avatar : 'https://firebasestorage.googleapis.com/v0/b/rate-my-employee-d7636.appspot.com/o/images%2Ftree-736885__340.jpg?alt=media&token=4aea820d-9eba-4c4f-b9fd-e85915dd0463'} />
                            <p>{displayName}</p>
                            <input type="checkbox" id={id} name={displayName} />
						</div>
					))
                    ) : (
                            <ErrorComponent statusError={errorStt}/>
                    )
                 
				
			)}
		</div>
    )
}
const mapStateToProps = (state) => ({
	individuals: selectListEmployee(state),
});
export default  withRouter(connect(mapStateToProps)(ResultAddEmployeeBySearch))