import React, {useState, useEffect} from "react"
import {TDBReactButton} from '@terminusdb-live/tdb-react-layout'
import {CREATE_NEW_BRANCH_BUTTON, newBranchForm, TERMINUS_DANGER} from "./constants"
import {Form, Button, Modal} from "react-bootstrap"
import {Loading} from "./Loading"
import {PROGRESS_BAR_COMPONENT} from "./constants"
import {Alerts} from "./Alerts"
import {TERMINUS_WARNING} from "./constants"
import {legalURLID} from "./utils"
import {WOQLClientObj} from '../init-woql-client'
import {FaPlus} from "react-icons/fa"
import {singleSelectStyle} from "./constants"
import Select from 'react-select'

export const NewBranchModal = ({newBranch, onCancel, createBranch, loading}) => {
    const {branches, branch, ref}=WOQLClientObj()

    const [id, setID]=useState(false)
    const [select, setSelect]=useState(newBranchForm.select.head)
    const [reportAlert, setReportAlert]=useState(false)

    function handleCreate (e) {
        event.preventDefault()
        if (checkSubmission(id, branches, setReportAlert)) {
            createBranch({id: id, branchType: select})
        }
    }

    function handleOnBlur (e) {
        setReportAlert(false)
        setID(e.target.value)
    }

    function handleOnChange (val) {
        setSelect(val.value)
    }
  


    return  <Modal size="lg" className="modal-dialog-right" show={newBranch} onHide={(e) => onCancel(false)}>
        {loading && <Loading message={`Creating ${id} ...`} type={PROGRESS_BAR_COMPONENT}/>}
        <Modal.Header>
            <Modal.Title className="h6"><FaPlus className="me-2 mr-3"/>{newBranchForm.header}</Modal.Title>
            <Button variant="close" aria-label="Close" onClick={(e) => onCancel(false)} />
        </Modal.Header>
        <Modal.Body className="p-5">
           {reportAlert && reportAlert}
           <Form> 
                <Form.Group className="mb-3">
                    <Form.Control required id={newBranchForm.id.id} type={"text"} onBlur={handleOnBlur} placeholder={newBranchForm.id.placeholder} />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Select options={[
                        {value: newBranchForm.select.head, label: newBranchForm.select.head},
                        {value: newBranchForm.select.empty, label: newBranchForm.select.empty},
                        //{value: newBranchForm.select.choose, label: newBranchForm.select.choose}
                    ]}
                        onChange={handleOnChange}
                        styles={singleSelectStyle}
                        className="mb-3"
                        defaultValue={{value: newBranchForm.select.head, label: newBranchForm.select.head}} 
                    />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <TDBReactButton   onClick={handleCreate} className= "float-right" config={CREATE_NEW_BRANCH_BUTTON}/>
        </Modal.Footer>
    </Modal>
}

function checkSubmission(newID, branches, setReportAlert){
    if(newID && newID.length){
        let nid = newID.trim()
        if(typeof branches[nid] != "undefined"){
            let message = "A Branch already exists with the same ID - choose a new ID"
            setReportAlert(<Alerts message={message} type={TERMINUS_DANGER} onCancel={setReportAlert}/>)
            return false
        }
        else {
            if(!legalURLID(nid)){
                let message = "Branch IDs can only include lowercase characters, numbers and underscores and be no more than 40 characters long"
                setReportAlert(<Alerts message={message} type={TERMINUS_WARNING} onCancel={setReportAlert}/>)
                return false
            }
            return true
        }
    }
    else {
        let message = "You must supply an ID for the new Branch"
        setReportAlert(<Alerts message={message} type={TERMINUS_WARNING} onCancel={setReportAlert}/>)
        return false
    }
}
