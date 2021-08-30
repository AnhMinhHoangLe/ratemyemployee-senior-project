
export const updateRateFunc = (rateMap, thingsToChange) => {
    //idEmployee, idGroup, newRate, date, newAvg
    let idEmployee = thingsToChange["idEmployee"]
    let idGroup = thingsToChange["idGroup"]
    let newAvg = thingsToChange["avgRateCal"]
    
    let newObject = {}
    newObject["rate"] = thingsToChange["newRate"]
    const dateCurrent = new Date();
    if( rateMap[idEmployee]["group"][idGroup].infoRating.find( ({ date }) =>
        new Date(date).getMonth() + 1 === dateCurrent.getMonth() + 1)) {
            alert("already rated")
            return rateMap
    }
    newObject["date"] =  dateCurrent.toLocaleDateString("en-US")
    rateMap[idEmployee]["group"][idGroup].avg_rating = newAvg
    return { ...rateMap, avg_rating: rateMap[idEmployee]["group"][idGroup].avg_rating, infoRating:rateMap[idEmployee]["group"][idGroup].infoRating.push(newObject) } 
}