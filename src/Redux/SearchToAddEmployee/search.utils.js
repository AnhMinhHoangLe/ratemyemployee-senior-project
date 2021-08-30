export const addEmployeeToList = (employeeListInGroupTemp, employeeToAdd) => {
    const checkExisting = employeeListInGroupTemp.find(employee => employee.id === employeeToAdd.id)
    if (checkExisting) {
        return employeeListInGroupTemp
    }
    return [...employeeListInGroupTemp, employeeToAdd]

}
export const removeEmployeeToList = (employeeListInGroupTemp, employeeToAdd) => {
    const checkExisting = employeeListInGroupTemp.find(employee => employee.id === employeeToAdd.id)
    if (checkExisting) {
        return employeeListInGroupTemp.filter(employee => employee.id !== employeeToAdd.id);
    }
    return employeeListInGroupTemp
}
