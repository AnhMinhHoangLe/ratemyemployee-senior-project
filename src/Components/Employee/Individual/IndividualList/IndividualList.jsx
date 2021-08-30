import React from "react";
import { selectListEmployee } from "../../../../Redux/Individuals/individuals.selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import AddEmployee from "../../../Add/AddEmployee/AddNewEmployeeInGroupByInput.Components";
class IndividualList extends React.Component {
  render() {
    const { individuals, match, history } = this.props;
    return (
      <div className="flex justify-evenly p-10">
        <div className="flex gap-5 p-5 flex-wrap">
          {individuals.map(({ displayName, avatar, position, id }, index) => (
            <div
              key={index}
              onClick={() => {
                history.push(`${match.url}/${id}`);
              }}
              className="shadow-lg rounded-xl p-8 flex flex-col bg-green-500 gap-3 justify-center text-center "
            >
              <img
                src={avatar}
                width="100"
                height="100"
                className="place-self-center"
              />
              <h1 className="text-lg ">{displayName}</h1>
              <p>{position.toLowerCase()}</p>
            </div>
          ))}
        </div>
        <div>
          <AddEmployee />
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  individuals: selectListEmployee,
});

export default connect(mapStateToProps)(withRouter(IndividualList));
