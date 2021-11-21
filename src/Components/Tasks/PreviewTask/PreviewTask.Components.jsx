import "./PreviewTask.Styles.scss"
import React, { useState, useEffect }from 'react';
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
            <CardContent>
                <Typography component="div" sx={{display:"flex", justifyContent:"space-between"}}>
                    <Typography variant="h5" style={{ color: priority }}>{title}</Typography>
                    <Typography>
                        <DeleteOutlineIcon sx={{pr:3, color:"#869892"}}onClick={() => removeTaskOnclick()} />
                        <CheckIcon sx={{ color: "#869892" }}onClick={() => finishTaskUpdateStatus() } />
                    </Typography>
                    
                </Typography>
                <Typography variant="subtitle1">Due date: {deadline}</Typography>
                <Typography variant="subtitle1">Description: {note}</Typography>
            </CardContent>
            
        </Card >
    )
}
export default PreviewTask