import React, {useState} from "react"
import {getCommitsTabConfig} from "./ViewConfig"
import {WOQLTable,useTDBWOQLQuery} from '@terminusdb/terminusdb-react-table'
import {Button} from "react-bootstrap"
import {printts, copyToClipboard} from "./utils"
import {BsClipboard} from "react-icons/bs"
import {WOQL} from "@terminusdb/terminusdb-client/"

export const CommitLogs = ({woqlClient, branch, setSelectedCommit}) => {
    
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
    } = useTDBWOQLQuery(woqlClient, query, false, 5)

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