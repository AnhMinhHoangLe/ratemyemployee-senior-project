import React from 'react';
import "./CustomButton.Styles.css"
const CustomButton = ({children, ...otherProps}) =>(
                <button {...otherProps}>{children}</button>
        
)
export default CustomButton