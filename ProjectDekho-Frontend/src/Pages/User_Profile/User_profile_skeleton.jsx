import React from 'react'
import './User_profile.css'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
// import { Paper } from "@material-ui/core";
function User_profile_skeleton() {
    return (
        <Stack className="user-outer" >
            {/* <Skeleton className="user-main" style={{Width:"300px"}}> */}
                <Skeleton className="user-details">
                    <Skeleton size="xxl" style={{ borderRadius: "50%" }} className='user-image' />
                    <Skeleton style={{width:"300px"}}>

                    </Skeleton>
                    <Skeleton className='user-info'>
                    sfsdfsdf
                    </Skeleton>
                </Skeleton>
                <Stack className="user-buttons" style={{width:"100%"}}>
                    <Skeleton style={{width:"100px" ,height:"50px"}} />
                        {/* <Skeleton >fsdf</Skeleton> */}
                    <Skeleton  style={{width:"100px",height:"50px"}} />
                        {/* <Skeleton></Skeleton> */}
                </Stack>
                <Skeleton className="user-following">
                    <center><b>Following</b></center>
                    {
                        [...Array(5)].map((_, i) => (
                            <Skeleton className="flex flex-col gap-6" key={i}>
                                <Skeleton className="flex items-center gap-4">
                                    {/* <Avatar alt="avatar" /> */}
                                    <Skeleton size="s" variant="rounded" />
                                    <Skeleton>
                                        <a href="#" style={{ textDecoration: "none", color: 'black' }}>
                                            <Skeleton variant="h6">sdfsdfsd</Skeleton>
                                        </a>
                                    </Skeleton>
                                </Skeleton>
                            </Skeleton>
                        ))
                    }
                </Skeleton>
            {/* </Skeleton> */}
        </Stack>
    )
}

export default User_profile_skeleton