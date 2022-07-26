import React, {useState, useEffect} from "react"
import {TDBReactCollapse} from '@terminusdb-live/tdb-react-layout'
import {queryEditorRunnerHook} from '@terminusdb-live/tdb-react-components'
import {PROGRESS_BAR_COMPONENT} from './constants.js'
import {Results} from "./Results"
import {Row, Col, Card,Alert} from "react-bootstrap"
// import {QueryEditor} from "./QueryEditor"
import {WOQLClientObj} from '../init-woql-client'
import {QueryPaneTools} from "./QueryPaneTools"
import {ResultErrors} from "./Errors"
import {Loading} from "./Loading"
import {QueryPaneObj} from '../hooks/queryPaneContext'
//import {WOQLEditorControlled} from '@terminusdb-live/tdb-react-components'
import {WOQLEditor} from '@terminusdb-live/tdb-react-components'
import {makeWOQLFromString, makeWOQLIntoString} from "@terminusdb-live/tdb-react-components"
import {LANGUAGE_LIST} from './constants.js'
import {JSONLD, JS} from "./constants"

export const QueryPane = ({queryObj}) => {
    const {woqlClient} = WOQLClientObj()
    const {WOQLQueryChange} = QueryPaneObj() 

    const [size, setSize] = useState(12)
    const [needUpdate,setNeedUpdate] = useState(0)
    const [show, setShow] = useState(true);

    //save query I did not remember has it worked
    //maybe i can remove it
    const [saveQueryName, setSaveQueryName] = useState()

    const handleLanguageChange = (lang) => {
        try{
            if(lang === queryObj.editorObj.language) return
            if(lang == JS){ //js
                // this is only for the conversion
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
        }catch(err){
            //setSyntaxError(`SYNTAX ERROR: ${err.message}`)
        }
    }


    const setExpanded = (isExpanded)=>{
        queryObj.editorPanelIsOpen = isExpanded
        setNeedUpdate(Date.now())
    }
    // maybe we can remove this
    const setQpExpanded = ()=>{
        const newStatus = !queryObj.mainPanelIsOpen
        queryObj.mainPanelIsOpen = newStatus
        setNeedUpdate(Date.now())       
    }


    //move this inside the context 
    const {
        updateQuery,
        changeOrder:setOrder,
        changeLimits,//:setLimits,
        //result,
        loading,
        //totalRows : test
        } =  queryEditorRunnerHook(woqlClient, queryObj)

    const result = queryObj.resultObj ? queryObj.resultObj.result : null
    let queryError = queryObj.resultObj &&  queryObj.resultObj.error ? queryObj.resultObj.error.message : null
    const bindings = (result && result.bindings) ? result.bindings :null
    const totalRows = queryObj.resultObj ? queryObj.resultObj.totalRows : null
  
    useEffect (() => {
        if(queryObj.queryBuilderObj.isOpen) setSize(10)
        else setSize(12)
    }, [queryObj.queryBuilderObj.isOpen])
    
    const runQuery = () =>{
        updateQuery(queryObj.query,'test commit')
    }
    
    function setShowAlert(value){
        queryError = null
        queryObj.resultObj.error=null
        setNeedUpdate(Date.now())     
    }

    return <React.Fragment>
        <div className="query-pane-pallet mb-3 mt-3" >
            <Row className="w-100">
                <Col md={12}>
                   {queryError && <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>{queryError}</Alert>}
                </Col>
                {/*<Col md={10}>
                    <h1 className="h5 ml-3">
                        {name} , Explore the 
                        <strong className="brand-color ml-1 mr-1">{dataProduct} </strong>
                        data product
                    </h1>
                </Col>*/}
                {/*<Col md={2} className="d-flex justify-content-end pr-4">
                    {queryObj.mainPanelIsOpen && <TDBReactButton 
                        config={COLLAPSE_BUTTON_GROUP} 
                        onClick={() => setQpExpanded((prevExpanded) => !prevExpanded)}/>}

                    {!queryObj.mainPanelIsOpen && <TDBReactButton 
                        config={UNCOLLAPSE_BUTTON_GROUP} 
                        onClick={() => setQpExpanded((prevExpanded) => !prevExpanded)}/>}
                    </Col>*/} 
            </Row> 
            <TDBReactCollapse isExpanded={queryObj.mainPanelIsOpen}>
                <Card>
                    <Card.Header className="d-flex">
                        <QueryPaneTools queryObj={queryObj}
                            setExpanded={setExpanded} 
                            handleLanguageChange = {handleLanguageChange}
                            runQuery={runQuery}
                         />    
                    </Card.Header>
                    <Card.Body>
                        <TDBReactCollapse isExpanded={queryObj.editorPanelIsOpen}> 
                            <Row className="w-100">
                                <Col md={size}> 
                                <div className="editor-pallet">
                                <WOQLEditor
                                    editorObject={queryObj.editorObj}
                                    editable={true}
                                    theme="dark"/>
                                </div>   
                                </Col>
                                {/*queryObj.queryBuilderObj.isOpen && <Col md={12 - size}>
                                    <QueryBuilder/></Col>*/}   
                            </Row>                       
                        </TDBReactCollapse>
                        <div className="pallet mb-3 mt-4">
                         {loading && <Loading message={`Executing Query`} type={PROGRESS_BAR_COMPONENT}/>}  
                         {!loading && bindings && bindings.length>0 &&  totalRows && 
                          <Results
                            freewidth={true}
                            queryObj={queryObj}
                            woql={queryObj.editorObj.query}
                            changeLimits={changeLimits}
                            setOrder={setOrder}
                            loading={loading}
                        />}
                        {!loading && bindings && bindings.length===0 &&
                            <h4 className="text-info">No result</h4>
                        }
                         </div>              
                    </Card.Body>
                </Card>               
            </TDBReactCollapse>
        </div>
    </React.Fragment>
}
/*<WOQLEditorControlled 
languages={LANGUAGE_LIST}
startLanguage={queryObj.editorObj.language || "js"}  
setWOQLQuery={handleWOQLQueryChange} 
initcontent={queryObj.editorObj.text}
query={queryObj.editorObj.query}
editable={true}
setMainError={handleError}
showLanguageSwitcher={false} 
theme="dark"/>*/