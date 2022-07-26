import React, { useEffect } from "react"
import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion'
import 'react-accessible-accordion/dist/fancy-example.css'
import {Row, Form} from "react-bootstrap"
import {checkIfObject} from "./utils"

const DataInfo = ({val}) => {
    return <span className="mr-3"> {val}</span>
}

const ObjectInfo = ({obj}) => {
    let arr = []
    for(var key in obj){
        if(typeof obj[key] == "string") arr.push(<DataInfo val={obj[key]}/>)
        else arr.push(<Info frame={obj[key]}/>)
    }
    return <span> {arr}</span>
}

// on click of a sub frame => show information of the document 
const Info = ({frame}) => {
    let fields = []
   for(var key in frame){
        fields.push(<Row className="mb-3">
                <Form.Group className="d-flex">
                    <span className="ml-3 mr-3 text-muted fw-bold col-md-2"> 
                        {key}
                    </span>
                    <span md={4} className="mr-5">
                        {!checkIfObject(frame[key]) && <DataInfo val={frame[key]}/>}
                        {checkIfObject(frame[key]) && <ObjectInfo obj={frame[key]}/>}
                    </span>
                    
                </Form.Group>
            </Row>
        )
    }
    return <React.Fragment>
        {fields}
    </React.Fragment>
}

export const DocumentFrameAccordian = ({item}) => {

    return <AccordionItem key={item.value} uuid={item.value}>
    <AccordionItemHeading>
        <AccordionItemButton>
            {item.value}
        </AccordionItemButton>
    </AccordionItemHeading>
    <AccordionItemPanel>
        <Info frame={item.frame}/>
    </AccordionItemPanel>
</AccordionItem>
}