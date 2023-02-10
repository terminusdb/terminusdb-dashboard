import React, { useState, useEffect } from "react"
import {Card} from "react-bootstrap"
import {BsBriefcase} from "react-icons/bs"
import {BranchInfoModal} from "../components/BranchInfo"
import {BranchControl} from "../hooks/BranchControl"
import {WOQLClientObj} from '../init-woql-client'
import {DisplayBranchList} from "../components/DisplayBranchList"
import {NewBranchModal} from "../components/NewBranchModal"


export const ManageProducts = ({setDataProductSettings , branches , updateTable}) => {
    const {woqlClient, dataProduct, branch} = WOQLClientObj()
    
    const { 
        createBranch,
        newBranch,
        setNewBranch,
        setNewBranchInfo,
        branchCount,
        loading,
        reportAlert,
        handleSwitch,
        handleBranchClick,
        setSelectedBranch
    } = BranchControl(updateTable)

    const [showDefault, setShowDefault] = useState(false)
    const [selectedCommit, setSelectedCommit] = useState(false)

    const [history, setHistory] = useState(false)

    const handleClose = () => {
        setSelectedBranch(false)
        setShowDefault(false)
        setShowDefaultForm(false)
    }
    
    const [showDefaultForm, setShowDefaultForm] = useState(false)
    const showModalToDelete =(id)=>{
        setShowDefault(true)
        setShowDefault(true)
        handleSwitch(id)
        setShowDefaultForm('deleteForm')
    }

    // get the branches list
   

    return <React.Fragment>
            
            <Card.Text className="ms--2 mb-3 mt-3 h6 text-gray"> 
                <BsBriefcase className="me-2"/>
                {`You are currently in branch - `} 
                <strong className="text-success">{branch}</strong>
            </Card.Text>

            <NewBranchModal newBranch={newBranch} 
                onCancel={setNewBranch} 
                setNewBranchInfo={setNewBranchInfo} 
                loading={loading} 
                branches={branches}
                createBranch={createBranch}/> 
 
            <DisplayBranchList branchList={branches} 
                branch={branch} 
                setShowDefault={setShowDefault} 
                branchCount={branchCount}
                handleSwitch={handleSwitch} 
                handleDelete={showModalToDelete}
                handleBranchClick={handleBranchClick}
                reportAlert={reportAlert}
                setDataProductSettings={setDataProductSettings}
                setNewBranch={setNewBranch}/>

            {showDefault && <BranchInfoModal woqlClient={woqlClient} 
                showDefault={showDefault} 
                handleClose = {handleClose} 
                handleSwitch={handleSwitch} 
                setSelectedCommit={setSelectedCommit}
                showDefaultForm={showDefaultForm}
                selectedCommit={selectedCommit}
                updateTable={updateTable}/>}
 
            <div className="float-right text-right d-flex">
                {/*<Button variant="light" className="mr-3" title={VIEW_HISTORY.title} onClick={(e) => setHistory(true)}>
                    <MdTimer className="me-2"/>{VIEW_HISTORY.label}
                </Button>*/}
                {/*<Button variant="info" className="mr-3 btn btn-sm" title={CREATE_NEW_BRANCH_BUTTON.title} onClick={(e) => setNewBranch(true)}>
                    <AiOutlinePlus className="me-2 "/>{CREATE_NEW_BRANCH_BUTTON.label}
                </Button>
                <Button variant="light" className="btn btn-sm text-dark" title={"Close Manage Products"}>
                    <AiOutlineClose className="me-2 " onClick={(e) => setDataProductSettings(false)}/>
                </Button>*/}
            </div>

       
    {/*history && <History onClose={setHistory}/>*/}
    </React.Fragment>

}
