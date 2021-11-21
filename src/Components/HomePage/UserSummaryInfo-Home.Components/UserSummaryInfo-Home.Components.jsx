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
        <Box sx={{ display: "flex", gap: 3}}>
            	<Card sx={{ width:"20%",  display :"flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRadius:"10px", gap:3, p:6}}>
				<Box sx={{border:4, borderRadius:"50%", borderColor: "#1DA492", p:0.4}}>
					<Avatar src={avatar} alt={displayName} sx={{width:"120px", height:"120px"}}/>
				</Box>
				<Typography variant="h5">
							{displayName}
				</Typography>
				<Typography sx={{color:"#969892"}}>
							{position}
				</Typography>
				<Typography component="div" sx={{ display: "flex", gap:1 , flexWrap: "wrap" }}>
					<Typography sx={{color: "#1DA492"}} sx={{ fontSize:12, color:"#1DA492"}}>{id}</Typography>
				</Typography>
		</Card>
		<Card sx={{ width: "80%", p:3, display:"flex", flexDirection: "column", gap:3, borderRadius:"10px", color:"#313836"}}>
				<Typography variant="h4" sx={{fontSize:"21px"}} >Groups and Employees</Typography>
				<Typography component="div" sx={{borderBottom: 1, borderColor:"#E0E0E0"}}></Typography>
				<Box sx={{display:"flex", justifyContent:"space-evenly"}}>
				<Typography component="div" sx={{display:"flex", flexDirection: "column", gap: 3, textAlign:"center"}}>
					<Typography variant="h1" sx={{fontSize:"110px"}}>{amountOfGroup}</Typography>
					<Typography varian="p" >Groups</Typography>
					<Link to="/grps"><Typography component="span"  sx={{color: "#1DA492"}}> View Groups ></Typography></Link> 
				</Typography>
				<Typography component="div" sx={{display:"flex", flexDirection: "column", gap:3,  textAlign:"center"}}>
					<Typography variant="h1" sx={{fontSize:"110px"}}>{amountOfEmployee}</Typography>
					<Typography varian="p" >Employees</Typography>
					<Link to="/emps"><Typography component="span"  sx={{color: "#1DA492"}}> View Employees ></Typography></Link> 
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