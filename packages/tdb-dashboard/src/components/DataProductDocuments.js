import React, {useState, useEffect} from "react"
import {WOQLClientObj} from '../init-woql-client'
import {MenuItem, SubMenu} from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css' 
import {QueryPaneObj} from "../hooks/queryPaneContext"
//import {DatabaseInfoControl} from "../hooks/DatabaseInfoControl" 
import {getPropertiesOfClass, getPropertyRelation, getDocumentClasses} from '../queries/GeneralQueries'
import {Button, Badge, ButtonGroup} from "react-bootstrap"
import {BiPlus} from "react-icons/bi"
import {SearchBox} from "./SearchBox"
import {getCountOfDocumentClass} from "../queries/GeneralQueries"
import { executeQueryHook } from "../hooks/executeQueryHook"
import {CREATE_DOCUMENT, FORM_VIEW} from "./constants"
import {handleCreate} from "./documents.utils"
import {DocumentControlObj, getDocumentFrame} from '../hooks/DocumentControlContext'
import {Loading} from "./Loading"

export const DataProductDocuments = () => {
    const {
        woqlClient, 
        documentClasses,
        saveSidebarState,
        sidebarStateObj,
    } = WOQLClientObj()
    
    if(!woqlClient) return ""
    //you can  get the current dataproduct from the url or from woqlclient
    const dataProduct = woqlClient.db()
    const {addQueryPane} = QueryPaneObj()
   
    const [query, setQuery]=useState(false)
    var [dataProvider]=executeQueryHook(woqlClient, query)

 
    // search docs constant
    const [searchDocument, setSearchDocument]=useState(false)

    const [property, setProperty]= useState(false)
    const [propertyButtons, setPropertyButtons] = useState(false)

    useEffect(() => {
        if(property){
            let props=[]
            for(var key in property) {
                if(key=="parent_class") continue
                if(key=="@key") continue
                props.push(key)
            }
            setPropertyButtons(props)
        }
    }, [property])


    async function handleClassClick (id) {
        
        try{
            let db=woqlClient.db()
            const result = await woqlClient.getSchemaFrame(id, db)
            result.parent_className=id
            setProperty(result)
        }catch(err){
            let message=`Error in fetching frames of class ${id} : ${err}`
            console.log(message)
        }  
    }

    function handlePropertyClick (property) {
        let q = getPropertyRelation(property, dataProduct, woqlClient)
        //queryObj.editorObj.text = q
        addQueryPane(q)
    } 

    useEffect(() => { // get count of document classes
        if(!documentClasses) return 
        console.log(" i enter here ")
        let q=getCountOfDocumentClass(documentClasses)
        setQuery(q)
    }, [documentClasses])

    // get count of document class to display in badge 
    const GetCountBadge = ({id, dataProvider}) => {
        var val
        for (var doc in dataProvider[0]) { 
            if(doc == id) val = dataProvider[0][doc]["@value"]
        }
        return <Badge title={`${val} ${id} available`}
            className="ml-3 cursor-auto text-gray" 
            variant="dark">{val}</Badge>
    }

    const DocumentMenu = ({item, handleClassClick}) => {
        return <MenuItem id={item["@id"]} icon={false} className="sub-menu-title">
            <Button className="pro-item-content btn-sm" 
                variant="dark" 
                title={`View documents of type ${item["@id"]}`}
                onClick={(e) => handleClassClick(item["@id"])}>
                
                <span className="text-gray">{item["@id"]}</span>
                {dataProvider && <GetCountBadge id={item["@id"]} dataProvider={dataProvider}/>}
 
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
                return <React.Fragment>
                    <DocumentMenu item={item} handleClassClick={handleClassClick}/>
                    {propertyButtons && property.parent_className==item["@id"]  && <div className="ml-3">
                        {propertyButtons.map(props => {
                            return <Button className="btn btn-sm m-1 text-light" 
                            onClick={(e) => handlePropertyClick(props)}
                            variant="outline-secondary">{props}</Button>
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

export const DocumentExplorerDocuments = () => {  

    const {
        saveSidebarState,
        sidebarStateObj, 
        documentClasses
    } = WOQLClientObj()

    //console.log("documentClasses", documentClasses)
    const {
        setDocumentObject,
        documentObject,
        actionControl
    } = DocumentControlObj()

    // on select of a class
    function handleClassClick (id) {
        let docObj = {
            type: id,
            action: false,
            view: documentObject.view,
            submit: false,
            currentDocument: false,
            frames: {},
            filledFrame: {},
            message: false,
            loading: false,
            update:false
        }
        setDocumentObject(docObj)
    } 

    const [loading, setLoading]=useState(false)

    useEffect(() => {
        if(documentClasses) {
            setLoading(false)
        }
    }, [documentClasses])

    // search docs constant
    const [searchDocument, setSearchDocument]=useState(false)
    //access control disable button if info reader role
    const [disabled, setDisabled]=useState(false)

    useEffect(() => {
        // disable document clicks if role - info reader
        if(!actionControl.write && !actionControl.read) setDisabled(true)
    })

    const DocumentMenu = ({item}) => { 
        return <MenuItem id={item["@id"]} icon={false} className="sub-menu-title">
            <ButtonGroup>
                <Button className="pro-item-content btn-sm" 
                    variant="dark" 
                    title={`View documents of type ${item["@id"]}`}
                    onClick={(e) => handleClassClick(item["@id"])}
                    disabled={disabled}>
                        <span className="text-gray">{item["@id"]}</span>
                </Button>
                {actionControl.write && <Button 
                    className="btn-create-document pro-item-content btn-sm" 
                    variant="dark" 
                    title={`Add a new ${item["@id"]}`}
                    onClick={(e) => handleCreate(item["@id"], documentObject, setDocumentObject)}
                > 
                        <Badge variant="dark">
                            <BiPlus style={{fontSize: "14px"}} color="#fff" />
                        </Badge>
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

        {documentClasses.length==0 && <div/>}

        {documentClasses.length>0 && documentClasses.map((item,index) => {
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

