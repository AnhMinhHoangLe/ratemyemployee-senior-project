import React from "react";
import { selectListEmployee } from "../../../../Redux/Individuals/individuals.selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import AddNewIndividualEmployee from "../../../Add/AddEmployee/AddIndividualEmployee/AddIndividualEmployee.Components"
import EmployeeCard from "../../EmployeeCard/EmployeeCard.Component";
class IndividualList extends React.Component {
  render() {
    const { individuals, match, history } = this.props;
    return (
      <div className="flex justify-evenly gap-4 pt-10">
          <span className="flex flex-col p-5">
              <div className="pb-5">
                <h1>Employee List</h1>
              </div>
              
            <div className="grid grid-cols-4 grid-rows-3 gap-4">
                {
                individuals.map(({ displayName, avatar, position, id }, index) => (
                  <div key={index}>
                    <div
                      onClick={() => {
                        history.push(`${match.url}/${id}`);
                      }}
                      className="shadow-lg rounded-xl p-8 bg-green-500 h-full w-full"
                    >
                      <EmployeeCard  avatar={avatar} displayName={displayName} position={position} />
                    </div>
                  </div>
              
                ))
              }
          </div>
          
          </span>
          
        <span className="pt-10">
            <AddNewIndividualEmployee />
          </span>

      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  individuals: selectListEmployee,
});

export default connect(mapStateToProps)(withRouter(IndividualList));
