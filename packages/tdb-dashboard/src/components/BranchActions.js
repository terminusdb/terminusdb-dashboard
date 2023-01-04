
import React, {useState,useRef} from "react"
import {Row, Col, Form, Card, Button} from 'react-bootstrap'
import {branchActionConfig, squashFormConfig, resetFormConfig, deleteFormConfig, RESET_BUTTON_CONFIG, CANCEL_BUTTON, SQUASH_BUTTON_CONFIG,DELETE_BUTTON_CONFIG, IconBarConfig} from './constants'
import {AiOutlineUndo, AiOutlineCompress, AiOutlineDelete, AiOutlineCheckCircle} from "react-icons/ai"
import {BranchControl} from "../hooks/BranchControl"

const SQUASH_FORM = 'squashForm'
const RESET_FORM = 'resetForm'
const DELETE_FORM = 'deleteForm'

export const BranchActions = ({branch, handleClose, setRefresh, showDefaultForm}) =>{
    const [showForm, setShowForm] = useState(showDefaultForm || false)
    const [commit, setCommit] = useState(false)
    const [branchName,setBranchName] = useState(false)
    const [deleteButtonDisabled,setDisabledDeleteButton] = useState(true)

    const disabledDelete = deleteButtonDisabled ? {disabled:'disabled'} : {onClick:onDelete}

    const { 
        reportAlert,
        createReportAlert,
        handleDelete,
        handleOptimize,
        handleReset,
        handleSquash
    } = BranchControl()

    const squashDescription = useRef(null);

    function onDelete (evt) {
        evt.preventDefault()
        if(branchName===branch){
            if(handleDelete) handleDelete(branch)
            if(handleClose) handleClose()
            setShowForm(false)
        }
    }

    function enterBranchName (evt){
        if(evt.target.value===branch){
            setBranchName(evt.target.value)
            setDisabledDeleteButton(false)          
        }else{
            setDisabledDeleteButton(true)
        }  
    }

    function onOptimize () {
        if(handleOptimize) handleOptimize(branch)
    }

    function handleOnBlur (e) {
        setCommit(e.target.value)
    }

    function submitReset () {
        if(handleReset) handleReset(branch, commit, setRefresh)
        setShowForm(false)
    }

    function submitSquash () {
        const squashDescValue = squashDescription.current.value
        //this just change the status
        if(!squashDescValue)createReportAlert("Description is required")
        if(handleSquash)handleSquash(branch, commit, setRefresh)
        setShowForm(false)
    }


    return <Row>
        <Col lg={12}>
            <div className="flex-column flex-sm-row d-flex ">
                {/*<Button variant="light" className="m-1" title={branchActionConfig.merge.title}>
                    <BiGitMerge className="me-2" /> {branchActionConfig.merge.label}
                </Button>*/}
                <Button id="reset_branch" variant="light" className="m-1" onClick={()=>setShowForm(RESET_FORM)}  title={branchActionConfig.reset.title}>
                    <AiOutlineUndo className="me-2" /> {branchActionConfig.reset.label}
                </Button>
                <Button id="squash_branch" variant="light" className="m-1" title={branchActionConfig.squash.title} onClick={()=>setShowForm(SQUASH_FORM)}>
                    <AiOutlineCompress className="me-2" /> {branchActionConfig.squash.label}
                </Button>
                {/*<Button variant="light" className="m-1" title={branchActionConfig.optimize.title} onClick={onOptimize}>
                    <AiOutlineCheckCircle className="me-2" /> {branchActionConfig.optimize.label}
                </Button>*/}
                {branch !== 'main' && 
                    <Button  id="delete_branch"  variant="danger" className="m-1" title={branchActionConfig.delete.title} onClick={()=>setShowForm(DELETE_FORM)}>
                        <AiOutlineDelete className="me-2" /> {branchActionConfig.delete.label}
                    </Button>
                }
                
            </div>

            {reportAlert && <div className="d-grid pb-3">
                {reportAlert}
            </div>}

            {showForm === RESET_FORM && <Card variant="dark" border="light" className="mt-5">
                <Card.Header>
                    <b>{resetFormConfig.title}</b>
                    <Button onClick={(e) => setShowForm(false)} 
                        className= "cancel-button" variant={CANCEL_BUTTON.variant}>
                        <i className={CANCEL_BUTTON.icon}/>{CANCEL_BUTTON.label}
                    </Button>
                 </Card.Header>
                <Card.Body>
                    <Card.Text className="text-muted">
                        {resetFormConfig.description}
                    </Card.Text>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Control required id={resetFormConfig.id} type={"text"} onBlur={handleOnBlur} placeholder={resetFormConfig.placeholder} />
                        </Form.Group>
                        <Button onClick={submitReset} title ={RESET_BUTTON_CONFIG.title} 
                          className= "float-right" variant={RESET_BUTTON_CONFIG.variant}>
                            <i className={RESET_BUTTON_CONFIG.icon}/> {RESET_BUTTON_CONFIG.label}
                        </Button>

                    </Form>
                </Card.Body>
            </Card>}

            {showForm === SQUASH_FORM && <Card variant="dark" border="danger" className="mt-5">
                <Card.Header>
                        <b>{squashFormConfig.title}</b>
                        <Button onClick={(e) => setShowForm(false)} className= "cancel-button" variant={CANCEL_BUTTON.variant}>
                            <i className={CANCEL_BUTTON.icon}/> {CANCEL_BUTTON.label}
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text className="text-muted">
                            {squashFormConfig.description}
                        </Card.Text>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Control ref={squashDescription} required id={squashFormConfig.id} type={"text"} onBlur={handleOnBlur} placeholder={squashFormConfig.placeholder} />
                            </Form.Group>
                            <Button onClick={submitSquash}  className= "float-right" {...SQUASH_BUTTON_CONFIG}>
                                <i className={SQUASH_BUTTON_CONFIG.icon}/> {SQUASH_BUTTON_CONFIG.label}
                            </Button>

                        </Form>
                    </Card.Body>
                </Card>
            }

            {showForm === DELETE_FORM  && <Card variant="dark" border="danger" className="mt-5">
                    <Card.Header>
                        <b>{deleteFormConfig.title}</b>
                        <Button onClick={(e) => setShowForm(false)} className= "cancel-button" variant={CANCEL_BUTTON.variant}>
                        <i className={CANCEL_BUTTON.icon}/> {CANCEL_BUTTON.label}
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text className="text-muted">
                            {deleteFormConfig.description}
                        </Card.Text>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Control required id={deleteFormConfig.id} type={"text"} onBlur={enterBranchName} placeholder={deleteFormConfig.placeholder} />
                            
                            </Form.Group>
                            <button id="delete_branch_button" 
                            title="Delete Branch" type="submit" className="mr-1 mb-1 m-1 float-right btn btn-danger btn-sm" 
                            {...disabledDelete}>Delete Branch</button>
                        </Form>
                    </Card.Body>
                </Card>
            }
        </Col>
  </Row>
}                        