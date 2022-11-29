import React, {useState, useEffect} from "react"
import {getBranchCommits} from "../queries/BranchQueries"
import {getCommitsTabConfig, getCommitViewTabConfig} from "./ViewConfig"
import {WOQLTable,ControlledQueryHook} from '@terminusdb/terminusdb-react-table'
import {getRemovedTriplesQuery, getAddedTriplesQuery} from "../queries/BranchQueries"
import {Row, Button, Toast} from "react-bootstrap"
import {getUsing, printts, copyToClipboard} from "./utils"
import {TERMINUS_MESSAGE, EMPTY_ADDED_DATA, EMPTY_REMOVED_DATA} from "./constants"
import {Alerts} from "./Alerts"
import {BsClipboard} from "react-icons/bs"
import {commitsQueryByBranch} from "../queries/TimeTravelQueries"
import {WOQL} from "@terminusdb/terminusdb-client/"

const AddedData = ({woqlClient, selectedCommit}) => {
    const [query, setQuery] = useState(getAddedTriplesQuery(getUsing(woqlClient, selectedCommit)))
    const [tableConfig, setTableConfig] = useState(false)
    const [emptyAlert, setEmptyAlert] = useState(false)

    const {
        updateQuery,
        changeOrder,
        changeLimits,
        woql,
        result,
        limit,
        start,
        orderBy,
        loading,
        rowCount,
    } = {}//ControlledQueryHook(woqlClient, query, false, 20)

    useEffect(() => {
        if(result && result.bindings.length > 0) {
            let tConf = getCommitViewTabConfig(result)
            setTableConfig(tConf)
            setEmptyAlert(false)
        }
        else setEmptyAlert(EMPTY_ADDED_DATA)
        
    }, [result])

    return <React.Fragment>
        {!emptyAlert && result && tableConfig && <WOQLTable
            result={result}
            freewidth={true}
            view={(tableConfig ? tableConfig.json() : {})}
            limit={limit}
            start={start}
            orderBy={orderBy} 
            setLimits={changeLimits}
            setOrder={changeOrder}
            query={query}
            loading={loading}
            totalRows={rowCount}
        />}
        {emptyAlert && <Alerts message={emptyAlert} type={TERMINUS_MESSAGE}/>}
    </React.Fragment>

}

const RemovedData = ({woqlClient, selectedCommit}) => {
    const [query, setQuery] = useState(getRemovedTriplesQuery(getUsing(woqlClient, selectedCommit)))
    const [tableConfig, setTableConfig] = useState(false)
    const [emptyAlert, setEmptyAlert] = useState(false)

    const {
        updateQuery,
        changeOrder,
        changeLimits,
        woql,
        result,
        limit,
        start,
        orderBy,
        loading,
        rowCount,
    } = {}//ControlledQueryHook(woqlClient, query, false, 20)

    useEffect(() => {
        if(result && result.bindings.length > 0) {
            let tConf = getCommitViewTabConfig(result)
            setTableConfig(tConf)
            setEmptyAlert(false)
        }
        else setEmptyAlert(EMPTY_REMOVED_DATA)
    }, [result])

    return <React.Fragment>
        {!emptyAlert && result && tableConfig && <WOQLTable
            result={result}
            freewidth={true}
            view={(tableConfig ? tableConfig.json() : {})}
            limit={limit}
            start={start}
            orderBy={orderBy} 
            setLimits={changeLimits}
            setOrder={changeOrder}
            query={query}
            loading={loading}
            totalRows={rowCount}
        />}
        {emptyAlert && <Alerts message={emptyAlert} type={TERMINUS_MESSAGE}/>}
    </React.Fragment>

}

const CommitHeader = ({selectedCommit, onClose}) => {
    let dt=printts(selectedCommit.time)

    function handleClose () {
        if(onClose) onClose(false)
    }

    return <React.Fragment> 
        <div className="d-flex align-items-center">
            <div className="d-block col-md-6">
                <h6 className="fw-normal text-muted mb-2">Commit ID</h6>
                <h5>{selectedCommit.id}</h5>
            </div>
            <div className="d-block col-md-3">
                <h6 className="fw-normal text-muted mb-2">Commited at</h6>
                <h5>{dt}</h5>
            </div>
            <div className="d-block col-md-3">
                <h6 className="fw-normal text-muted mb-2">Commited by</h6>
                <h5>{selectedCommit.author}</h5>
            </div>
        </div>
        <hr className="my-3 border-indigo dropdown-divider" role="separator"></hr>
    </React.Fragment>

    /*return <React.Fragment>
        <h5><BiGitCommit className="me-2"/>{"Commit"} {commit.id} {dt} {commit.author}</h5>
        <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
            Close
        </Button>
    </React.Fragment>*/
        
}

export const CommitView = ({woqlClient, commit, onClose, setSelectedCommit, selectedCommit}) => {
    // commit is an object coming from cell click of WOQL Table 

    return <Row>
        <CommitHeader selectedCommit={selectedCommit} onClose={onClose}/>
        <h5 className="text-muted">Added Data</h5>
        <div style={{width: "100%"}}>
            <AddedData woqlClient={woqlClient} selectedCommit={selectedCommit.id}/>
        </div>
        <h5 className="text-muted">Removed Data</h5>
        <div style={{width: "100%"}}>
            <RemovedData woqlClient={woqlClient} selectedCommit={selectedCommit.id}/>
        </div>
    </Row>

}

export const CommitLogs = ({woqlClient, branch, refresh, setSelectedCommit}) => {
    
    const [copied, setCopied] = useState(false)
    const [showCopiedMessage, setShowCopiedMessage] = useState(true);
    const handleCloseCopiedMessage = () => setShowCopiedMessage(false);

    let cellClick = (cell) => {
        let cmt = {}
        cmt.id = cell.row.original["Commit ID"]["@value"]
        cmt.author = cell.row.original["Author"]["@value"]
        cmt.time = cell.row.original["Time"]["@value"]
        setSelectedCommit(cmt)
    }

    const query = WOQL.lib().commits(branch)

    const {
        updateQuery,
        changeOrder,
        changeLimits,
        woql,
        result,
        limit,
        start,
        orderBy,
        loading,
        rowCount,
    } = ControlledQueryHook(woqlClient, query, false, 5)

    function handleCopy (commit) {
        copyToClipboard(commit)
        let copyMessage="Copied to clipboard !"
        setCopied(copyMessage)
    }

    function getCopyButton (cell) {
        let cmt = cell.row.original["Commit ID"]["@value"]
        return <span className="d-flex">
            <Button variant="light" size="sm" className="ml-5" title={`Copy - ${cmt}`} onClick={(e) => handleCopy(cmt)}>
                <BsClipboard/> 
            </Button>
        </span>
    }

    let tableConfig = getCommitsTabConfig(result, limit , cellClick, getCopyButton)

    return <React.Fragment>       
        {result && result.binding && <h6> {`Last updated by ${result.bindings[0].Author["@value"]} ${printts(result.bindings[0].Time["@value"])} - ${result.bindings[0].Message["@value"]} `}</h6>}

        <h6 className="fw-normal text-muted mb-2 fw-bol">{`Commit Logs on ${branch}`}</h6>
        {copied && <p className="text-warning">
            {copied} !
        </p>
        }
        {result && tableConfig && rowCount && <WOQLTable
            result={result}
            freewidth={true}
            view={(tableConfig ? tableConfig.json() : {})}
            limit={limit}
            start={start}
            orderBy={orderBy} 
            setLimits={changeLimits}
            setOrder={changeOrder}
            query={query}
            loading={loading}
            totalRows={rowCount}
        />}
    </React.Fragment>
}