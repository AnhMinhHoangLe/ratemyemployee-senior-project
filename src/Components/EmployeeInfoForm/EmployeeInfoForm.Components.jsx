import React from "react";
import "./EmployeeInfoForm.styles.scss";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { Box, Typography, Avatar, Card} from "@mui/material"

const EmployeeInfoForm = ({
	displayName,
	email,
	position,
	// gender,
	// address,
	avatar,
	phone_number,
	currentGroupID,
	idEmployee
}) => {
	return (
		<Box sx={{ display: "flex", p: 3, gap: 3 }}>
			<Card sx={{ width:"30%",  display :"flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRadius:"10px", gap:3, p:3}}>
				<Box sx={{border:4, borderRadius:"50%", borderColor: "#1DA492", p:0.4}}>
					<Avatar src={avatar} alt={displayName} sx={{width:"153px", height:"153px"}}/>
				</Box>
				<Typography component="div" sx={{ display: "flex", gap:1 , flexWrap: "wrap" }}>
					<Typography>ID#: </Typography>
					<Typography sx={{color: "#1DA492"}}>{idEmployee}</Typography>
				</Typography>
			</Card>
			
			<Card sx={{ width: "70%", p:3, display:"flex", flexDirection: "column", gap:3, borderRadius:"10px"}}>
				<Typography variant="h5">
					{displayName}
				</Typography>
				<Typography variant="h6" sx={{color:""}}>
					{position}
				</Typography>
				<Typography variant="h6"> {currentGroupID}</Typography>
				<Typography component="div" sx={{ display: "flex" , gap:1 , flexWrap: "wrap" }}>
					<Typography variant="h6">Phone #: </Typography>
					<Typography variant="h6" sx={{color: "#1DA492"}}> {phone_number === 0 ? ("None") : ({ phone_number })}</Typography>
				</Typography>
				<Typography component="div" sx={{ display: "flex" , gap:1 , flexWrap: "wrap" }}>
					<Typography variant="h6">Email: </Typography>
					<Typography variant="h6" sx={{color: "#1DA492"}}> {email}</Typography>
				</Typography>
			</Card>
		</Box>
	);
};
export default EmployeeInfoForm;
