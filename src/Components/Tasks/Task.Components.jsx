import React from "react";
import AddTask from "./AddTask/addTask.Components";
import OverviewTask from "./OverviewTask/OverviewTask.Components";

const Task = () => {
	return (
		<div className="flex justify-evenly">
			<div>
				<OverviewTask />
			</div>
			<div>
				<AddTask />
			</div>
		</div>
	);
};
export default Task;
