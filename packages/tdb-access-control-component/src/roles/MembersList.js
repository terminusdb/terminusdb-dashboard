
import React, {useState,useEffect} from "react"
import {Row, Card, Col, Badge,Button} from "react-bootstrap"
import {RiDeleteBin7Line} from "react-icons/ri"
import {AiOutlineDatabase} from "react-icons/ai"
import {GrUserAdmin} from "react-icons/gr"
import {WOQLTable} from '@terminusdb/terminusdb-react-table'
import {getUsersListConfig,getUsersDatabaseListConfig} from "../ViewConfig"
import {useAccessControl} from "../hooks/useAccessControl"
import {ManageUserCapabilityModal} from "./ManageUserCapabilityModal"
import {formatCell} from "./formatData"
import {UserDatabasesList} from "./UserDatabasesList"
import {DeleteTeamUser} from "./DeleteTeamUser"
import { NewMemberModal } from "./NewMemberModal"
import {Loading} from "../Loading"
export const MembersList = ({team,currentUser,accessControlDashboard,options}) => {  
    if(!accessControlDashboard)return ""

    const [selectTeamRow,setSelectTeamRow]=useState(null)
    const [selectUserToDelete,setSelectUserToDelete]=useState(null)
    const [currentRoleToUpdate,setCurrentRoleToUpdate]=useState(null)

    const [showNewMemberModal, setShowNewMemberModal] = useState(false)

    const [show, setShow] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    
    const localUser = currentUser || {}
 
    const {getOrgUsers,orgUsers,
          loading,
          errorMessage} =  useAccessControl(accessControlDashboard)
    
    //to be review the roles list doesn't change
    useEffect(() => {
        updateResultTable(team)
    }, [team])


    const updateResultTable = () =>{
        getOrgUsers(team)
        setSelectUserToDelete(null)
        setSelectTeamRow(null)
    }

    const orgUserArr = Array.isArray(orgUsers) ? orgUsers : []
    let rowCount=orgUserArr.length  

    //if not capability I create the role
    const changeUserRoleForScope= (currentSelected)=>{
        setCurrentRoleToUpdate(currentSelected)
        setShow(true)
    }

    const deleteUserItem = (teamUserSelected)=>{
        setSelectUserToDelete(teamUserSelected)
        setShowDelete(true)
    }
    
    //when I get the database list I save the user selected in the table
    const getUserDatabaseList = (currentSelected)=>{
        setSelectTeamRow(currentSelected)
    }
    
    //maybe an utilityfunction woqlClient
    function getActionButtons (cell) {       
        const currentSelected = formatCell(cell,"TEAM" , team)
        if(!accessControlDashboard.isAdmin() || currentSelected.email === localUser.email )return <span className="d-flex"></span>
        return <span className="d-flex">          
            {options.interface.memberList.showDatabase && 
            <Button variant="success" size="sm"   title={`show user dataproducts role`} onClick={() => getUserDatabaseList(currentSelected)}>
                <AiOutlineDatabase/> 
            </Button>}
            {options.interface.memberList.changeRole && 
                <Button variant="success" size="sm"  className="ml-2" title={`change user roles`} onClick={() => changeUserRoleForScope(currentSelected)}>
                    <GrUserAdmin/> 
                </Button>
            }
            {options.interface.memberList.delete &&      
                <Button variant="danger" size="sm" className="ml-5" title={`delete ${currentSelected.email}`} onClick={() => deleteUserItem(currentSelected)}>              
                    <RiDeleteBin7Line/> 
                </Button>
            }
        </span>
    }

    function getPicture (cell) {
        const picture = cell.row.original["picture"] ? cell.row.original["picture"]['@value'] : undefined
        if (!picture) return ""
        return <img src={picture} 
                    alt={"Profile"}
                    className="nav__main__profile__img mr-4"
                    width="50"/>
    }
    
    
    const tableConfig = getUsersListConfig(10, getActionButtons,getPicture)
    
    if(loading){
        return  <Loading/>
    }

    return <React.Fragment>
         {showNewMemberModal && 
            <NewMemberModal accessControlDashboard={accessControlDashboard} options={options} updateTable={updateResultTable}
                team={team} show={showNewMemberModal} setShow={setShowNewMemberModal}/>
         }
        {currentRoleToUpdate && show && 
        <ManageUserCapabilityModal currentRoleToUpdate={currentRoleToUpdate} 
            showModal={show}
             setShowModal={setShow} team={team} 
             accessControlDashboard={accessControlDashboard} 
             options={options}
             updateTable ={updateResultTable}/>
        }
        {showDelete && <DeleteTeamUser 
                        team={team}
                        updateTable={updateResultTable}
                        accessControlDashboard={accessControlDashboard}
                        showModal={showDelete} 
                        setShowModal={setShowDelete} 
                        userSelected={selectUserToDelete}
                        />}
        <Row className="mr-5 ml-2">
            <Col>
            <Card className="shadow-sm m-4">
                <Card.Header className=" d-flex justify-content-between bg-transparent">
                <Row>
                    <Col>
                        <h6 className="mb-0 mt-1 float-left text-muted">Total Items
                            <Badge variant="info" className="text-dark ml-3">{rowCount}</Badge>
                        </h6>
                    </Col>

                    {options.buttons.ADD_USER_TO_THE_TEAM && <Col >
                        <button onClick={()=>setShowNewMemberModal(true)} style={{maxWidth:"200px"}} title={`Invite a mermber to ${team} team`}
                                type="button" className="btn-new-data-product mr-1 pt-2 pb-2 pr-4 pl-4 btn btn-sm btn btn-info">
                               {options.labels.inviteMember}
                        </button>
                    </Col>}
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
                {selectTeamRow && <UserDatabasesList team={team} selectedUser={selectTeamRow} accessControlDashboard={accessControlDashboard}/>}
            </Col>
        </Row>
    </React.Fragment>
}