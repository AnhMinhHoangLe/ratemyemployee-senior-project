export const convertTheID = (arrayOFOldIDKey) => {
    const length = arrayOFOldIDKey.length
    if (length >= 1) {
        const lastIDNumber = parseInt(arrayOFOldIDKey[length-1]) + 1 
        return lastIDNumber
    }
    else {
        return 0
    }
    
}
export const checkDateInput = (endDay) => {
    endDay = new Date(endDay.replace(/-/, '/').replace(/-/, '/'))
    const createAt = new Date()
    if (endDay < createAt) {
        alert('Select another deadline day')
        return false
    }
    return true
}

