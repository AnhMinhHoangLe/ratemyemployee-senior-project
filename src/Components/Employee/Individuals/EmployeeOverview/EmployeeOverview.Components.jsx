import React from "react";
import "./EmployeeOverview.Styles.scss";
import { connect } from "react-redux";
import EmployeePreview from "../EmployeePreview/EmployeePreview.Components";
import { createStructuredSelector } from "reselect";
import { selectEmployeeForPreview } from "../../../../Redux/Employee/employee.selectors";
import { selectEmployeeInfo } from "../../../../Redux/Individuals/individuals.selectors";
import { selectCurrentUser } from "../../../../Redux/User/user.selectors";
import {Grid, Typography} from '@mui/material';
import AddGroup from "../../../Add/AddGroup/AddGroup.Components";
const EmployeeOverview = ({ employee, employeeInfo, currentUser }) => {
  return (
    <Grid
      container
      columns={3}
      columnSpacing={{ xs: 2, sm: 2, md: 2 }}
      rowSpacing={1}
      direction="row"
      justifyContent="center"
      sx={{p:3}}
    >
      <Grid item xs={2} container direction="column">
        <Typography variant='h5' sx={{ml:"10%", color:"#313836"}}>Groups</Typography>
        <Grid item>

          {employee.map(({ id, employee_list, idGroup, ...otherProps }) => (
                        <Grid item container direction="column" sx={{mt: 3, ml:'10%'}}  >
                            <EmployeePreview
                                key={id}
                                id={id}
                                employee_list={employee_list}
                                employeeInfo={employeeInfo}
                                idGroup={idGroup}
                                currentUser={currentUser}
                                {...otherProps}
                              />
                        </Grid>
                        ))}  
        </Grid>
      </Grid >
      <Grid item xs={1} sx={{position:'relative', top:'3.5em'}}>
        <AddGroup />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  employee: selectEmployeeForPreview, // 1: {id: "1", employee_list: Array(1)}
  employeeInfo: selectEmployeeInfo, // ["600e4b87fc13ae24a7000000", "zvtLCbDtzlUOfNmU9rJa"]
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(EmployeeOverview);
