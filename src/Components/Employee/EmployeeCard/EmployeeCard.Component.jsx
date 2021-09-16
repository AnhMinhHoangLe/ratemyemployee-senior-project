import React from "react";
const EmployeeCard = ({ avatar, displayName, position }) => {
  return (
    <div className="text-center ">
      <img width="100" height="100" src={avatar} />
      <h1 className="text-lg ">{displayName}</h1>
      <p className="text-lg">{position}</p>
    </div>
  );
};
export default EmployeeCard;
