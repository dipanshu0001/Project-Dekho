import React, { useState, useEffect } from 'react'
import './View_detail.css'
import axios from 'axios'
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
} from "@material-tailwind/react";
function getDaysAgo(timestamp) {
    // console.log(timestamp)
    const dateObj = new Date(timestamp);
    if (isNaN(dateObj.getTime())) {
        return "Invalid timestamp format";
    } else {
        const diffMs = Date.now() - dateObj.getTime();
        // console.log(dateObj.getTime())
        // console.log(Date.now())
        // console.log(diffMs)
        const diffDays = Math.floor(diffMs / (1000* 60 * 60 * 24));
        if(diffDays===0)return 'Just few Hour ago'
        return `${diffDays} days ago`;
    }
}
function Right_comments({ Uid, comment, Timestamp }) {
    const [data, setData] = useState({});
    useEffect(() => {
        const get_user = async () => {
            try {
                const result = await axios.post("http://localhost:4000/Api/GetUser", { Uid });
                // console.log(result)
                setData(prev => ({ ...result.data.details }))
            } catch (e) {
                console.log(e.response);
            }
        }
        get_user();
        // console.log()
    }, [])
    const link=data.ProfileImage ? `${data.ProfileImage}` : `kjgkdjgjdfgh`;
    // console.log(Uid,"Uid")
    return (
       <>
         <Card color="transparent" shadow={false} className="w-full max-w-[36rem] px-10">
            <CardHeader
                color="transparent"
                floated={false}
                shadow={false}
                className="mx-0 flex items-center gap-4 pt-0 pb-8"
            >
            
                <Avatar
                    size="lg"
                    variant="circular"
                    src={data.ProfileImage}
                    alt="Profile Image"
                />
                <div className="flex w-full flex-col gap-0.5">
                    <div className="flex items-center justify-between">
                        <Typography variant="h5" color="blue-gray">
                            {data.Username}
                        </Typography>
                    </div>
                    <Typography color="blue-gray">{getDaysAgo(Timestamp)}</Typography>
                </div>
            </CardHeader>
            <CardBody className="mb-6 p-0">
                <Typography>
                    &quot;{comment}&quot;
                </Typography>
            </CardBody>
        </Card>
        <hr/>
       </>
    )
}

export default Right_comments