import { createSelector } from 'reselect'
const selectemployee = state => state.employee

export const selectEmployee = createSelector(
        [selectemployee],
        employee => employee.employee // if not .employee, it will print out variable = object, and array (map) bug
)



//Show members in all group for overview 
export const selectEmployeeForPreview = createSelector(
        [selectEmployee],
        collections => Object.keys(collections).map(key => collections[key]) //get the keys =>   get the value from the key
)

//show all members in a group
export const selectEmployeeIngroup = employeeInGroupIDTakeFromURLParams => createSelector(
        [selectEmployee],
        // employees => employees.find(employee => employee.id === EmployeeInGroup[employeeInGroupIDTakeFromURLParams]) // find employee.id matching the url parameter of our employeeIngroup id map
        employees => employees[employeeInGroupIDTakeFromURLParams] // nameObject[keys] will printout value
)
