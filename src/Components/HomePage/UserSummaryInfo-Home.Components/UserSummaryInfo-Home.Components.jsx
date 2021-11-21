import React, {useState, useEffect} from 'react'
import { Box, Typography, Card, CardContent, Avatar} from "@mui/material"
import { connect } from "react-redux";
import { selectToShowEmployeeInfo, arrayIDEmployee} from "../../../Redux/Individuals/individuals.selectors";
import {selectArrayGroup} from "../../../Redux/Employee/employee.selectors"
import {Link} from "react-router-dom";

const UserSummaryInfoHome = ({ idUser, individuals, arrayIDEmployee, selectArrayGroup}) => {
    const { displayName,avatar, position, id } =individuals;
	const [amountOfEmployee, setAmountOfEmployee] = useState('')
	const [amountOfGroup, setAmountOfGroup] = useState('')

	useEffect(()=>{
		arrayIDEmployee.length > 0 ? setAmountOfEmployee(arrayIDEmployee.length-1) : setAmountOfEmployee(0)
		selectArrayGroup.length > 0 ? setAmountOfGroup(selectArrayGroup.length) : setAmountOfGroup(0)
	})
    return (
        <Box sx={{ display: "flex", gap: 3 }}>
            <Card sx={{ width:"30%",  display :"flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRadius:"10px", gap:3, p:6}}>
				<Box sx={{border:4, borderRadius:"50%", borderColor: "#1DA492", p:0.4}}>
					<Avatar src={avatar} alt={displayName} sx={{width:"100px", height:"100px"}}/>
				</Box>
                <Typography variant="h5">
					{displayName}
				</Typography>
                <Typography  sx={{color:""}}>
					{position}
				</Typography>
				<Typography component="div" sx={{ display: "flex", gap:1 , flexWrap: "wrap" }}>
					<Typography sx={{color: "#1DA492"}} sx={{ fontSize:12 }}>{id}</Typography>
				</Typography>
		    </Card>
			
		    <Card sx={{ width: "70%", p:3, display:"flex", flexDirection: "column", gap:3, borderRadius:"10px"}}>
				<Typography variant="h5">Groups and Employee</Typography>
				<Typography component="div" sx={{borderBottom: 1}}></Typography>
				<Box sx={{display:"flex", justifyContent:"space-evenly"}}>
				<Typography component="div" sx={{display:"flex", flexDirection: "column", gap: 3}}>
					<Typography variant="h1" >{amountOfGroup}</Typography>
					<Typography component="span" >Groups</Typography>
					<Typography component="span" ><Link to="/grps"> View Groups ></Link> </Typography>

				</Typography>
				<Typography component="div" sx={{display:"flex", flexDirection: "column", gap:3}}>
					<Typography variant="h1" >{amountOfEmployee}</Typography>
					<Typography component="span" >Employees</Typography>
					<Typography component="span" ><Link to="/emps"> View Employee ></Link> </Typography>
				</Typography>
				</Box>
            </Card>
        </Box>
    )
}
const mapStateToProps = (state, ownProps) => ({
    individuals: selectToShowEmployeeInfo(ownProps.idUser)(
      state
    ) || {},
	arrayIDEmployee:arrayIDEmployee(state) || [], 
	selectArrayGroup:selectArrayGroup(state) || []
  });
export default connect(mapStateToProps)(UserSummaryInfoHome)