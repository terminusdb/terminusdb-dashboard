import React, {useState} from "react"
import {TDBToggleButtonGroup} from './layout/TDBToggleButtonGroup'
import {RUN_QUERY_CONFIG, COPY_QUERY_CONFIG, QUERY_BUILDER_CONFIG, SAVE_QUERY_CONFIG, ACTIONS_QUERY_BUTTON_GROUP, SAVE_QUERY_NAME_TEXT_AREA, UNCOLLAPSE_BUTTON_GROUP, COMMIT_TEXT_AREA, LANGUAGE_SWITCHER_BUTTON_GROUP, COLLAPSE_BUTTON_GROUP} from './constants.js'
import {Col, Row, Button, Modal, Form ,InputGroup} from "react-bootstrap"
import {BiChevronUp, BiChevronDown} from "react-icons/bi"
import {copyToClipboard} from "./utils"
import {QueryPaneObj} from '../hooks/QueryPanelContext'

export const QueryPaneTools = ({queryObj, setExpanded, runQuery,handleLanguageChange}) => {

    const [commitModal, setCommitModal] = useState(false)
    const [needUpdate,setNeedUpdate] = useState(0)

    const {WOQLQueryChange} = QueryPaneObj()

    // "default Commit msg"
    const handleRunQuery = (e) => {
        e.preventDefault()
        //to be review maybe
        //setViewResult(false)
        if(queryObj.editorObj.query){
            let woql = queryObj.editorObj.query
            if(woql.containsUpdate()) {
                setCommitModal(true)
            }else 
            handleRun()
            //if(updateQuery) updateQuery(woqlQuery, commitMessage)
        }
    }

    const handleRun = () => {
        if(queryObj.editorObj.query){
            runQuery()
        }
    }

    /*const handleSaveQuery = (saveQuery, setSaveQuery, saveQueryName) => { // commenting out saved query functions 
        if(saveQuery){
            let q = storeQueries(saveQuery, saveQueryName)
            if(setSaveQuery) setSaveQuery(q)
        }
    }

    const handleSaveQueryNameOnChange = (name, setSaveQueryName) => {
        if(setSaveQueryName) setSaveQueryName(name)
    }*/

   /* const handleLanguageChange = (lang) => {
        if(lang == JS){ //js
            let woql = makeWOQLFromString(queryObj.editorObj.text, JSONLD)
            let js = makeWOQLIntoString(woql, JS)
            WOQLQueryChange(queryObj.id, queryObj.editorObj.query, js, JS)
        }
        else { //json-ld
            let woql = makeWOQLFromString(queryObj.editorObj.text, JS)
            let json = makeWOQLIntoString(woql, JSONLD)
            WOQLQueryChange(queryObj.id, queryObj.editorObj.query, json, JSONLD) 
        }
        setNeedUpdate(Date.now())
    }*/


    const PopCommitModal = ({commitModal, setCommitModal}) => {

        function handleClick () {
            handleRun()
            setCommitModal(false)
        } 

        const onKeyPress  = (e) =>{
            if (e.which === 13 /* Enter */) {
                e.preventDefault()
            }
        }

        return <Modal centered size="sm" show={commitModal} onHide={(e) => setCommitModal(false)}>
        <Modal.Header>
            <Modal.Title className="h6">This query contain's an Update</Modal.Title>
            <Button variant="close" aria-label="Close" onClick={(e) => setCommitModal(false)} />
        </Modal.Header>
        <Modal.Body className="p-5">
            <h6>Enter an optional reason for update here</h6>

        <Form onKeyPress={onKeyPress}>
        <Form.Group className="mb-3">
            <InputGroup>
            <Form.Control  type="text" placeholder={COMMIT_TEXT_AREA.placeholder}/>
            </InputGroup>
        </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button className="pt-2 pb-2 pr-4 pl-4"
                {...RUN_QUERY_CONFIG} 
                onClick={(e) => handleClick()}>
                 <i className={RUN_QUERY_CONFIG.icon}/>{RUN_QUERY_CONFIG.label}   
        </Button>
        </Modal.Footer>
    </Modal>
    }

    return <React.Fragment> 
        <Row className="w-100"> 
            <Col md={10}>

                <TDBToggleButtonGroup selected={queryObj.editorObj.language} 
                type={"TOGGLE"} config={LANGUAGE_SWITCHER_BUTTON_GROUP} 
                onClick={handleLanguageChange}/>

                <Button {...COPY_QUERY_CONFIG} className={"mr-1 mb-2 m-1  btn btn-light btn-sm"} onClick={(e) => copyToClipboard(queryObj.editorObj.text)}>
                    <i className={`${COPY_QUERY_CONFIG.icon} me-2`}/>{COPY_QUERY_CONFIG.label}  
                </Button>
            </Col> 
            <Col md={2} className="d-flex justify-content-end">

                <Button className={"mr-1 mb-1 m-1 pt-2 pb-2 pr-4 pl-4"} type="submit"
                    data-cy={RUN_QUERY_CONFIG.label}
                    variant={RUN_QUERY_CONFIG.variant} title={RUN_QUERY_CONFIG.title} id={RUN_QUERY_CONFIG.id} 
                    onClick={(e)=>handleRunQuery(e)}>
                    <i className={RUN_QUERY_CONFIG.icon}/>  
                    <span className="ml-2">{RUN_QUERY_CONFIG.label}</span>
                </Button>

                <PopCommitModal commitModal={commitModal} setCommitModal={setCommitModal}/>
                {queryObj.editorPanelIsOpen && 
                    <Button onClick={(e) => setExpanded(false)} className="bg-transparent border-0 p-0 color-white" title="Hide Editor">
                        <BiChevronUp  size={32}/>
                    </Button>}
                {!queryObj.editorPanelIsOpen && 
                <Button onClick={(e) => setExpanded(true)} className="bg-transparent border-0 p-0 color-white" title="Show Editor">
                    <BiChevronDown  size={32}/>
                </Button>}

            </Col>

        </Row>     


    </React.Fragment>

    
}

 
                    
