import React, {useState,useEffect,useMemo} from "react";
import { Layout } from "./Layout";
import { useOpenAI } from "../hooks/useOpenAI";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card"
import { format } from 'graphql-formatter'
import {gql} from "@apollo/client"
import { useParams, NavLink } from "react-router-dom"
import { useTDBDocuments } from "@terminusdb/terminusdb-documents-ui-template";
import {WOQLClientObj} from '../init-woql-client'
import {GraphqlEditor} from "../components/GraphqlEditor"
import 'codemirror/theme/shadowfox.css'
import CodeMirror from 'codemirror';
import 'codemirror/mode/handlebars/handlebars'
import 'codemirror/addon/display/autorefresh'
import {SiOpenai} from "react-icons/si"
import Alert from "react-bootstrap/Alert";
import Stack from "react-bootstrap/Stack";
import {SiHandlebarsdotjs} from "react-icons/si"
import {CopyButton} from "../components/utils"
import {ErrorMessageReport} from "../components/ErrorMessageReport"
import { Loading } from "../components/Loading";
import {PROGRESS_BAR_COMPONENT} from "../components/constants"

export function GraphqlHandlerbarsPage({}) {
    const {woqlClient} = WOQLClientObj()
    const {dataProduct,organization} = useParams()
    const [graphqlQuery,setGraphqlQuery] = useState(`query(){}`)
    const [handlebarsTemplate,setHandlebarTemplate] = useState()
    const [currentType,setType] = useState(false)
    const {documentTablesConfig, getGraphqlTablesConfig}  = useTDBDocuments(woqlClient)
    const [actionMessage,setActionMessage] = useState("loading....") 
    const {getPrewiew,
           resetPreviewResult,
           updateDocument,queryResultPreview,getDocumentClasses, documentClasses,
           getGraphQLSchema, hasKey , hasOpenAIKEY, graphqlSchema, error, loading, setError} = useOpenAI()

    useEffect(()=>{
        resetElement()
        setError(false)
        getGraphQLSchema()
        hasOpenAIKEY(organization)
        getGraphqlTablesConfig()
        getDocumentClasses()
    },[organization, dataProduct])

    function resetElement(){
        setGraphqlQuery(`query(){}`)
        resetPreviewResult()
        setHandlebarTemplate("")
        setType("")
    }

    const runQuery =()=>{
        getPrewiew(currentType,graphqlQuery,handlebarsTemplate)
    }
    const updateSchema=()=>{
        updateDocument(currentType,graphqlQuery,handlebarsTemplate)
    }

    const setData = (evt)=>{
        const classId = evt.target.value
        const classObj= documentClasses.find(item=>item['@id']===classId)
        if(classObj){
            if(classObj['@metadata'] && classObj['@metadata']['embedding']){
            const query = gql(`${classObj['@metadata']['embedding']['query']}`)
                setGraphqlQuery(format(query.loc.source.body))      
                setHandlebarTemplate(classObj['@metadata']['embedding']['template'])
            }else if(documentTablesConfig && documentTablesConfig.objQueryOpenAI && documentTablesConfig.objQueryOpenAI[classId]){
                setGraphqlQuery(format(documentTablesConfig.objQueryOpenAI[classId].query))
                setHandlebarTemplate("")
            }
            setType(classId)
            resetPreviewResult()
        }else{
            resetElement()
        }
    }

    const getDocumentClassesList=()=>{
        return <Form.Select aria-label="Default select example" onChange={setData}>
                <option value={""}>Select a document</option>
                    {documentClasses && documentClasses.map(item=>{
                       return  <option key={item['@id']} value={item['@id']}>{item['@id']}</option>
                    })}
                </Form.Select>
    }

    const viewresult = ()=>{
        if(error)return <ErrorMessageReport error={error} setError={setError}></ErrorMessageReport>
        if(queryResultPreview && queryResultPreview.length === 0) {
            return <Alert type="Info">There are no document of type {currentType}</Alert>
        }
        return <ListGroup >
              {queryResultPreview && queryResultPreview.map(item=>{
                    return <ListGroup.Item><pre className="preview_pre">{item}</pre></ListGroup.Item>
                })}
            </ListGroup>
    }
    
    const queryResultPreviewString = queryResultPreview ? JSON.stringify(queryResultPreview,null,4) : ""

    return <Layout  showLeftSideBar={true} mainClassName={"h-view ml-5"}>
        <Card className="h-100">
        <Card.Header>
            <Stack direction="horizontal" gap={1}>
            <div className="max-width-size">{getDocumentClassesList()}</div>    
            {loading && <div style={{width:"50%"}}>
                <Loading type={PROGRESS_BAR_COMPONENT} message={actionMessage} /></div>
            }
            {!loading  && 
            <React.Fragment>
                {hasKey && <div className="ml-4 mr-auto"><SiOpenai size={24} className="mx-3 mr-3"/>You have set your OpenAI API key, add your query and template and start to index your data</div>}
                {hasKey === false && <div className="ml-4 mr-auto">Go to <NavLink to={`/${organization}/profile`}>Profile page</NavLink> and add an OpenAi Key to your team 
                 </div>}
                <Button onClick={runQuery} className="bg-light text-dark"><SiHandlebarsdotjs className="mr-2"/>
                <small>Preview</small></Button> 
                <Button onClick={updateSchema} className="bg-light text-dark">Save</Button>
            </React.Fragment>}
            </Stack>
        </Card.Header>
      <Card.Body className="p-0">
      <Allotment horizontal>
            <Allotment.Pane > 
                <Allotment vertical> 
                {graphqlSchema && <GraphqlEditor schema={graphqlSchema} query={graphqlQuery} setValue={setGraphqlQuery}/>}
                <HandlebarsEditor setValue={setHandlebarTemplate} value={handlebarsTemplate} classId={currentType}/>  
                </Allotment>
            </Allotment.Pane>
            <Allotment.Pane >
                <Card className="h-100">
                    <Card.Header className="bg-transparent">
                        <Stack direction="horizontal" gap={1}>
                            Preview - showing only the first 10 results
                            <CopyButton text={queryResultPreviewString} title="Copy result obj" css={"ml-auto btn btn-md bg-light text-dark float-right"}/>
                         </Stack>
                    </Card.Header>
                    <Card.Body className="overflow-auto">
                        <div className="code-container">
                            {viewresult()}
                        </div>
                    </Card.Body>
                </Card>
            </Allotment.Pane>
         </Allotment> 
      </Card.Body>
    </Card>
</Layout>
}

