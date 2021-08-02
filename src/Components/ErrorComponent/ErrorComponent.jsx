import React from 'react'
const ErrorComponent = ({statusError}) => {
    return (
        <div className='align-middle'>
            {statusError}
        </div>
    )
}
export default ErrorComponent