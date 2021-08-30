import React from "react";
import "./EmployeeInfoForm.styles.scss";
import { HiOutlineMail } from "react-icons/hi";
import { BiPhone } from "react-icons/bi";
const EmployeeInfoForm = ({
	displayName,
	email,
	position,
	// gender,
	// address,
	avatar,
	phone_number,
}) => {
	return (
		<div className="infoForm-component flex space-y-5 space-x-5">
			<span className="flex-auto">
				<img src={avatar } className="w-32 h-32" />
			</span>
			<span className="flex flex-auto flex-col space-y-5">
				<h1 className="text-5xl">{displayName}</h1>
				<div className="line"></div>
				<ul>
					<li flex-row space-x-96>
						<p className="text-lg">{position}</p>
					</li>
					<li className="flex flex-row space-x-5">
						<p className="text-xl">
							<HiOutlineMail size={20} className="icon" />
						</p>
						<p className="text-lg">{email}</p>
					</li>
					<li className="flex flex-row space-x-5">
						<p>
							<BiPhone size={20} className="icon" />
						</p>
						<p className="text-lg">{phone_number}</p>
					</li>
				</ul>
			</span>
		</div>
	);
};
export default EmployeeInfoForm;
