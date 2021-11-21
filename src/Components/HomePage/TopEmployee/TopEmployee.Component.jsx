import React from "react";
import { selectListEmployee } from "../../../Redux/Individuals/individuals.selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import TopEmployeeCard from "../TopEmployeeCard/TopEmployeeCard.Component";
import { Box, Typography, Card} from "@mui/material"
import {
  selectRateInfo,
} from "../../../Redux/Rate/rate.selectors";
const TopEmployee = ({individuals, selectRateInfo}) => {
    return (
      <Box sx={{flexWrap: 'wrap', p:3, width:"94.5%", position:"relative", right:"10px", width:"100%", color:"#313836"}} >
          <Card sx={{ display: "flex",  flexDirection:"column", flexWrap: 'wrap', gap: 2, mr: 2, p: 3, width:"100%", borderRadius:"10px"}}>
              <Typography variant="h5">Employees of The Month</Typography>
				      <Typography component="div" sx={{borderBottom: 1, borderColor:"#E0E0E0"}}></Typography>
              <Box sx={{display:"flex", justifyContent:"center",  width:"100%"}}>
                  {
                    individuals ? (
                    individuals
                      .sort((first, second) => { return (selectRateInfo[first.id]['avg_rating'] < selectRateInfo[second.id]['avg_rating'] )? 1 : -1 })
                      .map(({ displayName, avatar, position, id, currentGroupID, admin }, index) => (
                        !admin ? (
                          <TopEmployeeCard key={index} avatar={avatar} displayName={displayName} position={position} idx={id} />
                        ) :
                          (
                            <>
                            </>
                          )
                        )
                        )
                        ) : (
                            <Box></Box>
                        )
                    }
                  </Box>
            </Card>
      </Box>
    );
  }


const mapStateToProps = (state, ownProps) => ({
  individuals: selectListEmployee(state),
  selectRateInfo: selectRateInfo(state),

});

export default connect(mapStateToProps)(TopEmployee);
