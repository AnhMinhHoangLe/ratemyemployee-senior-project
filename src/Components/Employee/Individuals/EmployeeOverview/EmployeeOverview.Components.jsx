import React from "react";
import "./EmployeeOverview.Styles.scss";
import { connect } from "react-redux";
// import DATA_EMPLOYEE from "../../DATA_EMPLOYEE"
import EmployeePreview from "../EmployeePreview/EmployeePreview.Components";
import { createStructuredSelector } from "reselect";
import { selectEmployeeForPreview } from "../../../../Redux/Employee/employee.selectors";
import { selectEmployeeInfo } from "../../../../Redux/Individuals/individuals.selectors";
import CustomButton from "../../../CustomButton/CustomButton.component";
import { deleteGroup } from "../../../../Firebase/firebase.utils"
import { selectCurrentUser } from "../../../../Redux/User/user.selectors";

// import OptionBetweenGroupAndIndividual from "../../OptionBetweenGroupAndIndividual/OptionBetweenGroupAndIndividual.Component";
import AddGroup from "../../../Add/AddGroup/AddGroup.Components";
const EmployeeOverview = ({ employee, employeeInfo, currentUser }) => {
  return (
    <div className="p-5 overview-container">
      <h1 className="font-bold text-xl ">Groups</h1>
      <div className="flex justify-around p-4 ">
        <div className=" grid grid-cols-1 gap-4">
          {/* <OptionBetweenGroupAndIndividual /> */}
          {employee.map(({ id, employee_list, idGroup, ...otherProps }) => (
            <span>
              <EmployeePreview
                key={id}
                id={id}
                employee_list={employee_list}
                employeeInfo={employeeInfo}
                idGroup={idGroup}
                {...otherProps}
              />
              <CustomButton onClick={() => deleteGroup(currentUser, idGroup, employee_list) }> Delete Group </CustomButton>
            </span>
          ))}
        </div>
        <div>
          <AddGroup />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  employee: selectEmployeeForPreview, // 1: {id: "1", employee_list: Array(1)}
  employeeInfo: selectEmployeeInfo, // ["600e4b87fc13ae24a7000000", "zvtLCbDtzlUOfNmU9rJa"]
  currentUser: selectCurrentUser,

});

export default connect(mapStateToProps)(EmployeeOverview);
