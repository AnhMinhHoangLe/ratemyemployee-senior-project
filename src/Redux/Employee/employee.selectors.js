import { createSelector } from 'reselect'
const selectEmployee = state => state.employee
export const selectEmployeeGroup = createSelector(
        [selectEmployee],
        employee => employee.id
)
// export const selectGroupForPreview = CreateSelector(
//         [selectEmployee], 

// )