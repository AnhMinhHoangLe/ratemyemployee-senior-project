import React from "react";
import "./EmployeeInfo.Styles.css";
import EmployeeInfoForm from "../../../EmployeeInfoForm/EmployeeInfoForm.Components";
import { selectToShowEmployeeInfo } from "../../../../Redux/Individuals/individuals.selectors";
import { selectEmployeeIngroup } from "../../../../Redux/Employee/employee.selectors";
import { connect } from "react-redux";
import RatingOverallAvgGroup from "../../../Rate/Group/RatingOverallAvgGroup/RatingOverallAvgGroup.Components";
import RatingOverallDataEmployeeInGroup from "../../../Rate/Group/RatingOverallDataEmployeeInGroup/RatingOverallDataEmployeeInGroup.Component"
import { Box, Typography, Grid} from "@mui/material"

const EmployeeInfo = ({ individuals, employee, match }) => {
  const { displayName, email, gender, address, avatar, phone_number, currentGroupID, position, id } =
    individuals;
  const { employee_list, idGroup } = employee;
  const { rate } = employee_list.find(
    (key) => key.id === match.params.employeeInfoID
  );
  return (
        <Grid container spacing={2} sx={{ p:3 }}>
              <Grid item xs={8} md={8}  sx={{ p:3 }}>
                <EmployeeInfoForm
                  displayName={displayName}
                  email={email}
                  // gender={gender}
                  // address={address}
                  idEmployee ={id}
                  avatar={avatar}
                  phone_number={phone_number}
                  position={position}
                  currentGroupID={currentGroupID}
                />
                <Box sx={{ display: "flex", flexDirection:"column", width: "100%", justifyContent: "center", alignItems:"center", p:3, gap: 3}}>
                        <Typography variant="h5">Rating History</Typography>
                        <RatingOverallDataEmployeeInGroup
                            idEmployee={match.params.employeeInfoID}
                          />
                </Box>
            </Grid>
            <Grid item xs={4} md={4}>
                <RatingOverallAvgGroup
                  idEmployee={match.params.employeeInfoID}
                  idGroup={idGroup}
                />
              </Grid>
          </Grid>
     
  );
};

const mapStateToProps = (state, ownProps) => ({
  individuals: selectToShowEmployeeInfo(ownProps.match.params.employeeInfoID)(
    state
  ),
  employee: selectEmployeeIngroup(ownProps.match.params.groupID)(state),
});
export default connect(mapStateToProps)(EmployeeInfo);
