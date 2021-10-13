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
import { addEmployeeToList, removeEmployeeToList, clearAllEmployeeInList } from "../../../../Redux/SearchToAddEmployee/search.actions"
import { Card, Box, Typography, Avatar, CardActions, Paper, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
const ResultAddEmployeeBySearch = ({ search, individuals, addEmployee }) => {
    const [errorStt, setErrorStt] = useState('There is no result')
    return (
        <Box  sx={{ width:"100%" }}>
			{!search ? (
                <div></div>
            ) : (
                        
                            individuals.filter((key) => {
                                return key.displayName.toUpperCase().includes(search.toUpperCase()) && key.groupActive === false
                            }).length !== 0 ? (
                            <Typography component="div">
                                {
                                    individuals
                                        .filter((key) => {
                                            return key.displayName.toUpperCase().includes(search.toUpperCase()) && key.groupActive === false
                                        })
                                        .map(({ id, displayName, avatar, position }, index) => (
                                            <Grid container
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                key={index} sx={{p:1}}>
                                                <Grid item>
                                                    <Avatar src={avatar} />
                                                </Grid>
                                                <Grid item>
                                                    <Typography>{displayName}</Typography>
                                                </Grid>
                                                <Grid item><AddIcon onClick={()=> addEmployee({ id, displayName, avatar, position })} /></Grid>
                                            </Grid>
                                        ))
                                }
                            </Typography>  
                    ) : (
                            <ErrorComponent statusError={errorStt}/>
                    )
			)}
		</Box>
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