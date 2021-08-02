import React from "react";
import { connect } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { ratingStar } from "../../../Firebase/firebase.utils";
import {
  selectRateInfo,
  selectAvgRateInGroup,
} from "../../../Redux/Rate/rate.selectors";
import { calculateAvg } from "../../Rate/Rating.Utils";
import { selectTriggerOpenAndCloseRateCard } from "../../../Redux/Option/option.selectors";
import { triggerSaveRateCard } from "../../../Redux/Option/option.actions";

const RatingStar = ({
  idGroup,
  idEmployee,
  state,
  triggerOpenAndCloseRateCard,
  dispatch,
}) => {
  
  // need to create a function to calculate avg at specific
  //group by using selectAvgRateInGroup, add data employee to db
  const ratingChanged = (newRating, idEmployee, idGroup) => {
    // ratingStar(state, idEmployee, idGroup, avgRateCal, newRating);
    // console.log(newRating, idEmployee, idGroup);
    // infoRating(date, rate);
    dispatch(triggerSaveRateCard(newRating));
  };

  return (
    <div>
      {triggerOpenAndCloseRateCard ? (
        <ReactStars
          count={5}
          onChange={(newRating) =>
            ratingChanged(newRating, idEmployee, idGroup)
          }
          size={24}
          emptyIcon={<i className="far fa-star"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#FFDB5D"
          edit={true}
        />
      ) : (
        <ReactStars
          count={5}
          value={state.group[idGroup].avg_rating}
          // onChange={(newRating) => ratingChanged(newRating, idEmployee, idGroup)}
          size={24}
          emptyIcon={<i className="far fa-star"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#FFDB5D"
          edit={false}
        />
      )}
    </div>
  );
};
const mapStateToProps = (state, ownProps) => ({
  state: selectAvgRateInGroup(ownProps.idEmployee)(state),
  triggerOpenAndCloseRateCard: selectTriggerOpenAndCloseRateCard(state),
});

// 4, 5, 3, 1
// 4.5 * (2 / 3) + 3 / 3
// Avg * ( tong so luong cu /tong so luong moi)  + newRating/( tong so luong moi)
// 3.25
// const a = {
//   "600e4b87fc13ae24a7000000": {
//     "2Cz9CLnYcRzM336zXynx":{
//         avg_rating: 4.5,
//         infoRating: {
//          "03/14/2021": 5,
//           "04/21/2021": 4}
//         },
//   },
//     "zvtLCbDtzlUOfNmU9rJa": {
//       "2Cz9CLnYcRzM336zXynx":
//         {
//               avg_rating: 3,
//               infoRating: {
//                "03/14/2021": 3,
//                "04/21/2021": 7
//                },
//         }
//     },
//   }
// console.log(a["600e4b87fc13ae24a7000000"]["2Cz9CLnYcRzM336zXynx"].avg_rating)
// const b = Object.keys(a["600e4b87fc13ae24a7000000"]["2Cz9CLnYcRzM336zXynx"].infoRating)
// b.map((key) => console.log(a["600e4b87fc13ae24a7000000"]["2Cz9CLnYcRzM336zXynx"].infoRating[key]))
export default connect(mapStateToProps)(RatingStar);
