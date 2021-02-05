import React from 'react';
const EmployeeInfoForm = ( {displayName, email, gender, address, avatar, phone_number } ) =>{
        return(
                <div>
                         <h1>{displayName}</h1>
                         <img src={avatar} />
                         <p>Email: {email}</p>
                         <p>Gender: {gender}</p>
                         <p>Address: {address}</p>
                         <p>Phone Number: {phone_number}</p>
                </div>
        )
}
export default EmployeeInfoForm