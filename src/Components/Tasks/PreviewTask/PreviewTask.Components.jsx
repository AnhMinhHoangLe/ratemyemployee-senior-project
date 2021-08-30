import "./PreviewTask.Styles.scss"
import React from 'react';
const PreviewTask = ({ note, title, deadline, priority, ...otherSectionProps }) => {
    return (
        <div className="rounded-lg p-4 w-96 text-gray-700 border-r-8 shadow-lg m-11 bg-white" style={{ borderColor: priority, }} >
            <div className="flex justify-between" >
                <h1 style={{ color: priority }} className="text-2xl">{title}</h1>
                <span>{deadline}</span>
            </div>
            <div style={{ borderColor: priority, }} className="border-b-2"></div>
            <div>
                {note}
            </div>
        </div >
    )
}
export default PreviewTask