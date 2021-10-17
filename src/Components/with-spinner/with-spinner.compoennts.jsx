import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
// WrappedComponent: HOC => return a new Compoenent/function
const withSpinner = WrappedComponent => { 
       const Spinner =  ({isLoading, ...otherProps}) => {
        return isLoading ? (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        ) : (<WrappedComponent {...otherProps} />)
}
        return Spinner
}
export default withSpinner