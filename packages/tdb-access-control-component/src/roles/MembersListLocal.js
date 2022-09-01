import React, {useState,useEffect} from "react"
import {Row, Card, Col, Badge,Button} from "react-bootstrap"
import {RiDeleteBin7Line} from "react-icons/ri"
import {AiOutlineDatabase} from "react-icons/ai"
import {WOQLTable} from '@terminusdb/terminusdb-react-table'
import {getUsersListConfigLocal} from "../ViewConfig"
import {AccessControlHook} from "../hooks/AccessControlHook"
import {UserDatabasesListLocal} from "./UserDatabasesListLocal"
import {RevokeCapability } from "./RevokeCapability"
import {AddUserCapabilityModal } from "./AddUserCapabilityModal"
import {Loading} from "../Loading"

export const MembersListLocal = ({organizationInfo,currentUser,accessControlDashboard,options}) => {  
    if(!accessControlDashboard)return ""

    const [selectTeamRow,setSelectTeamRow]=useState(null)
   // const [currentRoleToUpdate,setCurrentRoleToUpdate]=useState(null)

    const [showDelete, setShowDelete] = useState(false)
    const [showAdd, setShowAdd] = useState(false)

    const [show, setShow] = useState(false)
    const roles = accessControlDashboard.getRolesList()

    const localUser = currentUser || {}
    const team = organizationInfo.name 
    const teamId = organizationInfo["@id"] 

    const {getOrgUsersLocal,orgUsers,loading,
          errorMessage,
          successMessage} =  AccessControlHook(accessControlDashboard)
    
    //to be review the roles list doesn't change
    useEffect(() => {
        updateTable()
        setSelectTeamRow(null)
        setShowDelete(null)
    }, [team])

    const updateTable =()=>{
        const tmpSelectTeamRow =selectTeamRow;
        setSelectTeamRow(null)
        getOrgUsersLocal(team).then((result)=>{
            if(tmpSelectTeamRow){
                const findRow = result.find(item=>item["@id"]===tmpSelectTeamRow["@id"])
                if(findRow){
                    setSelectTeamRow(findRow)
                }
            }
        })

    }

    const orgUserArr = Array.isArray(orgUsers) ? orgUsers : []
    let rowCount=orgUserArr.length 


    const deleteUserItem = (currentSelected)=>{
        currentSelected.user = currentSelected["@id"]
        currentSelected.name = currentSelected.username
        currentSelected.type = "User"
        setSelectTeamRow(currentSelected)
        setShowDelete(true)
    }
    
    //when I get the database list I save the user selected in the table
    const getUserDatabaseList = (currentSelected)=>{
        currentSelected.user = currentSelected["@id"]
        currentSelected.type = "User"
        currentSelected.name = currentSelected.username
        setSelectTeamRow(currentSelected)
    }
    
    //maybe an utilityfunction woqlClient
    function getActionButtons (cell) {       
        const currentSelected = cell.row.original
        return <span className="d-flex">          
            {options.interface.memberList.showDatabase && 
            <Button variant="success" size="sm"   title={`show user dataproducts role`} onClick={() => getUserDatabaseList(currentSelected)}>
                <AiOutlineDatabase/> 
            </Button>}
            {options.interface.memberList.delete &&      
            <Button variant="danger" size="sm" className="ml-5" title={`delete ${currentSelected.username}`} onClick={() => deleteUserItem(currentSelected)}>              
                <RiDeleteBin7Line/> 
            </Button>
            }
            </span>
    }

    const propsObj = {show, setShow, team:team,loading,
        errorMessage,
        successMessage}
    
    
    const tableConfig = getUsersListConfigLocal(10, getActionButtons)
    
    if(loading){
        return  <Loading/>
    }

    const labels = selectTeamRow ? {
                modalTitle : <h5>{"Are you sure to delete the User - "}<span className="text-success" >{selectTeamRow.username}</span> {`from the Team ${team}?`}</h5>,
                buttonTitle : `Remove the User from the team`,
                buttonLabel: "Remove the user from the team"
            } : {}

    return <React.Fragment>
        {showDelete && <RevokeCapability labels={labels} showModal={showDelete} setShowModal={setShowDelete} updateTable={updateTable} revokeCapabilityObj={selectTeamRow} accessControlDashboard={accessControlDashboard}/>}
        {showAdd && <AddUserCapabilityModal
                         showModal={showAdd} 
                         setShowModal={setShowAdd}
                         accessControlDashboard={accessControlDashboard} 
                         options={options} 
                         updateTable={updateTable}
                         resourceId={teamId}
                         team = {team}
                         title = {`Add User to ${team} Team`}
                        />}
        <Row className="mr-5 ml-2">
            <Col>
            <Card className="shadow-sm m-4">                
                    <h4 className="mt-3 mb-2 mr-4 ml-3"><strong className="text-success">{team}</strong> -- Team Users Roles</h4> 
                <Card.Header className="bg-transparent">                                  
                <Row>
                    <Col>
                        <h6 className="mb-0 mt-1 float-left text-muted">Total Items
                            <Badge variant="info" className="text-dark ml-3">{rowCount }</Badge>
                        </h6>
                    </Col>
                    <Col >
                        <button onClick={()=>setShowAdd(true)} style={{maxWidth:"200px"}} title="Add User to the Team"
                            type="button" className="btn-new-data-product mr-1 pt-2 pb-2 pr-4 pl-4 btn btn-sm btn btn-info">
                            Add User to {team} Team
                        </button>
                    </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <WOQLTable
                        dowloadConfig={{filename:"user_access_level.csv",headers:["email","role"], className:"btn btn-success"}}
                        result={orgUserArr}
                        freewidth={true}
                        view={(tableConfig ? tableConfig.json() : {})}
                        limit={10}
                        start={0}
                        orderBy={""} 
                        loading={loading}
                        totalRows={rowCount}
                    />
                </Card.Body>
                </Card>
                {selectTeamRow && <UserDatabasesListLocal updateTable={updateTable} team={team} selectedUser={selectTeamRow} accessControlDashboard={accessControlDashboard}/>}
            </Col>      
        </Row>
    </React.Fragment>
}