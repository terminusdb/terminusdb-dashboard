import React, { useState, useEffect } from "react"
import {FrameViewer, DiffViewer} from '@terminusdb/terminusdb-documents-ui'
import {InitObj} from "./init"
import {VIEW, CARD_OUTPUT_TITLE, CREATE} from "./constants"
import Card from 'react-bootstrap/Card'
import {SELECT_OPTIONS, ORIGINAL_LIST, CHANGED_LIST, ORIGINAL_TEST_LIST, CHANGED_TEST_LIST, ORIGINAL_DIFF_MANDATORY_DOCUMENT, CHANGED_DIFF_MANDATORY_DOCUMENT} from "./data.constants"
import Stack from 'react-bootstrap/Stack'
import {Button, Col} from "react-bootstrap"
import {FiCode} from "react-icons/fi"
import {DIFF_VIEWER, MULTI_LANGUAGE} from "./menu.constants"
import Form from 'react-bootstrap/Form'
import { getDiffViewSetSubDocumentType } from "../../src/setTypeFrames/setType.utils"



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
            if(item.label.toUpperCase().startsWith(inp.toUpperCase())) {
            //if(item.label.toUpperCase() === inp.toUpperCase()){
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

export const Diff = () => {
    
    const {
        frames,
        type,
        tdbClient,
        diffPatch, 
        setDiffPatch
	} = InitObj() 

    if(!frames) return "LOADING ..."
    if(!type) return "LOADING ..."

    useEffect(() => { 
        async function getDiffs(tdbClient) {
            let result_patch = await tdbClient.getJSONDiff(ORIGINAL_TEST_LIST, CHANGED_TEST_LIST)
            setDiffPatch(result_patch)
            console.log("result_patch", result_patch)
        }
        if(tdbClient) {
            getDiffs(tdbClient)
        }
    }, [])

    return <div className="w-100">
        {diffPatch && frames && <DiffViewer 
            oldValue={ORIGINAL_TEST_LIST} 
            newValue={CHANGED_TEST_LIST}
            frame={frames}
            type={"ComputerStudent"}
            diffPatch={diffPatch}/>}
    </div>
}

const TestTextArea = () => {
    const {
        data
    }  = InitObj()
    
    return <textarea data-cy="data-reader" 
        className="opacity-0"  
        value={JSON.stringify(data, null, 2)}>
    </textarea>
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

    if(menuItem === DIFF_VIEWER) {
        return <Diff/>
    }

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
                <FormView/>
                <TestTextArea/>
            </Card.Body>
        </Card>
    </React.Fragment>
}