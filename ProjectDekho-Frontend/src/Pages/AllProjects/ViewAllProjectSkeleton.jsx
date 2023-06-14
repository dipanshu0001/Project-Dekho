import React from 'react'
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import './ViewAllProjectSekeleton.css'

function ViewAllProjectSkeleton() {
    return (
        <Box className="skeleton-main">
            {/* <Skeleton /> */}
            <Skeleton animation="wave" className='skeleton-box'/>
            <Skeleton animation="wave" className='skeleton-box' />
            <Skeleton animation="wave" className='skeleton-box'/>
            <Skeleton animation="wave" className='skeleton-box'/>
        </Box>
    )
}

export default ViewAllProjectSkeleton