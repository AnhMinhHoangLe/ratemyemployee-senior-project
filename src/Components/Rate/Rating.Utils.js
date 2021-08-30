//to calculate overall average of the employee in groups.
export const TotAvg = (infoRating) => {
  let arr = [];
  Object.keys(infoRating["group"]).map((key) => {
    arr.push(infoRating["group"][key]["avg_rating"]);
  });
  let res = arr.reduce((a, b) => {
    return a + b;
  }, 0);
  const avg = res / arr.length;
  return avg;
};

// to calculate avg of the employee in a specific group
export const calculateAvgRateCalInCurrentGroup = (rate, infoRating, avg_rating) => {
  const new_length = infoRating.length + 1;
  const old_length = infoRating.length;
  const newAvg = avg_rating * (old_length / new_length) + rate / new_length;
  return newAvg;
};
