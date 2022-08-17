import React, {useEffect,useState} from "react"
import {Row, Badge, Col, Card,Button} from "react-bootstrap"
import {AccessControlHook} from "../hooks/AccessControlHook"
import {WOQLTable} from '@terminusdb/terminusdb-react-table'
import {getAskAccessListConfig} from "../ViewConfig"
import {RiDeleteBin7Line} from "react-icons/ri"
import {AiOutlineUserAdd} from "react-icons/ai"
import {NewMemberModal} from "./NewMemberModal"
import {Loading} from "../Loading"

export const AskToJoinList = ({team,setShow,accessControlDashboard,options}) => {  
    if(!accessControlDashboard) return ""
    const {deleteTeamRequestAccess,loading,
        getTeamRequestAccessList,teamRequestAccessList} =  AccessControlHook(accessControlDashboard,options)
    
    const teamRequestAccessListArr = Array.isArray(teamRequestAccessList) ? teamRequestAccessList : []
    const invitesCount = teamRequestAccessListArr.length 

    const [defaultEmail,setDefaultEmail] = useState(null)
    const [reqInvId,setReqInvId] = useState(null)
    const [showNewMemberModal, setShowNewMemberModal] = useState(false)

    useEffect(() => {
        updateResultTable()
    }, [team])

     const updateResultTable = async () =>{
        if(reqInvId){
            await deleteTeamRequestAccess(reqInvId)
            setReqInvId(null)
        }
        getTeamRequestAccessList(team)
    }

    const showModal = (email,invId) =>{
        setDefaultEmail(email)
        setReqInvId(invId)
        setShowNewMemberModal(true)
    }

    function getDeleteButton (cell) {
        const invFullId = cell.row.original['@id']
        const invId = invFullId.substr(invFullId.lastIndexOf("/")+1)
        const email = cell.row.original['email']
        return <React.Fragment><span className="d-flex">
            <Button variant="danger" size="sm" className="ml-5" title={`delete - ${email}`} onClick={() => deleteTeamRequestAccess(invId)}>
                <RiDeleteBin7Line/> 
            </Button>
            <Button variant="success" size="sm" className="ml-5" title={`add - ${email}`} onClick={() => showModal(email,invId)}>
                <AiOutlineUserAdd/> 
            </Button>
        </span></React.Fragment>
        
    }
    const tableConfig = getAskAccessListConfig(10, getDeleteButton)

    if(loading){
        return <Loading/>
    }

    return <React.Fragment>
         {showNewMemberModal && <NewMemberModal accessControlDashboard={accessControlDashboard} options={options} updateTable={updateResultTable}
                team={team} show={showNewMemberModal} setShow={setShowNewMemberModal} defaultEmail={defaultEmail}/>}
    
        <Row className="mr-5 ml-2">
            <Col>
            <Card className="shadow-sm m-4">
                <Card.Header className=" d-flex justify-content-between bg-transparent">
                    <h6 className="mb-0 mt-1 float-left w-100 text-muted">Total Members
                        <Badge variant="info" className="text-dark ml-3">{invitesCount}</Badge>
                    </h6>

                </Card.Header>
                <Card.Body>
                    <WOQLTable
                        result={teamRequestAccessList}
                        freewidth={true}
                        view={(tableConfig ? tableConfig.json() : {})}
                        limit={10}
                        start={0}
                        orderBy={""} 
                        loading={loading}
                        totalRows={invitesCount}
                    />
                </Card.Body>
            </Card>
         </Col>
        </Row>
    </React.Fragment>
}