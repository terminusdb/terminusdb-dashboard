import React from "react"
import {FrameViewer, DiffViewer} from '@terminusdb/terminusdb-documents-ui'
import {InitObj} from "./init"
import {VIEW, CARD_OUTPUT_TITLE, CREATE} from "./constants"
import Card from 'react-bootstrap/Card'
import {SELECT_OPTIONS, OLD_VALUE, NEW_VALUE} from "./data.constants"
import Stack from 'react-bootstrap/Stack'
import {Button, Col} from "react-bootstrap"
import {FiCode} from "react-icons/fi"
import {DIFF_VIEWER, MULTI_LANGUAGE} from "./menu.constants"
import Form from 'react-bootstrap/Form'

const FormView = () => {
    const {
        type,
        uiFrames,
        data,
        mode,
        setData,
        frames,
        language
	} = InitObj()

    if(!frames) return "LOADING ..."
    if(!type) return "LOADING ..."
    if(!mode) return "LOADING ..."
    if(mode !== CREATE && Object.keys(data).length === 0) return "LOADING ..."

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
        language={language}
        onSubmit={handleSubmit}
    />
}

export const Viewer = () => {
    const {
        menuItem
	} = InitObj()

    if(menuItem === DIFF_VIEWER) {
        return <DiffViewer 
            oldValue={OLD_VALUE} 
            newValue={NEW_VALUE}
            useDarkTheme={true}
            leftTitle={'Old Value'}
            rightTitle={'New Value'}/>
    }
    
    return <FormView/>
}


export const Output = () => {
    const {
        menuItem,
        type,
        setShowMoreInfo,
        setShowCode,
        setLanguage
	} = InitObj()

    function handleMoreInfo (e) {
        setShowCode(Date.now())
        setShowMoreInfo(true)
    }

    function handleLanguageChange(event) {
        event.preventDefault()
        event.stopPropagation()
        setLanguage(event.target.value)
    }

    let label=type
    if(!type) label=menuItem

    return <React.Fragment>
        {menuItem === MULTI_LANGUAGE && <Form>
            <Form.Group as={Col} md="12" className="tdb__input mb-3">
                <Form.Control type="text" placeholder="Enter language code" onBlur={handleLanguageChange}/>
            </Form.Group>
		</Form>}
        <Card>
            <Card.Header className="bg-light text-dark">
                <Stack direction="horizontal" gap={3}>
                    <div className="bg-light">{`${CARD_OUTPUT_TITLE} - ${label}`}</div>
                    <div className=""></div>
                    <div className="bg-light ms-auto">
                        <Button variant="primary btn btn-sm" title="View Code" onClick={handleMoreInfo}>
                            <FiCode/>
                        </Button>
                    </div>
                </Stack>
            </Card.Header>
            <Card.Body>
                <Viewer/>
            </Card.Body>
        </Card>
    </React.Fragment>
}