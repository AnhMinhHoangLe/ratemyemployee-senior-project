import React, {useState, useEffect,  Suspense, lazy } from "react";
import "./HomePage.Styles.css";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../Redux/User/user.selectors";
import { selectListEmployee } from "../../Redux/Individuals/individuals.selectors";
import ChatLists from "./../Chat/ChatSession/ChatList"
import TopEmployee from "./TopEmployee/TopEmployee.Component"
import { Box, Typography, Grid, CircularProgress } from "@mui/material"
const UserSummaryInfoHomeLazy = React.lazy(() => import('./UserSummaryInfo-Home.Components/UserSummaryInfo-Home.Components'));

const HomePage = ({ currentUser, individuals, fetchEmployeeGroupStartAsync }) => {
    return (
      <Grid container spacing={2} sx={{ pl:15, pt:8}}>
        <Grid item xs={8} md={8}>
               <Suspense fallback={<CircularProgress />}>
                <UserSummaryInfoHomeLazy idUser={currentUser.id} />
              </Suspense>
          
        </Grid>
        
        <Grid item xs={4} md={4}>
          <ChatLists/>
        </Grid>
        <Grid sx={{width:"63.5%"}}>          
                    <TopEmployee/>
        </Grid>
      </Grid>
   
);
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  individuals: selectListEmployee, 
  
});
export default connect(mapStateToProps)(HomePage);