function HandlebarsEditor( {value, setValue}){
    const [handlebarsEditor, setHandlebarsEditor ] = React.useState(null);
    const opsRef = React.useRef(null);
    
    const handleEditorBlur = (evt) =>{
        setValue(evt.doc.getValue())
    }

    useEffect(() => {
        // if the instance already exists we do not create it again
        if(handlebarsEditor)return 
        if(opsRef && opsRef.current){
            const tmpEditor = CodeMirror(opsRef.current, {
                mode: "handlebars",
                height: "auto",
                lineNumbers: true,
                theme:"shadowfox",
                autoRefresh: false,
                refresh: true,
                lineWrapping: true             
              }) 
            tmpEditor.on('blur', handleEditorBlur);  
           setHandlebarsEditor(tmpEditor)     
        }
     },[opsRef.current]);

    useEffect(() => {
         if(handlebarsEditor){
            handlebarsEditor.doc.setValue(value);
        }
    },[value])

   
    return <Card className="h-100">
        <Card.Header className="bg-transparent">
            <Stack direction="horizontal" gap={1}>
                Handlebars template
                <CopyButton text={value} title="Copy handlebars template" css={"ml-auto btn btn-md bg-light text-dark float-right"}/>
            </Stack>
        </Card.Header>
        <Card.Body className="h-100">
            <div className="h-100" ref={opsRef}></div>
        </Card.Body>
    </Card> 
}