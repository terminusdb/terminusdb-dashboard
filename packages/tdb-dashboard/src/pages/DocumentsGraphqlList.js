import React, {useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {NEW_DOC,EDIT_DOC, EXAMPLES_PRODUCTS} from "../routing/constants"
import {gql} from "@apollo/client";
import { ListDocumentsComponent, useTDBDocuments } from "@terminusdb/terminusdb-documents-ui-template";
import {WOQLClientObj} from '../init-woql-client'
import {CreateChangeRequestModal} from '../components/CreateChangeRequestModal'
import { DeleteDocumentModal } from "../components/DeleteDocumentModal";
import {ErrorMessageReport} from "../components/ErrorMessageReport"

// I pass this so I'm sure it exists before loading the component
export const DocumentsGraphqlList = ({documentTablesConfig}) => {    
    const {type} = useParams()
    const {apolloClient,branch,setChangeRequestBranch,woqlClient,ref} = WOQLClientObj()
    const {deleteDocument,loading,error,setError} = useTDBDocuments(woqlClient)
    const [showCRModal, setShowCRModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal]=useState(false)
    const [tobeDeleted, setTobeDeleted] = useState(false)
  
    const navigate = useNavigate()
    
    const querystr  = documentTablesConfig.objQuery[type].query
    const query = gql`${querystr}`
    const tableConfig = documentTablesConfig.tablesColumnsConfig[type]
    const advancedSearchConfig = documentTablesConfig.advancedSearchObj[type]

    function deleteDocumentHandler(row) {
        let fullId = row['id']
        setTobeDeleted(fullId)
        // I can not change main directly
        // I can change other branches creates with create branch interface
        if(woqlClient.checkout() === "main"){
            setShowCRModal(true)
        }else setShowDeleteModal(true)
    }

    async function callDeleteDocument(){
        const delCall = await deleteDocument(tobeDeleted)
        if(delCall){
            setShowDeleteModal(false)
            setTobeDeleted(false)
        }
    }

    const onViewClick = (row) =>{
        let fullId = row['id']
        let fullIdEncode = btoa(fullId)
        navigate(fullIdEncode)
    }

    const onEditClick = (row) =>{
        let fullId = row['id']
        let fullIdEncode = btoa(fullId)
        navigate(`${fullIdEncode}/${EDIT_DOC}`)
    }

    function handleCreate(e) {
        navigate(`${NEW_DOC}`)
    }
 
    return  <React.Fragment>
            {showCRModal && 
                <CreateChangeRequestModal showModal={showCRModal}
                 type={type}  setShowModal={setShowCRModal}
                updateViewMode={setChangeRequestBranch}/>}   
            {showDeleteModal && <DeleteDocumentModal
                loading={loading}
                deleteDocument={callDeleteDocument}
                documentID={tobeDeleted}
                showDeleteModal={showDeleteModal}
                handleClose={()=>setShowDeleteModal(false)}
             /> }
             {error && <ErrorMessageReport error={error} setError={setError}/>}
           {!showDeleteModal && <ListDocumentsComponent type={type}
                commit={ref}
                gqlQuery={query} 
                apolloClient={apolloClient} 
                advancedSearchConfig={advancedSearchConfig}
                tableConfig={tableConfig}  
                onViewButtonClick={onViewClick}
                onEditButtonClick={onEditClick}
                onRowClick={onViewClick}
                onDeleteButtonClick={deleteDocumentHandler}
                onCreateButtonClick={handleCreate}/>}
            </React.Fragment> 
}
