import { createSelector } from 'reselect'
const EmployeeInGroup = {
        "600e4b87fc13ae24a7000000": {
                group: '1',
                first_name: 'Filippo',
                last_name: 'D\'orsay',
                email: 'fdorsay0@blinklist.com',
                gender: 'Female',
                address: '63 Melby Terrace',
                avatar: 'https://robohash.org/sequipraesentiumtemporibus.png?size=100x100&set=set1',
                phone_number: '236-601-7212'
        }
}

const selectemployee = state => state.employee


export const selectEmployee = createSelector(
        [selectemployee],
        employee => employee.employee // if not .employee, it will print out variable = object, and array (map) bug
)

//show all members in a group
export const selectEmployeeIngroup = employeeInGroupIDTakeFromURLParams => createSelector(
        [selectEmployee],
        // employees => employees.find(employee => employee.id === EmployeeInGroup[employeeInGroupIDTakeFromURLParams]) // find employee.id matching the url parameter of our employeeIngroup id map
        employees => employees[employeeInGroupIDTakeFromURLParams] // nameObject[keys] will printout value
)

// export const selectGroup = createSelector(
//         [selectEmployee],
//         group => Object.keys(group)  // print the key
// )
//

//Show members in all group for overview 
export const selectEmployeeForPreview = createSelector(
        [selectEmployee],
        collections => Object.keys(collections).map(key => collections[key]) //get the keys =>   get the value from the key
)

export const showEmployeeInfo = employeeIDtakeFromURLParams => createSelector(
        [selectEmployeeIngroup],
        info => info

)