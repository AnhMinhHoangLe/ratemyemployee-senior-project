import React from "react";
import { Card, Box, Typography, Avatar } from '@mui/material';
import {removeEmployeeToList} from "../../../../../Redux/SearchToAddEmployee/search.actions"
import { connect } from "react-redux";
import { selectEmployeeTempList } from "../../../../../Redux/SearchToAddEmployee/search.selectors"
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';const EmployeeCardTemp = ({ avatar, displayName, position, index, employeeListTemp, removeEmployee }) => {
    return (
      <Box>
        <Card sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-around", textAlign:"center", alignItems: 'center',  width:"245px", p:3, borderRadius:"10px"}}>
                <Box>
                    <Typography sx={{ border: 3, borderColor: "#2AC28C", borderRadius: "100%", p: "1px" }}>
                        <Avatar sx={{ width: "50px", height: "50px" }} src={avatar} alt={displayName} />
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="h5" fontSize="23px" sx={{pb:2}}>{displayName}</Typography>
                    <Typography fontSize="16px">{position}</Typography>
                </Box>
            </Card>
            <Typography component="div" sx={{ position:"relative", bottom:"125px", left:"148px"}}>
                <HighlightOffTwoToneIcon color="disabled" onClick={() => (removeEmployee(employeeListTemp[index]))} />
            </Typography>
        </Box>
  );
};
// //ownProps which is the props of the component that we are wrapping
const mapStateToProps = (state) => ({
    employeeListTemp: selectEmployeeTempList(state),
  });
  const mapDispatchToProps = (dispatch) => ({
      removeEmployee: (employeeListInGroupTemp) => dispatch(removeEmployeeToList(employeeListInGroupTemp)),
})
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeCardTemp);


