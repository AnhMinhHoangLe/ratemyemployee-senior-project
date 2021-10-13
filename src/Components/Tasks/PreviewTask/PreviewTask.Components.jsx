import "./PreviewTask.Styles.scss"
import React, { useState, useEffect }from 'react';
import CustomButton from "../../CustomButton/CustomButton.component"
import {removeTask, taskFinished} from "../../../Firebase/firebase.utils.js"
import {  Typography,Card, Box } from "@mui/material"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckIcon from '@mui/icons-material/Check';
import CardContent from '@mui/material/CardContent';

const PreviewTask = ({ note, title, deadline, priority, idGroup, id, ...otherSectionProps }) => {
    const removeTaskOnclick = () => {
        removeTask(idGroup,id)
    }
    const finishTaskUpdateStatus = () => {
        taskFinished(idGroup,id)
    }
    
    return (
        <Card sx={{width: "100%", p:3, borderRadius:"10px", borderRight: 10, borderColor:priority }}>
            {/* <div style={{ borderColor: priority, }} className="border-b-2"></div> */}
            <CardContent>
                <Typography component="div" sx={{display:"flex", justifyContent:"space-between"}}>
                    <Typography variant="h5" style={{ color: priority }}>{title}</Typography>
                    <Typography>
                        <DeleteOutlineIcon onClick={() => removeTaskOnclick()} />
                        <CheckIcon onClick={() => finishTaskUpdateStatus() } />
                    </Typography>
                    
                </Typography>
                <Typography variant="subtitle1">Due date: {deadline}</Typography>
                <Typography variant="subtitle1">Description: {note}</Typography>
            </CardContent>
            
        </Card >
    )
}
export default PreviewTask