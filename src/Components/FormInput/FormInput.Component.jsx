import React from 'react';
import "./FormInput.Styles.css"
const FormInput = ({label, handleChange, ...otherProps}) =>{
        return(
                <div>
                        <label>{label}</label>
                        <input onChange={handleChange} {...otherProps} />

                </div>
        )
}
export default FormInput