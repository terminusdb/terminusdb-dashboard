
import React, {useState, useEffect} from "react"
import {newBranchForm, TERMINUS_SUCCESS, TERMINUS_DANGER} from "../components/constants"
import {Alerts} from "../components/Alerts"
import {WOQLClientObj} from '../init-woql-client'
//I have to review this
export function BranchControl (branchesReload)  {
    const {woqlClient,
           ref,
           setHead,
           branch,
           branches,
           branchNeedReload,
           setConsoleTime} = WOQLClientObj()
    
    if(!woqlClient) return ""
    const dataProduct = woqlClient.db()
      
    let branchCount = typeof branches === 'object' ? Object.keys(branches).length : 0

    const [sourceCommit, setSourceCommit] = useState(false)
    
    //const [branchList, setBranchList] = useState([])
    
    const [newBranch, setNewBranch] = useState(false)
    //const [newBranchInfo, setNewBranchInfo] = useState(false)
    const [selectedBranch, setSelectedBranch] = useState(false)

    const [loading, setLoading] = useState(false)
    const [reportAlert, setReportAlert] = useState(false)
    
    useEffect(() => {
        if(ref && !sourceCommit){
            setSourceCommit(ref)
        }
        else if(branch && branches.length >0  && !sourceCommit){
            setSourceCommit(branches[branch].head)
        }
    }, [branch, ref, branches])

    useEffect(() => {
        setReportAlert(false)
    }, [dataProduct])

    
    function createBranch (branchInfo) {
        let update_start = Date.now()
        setLoading(true)
        let nc = woqlClient.copy()

        let source_free = (branchInfo.branchType == newBranchForm.select.empty)
        if(branchInfo.branchType !== newBranchForm.select.empty){
            nc.ref(sourceCommit)
        }
        nc.branch(branchInfo.id, source_free)
        .then((res) => {
            let message = `Success in creating branch - ${branchInfo.id}`;
            setReportAlert(<Alerts message={message} type={TERMINUS_SUCCESS} onCancel={setReportAlert} time={update_start}/>)
            setNewBranch(false)
            handleSwitch(branchInfo.id)
            branchNeedReload()
        })
        .catch((err) => {
            let message = `Error in creating branch - ${branchInfo.id}. ${message}`;
            setReportAlert(<Alerts message={message} type={TERMINUS_DANGER} onCancel={setReportAlert}/>)
        })
        .finally(() => {
            setLoading(false)
        }) 
    }

    /* useEffect(() => {
        if(branches) setBranchList(branches)
    }, [branches])*/

   /* useEffect(() => {
        if(newBranchInfo) onCreate(newBranchInfo)
    }, [newBranchInfo])*/


    function handleDelete (branch) {
        let update_start = Date.now()
        setLoading(true)
        woqlClient.deleteBranch(branch).then((results) => {
            let message = `Success in deleting Branch - ${branch}`;
            setReportAlert(<Alerts message={message} type={TERMINUS_SUCCESS} onCancel={setReportAlert} time={update_start}/>)
            handleSwitch("main")
            //this do a set in the init-main-client
            //to be review 
            branchNeedReload()
        })
        .catch((err) => {
            let message = `Error in deleting Branch - ${branch}. ${err}`;
            setReportAlert(<Alerts message={message} type={TERMINUS_DANGER} onCancel={setReportAlert}/>)
        
        })
        .finally(() => {
            setLoading(false)
        })
    }

    //change the branch
    function handleSwitch (branch) {
        if(!branch) return null
        let message = `Switched to Branch - ${branch}`
        setHead(branch)
        branchNeedReload()
        //woqlClient.ref(false)
        //woqlClient.checkout(branch)


        //not use set branch this is very important setHead 
        //setBranch(branch)
        //setReportAlert(<Alerts message={message} type={TERMINUS_SUCCESS} onCancel={setReportAlert}/>)
        
        //updateBranches(branch)
    }

    function createReportAlert(message,type=TERMINUS_DANGER){
        setReportAlert(<Alerts message={message} type={type} onCancel={setReportAlert} time={update_start}/>)
    }

    function handleBranchClick (branch) {
        setSelectedBranch(branch)
    }

    function handleOptimize (branch){
        let update_start = Date.now()
        setLoading(true)
        woqlClient.optimizeBranch(branch).then(()=>{
            let message = `Optimization Complete on Branch - ${branch}`
            setReportAlert(<Alerts message={message} type={TERMINUS_SUCCESS} onCancel={setReportAlert} time={update_start}/>)
        })
        .catch((err) => {
            let message = `Error in optimizing branch - ${branch}`;
            setReportAlert(<Alerts message={message} type={TERMINUS_DANGER} onCancel={setReportAlert} />)
        })
        .finally(() => setLoading(false))
    }

    function handleReset (branch, commit, setRefresh) {
        let update_start = Date.now()
        setLoading(true)
        woqlClient.resetBranch(branch, commit).then((results) => {
            let message = `Successfull in resetting Branch ${branch} to ${commit}`
            setReportAlert(<Alerts message={message} type={TERMINUS_SUCCESS} onCancel={setReportAlert} time={update_start}/>)
            setHead(branch, {commit: commit})
            branchNeedReload()
            if(setRefresh) setRefresh([ arr => [...arr, arr.length+1]])
        })
        .catch((err) => {
            let message = `Error while resetting Branch - ${branch}`;
            setReportAlert(<Alerts message={message} type={TERMINUS_DANGER} onCancel={setReportAlert}/>)
        })
        .finally(() => setLoading(false))
    }

    function handleSquash (branch, commitMsg) {
        let update_start = Date.now()
        var new_commit
        setLoading(true)
        woqlClient.squashBranch(branch, commitMsg).then((results) => {
            if(results["api:commit"]){
                var cmt = results["api:commit"].split("/");
                new_commit = cmt.pop()
            }
            woqlClient.resetBranch(branch, new_commit).then((results) => {
                let message = `Successfull in squashing Branch ${branch} to new commit  ${new_commit}`
                setReportAlert(<Alerts message={message} type={TERMINUS_SUCCESS} onCancel={setReportAlert} time={update_start}/>)
                setHead(branch, {commit: new_commit})
                branchNeedReload()
            })
        })
        .catch((err) => {
            let message = `Error while squashing Branch - ${branch}`;
            setReportAlert(<Alerts message={message} type={TERMINUS_DANGER} onCancel={setReportAlert}/>)
        })
        .finally(() => setLoading(false))
    }

    return {
        createReportAlert,
        createBranch,
        newBranch,
        branchCount,
        setNewBranch,
        loading,
        reportAlert,
        handleDelete,
        handleSwitch,
        handleBranchClick,
        selectedBranch,
        setSelectedBranch,
        handleOptimize,
        handleReset,
        handleSquash
    }
}