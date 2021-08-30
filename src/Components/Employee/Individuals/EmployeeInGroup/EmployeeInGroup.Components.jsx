import React, { useState } from "react";
import "./EmployeeInGroup.Styles.scss";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { selectEmployeeIngroup } from "../../../../Redux/Employee/employee.selectors";
import { selectEmployeeInfo } from "../../../../Redux/Individuals/individuals.selectors";
import { Link } from "react-router-dom";
import { ReactComponent as Target } from "../../../../Assests/EmployeeIngroup/Polygon 6.svg";
import AddNewEmployeeInGroupByInput from "../../../Add/AddEmployee/AddNewEmployeeInGroupByInput.Components";
import { OptionBetweenGroupAndTask } from "../../../../Redux/Option/option.actions";
import CustomButton from "../../../CustomButton/CustomButton.component";
import { selectOptionBetweenGroupAndTask } from "../../../../Redux/Option/option.selectors";
import Task from "../../../Tasks/Task.Components";
import RatingStar from "../../../Rate/RatingStar/RatingStar.Components";
import EmployeeCard from "../../EmployeeCard/EmployeeCard.Component";
import RateCard from "../../../RateCard/RateCard.Component";
import { triggerOpenAndCloseRateCard } from "../../../../Redux/Option/option.actions";
import { selectTriggerOpenAndCloseRateCard } from "../../../../Redux/Option/option.selectors";
import ErrorComponent from "../../../ErrorComponent/ErrorComponent";
import AddEmployeeListTemp from "../../../Add/AddEmployee/AddEmployeeListTemp/AddEmployeeListTemp.Components"
import { selectEmployeeTempList } from "../../../../Redux/SearchToAddEmployee/search.selectors"

const EmployeeInGroup = ({
  employee,
  employeeInfo,
  match,
  history,
  dispatch,
  optionGroupAndTask,
  triggerButtonOpenAndCloseRateCard,
  employeeListTemp
}) => {
  const [avatar, setAvatar] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [idEmployee, setIdEmployee] = useState("");
  const [statusError, setStatusError] = useState("Please Add Your Employee in the Group");
  const { id, employee_list, idGroup } = employee; // id group and employee list
  const onClickRateCardInfo = (displayName, avatar, id) => {
    dispatch(triggerOpenAndCloseRateCard(true));
    setDisplayName(displayName);
    setAvatar(avatar);
    setIdEmployee(id);
  };
  return (
    <div
      className={`flex flex-col p-10 EmployeeInGroup-container ${
        triggerButtonOpenAndCloseRateCard
          ? "overlay-EmployeeInGroup-container"
          : ""
      }`}
    >
      <div
        className={`grid grid-cols-6 mb-10 ${
          triggerButtonOpenAndCloseRateCard ? "overlay-container" : ""
        }`}
      >
        <div className="col-start-1 col-span-2">
          <Link to="/grps" className="flex gap-3">
            <Target className="w-5 target-employee-in-group" />
            <h1 className="font-bold text-3xl title-employee-in-group">
              Group {id}
            </h1>
          </Link>
        </div>
        <div className="col-start-5 col-span-2 flex justify-evenly">
          <span>
            <CustomButton
              onClick={() => {
                dispatch(OptionBetweenGroupAndTask(true));
              }}
            >
              Employee
            </CustomButton>
          </span>
          <span>
            <CustomButton
              onClick={() => {
                dispatch(OptionBetweenGroupAndTask(false));
              }}
            >
              Task
            </CustomButton>
          </span>
        </div>
      </div>

      {optionGroupAndTask ? (
        <div className="optionGroupAndTask-container flex justify-between">

          <div>
            {employee_list.length === 0 ? (
              <div className="flex flex-col">
                <span><ErrorComponent statusError={statusError} /></span>
                <br/>
                <span>
                    <AddEmployeeListTemp employeeListTemp={employeeListTemp} idGroup={idGroup}/>
                </span>
              </div>
              ) : (
                <div>
                  <div>
                    <AddEmployeeListTemp employeeListTemp={employeeListTemp} idGroup={idGroup}/>
                  </div>
                  <div
                    className={`col-start-1 col-span-3 flex gap-5 ${
                      triggerButtonOpenAndCloseRateCard ? "overlay-container" : ""
                    }`}
                  >
                  {
                    employee_list.map(({ id }, index) => (
                      <div>
                        {!triggerButtonOpenAndCloseRateCard ? (
                          <div key={index}>
                              <div key={id} className="shadow-lg rounded-xl p-8 flex flex-col bg-green-500 gap-3 justify-center card-component">
                                  <span onClick={() => {history.push(`${match.url}/${id}`);}}>
                                    <EmployeeCard
                                      avatar={employeeInfo[id].avatar }
                                      displayName={employeeInfo[id].displayName}
                                      position={employeeInfo[id].position}
                                    />
                                <RatingStar idGroup={idGroup} idEmployee={id} />
                                  </span>
                                  <CustomButton
                                        onClick={() =>
                                          onClickRateCardInfo(
                                            employeeInfo[id].displayName,
                                            employeeInfo[id].avatar,
                                            id
                                          )
                                        }
                                        // className="button"
                                        id={id}
                                        key={id}
                                      >
                                        W
                                  </CustomButton>
                            </div>

                          </div>
                        ) : (
                            
                          <div className={`absolute rate-card-component ${
                                  triggerButtonOpenAndCloseRateCard
                                    ? "rate-card-activate-component"
                                    : ""
                                }`}
                          >
                                  <RateCard
                                      id={id}
                                      avatar={avatar}
                                      displayName={displayName}
                                      idGroup={idGroup}
                                      idEmployee={idEmployee}
                                    />
                          </div>
                        )}
                      </div>
                    ))
                  }
                  </div>
            </div>
            )}

          </div>
          
          <div className={`col-start-1 col-span-3 flex gap-5 ${ !triggerButtonOpenAndCloseRateCard ? "overlay-container" : ""}`}>
            <AddNewEmployeeInGroupByInput idGroup={idGroup}/>
          </div>

        </div>
      ) : (
        <div>
          <Task idGroup={idGroup} />
        </div>
      )}
    </div>
  );
};
//ownProps which is the props of the component that we are wrapping
const mapStateToProps = (state, ownProps) => ({
  employeeInfo: selectEmployeeInfo(state),
  // (state ) is to pass in selectEmployee => SelectEmployeeInGroup
  employee: selectEmployeeIngroup(ownProps.match.params.groupID)(state),
  optionGroupAndTask: selectOptionBetweenGroupAndTask(state),
  triggerButtonOpenAndCloseRateCard: selectTriggerOpenAndCloseRateCard(state),
  employeeListTemp : selectEmployeeTempList(state), 
});

export default connect(mapStateToProps)(withRouter(EmployeeInGroup));

//Diary: selectEmployeeInGroup sẽ áp dụng function find() để kiểm tra id có trong object
//thì employee sẽ trả lại giá trị của key() muốn tìm
