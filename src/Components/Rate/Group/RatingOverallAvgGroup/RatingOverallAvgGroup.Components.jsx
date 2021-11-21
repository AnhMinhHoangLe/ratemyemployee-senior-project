import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { selectInfoRateInGroup } from "../../../../Redux/Rate/rate.selectors";
import {Card, Box, Typography} from '@mui/material';
import { Chart } from "react-google-charts";


const RatingOverallAvgGroup = ({ state, idEmployee, idGroup }) => {
  const { avg_rating, infoRating } = state.group[idGroup];
  const [chartData, serChartData] = useState([])
  const chart = () => {
    const { avg_rating, infoRating } = state.group[idGroup];
    let percentRateAverage = (avg_rating * 100) / 5
    let theRestPercent = 100-percentRateAverage
    serChartData(
      [
        ['Title', 'PercentAverage'],
        ['Employee Percentage Overall', percentRateAverage],
        ['', theRestPercent],
      ]
      )
  }
  useEffect(() => {
    chart()
  }, [])
  return (
    <Box sx={{position:"relative", top:"25px", border:"10px"}}>
      <Box>
        <Chart
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={chartData}
          options={{
            // Just add this option
            pieHole: 0.6,
            legend: 'none',
            slices: {
              0: { color: '#11998E' },
              1: { color: '#FFDB5D' }
            },
            'width':500,
            'height':300
          }}
        />
        <Typography component="div" variant="h5" sx={{ position:"relative", bottom:"165px", left:"235px"}}>{avg_rating}/5</Typography>
      </Box>
    </Box>
  );
};
const mapStateToProps = (state, ownProps) => ({
  state: selectInfoRateInGroup(ownProps.idEmployee)(state),
});
export default connect(mapStateToProps)(RatingOverallAvgGroup);
