import React, {useState, useEffect,  Suspense, lazy } from "react";
import "./HomePage.Styles.css";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { fetchEmployeeGroupStartAsync } from "../../Redux/Individuals/Individuals.actions";

import { selectCurrentUser } from "../../Redux/User/user.selectors";
import { selectListEmployee } from "../../Redux/Individuals/individuals.selectors";
import ChatLists from "./../Chat/ChatSession/ChatList"
import { Box, Typography, Grid, CircularProgress } from "@mui/material"

const UserSummaryInfoHomeLazy = React.lazy(() => import('./UserSummaryInfo-Home.Components/UserSummaryInfo-Home.Components'));

const HomePage = ({ currentUser, individuals, fetchEmployeeGroupStartAsync }) => {
    return (
      <Grid container spacing={2} sx={{ p:3 }}>
        <Grid item xs={8} md={8} sx={{ }}>
               <Suspense fallback={<CircularProgress />}>
                <UserSummaryInfoHomeLazy idUser={currentUser.id} />
              </Suspense>
          
        </Grid>
        <Box sx={{ display: "flex", flexDirection:"column", width: "100%", justifyContent: "center", alignItems:"center", p:3, gap: 3}}>
                <Typography variant="h5">Rating History</Typography>
        </Box>
          <Grid item xs={4} md={4}>
             Hello
          </Grid>
      </Grid>
   
);
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  individuals: selectListEmployee
});
export default connect(mapStateToProps)(HomePage);
