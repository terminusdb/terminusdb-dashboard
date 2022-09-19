
import React, {useState, useEffect} from "react"
import Stack from 'react-bootstrap/Stack'
import {FrameViewer} from "../FrameViewer"
import {VIEW, ORIGINAL_VALUE, CHANGED_VALUE} from "../constants"
import {Card} from "react-bootstrap"

/**
 * 
 * @param {json} [oldValue] - Old value 
 * @param {json} [newValue] - New value 
 * @param {boolean} [frame] - frames
 * @param {boolean} [type] - document type
 * @returns - a react diff component 
 */

export const DiffViewer = ({frame, type, oldValue, newValue, diffPatch}) => {

    if(!frame) return <div>{"Include frames to view Diffs"}</div>
    if(!type) return <div>{"Include document type to view Diffs"}</div>
    if(!diffPatch) return <div>{"Include diff patch JSON Object to view diffs"}</div>

    let originalUIFrame={}
    let changedUIFrame={}

    for(var key in diffPatch) {
        if(diffPatch[key].hasOwnProperty("@op") && 
            frame.hasOwnProperty(type) &&
            frame[type].hasOwnProperty(key)) {
                originalUIFrame[key]={
                    classNames: "text-danger  tdb__diff__original"
                }
                changedUIFrame[key]={
                    classNames: "text-success   tdb__diff__changed"
                }
            }
    }
    

    return <Stack direction="horizontal" gap={3}>
        <Card>
            <Card.Header>{ORIGINAL_VALUE}</Card.Header>
            <Card.Body>
                <FrameViewer
                    frame={frame}
                    uiFrame={originalUIFrame}
                    type={type}
                    formData={oldValue}
                    mode={VIEW}
                    hideSubmit={true}
                />
            </Card.Body>
        </Card>
        <Card>
            <Card.Header>{CHANGED_VALUE}</Card.Header>
            <Card.Body>
                <FrameViewer
                    frame={frame}
                    uiFrame={changedUIFrame}
                    type={type}
                    formData={newValue}
                    mode={VIEW}
                    hideSubmit={true}
                />
            </Card.Body>
        </Card>
   </Stack>
}