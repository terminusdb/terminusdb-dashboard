import React, {useEffect,useState} from "react"
import {Row, Badge, Col, Card,Button} from "react-bootstrap"
import {useAccessControl} from "../hooks/useAccessControl"
import {WOQLTable} from '@terminusdb/terminusdb-react-table'
import {getRoleListConfig} from "../ViewConfig"
import {RiDeleteBin7Line} from "react-icons/ri"
import { DeleteElementByName } from "./DeleteElementByName"
import { CreateRoleModal } from "./CreateRoleModal"
import {DELETE_ROLE} from "../utils/default"
import {Loading} from "../Loading"

export const RoleListTable = ({accessControlDashboard,options}) => {  
    if(!accessControlDashboard) return ""

    const [showDelete, setShowDelete] = useState(false)
    const [showNewRoleModal, setShowNewRoleModal] = useState(false)

    const [rowSelected, setRowSelected] = useState(false)
    const {loading,rolesList, getRolesList} =  useAccessControl(accessControlDashboard,options)    
    
    const tableListArr = Array.isArray(rolesList) ? rolesList : []

    // all the system database user
    useEffect(() => {
        updateTable()
    }, [])

    const updateTable = () =>{
        getRolesList({"Role/admin":true})
    }
    function deleteAction(cell){
        setRowSelected(cell)
        setShowDelete(true)
    }


    function getActionButtons (cell) {
        //const invFullId = cell.row.original['@id']
        const name = cell.row.original['name']
        return <React.Fragment>
                <span className="d-flex">
                <Button variant="danger" size="sm" className="ml-5" title={`delete - name`} onClick={() => deleteAction(cell.row.original)}>
                  <RiDeleteBin7Line/> 
                </Button>
                </span>
                </React.Fragment>
        
    }
    const tableConfig = getRoleListConfig(10, getActionButtons)

    if(loading){
        return  <Loading/>
    }
    

    return <React.Fragment>
        {showDelete && <DeleteElementByName 
                        updateTable={updateTable}
                        accessControlDashboard={accessControlDashboard}
                        showModal={showDelete} 
                        setShowModal={setShowDelete} 
                        elementName={rowSelected.name} 
                        elementType="Role"
                        methodName={DELETE_ROLE}/>}

        {showNewRoleModal && <CreateRoleModal options={options} 
                                           updateRolesList={updateTable}
                                           accessControlDashboard={accessControlDashboard} 
                                           show={showNewRoleModal} 
                                           setShow={setShowNewRoleModal}/>}
       
        <Row className="mr-5 ml-2">
            <Col>
            <Card className="shadow-sm m-4">
                <Card.Header className="bg-transparent">
                    <Row>
                        <Col>
                            <h6 className="mb-0 mt-1 float-left text-muted">Total Items
                                <Badge variant="info" className="text-dark ml-3">{ tableListArr.length}</Badge>
                            </h6>
                        </Col>
                        <Col >
                            <button onClick={()=>setShowNewRoleModal(true)} style={{maxWidth:"200px"}} title="Create a new Role"
                                    type="button" className="btn-new-data-product mr-1 pt-2 pb-2 pr-4 pl-4 btn btn-sm btn btn-info">
                                        {options.labels.addRole}
                            </button>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <WOQLTable
                        result={tableListArr}
                        freewidth={true}
                        view={(tableConfig ? tableConfig.json() : {})}
                        limit={10}
                        start={0}
                        orderBy={""} 
                        loading={loading}
                        totalRows={tableListArr.length}
                    />
                </Card.Body>
            </Card>
            </Col>
        </Row>
    </React.Fragment>
}