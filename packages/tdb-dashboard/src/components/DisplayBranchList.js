
import React from "react"
import {Card, Row, Badge, Button, ListGroup, Col} from 'react-bootstrap'
import {FiMoreHorizontal} from "react-icons/fi"
import {RiDeleteBin7Line} from "react-icons/ri"
import {timeConverter} from "../pages/utils"
import { CREATE_NEW_BRANCH_BUTTON} from "./constants"
import {AiOutlineClose, AiOutlinePlus} from "react-icons/ai"
import { NEW_BRANCH_BUTTON_ID, SWITCH_BRANCH_ID } from "../cypress.constants"

const BranchItem = (props) => {
    const { name, head, timestamp, branch, branches, setShowDefault, handleSwitch, handleDelete, handleBranchClick} = props
    const id=name
    function handleOnClick (id) {
        if(handleBranchClick) handleBranchClick(id)
        //setSelectedCommit(false)
        handleSwitch(id)
    }

    function handleDetails (id) {
        setShowDefault(true)
        handleSwitch(id)
    }

    const disabled = id === 'main' ? {opacity:0} : {onClick:(e) => handleDelete(id)}
    const timeValue = timestamp ? timeConverter(timestamp*1000) : ''
    return (
      <ListGroup.Item className="px-0">
        <Row className="align-items-center">
          <Col className="ms--2">
                {(id == branch) && <h5 className="fw-bold text-success">{id}</h5>}
                {(id !== branch) && <h6>{id}</h6>}
          </Col>
          <Col className="ms--2">
            <h6><span className="text-muted"> {`Head Commit `} </span>{head}</h6>
          </Col>
          <Col className="ms--2">
            <h6><span className="text-muted"> {`Updated on `} </span>{timeValue}</h6>
          </Col>
          <Col className="col-auto">
            <span  title={`delete branch ${id}`} >
                <RiDeleteBin7Line className="mr-2 mb-1 react-icons danger" {...disabled}/>
            </span>
          </Col>
          <Col className="col-auto">
            <span data-cy={`${SWITCH_BRANCH_ID}__${id}`} title={`View Commit Logs and preform actions on a branch ${id}`}>
                <FiMoreHorizontal className="mr-2 mb-1 react-icons info" onClick={(e) => handleDetails(id)}/> 
            </span>
          </Col>
        </Row>
      </ListGroup.Item>
    ) 
}

  const List = ({branchList, branch, setShowDefault, handleSwitch, handleBranchClick, handleDelete}) => {
      let lst = []
      for (var key in branchList) {
          let item = branchList[key]
          lst.push(<BranchItem branch={branch} 
                               handleBranchClick={handleBranchClick} 
                               handleSwitch={handleSwitch} 
                               handleDelete={handleDelete} 
                               setShowDefault={setShowDefault} key={`team-member-${item.id}`} {...item} />)
    }
    return lst
} 


export const DisplayBranchList = ({branchCount, branchList, branch, setShowDefault, reportAlert, handleSwitch, handleDelete, handleBranchClick, setDataProductSettings, setNewBranch}) => {

    return <React.Fragment> 
       <Row>
           {reportAlert && <div className="col-md-12 d-grid pb-3">
               {reportAlert}
           </div>}
       </Row> 

       <hr className="my-3 border-indigo dropdown-divider" role="separator"></hr>
       <Card className="shadow-sm">
           <Card.Header className=" d-flex justify-content-between bg-transparent">
               <h6 className="mb-0 mt-1 float-left w-100">Branches 
                   {branchCount && <Badge variant="info" className="text-dark ml-3">{branchCount}</Badge>}
               </h6>
               <span className="w-100 text-right">
                    <Button id="home_open_create_new_branch_modal"
                        data-cy={NEW_BRANCH_BUTTON_ID}  
                        variant="info" className="mr-3 btn btn-sm" title={CREATE_NEW_BRANCH_BUTTON.title} onClick={(e) => setNewBranch(true)}>
                        <AiOutlinePlus className="me-2 "/>{CREATE_NEW_BRANCH_BUTTON.label}
                    </Button>
                    <Button variant="light" className="btn btn-sm text-dark btn-outline border-1 rounded" title={"Close Branch List"}  onClick={(e) => setDataProductSettings(false)}>
                        <AiOutlineClose/>
                    </Button>
                </span>
           </Card.Header>
           <Card.Body>
               <ListGroup className="list-group-flush list my--3">
                   <List branchList={branchList} branch={branch} setShowDefault={setShowDefault} handleDelete={handleDelete} handleSwitch={handleSwitch} handleBranchClick={handleBranchClick}/>
               </ListGroup>
           </Card.Body>
       </Card>
    </React.Fragment>
 }