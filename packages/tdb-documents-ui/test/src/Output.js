import React from "react"
import {FrameViewer} from '@terminusdb/terminusdb-documents-ui'
import {InitObj} from "./init"
import {VIEW, CARD_OUTPUT_TITLE} from "./constants"
import Card from 'react-bootstrap/Card'
import Stack from 'react-bootstrap/Stack'


const Form = ({frames}) => {
    const {
        type,
        uiFrames,
        data,
        mode,
        setData
	} = InitObj()

    if(!frames) return "LOADING ..."
    if(!type) return "LOADING ..."

    function handleSubmit (data) {
        setData(data)
    }

    function handleSelect(inp) {
        let options=SELECT_OPTIONS, matched=[]
        options.map(item => {
            if(item.value.toUpperCase() === inp.toUpperCase()){
                matched.push(item)
            }
        })
        return matched
    }

    return <FrameViewer
        frame={frames}
        uiFrame={uiFrames} 
        type={type}
        formData={data}
        onSelect={handleSelect}
        mode={mode}
        hideSubmit={mode===VIEW ? true : false}
        //onTraverse={handleTraverse}
        //submitButton={submitJSON}
        //language={"ka"}
        onSubmit={handleSubmit}
    />
}


export const Output = () => {
    const {
        type,
        frames
	} = InitObj()

    return <Card>
        <Card.Header className="bg-light text-dark">
            <Stack direction="horizontal" gap={3}>
                <div className="bg-light">{`${CARD_OUTPUT_TITLE} - ${type}`}</div>
            </Stack>
        </Card.Header>
        <Card.Body>
            <Form frames={frames}/>
        </Card.Body>
    </Card>
}