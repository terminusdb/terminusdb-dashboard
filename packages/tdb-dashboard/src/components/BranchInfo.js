import React, {useState, useEffect} from "react"
import {Button, Modal} from "react-bootstrap"
import {SWITCH_TO_BRANCH} from "./constants"
import {BranchActions} from "./BranchActions"
import {CommitLogs} from "./CommitLogs"
import {WOQLClientObj} from '../init-woql-client' 
 
export const BranchInfoModal = ({showDefault, handleClose, handleSwitch, setSelectedCommit, selectedCommit,showDefaultForm, updateTable}) => {
    const {woqlClient, branch, branchNeedReload} = WOQLClientObj()
    const [refresh, setRefresh] = useState(0)

    function handleSwitchToBranch () {
        if(handleSwitch) handleSwitch(branch)
        if(handleClose) handleClose()
    } 

    const CommitInfo = () => {
        return <CommitLogs woqlClient={woqlClient} branch={branch} refresh={refresh} setSelectedCommit={setSelectedCommit}/>
    } 

    return <Modal size="xl" as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
        <Modal.Header>
            <Modal.Title className="h6">Switched to branch - <strong className="text-info"> {branch} </strong></Modal.Title>
            <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body className="p-5">
            <BranchActions updateTable={updateTable} branchNeedReload={branchNeedReload} showDefaultForm={showDefaultForm} branch={branch} handleClose={handleClose} woqlClient={woqlClient} setRefresh={setRefresh}/>
            <hr className="my-3 border-indigo dropdown-divider" role="separator"></hr>
            <CommitInfo/>
    
        </Modal.Body>
        <Modal.Footer>
            <Button variant="info" onClick={handleSwitchToBranch}>
                {SWITCH_TO_BRANCH + branch}
            </Button>
       
        </Modal.Footer>
    </Modal>
}