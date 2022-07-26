import React,{useState,useRef} from "react"
import {WOQLClientObj} from '../init-woql-client'
import {Layout} from "./Layout"
import {Row,Button,Form,Col,Card,Alert} from "react-bootstrap"
export const DocumentPage = (props) => {
     const {woqlClient} = WOQLClientObj()
     if(!woqlClient) return ""
     const dataProduct = woqlClient.db()

     const [insertResult,setInsertResult] =useState('')
     const [selectResult,setSelectResult] =useState('No result')
     const [queryResult,setQueryResult] =useState('')
     const [error,setError] =useState(null)

     const createDoc = useRef(null);
     const queryDoc = useRef(null);
     const docType = useRef(null);
     const docId = useRef(null);
     const graphType =useRef(null);
     const getResult = useRef(null);
     const dbName = useRef(null)
     const replaceData= useRef(null)
     const getResultDelete = useRef(null)

     const graphTypeDelete = useRef(null);
     const docIdDelete = useRef(null);

     const queryDocument = async () =>{
        try{
            const json = JSON.parse(queryDoc.current.value)
            //console.log(json)
            let dbNameValue = dbName.current.value || undefined //"test_profile"

            if(dbNameValue==='_commits'){
                woqlClient.checkout("_commits")
                //dbNameValue='test_db'
            }
            const params ={'as_list': true}
            const result = await woqlClient.queryDocument(json,params,dbNameValue)

            setQueryResult(result)
       }catch(err){
            setError(err.message)
       }
     }

     const addDocument = async () =>{
           try{
                const json = JSON.parse(createDoc.current.value)
                //console.log(json)
                let dbNameValue = dbName.current.value || undefined //"test_profile"

                if(dbNameValue==='_commits'){
                    woqlClient.checkout("_commits")
                    dbNameValue='test_db'
                }
                const result = await woqlClient.addDocument(json,null,dbNameValue)

                setInsertResult(result)
           }catch(err){
                setError(err.message)
           }
     }

     const addSchemaDocument = async () =>{
        try{
            setError(null)
            const json = JSON.parse(createDoc.current.value)
            const dbNameValue = dbName.current.value || undefined//"test_profile"
            //createDoc.current;
            console.log("JSON______",json)
            const params={'graph_type':'schema'}
            if(replaceData.current.checked === true){
                params['full_replace'] =true;
            }

            const result = await woqlClient.addDocument(json,params,dbNameValue)
            setInsertResult(result)
        }catch(err){
            setError(err.message)
        }
    }

    const updateSchemaDocument = async (isSchema=true) =>{
        try{
            setError(null)
            const json = JSON.parse(createDoc.current.value)
            const dbNameValue = dbName.current.value || undefined//"test_profile"
            //createDoc.current;
            //console.log("JSON______",json)
            const params=isSchema ? {'graph_type':'schema'} : null
            //const params ={}

            const result = await woqlClient.updateDocument(json,params,dbNameValue)
            getResult.current.value = JSON.stringify(result,null,4)
            setInsertResult(result)
        }catch(err){
            setError(err.message)
        }
    }

    const getFrame = async () =>{
        try{
            resetResult()
            const dbNameValue = dbName.current.value || undefined//"test_profile"
            //createDoc.current;
            let type
            if(docType.current.value){
                type = docType.current.value;
            }

            const result = await woqlClient.getSchemaFrame(type,dbNameValue)
            getResult.current.value = JSON.stringify(result,null,4)
            setSelectResult(result)
        }catch(err){
            setError(err.message)
        }
    }
    function resetResult(){
        setError(null)
        getResult.current.value = ''
        setSelectResult('')
    }

     const readDocument = async () =>{
        try{
            resetResult()
            const params={}
            if(docType.current.value){
                params['type'] = docType.current.value;
            }
            if(docId.current.value){
                params['id'] =  docId.current.value;
            }
            if(graphType.current.value){
                params['graph_type'] = graphType.current.value;
            }
            if(!params['id'] && !params["type"]){

            }
            params['as_list']=true
            let dbNameValue = dbName.current.value || undefined//"test_profile"
            if(dbNameValue==='_commits'){
                woqlClient.checkout("_commits")
                dbNameValue='test_db'
            }
            const result = await woqlClient.getDocument(params,dbNameValue)

            getResult.current.value = JSON.stringify(result,null,4)
            setSelectResult(JSON.stringify(result,null,4))

        }catch(err){
            setError(err.message)
        }
     }

     const deleteDocument = async () =>{
        let dbNameValue = dbName.current.value || undefined //"test_profile"

        if(dbNameValue==='_commits'){
            woqlClient.checkout("_commits")
            dbNameValue='test_db'
        }
        const params={}
        if(docIdDelete.current.value){
            params['id'] =  docIdDelete.current.value;
        }
        if(graphTypeDelete.current.value){
            params['graph_type'] = graphTypeDelete.current.value;
        }

        const result = await woqlClient.deleteDocument(params,dbNameValue)
        getResultDelete.current.value = JSON.stringify(result,null,4)
        //setSelectResult(JSON.stringify(result,null,4))
     }

     return  <Layout sideBarContent={<div>document</div>}>
                <main role="main" className="m-4" style={{overflowY: "auto"}}>
                <div>
                {error && <Alert variant="danger">
                    {error}
                </Alert>}
                <Card className="p-4 mb-4">
                 <Card.Body className="p-4">
                 <Form.Group >
                        <Form.Label>Add a db name</Form.Label>
                        <Form.Control type="text" placeholder="db name" ref={dbName}/>
                </Form.Group>
                 </Card.Body>
                </Card>
                <Card className="p-4 mb-4">
                 <Card.Body className="p-4">
                        <Row className="mb-4">
                        <Col>
                        <Button onClick={addDocument}>Add Document to the instance graph</Button>
                        </Col>
                        <Col>
                        <Button className="btn btn-success" onClick={updateSchemaDocument}>UPDATE THE SCHEMA DOCUMENT (PUT CALL)</Button>
                        </Col>
                        <Col>
                        <Button className="btn btn-success" onClick={()=>updateSchemaDocument(false)}>UPDATE THE INSTANCE DOCUMENT (PUT CALL)</Button>
                        </Col>
                        <Col>
                        <Button className="btn btn-success" onClick={addSchemaDocument}>Add a Class to the schema graph</Button>
                        <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="REPLACE MODE" ref={replaceData}/>
                        </Form.Group>
                        </Col>
                        </Row>
                        <Form.Group controlId="formBasicEmail">
                                <Form.Label>Add a Json Document</Form.Label>
                                <textarea className="text-muted" ref={createDoc} className="form-control" rows="10">
                                </textarea>
                        </Form.Group>

                        <div className="form-group">
                                <label for="exampleFormControlTextarea1">Add Document Request Result</label>
                                <textarea readOnly  value={insertResult} className="form-control"  rows="3">
                                {insertResult}
                                </textarea>
                        </div>
                </Card.Body>
                </Card>
                <Card className="p-4 mb-4">
                        <Card.Body className="p-4">
                        <Row className="mb-4">
                        <Col>
                        <Button onClick={readDocument}>Select a Document or a Class from the schema</Button>
                        </Col>
                        <Col>
                        <Button onClick={getFrame}>Select the document frame</Button>
                        </Col>
                        </Row>
                        <Form.Group >
                                <Form.Label>Get a document or a class</Form.Label>
                                <Row>
                                <Col>
                                <Form.Control type="text" placeholder="Graph type" ref={graphType}/>
                                </Col>
                                <Col>
                                    <Form.Control type="text" placeholder="document type" ref={docType}/>
                                </Col>
                                <Col>
                                    <Form.Control type="text" placeholder="document id" ref={docId}/>
                                </Col>
                                </Row>
                        </Form.Group>
                        <div className="form-group">
                            <label for="exampleFormControlTextarea1">Get Document Result</label>
                            <textarea readOnly ref={getResult} className="form-control" id="exampleFormControlTextarea1" rows="10">
                                {selectResult}
                            </textarea>
                        </div>
                </Card.Body>
                </Card>
                <Card className="p-4 mb-4">
                        <Card.Body className="p-4">
                        <Row className="mb-4">
                        <Col>
                        <Button onClick={deleteDocument}>delete document</Button>
                        </Col>
                        </Row>
                        <Form.Group >
                                <Form.Label>DELETE A DOCUMENT IN A GRAPH</Form.Label>
                                <Row>
                                <Col>
                                <Form.Control type="text" placeholder="Graph type" ref={graphTypeDelete}/>
                                </Col>
                                <Col>
                                    <Form.Control type="text" placeholder="document id" ref={docIdDelete}/>
                                </Col>
                                </Row>
                        </Form.Group>
                        <div className="form-group">
                            <label for="exampleFormControlTextarea1">Delete Document Result</label>
                            <textarea readOnly ref={getResultDelete} className="form-control" id="exampleFormControlTextarea1" rows="10">
                                {selectResult}
                            </textarea>
                        </div>
                </Card.Body>
                </Card>
                <Card className="p-4 mb-4">
                 <Card.Body className="p-4">
                        <Row className="mb-4">
                        <Col>
                        <Button onClick={queryDocument}>RUN QUERY TO THE INSTANCE GRAPH</Button>
                        </Col>
                        </Row>
                        <Form.Group controlId="formBasicEmail">
                                <Form.Label>Add a json Query </Form.Label>
                                <textarea className="text-muted" ref={queryDoc} className="form-control" rows="10">
                                </textarea>
                        </Form.Group>

                        <div className="form-group">
                                <label for="exampleFormControlTextarea1">QUERY Document Request Result</label>
                                <textarea readOnly  value={queryResult} className="form-control"  rows="3">
                                {queryResult}
                                </textarea>
                        </div>
                </Card.Body>
                </Card>
                 </div>
                </main>
            </Layout>



}