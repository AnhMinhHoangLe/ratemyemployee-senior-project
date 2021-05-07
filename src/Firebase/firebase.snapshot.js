import { auth, firestore } from "./firebase.utils";

/**
 * @params snapshot
 * to get the data id of employee in the list Employee of manager
 *
 */
export const convertDataEmployeeSnapShot = (snapshot) => {
	//get the id from Users/../employee and return the set of array id:[{id:1}, {id:2}]
	const employeeDataRef = snapshot.docs.map((doc) => {
		const { id } = doc.data(); // get the data by data()
		return {
			id,
		};
	});
	// get all the id and return an array of id [1,2]
	return employeeDataRef.reduce((accumulator, collection) => {
		accumulator[collection.id] = collection;
		return [...accumulator, collection.id];
	}, []);
};

// To convert all the data of group collection
export const convertDataGroupSnapShot = (snapshot) => {
	const groupRef = snapshot.docs.map((doc) => {
		const { id, employee_list, idGroup } = doc.data();
		return {
			id,
			employee_list,
			idGroup,
		};
	});

	return groupRef.reduce((accumulator, collection) => {
		accumulator[collection.id] = collection;
		return accumulator;
	}, {});
};

export const convertDataRateSnapShot = (listEmployee) => {
	// const rateRef = snapshot.docs.map()
	let arrayID = [];
	listEmployee.map(({ id }) => {
		arrayID.push(id);
	});
	let set = {};

	try {
		arrayID.forEach((id) => {
			const groupData = firestore
				.doc(`rate/${id}`)
				.onSnapshot(async (snapshot) => {
					const { group } = snapshot.data();
					set[id] = group;
				});
		});
	} catch (error) {
		console.error();
	}
	return set;
};
