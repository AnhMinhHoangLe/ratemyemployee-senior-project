import React, {useState, useEffect,  Suspense, lazy } from "react";
import EmployeeCardInGroup from "../../EmployeeCardInGroup/EmployeeCardInGroup.Components";
import { connect } from "react-redux";
import { CircularProgress} from "@mui/material"
import { Box, Typography, ToggleButtonGroup, ToggleButton, Grid, Backdrop} from "@mui/material"

const EmployeeCardInGroupLazy = React.lazy(() => import('../../EmployeeCardInGroup/EmployeeCardInGroup.Components'));

const EmployeeList = ({ employee_list, employeeInfo, idGroup}) => {
    return(
        <Box sx={{display:"flex", justifyContent:"space-evenly",  flexWrap: 'wrap', gap:2, mr:2}}>
            {
                employee_list.map(({ id }) => (
                        <EmployeeCardInGroupLazy
                            idGroup={idGroup}
                            idEmployee={id}
                            key={id}
                        />
                )
            )
            }
        </Box>
    )
}

export default (EmployeeList)