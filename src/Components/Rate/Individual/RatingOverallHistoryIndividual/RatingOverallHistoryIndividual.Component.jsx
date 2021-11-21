import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { selectInfoRateInGroup } from "../../../../Redux/Rate/rate.selectors";
import {Card, Box, Typography} from '@mui/material';
import { Chart } from "react-google-charts";
const RatingOverallHistoryIndividual = ({ overallAvgRate }) => {
  const [chartData, serChartData] = useState([])
  const chart = () => {
    let percentRateAverage = (overallAvgRate * 100) / 5
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
        <Typography component="div" variant="h5"  sx={{ position:"relative", bottom:"165px", left:"235px"}}>{overallAvgRate}/5</Typography>
      </Box>
    </Box>
  )
};
export default RatingOverallHistoryIndividual;
