
import React from "react"
import {FrameViewer} from "../FrameViewer"
import * as CONST from "../constants"
import {Card, Row, Col} from "react-bootstrap"
import {generateDiffUIFrames} from "./diffViewer.utils"
import {OldValueHeader, NewValueHeader} from "./Headers"
import * as DIFFCONST from "./diff.constants"


/**
 * 
 * @param {*} frame schema frames of data product
 * @param {*} type document type
 * @param {*} oldValue old json document
 * @param {*} newValue new json document
 * @param {*} diffPatch diffPatch json object
 * @param {*} oldValueHeader Custom React Element to display in Card Header of old branch  
 * @param {*} newValueHeader Custom React Element to display in Card Header of tracking branch  
 * @returns  
 */
 export const DiffViewer = (args) => {

    let {frame, type, oldValue, newValue, diffPatch, oldValueHeader, newValueHeader}=args

    if(!frame) return <div>{"Include frames to view Diffs"}</div>
    if(!type) return <div>{"Include document type to view Diffs"}</div>
    if(!diffPatch) return <div>{"Include diff patch JSON Object to view diffs"}</div>
    if(!frame.hasOwnProperty(type)) return <div>{`Frame of type ${type} not found`}</div>

    if(diffPatch.hasOwnProperty(DIFFCONST.OPERATION) && diffPatch[DIFFCONST.OPERATION] === DIFFCONST.INSERT) {
        let uiJson = {
            classNames: "p-3 inserted"
        }
        let hideUIJson = {
            classNames: "hide__opacity p-3"
        }
        return <Row> 
            <Col md={6}>
                <Card>  
                    <Card.Header>
                        <OldValueHeader oldValueHeader={oldValueHeader}/>
                    </Card.Header>
                    <Card.Body>
                        <FrameViewer
                            frame={frame}
                            uiFrame={hideUIJson}
                            type={type}
                            formData={newValue}
                            mode={CONST.VIEW}
                            hideSubmit={true}
                        />
                    </Card.Body>
                </Card>
            </Col>
            <Col md={6}>
                <Card>
                    <Card.Header>
                        <NewValueHeader newValueHeader={newValueHeader}/>
                    </Card.Header>
                    <Card.Body>
                        <FrameViewer
                            frame={frame}
                            uiFrame={uiJson}
                            type={type}
                            formData={newValue}
                            mode={CONST.VIEW}
                            hideSubmit={true}
                        />
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    }

    if(diffPatch.hasOwnProperty(DIFFCONST.OPERATION) && diffPatch[DIFFCONST.OPERATION] === DIFFCONST.DELETE) {
        let uiJson = {
            classNames: "p-3 deleted"
        }
        let hideUIJson = {
            classNames: "hide__opacity p-3"
        }
        return <Row> 
            <Col md={6}>
                <Card>  
                    <Card.Header>
                        <OldValueHeader oldValueHeader={oldValueHeader}/>
                    </Card.Header>
                    <Card.Body>
                        <FrameViewer
                            frame={frame}
                            uiFrame={uiJson}
                            type={type}
                            formData={oldValue}
                            mode={CONST.VIEW}
                            hideSubmit={true}
                        />
                    </Card.Body>
                </Card>
            </Col>
            <Col md={6}>
                <Card>
                    <Card.Header>
                        <NewValueHeader newValueHeader={newValueHeader}/>
                    </Card.Header>
                    <Card.Body>
                        <FrameViewer
                            frame={frame}
                            type={type}
                            uiFrame={hideUIJson}
                            formData={oldValue}
                            mode={CONST.VIEW}
                            hideSubmit={true}
                        />
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    }
    
    let subFrame=frame[type]    
    let diffUIFrames=generateDiffUIFrames(frame, subFrame, type, oldValue, newValue, diffPatch)
    
    //console.log("original diffUIFrames ", diffUIFrames[DIFFCONST.ORIGINAL_UI_FRAME])
    //console.log("changed diffUIFrames ", diffUIFrames[DIFFCONST.CHANGED_UI_FRAME])

    return <Row> 
        <Col md={6}>
            <Card>  
                <Card.Header>
                    <OldValueHeader oldValueHeader={oldValueHeader}/>
                </Card.Header>
                <Card.Body> 
                    <FrameViewer
                        frame={frame}
                        uiFrame={diffUIFrames[DIFFCONST.ORIGINAL_UI_FRAME]}
                        type={type}
                        formData={oldValue}
                        mode={CONST.VIEW}
                        hideSubmit={true}
                    />
                </Card.Body>
            </Card>
        </Col>
        <Col md={6}>
            <Card>
                <Card.Header>
                    <NewValueHeader newValueHeader={newValueHeader}/>
                </Card.Header>
                <Card.Body>
                    <FrameViewer
                        frame={frame}
                        uiFrame={diffUIFrames[DIFFCONST.CHANGED_UI_FRAME]}
                        type={type}
                        formData={newValue}
                        mode={CONST.VIEW}
                        hideSubmit={true}
                    />
                </Card.Body>
            </Card>
        </Col>
   </Row>
 }