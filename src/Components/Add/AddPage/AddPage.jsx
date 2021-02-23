import React from "react";
import AddEmployee from "../AddEmployee/AddEmployee.Components";
import AddGroup from "../AddGroup/AddGroup.Components";
import "./AddPage.Styles.css";

const AddPage = () => {
    return (
        <div className="add-page-component">
            <span>
                <AddEmployee />
            </span>
            <span>
                <AddGroup />
            </span>
        </div>
    );
};
export default AddPage;
