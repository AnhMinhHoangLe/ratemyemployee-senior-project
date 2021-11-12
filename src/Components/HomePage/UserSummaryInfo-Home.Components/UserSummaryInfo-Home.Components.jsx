import React from 'react'
import { Box, Typography, Card, CardContent, Avatar} from "@mui/material"
import { connect } from "react-redux";
import { selectToShowEmployeeInfo } from "../../../Redux/Individuals/individuals.selectors";

const UserSummaryInfoHome = ({ idUser, individuals }) => {
    const { displayName,avatar, position, id } =individuals;
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
				{/* <Typography variant="h5">
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
				</Typography> */}
            </Card>
        </Box>
    )
}
const mapStateToProps = (state, ownProps) => ({
    individuals: selectToShowEmployeeInfo(ownProps.idUser)(
      state
    ) || {},
  });
export default connect(mapStateToProps)(UserSummaryInfoHome)