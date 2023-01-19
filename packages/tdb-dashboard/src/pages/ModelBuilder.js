import React,{useEffect,useState} from "react"
import {modelCallServerHook, GraphObjectProvider, ViewBuilder} from "@terminusdb-live/tdb-react-components"
import {Tabs, Tab,Alert} from "react-bootstrap"
import {SCHEMA_MODEL_VIEW, SCHEMA_CLASSES_VIEW, SCHEMA_PROPERTIES_VIEW, SCHEMA_EDITOR_VIEW, GRAPH_TAB, JSON_TAB} from "./constants"
import {WOQLClientObj} from '../init-woql-client'
import {Loading} from "../components/Loading" 
import {PROGRESS_BAR_COMPONENT}  from "../components/constants"
import {JSONModelBuilder} from "../components/JSONModelBuilder"

export const ModelBuilder = (props) =>{
    const {woqlClient,branch,ref,accessControlDashboard, currentChangeRequest} = WOQLClientObj()
    if(!woqlClient) return ""
    const dataProduct = woqlClient.db()

    const [width, setWidth] = useState("")
    const [schemaView, setSchemaView] = useState(SCHEMA_MODEL_VIEW)

    const [tab, setTab]=useState(GRAPH_TAB)
    //I check if the user is in view mode or edit mode
    let isEditMode = accessControlDashboard && accessControlDashboard.schemaWrite() || false

    // isEditMode = currentChangeRequest ? false : isEditMode

    const saveData=async (jsonObj, commitMessage)=>{
        await saveGraphChanges(jsonObj, commitMessage)
    }

    const {mainGraphDataProvider,
        saveGraphChanges,
        reportMessage,
        setReport,
        callServerLoading,
    } = modelCallServerHook(woqlClient, branch, ref,dataProduct)



    if(!dataProduct) return <div>error in loading graph</div>

    return <React.Fragment>
        {reportMessage && <Alert className ="mt-3" variant="danger" dismissible onClose={() => setReport(false)}>
                          <Alert.Heading>{reportMessage.message.title}</Alert.Heading>

                        <p>{reportMessage.message.text}</p>
                    </Alert>}
       {/* <SplitPane split="horizontal" >
        <div>*/}
         {dataProduct &&  
         <GraphObjectProvider currentChangeRequest={currentChangeRequest} setError={setReport} mainGraphDataProvider={mainGraphDataProvider} dbName={dataProduct}>
           <Tabs defaultActiveKey={GRAPH_TAB} id="model-builder-tab" className="mt-3" onSelect={(k) => setTab(k)} >                 
                {<Tab eventKey={GRAPH_TAB} title="Graph View">
                    {/*callServerLoading && <Loading message={`Fetching schema of ${dataProduct}...`} type={PROGRESS_BAR_COMPONENT}/>*/}    
                    {callServerLoading &&  <Loading message={`Fetching schema of ${dataProduct}...`}/>}                  
                                   
                    {!callServerLoading &&  tab === GRAPH_TAB  && 
                        <ViewBuilder 
                            dbName={dataProduct} 
                            custom={true}
                            saveGraph={saveData}
                            isEditMode={isEditMode}
                        />                  
                    }
                </Tab>}
                <Tab eventKey={JSON_TAB} title="JSON View">
                    {callServerLoading &&  <Loading message={`Fetching schema of ${dataProduct}...`}/>}                   
                                                    
                    {!callServerLoading && dataProduct && 
                        <JSONModelBuilder accessControlEditMode={isEditMode} tab={tab} saveGraph={saveData} />
                    }
                </Tab>
           
        </Tabs>
        </GraphObjectProvider>
        }
      {/*<StatusReporting></StatusReporting>
      </SplitPane>*/}

    </React.Fragment>

}

//maybe we don't need this

/*
 {(schemaView == SCHEMA_CLASSES_VIEW) &&  <Row>
                    <ClassesTab woqlClient={woqlClient} dataProduct={dataProduct}/>
                </Row>
            }
            {(schemaView == SCHEMA_PROPERTIES_VIEW) && <Row>
                <PropertiesTab woqlClient={woqlClient} graph={"schema"}/>
            </Row>}*/