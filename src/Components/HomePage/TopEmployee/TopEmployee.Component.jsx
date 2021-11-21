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
      <Box sx={{display: 'flex', flexDirection:"row", justifyContent:"space-evenly", flexWrap: 'wrap', p:3}} >
          <Box sx={{display:"flex", flexDirection:"column",  flexWrap: 'wrap', gap:3}}>
              <Typography>Top Employees</Typography>
              <Box sx={{display:"flex", justifyContent:"space-evenly",  flexWrap: 'wrap', gap:2, mr:2, p:3}}>
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
          </Box>
      </Box>
    );
  }


const mapStateToProps = (state, ownProps) => ({
  individuals: selectListEmployee(state),
  selectRateInfo: selectRateInfo(state),

});

export default connect(mapStateToProps)(TopEmployee);
