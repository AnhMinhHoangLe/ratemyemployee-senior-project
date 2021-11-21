import React, { useState, Suspense, lazy} from "react";
import "./EmployeeInGroup.Styles.scss";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { selectEmployeeIngroup } from "../../../../Redux/Employee/employee.selectors";
import { selectEmployeeInfo } from "../../../../Redux/Individuals/individuals.selectors";
import { Link } from "react-router-dom";
import { ReactComponent as Target } from "../../../../Assests/EmployeeIngroup/Polygon 6.svg";
import AddNewEmployeeInGroupByInput from "../../../Add/AddEmployee/AddEmployeeIntoGroup/AddNewEmployeeInGroupByInput.Components";
import { OptionBetweenGroupAndTask } from "../../../../Redux/Option/option.actions";
import { selectOptionBetweenGroupAndTask } from "../../../../Redux/Option/option.selectors";
import Task from "../../../Tasks/Task.Components";
import RateCard from "../../../RateCard/RateCard.Component";
import { triggerOpenAndCloseRateCard } from "../../../../Redux/Option/option.actions";
import { selectTriggerOpenAndCloseRateCard } from "../../../../Redux/Option/option.selectors";
import ErrorComponent from "../../../ErrorComponent/ErrorComponent";
import AddEmployeeListTemp from "../../../Add/AddEmployee/AddEmployeeListTemp/AddEmployeeListTemp.Components"
import { selectEmployeeTempList } from "../../../../Redux/SearchToAddEmployee/search.selectors"
import { Box, Typography, ToggleButtonGroup, ToggleButton, Grid, Backdrop, CircularProgress} from "@mui/material"
import {selectEmployeeIDForRateCard} from "../../../../Redux/Individuals/individuals.selectors"
import { ReactComponent as NoEmployee } from "../../../../Assests/NoContent/NoEmployee/noEmployee.svg";
const EmployeeListLazy = React.lazy(() => import('../EmployeeList/employeeList.Components'));

const EmployeeInGroup = ({
  employee,
  employeeInfo,
  match,
  dispatch,
  optionGroupAndTask,
  triggerButtonOpenAndCloseRateCard,
  employeeListTemp,
  selectEmployeeIDForRateCard
}) => {
  const [statusError, setStatusError] = useState("Please Add Your Employee in the Group");
  const [alignment, setAlignment] = React.useState('Employee');

  const { id, employee_list, idGroup } = employee; // id group and employee list

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <Box
      // className={`${
      //   triggerButtonOpenAndCloseRateCard
      //     ? "overlay-EmployeeInGroup-container"
      //     : ""
      // }`}
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 3,
        gridTemplateRows: 'auto',
        gridTemplateAreas: `"directory                        directory  switch"
                            "container-list-addEmp container-list-addEmp container-list-addEmp"`,
        align:"center",
        flexGrow: 1,
        p: 3,
        ...triggerButtonOpenAndCloseRateCard && {
          minHeight: "100vh",
        }
      }}
    >
     
        <Box sx={{ gridArea: 'directory'}}>
            <Typography sx={{display:"flex", ml:5}}><Link to="/grps" > <Typography sx={{color:"black"}}>Groups</Typography> </Link> / Group {id}</Typography>
        </Box>
        <Box sx={{ gridArea: 'switch' }}>
          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleChange}
            sx={{  borderRadius: "10px" }}
            >
              <ToggleButton value="Employee" onClick={()=> dispatch(OptionBetweenGroupAndTask(true))} sx={{border:0}}>Employee</ToggleButton>
              <ToggleButton value="Task" onClick={() => dispatch(OptionBetweenGroupAndTask(false))}  sx={{border:0}}>Task</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      {optionGroupAndTask ? (
        <Grid container sx={{gridArea: 'container-list-addEmp'}} spacing={3}  columns={{ xs: 3, sm: 3, md: 3 }} >
          <Grid item xs={2} sm={2} md={2}>
            {employee_list.length === 0 ? (
              <Grid item>
                {
                  employeeListTemp.length === 0 ? (
                    <Box sx={{display:"flex", justifyContent: "center", flexDirection:"column", alignItems:"center"}}>
                      <NoEmployee/>
                      <Typography><ErrorComponent statusError={statusError} /></Typography>
                    </Box>
                  ) : (
                    <Box>
                      <AddEmployeeListTemp employeeListTemp={employeeListTemp} idGroup={idGroup}/>
                    </Box>
                  )
                }
                  
                </Grid>
              ) : (
                <Grid item>
                  <Box>
                    <AddEmployeeListTemp employeeListTemp={employeeListTemp} idGroup={idGroup}/>
                  </Box>
                  <Box sx={{display:"flex", justifyContent:"space-evenly",  flexWrap: 'wrap', gap:2, mr:2}}>
                    <Suspense fallback={<CircularProgress />}>
                      <EmployeeListLazy  employee_list={employee_list} idGroup={idGroup}/>
                    </Suspense>
                  </Box>

                    {!triggerButtonOpenAndCloseRateCard ? (""):(
                      <Box
                        sx={{  position:"sticky", width:"40%", bottom:"200px", left:"500px", zIndex:2}}
                              // className={`${
                              //     triggerButtonOpenAndCloseRateCard
                              //       ? "rate-card-activate-component"
                              //       : ""
                              //   }`}
                          >
                                  <RateCard
                                      avatar={employeeInfo[selectEmployeeIDForRateCard].avatar}
                                      displayName={employeeInfo[selectEmployeeIDForRateCard].displayName}
                                      idGroup={idGroup}
                                      idEmployee={selectEmployeeIDForRateCard}
                                      id={selectEmployeeIDForRateCard}
                                    />
                          </Box> )}
                        
            </Grid>
            )}
          </Grid>
          
          <Grid item sx={{width:"23%", display:"flex", alignItems:"center"}}>
            <AddNewEmployeeInGroupByInput idGroup={idGroup}/>
          </Grid>

        </Grid>
      ) : (
        <Box sx={{gridArea: 'container-list-addEmp'}}>
          <Task idGroup={idGroup} />
        </Box>
      )}
    </Box>
  );
};
//ownProps which is the props of the component that we are wrapping
const mapStateToProps = (state, ownProps) => ({
  employeeInfo: selectEmployeeInfo(state),
  employee: selectEmployeeIngroup(ownProps.match.params.groupID)(state),
  optionGroupAndTask: selectOptionBetweenGroupAndTask(state),
  triggerButtonOpenAndCloseRateCard: selectTriggerOpenAndCloseRateCard(state),
  employeeListTemp: selectEmployeeTempList(state),
  selectEmployeeIDForRateCard: selectEmployeeIDForRateCard(state)
});

export default connect(mapStateToProps)(withRouter(EmployeeInGroup));

//Diary: selectEmployeeInGroup sẽ áp dụng function find() để kiểm tra id có trong object
//thì employee sẽ trả lại giá trị của key() muốn tìm
