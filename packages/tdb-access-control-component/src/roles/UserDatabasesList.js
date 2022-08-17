
import React, {useState,useEffect} from "react"
import {Row, Card, Col,Button} from "react-bootstrap"
import {GrUserAdmin} from "react-icons/gr"
import {WOQLTable} from '@terminusdb/terminusdb-react-table'
import {getUsersDatabaseListConfig} from "../ViewConfig"
import {AccessControlHook} from "../hooks/AccessControlHook"
import {ManageUserCapabilityModal} from "./ManageUserCapabilityModal"
import {formatCell} from "./formatData"
import {Loading} from "../Loading"
export const UserDatabasesList = ({team,selectedUser,accessControlDashboard,options}) => {  
    const [currentRoleToUpdate,setCurrentRoleToUpdate]=useState(null)
    const [show, setShow] = useState(false)

    const selectTeamRow = selectedUser || {}
 
    const {getUserDatabasesRoles,
          userDatabaseList,
          loading,
          errorMessage} =  AccessControlHook(accessControlDashboard)
    
    //to be review the roles list doesn't change
    useEffect(() => {
        updateResultTable()
    }, [selectTeamRow.userid])

   function updateResultTable(){
        getUserDatabasesRoles(team,selectTeamRow.userid)
   }

    const changeUserRoleForScope= (currentSelected)=>{
        setCurrentRoleToUpdate(currentSelected)
        setShow(true)
    }

    
    function getActionDbButtons (cell) {       
        const currentSelected = formatCell(cell,"DATAPRODUCT")
        return <span className="d-flex">          
            <Button variant="success" size="sm"  title={`change user roles`} onClick={() => changeUserRoleForScope(currentSelected)}>
                <GrUserAdmin/> 
            </Button>
        </span>
    }
    
    const parentRole = selectTeamRow ? selectTeamRow.role : null
    const databaseListConfig = getUsersDatabaseListConfig(10,getActionDbButtons)
    
    if(loading){
        return <Loading/>
    }

    return <React.Fragment>
                {currentRoleToUpdate && show && 
                <ManageUserCapabilityModal currentRoleToUpdate={currentRoleToUpdate}   
                    parentRole ={parentRole }   
                    showModal={show}
                    setShowModal={setShow} team={team} 
                    accessControlDashboard={accessControlDashboard} 
                    options={options}
                    updateTable ={updateResultTable}/>

                }
       
                {Array.isArray(userDatabaseList) && 
                     <Card className="shadow-sm m-4">
                     <Card.Header className=" d-flex justify-content-between bg-transparent">
                         {selectTeamRow && <Col className="d-flex align-item-center">
                            <img src={selectTeamRow.picture} 
                                alt={"Profile"}
                                className="nav__main__profile__img mr-4"
                                width="50"/> <h5 className="mb-0 mt-1 float-left text-success">{selectTeamRow.email} Dataproducts Role
                            </h5></Col>}
     
                     </Card.Header>
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
