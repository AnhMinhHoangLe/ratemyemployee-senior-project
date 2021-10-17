import React, { useEffect } from "react";
import { connect } from "react-redux";
import { selectWholeDataRate } from "../../../../Redux/Rate/rate.selectors";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, Box } from '@mui/material'
import CollapsedInfo from "./CollapsibleTable.Components"
const RatingOverallDataEmployeeInGroup = ({ selectWholeDataRate, idEmployee }) => {
  const { group } = selectWholeDataRate
  return (
    <Box sx={{width:"90%"}}>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell component="th" scope="row" >Group ID</TableCell>
              <TableCell align="center">Average Rate In Group</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              Object.keys(group).map((id) => (
                  <CollapsedInfo idGroup={id} group={group} avg_rating = {group[id]['avg_rating']}/>
                )
              )
            }
          </TableBody>
        </Table>
        </TableContainer>
      </Box>
  );
};
const mapStateToProps = (state, ownProps) => ({
  selectWholeDataRate: selectWholeDataRate(ownProps.idEmployee)(state),
});
export default connect(mapStateToProps)(RatingOverallDataEmployeeInGroup);
