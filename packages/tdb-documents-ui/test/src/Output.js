import React, {useState} from "react"
import {FrameViewer} from '@terminusdb/terminusdb-documents-ui'
import {InitObj} from "./init"
import {VIEW, CARD_OUTPUT_TITLE} from "./constants"
import Card from 'react-bootstrap/Card'
import Stack from 'react-bootstrap/Stack'
import Row from "react-bootstrap/Row"

const Form = ({frames}) => {
    const {
        type,
        uiFrames,
        data,
        mode,
        setData
	} = InitObj()

    //if(!frames) return "LOADING ..."
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

    /** component to display  */
    const Search = ({setSelected}) => {

        function handleClick(e){
            if(setSelected) setSelected({id: e.target.id, label: e.target.name})
        }
       
        return <>
            Search this dummy result ....
            <Row className="w-100 border" id={"ID 1"} name="first id" onClick={handleClick}>{"ID 1"}</Row>
            <Row className="w-100 border" id={"ID 2"} name="second id" onClick={handleClick}>{"ID 2"}</Row>
            <Row className="w-100 border" id={"ID 3"} name="third id" onClick={handleClick}>{"ID 3"}</Row>
        </>
    }

    /*let dummyFormData = {
        "@id": "Text/5f881b161461af1fcf2665ccefa312017e001236a4ee51e5d8b67b16786ff9b8",
        "@type": "Text",
        "works_as": ["job/9ad9d98e6d574fe46c555f34738ad6c2666a9f2bf9d4ce77d8c0f9ee3156c036"]
      }*/

    return <FrameViewer
        frame={frames}
        uiFrame={uiFrames} 
        type={type}
        formData={data}
        onSelect={<Search/>}
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