import React, {useState} from "react"
import {FrameViewer} from '@terminusdb/terminusdb-documents-ui'
import {InitObj} from "./init"
import {VIEW, CREATE, CARD_OUTPUT_TITLE} from "./constants"
import Card from 'react-bootstrap/Card'
import Stack from 'react-bootstrap/Stack'
import Row from "react-bootstrap/Row"

// Defined list to match with searched text for Document Links 
const SELECT_OPTIONS = [
	{ value: 'Jobs/33e3013112e6e76381ee6aba23a15f686b98fc2c300b3608e6fb25f585d93d24', label: 'Designer' },
	{ value: 'Jobs/c8114bddb166325e704e368da237ed87e1c2de1dd23ae103431f974eaeefbbda', label: 'Lecturer' },
	{ value: 'Jobs/csd4bddb166325e704e3w68da237ed87e1c2de1dd23ae103431f974eaeefbbda', label: 'Writter' }
]

function handleTraverse (clicked) {
	alert(`You have clicked on ${clicked} ...`)
}

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
            if(item.label.toUpperCase().includes(inp.toUpperCase())) {
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


    return <FrameViewer
        frame={frames}
        uiFrame={uiFrames} 
        type={type}
        formData={mode !==CREATE ? data : {}}
        onSelect={<Search/>}
        //onSelect={handleSelect}
        //language={"ka"}
        mode={mode}
        hideSubmit={mode===VIEW ? true : false}
        onTraverse={handleTraverse}
        //submitButton={submitJSON}
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