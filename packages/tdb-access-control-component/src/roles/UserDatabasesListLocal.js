
import React, {useState,useEffect} from "react"
import {Row, Card, Col,Button} from "react-bootstrap"
import {GrUserAdmin} from "react-icons/gr"
import {WOQLTable} from '@terminusdb/terminusdb-react-table'
import {getUsersDatabaseLocalListConfig} from "../ViewConfig"
import {AccessControlHook} from "../hooks/AccessControlHook"
import {AddUserCapabilityModal} from "./AddUserCapabilityModal"
import {RiDeleteBin7Line} from "react-icons/ri"
import {RevokeCapability } from "./RevokeCapability"
import {Loading} from "../Loading"

export const UserDatabasesListLocal = ({team,selectedUser,accessControlDashboard,options,updateTable}) => {  
    const [showAdd, setShowAdd] = useState(false)
    const [selectedRow, setSelectRow] = useState(null)
    const [showDelete, setShowDelete] = useState(false)

    const selectTeamRow = selectedUser || {}

    const {getUserDatabasesRoles,
           userDatabaseList,
           loading,
           errorMessage,
           successMessage} =  AccessControlHook(accessControlDashboard)
    
    //to be review the roles list doesn't change
    const resultFormatter=(result)=>{
        if(!Array.isArray(result))return []
        const result01 = result.map(item=>{
            if(selectTeamRow.databases[item["@id"]]) {
                item.role = selectTeamRow.databases[item["@id"]]
            }         
            item.team_role=selectTeamRow.role
            return item
        })

        return result01
    }

    useEffect(() => {
        getUserDatabasesRoles(team,selectTeamRow["@id"],resultFormatter)
    }, [selectTeamRow["@id"]])


    //if not capability I create the role
    const addDatabaseRole= (currentSelected)=>{
        setSelectRow(currentSelected)
        setShowAdd(true)
    }

    async function updateAll(){
        await updateTable()
        //getUserDatabasesRoles(team,selectTeamRow["@id"],resultFormatter)
    }

    const deleteUserItem = (currentSelected)=>{
        const row = {scope:currentSelected["@id"],
                    role: currentSelected.role, 
                    user:selectedUser['@id'],
                    name:currentSelected.name,
                    type:"Database"}
        setSelectRow(row)
        setShowDelete(true)
    }

    
    function getActionDbButtons (cell) {       
        const currentSelected = cell.row.original
        //return <div></div>
        return  <span className="d-flex"> 
                {!currentSelected.role &&                        
                    <Button variant="success" size="sm"  title={`Add database user roles`} onClick={() =>addDatabaseRole(currentSelected)}>
                        <GrUserAdmin/> 
                    </Button>
                }
                {currentSelected.role &&
                    <Button variant="danger" size="sm"  title={`Revoke the database user roles`} onClick={() => deleteUserItem(currentSelected)}>              
                        <RiDeleteBin7Line/> 
                    </Button>
                }
                </span>
    }
    
    
    const databaseListConfig = getUsersDatabaseLocalListConfig(10,getActionDbButtons)
    
    if(loading){
        return  <Loading/>
    }

    const labels = selectedRow ? {
        modalTitle : <h5>Are you sure to revoke the database <span className="text-success" >{selectedRow.name}</span> roles for the user  {selectedRow.username} ?</h5>,
        buttonTitle : `Revoke  the database roles`,
        buttonLabel: "Revoke the database roles"
    } : {}

    return <React.Fragment>
                {showDelete &&  selectedRow && <RevokeCapability labels={labels}
                 showModal={showDelete} 
                 setShowModal={setShowDelete} 
                 updateTable={updateTable} 
                 revokeCapabilityObj={selectedRow} 
                 accessControlDashboard={accessControlDashboard}/>}
       
                 {showAdd &&  selectedRow && <AddUserCapabilityModal
                         showModal={showAdd} 
                         setShowModal={setShowAdd}
                         accessControlDashboard={accessControlDashboard} 
                         options={options} 
                         updateTable={updateAll}
                         resourceId={selectedRow["@id"]}
                         title={`Add Database ${selectedRow.name} Roles`}
                         defaultUser={selectTeamRow["@id"]}
                        />}
       
                {Array.isArray(userDatabaseList) && 
                     <Card className="shadow-sm m-4">
                        <h4 className="mt-3 mb-2 mr-4 ml-3">
                            <strong className="text-success">{selectTeamRow.username} </strong>-- Dataproducts Roles
                        </h4>                
                    <Card.Body>                       
                        <WOQLTable
                        result={userDatabaseList}
                        freewidth={true}
                        view={(databaseListConfig ? databaseListConfig.json() : {})}
                        limit={10}
                        start={0}
                        orderBy={""} 
                        loading={loading}
                        totalRows={userDatabaseList.length}/>
                        </Card.Body>
                    </Card>
                }
            </React.Fragment>
}
