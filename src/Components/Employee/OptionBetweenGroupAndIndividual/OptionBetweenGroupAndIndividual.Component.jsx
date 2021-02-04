import React from 'react';
import CustomButton from "../../CustomButton/CustomButton.component"
import "./OptionBetweenGroupAndIndividual.Styles.css"
import {selectOptionBetweenGroupAndIndividual} from "../../../Redux/optionBetweenGroupandIndividual/optionGroupandIndividual.selectors"
import { toggleOptionBetweenGroupAndIndividual } from '../../../Redux/optionBetweenGroupandIndividual/optionGroupandDividuals.actions';
import { connect } from 'react-redux';

const OptionBetweenGroupAndIndividual = ({toggleOptionBetweenGroupAndIndividual}) =>{
        return(
        <div onClick={toggleOptionBetweenGroupAndIndividual} >
                <CustomButton>
                        Group and Individual
                </CustomButton>

        </div>
        )
}
const mapDispatchToProps = (dispatch) => (
        {
                toggleOptionBetweenGroupAndIndividual: () => dispatch(toggleOptionBetweenGroupAndIndividual())
        }
);
export default connect(null, mapDispatchToProps)(OptionBetweenGroupAndIndividual)