import React, {useState, useEffect} from "react"
import {WOQLClientObj} from '../init-woql-client'
import {MenuItem, SubMenu} from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css' 
import {QueryPaneObj} from "../hooks/QueryPanelContext"
import {getPropertyRelation} from '../queries/GeneralQueries'
import {Button, Badge, ButtonGroup} from "react-bootstrap"
import {BiPlus} from "react-icons/bi"
import {SearchBox} from "./SearchBox"
import {useTDBDocuments} from "@terminusdb/terminusdb-documents-ui-template"
import {Loading} from "./Loading"
import {NEW_DOC} from "../routing/constants"
import {useParams, useNavigate} from "react-router-dom"

export const DataProductDocuments = () => {
    const {dataProduct} = useParams()
    const {
        woqlClient, 
        saveSidebarState,
        sidebarStateObj,
        currentChangeRequest
    } = WOQLClientObj()
    
    if(!woqlClient) return ""

    //maybe I have to update the count when enter here well see
    const {addQueryPane} = QueryPaneObj()
    const  {getDocumentNumbers,perDocumentCount:dataProvider, documentClasses,frames,getDocumentFrames} = 
    useTDBDocuments(woqlClient)
 
    // search docs constant
    const [searchDocument, setSearchDocument]=useState(false)
    const [selectedClass, setSelectedClass] = useState(false)

    // I call ones
    useEffect(() => {
        getDocumentNumbers()
        getDocumentFrames()
    },[dataProduct])

    function handlePropertyClick (property,docName) {
    
        let q = getPropertyRelation(property, docName, woqlClient)
        //queryObj.editorObj.text = q
        addQueryPane(q)
    } 

    const DocumentMenu = ({item, handleClassClick}) => { 
        const docName = item["@id"]
        const docCount = dataProvider[docName] ? dataProvider[docName]["@value"] : 0
        return <MenuItem id={item["@id"]} icon={false} className="sub-menu-title">
            <Button className="pro-item-content btn-sm" 
                variant="dark" 
                title={`View documents of type ${item["@id"]}`}
                onClick={(e) => handleClassClick(item["@id"])}>             
                <span className="text-gray">{docName}</span>
                {dataProvider && <Badge title={`${docCount} ${docName} available`} 
                className="ml-3 cursor-auto text-gray" bg="secondary">{docCount}</Badge>}
            </Button>
        </MenuItem>
    }

    return <SubMenu title={"Document Types"}  
                className="menu-title"
                defaultOpen={sidebarStateObj.sidebarSampleQueriesState}
                onOpenChange={(e) => saveSidebarState("sidebarSampleQueriesState", e)}>
            <SearchBox placeholder={"Search for a Document Class"} onChange={setSearchDocument}/>
            {Array.isArray(documentClasses) && documentClasses.map(item => {
                    if(!searchDocument) {
                        return <React.Fragment key={item["@id"] }>
                            <DocumentMenu item={item} handleClassClick={setSelectedClass}/>
                            {selectedClass && selectedClass==item["@id"]  && frames && frames[item["@id"]] && 
                            <div className="ml-3">
                                {Object.keys(frames[item["@id"]]).map(props => {
                                    if(props === "@type") props = "rdf:type"
                                    if(props.indexOf("@") === -1){
                                        return <Button key={props} className="btn btn-sm m-1 text-light" 
                                        onClick={(e) => handlePropertyClick(props,item["@id"])}
                                        variant="outline-secondary">{props}</Button>
                                    }
                                })}
                            </div>
                            }
                        </React.Fragment>
                    }
                    if(searchDocument && (item["@id"].toUpperCase().includes(searchDocument.toUpperCase()))) {
                        return <DocumentMenu item={item} handleClassClick={handleClassClick}/>
                    }
                })
                }    
    </SubMenu>
}
// side bar document

export const DocumentExplorerDocuments= () => {  
    const {dataProduct} = useParams()
    const {
        saveSidebarState,
        woqlClient,
        sidebarStateObj,
        accessControlDashboard
    } = WOQLClientObj()

    //console.log("documentClasses", documentClasses)
    const {
        documentClasses,
        loading,
        getDocumentClasses
    } = useTDBDocuments(woqlClient)

    // search docs constant
    const [searchDocument, setSearchDocument]=useState(false)
    //access control disable button if info reader role
    const [disabled, setDisabled]=useState(false)
    
    useEffect(() => {
        if(!accessControlDashboard || ( !accessControlDashboard.instanceRead() && !accessControlDashboard.instanceWrite())) setDisabled(true)
        getDocumentClasses()   
    }, [dataProduct])


    const DocumentMenu = ({item}) => { 

        const navigate = useNavigate() 

        // on click of Create mew document 
        function newDocHandler (docType){
            navigate(`${docType}/${NEW_DOC}`) 
        }

        // on click of View document lists
        function handleDocumentClick(docType) {
            navigate(`${docType}`)
        } 

        return <MenuItem id={item["@id"]} icon={false} className="sub-menu-title">
            <ButtonGroup>
                <Button className="pro-item-content btn-sm" 
                    variant="dark" 
                    title={`View documents of type ${item["@id"]}`}
                    onClick={(e) => handleDocumentClick(item["@id"])}
                    disabled={disabled}>
                        <span className="text-gray">{item["@id"]}</span>
                </Button>
                {!disabled && <Button 
                    className="btn-create-document pro-item-content btn-sm bg-secondary" 
                    variant="dark" 
                    title={`Add a new ${item["@id"]}`}
                    onClick={(e) => newDocHandler(item["@id"])}
                > 
                    <BiPlus style={{fontSize: "14px"}} color="#fff" />
                </Button>}
            </ButtonGroup>
        </MenuItem>
    }

    if(loading) return <Loading message={"Fetching document Classes ..."}/>

    return <SubMenu title={"Document Types"}
        className="menu-title"
        defaultOpen={sidebarStateObj.sidebarDocumentListState}
        onOpenChange={(e) => saveSidebarState("sidebarDocumentListState",e)}>
        
        <SearchBox placeholder={"Search for a Document Class"} onChange={setSearchDocument}/>

        {documentClasses && documentClasses.length==0 && <div/>}
            
        {documentClasses && documentClasses.length>0 && documentClasses.map((item,index) => {
            if (item["@type"] == "Class") {
                if(!searchDocument) {
                    return <DocumentMenu item={item} key={`element__${index}`}/>
                }
                if(searchDocument && (item["@id"].toUpperCase().includes(searchDocument.toUpperCase()))) {
                    return <DocumentMenu  item={item} key={`element__${index}`}/>
                }
            }
        })}
    </SubMenu>
}

