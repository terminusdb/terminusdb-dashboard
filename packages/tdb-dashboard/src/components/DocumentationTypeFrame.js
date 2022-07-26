import React, {useEffect, useState} from "react"
import {FaComment} from "react-icons/fa"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

export const DocumentationTypeFrame = ({documentObject, property}) => {
    const [comment, setComment]=useState(false)
    const [tempDocumentObject, setTempDocumentObject]=useState(documentObject)

   
    useEffect(() => {
        if(Object.keys(tempDocumentObject.frames).length === 0 ) return
        if(tempDocumentObject.frames &&
            tempDocumentObject.frames["@documentation"] &&
            tempDocumentObject.frames["@documentation"]["@properties"]){
            for (var key in tempDocumentObject.frames["@documentation"]["@properties"]) {
                if(key === property) {
                    setComment(tempDocumentObject.frames["@documentation"]["@properties"][key])
                }
            }
        }
    }, [tempDocumentObject])

    return <React.Fragment>
        {comment && <OverlayTrigger
            key={`${property}_comment_left`}
            placement={"left"}
            overlay={
            <Tooltip id={`tooltip-${"left"}`}>
                {comment}
            </Tooltip>
            }
        >
            <FaComment className="float-right text-muted"/>
        </OverlayTrigger>}
    </React.Fragment>
}