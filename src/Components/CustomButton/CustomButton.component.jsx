import React from "react";
import "./CustomButton.Styles.scss";
const CustomButton = ({ children, ...otherProps }) => (
	<button
		className="rounded-full xl:w-52 xl:h-10 text-center custom-button"
		{...otherProps}
	>
		{children}
	</button>
);
export default CustomButton;
