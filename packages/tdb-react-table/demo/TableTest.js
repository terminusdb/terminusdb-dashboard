import React, {useState, useEffect} from "react"
import {WOQLTable} from '@terminusdb/terminusdb-react-table'
import {ControlledQueryHook} from '@terminusdb/terminusdb-react-table'
import {Row, Button} from "react-bootstrap"
import TerminusClient, {WOQL} from "@terminusdb/terminusdb-client/"


export const getCommitsTabConfig = (result, limit, cellClick, getCopyButton) => {
    const tabConfig= TerminusClient.View.table();
    tabConfig.column_order("Time", "Author", "Commit ID", "Message", "Copy Commit ID")
    tabConfig.column("Commit ID")
    tabConfig.column("Time").width(180).renderer({type: "time"})
    tabConfig.column("Message").width(300)
    tabConfig.column("Author")
    tabConfig.column("Copy Commit ID")

    tabConfig.column("Copy Commit ID").render(getCopyButton)
    tabConfig.pager("remote")
    tabConfig.pagesize(limit)
    return tabConfig
}

const client = new ApolloClient({
    uri: 'http://127.0.0.1:6363/api/woql/admin/lego/local/branch/main',
    cache: new InMemoryCache({addTypename: false}),
});


const woqlClient = new TerminusClient.WOQLClient("http://localhost:6363",
{user:'admin',key:'root',db:'lego'})
const branch = 'main'
export const TableTest = () => {
    //const [query, setQuery]=useState(commitsQueryByBranch(branch))
   const [tableConfig, setTableConfig] = useState(false)

    const [copied, setCopied] = useState(false)
    const [showCopiedMessage, setShowCopiedMessage] = useState(true);
    const handleCloseCopiedMessage = () => setShowCopiedMessage(false);

    let cellClick = (cell) => {
        let cmt = {}
        cmt.id = cell.row.original["Commit ID"]["@value"]
        cmt.author = cell.row.original["Author"]["@value"]
        cmt.time = cell.row.original["Time"]["@value"]
        //setSelectedCommit(cmt)
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
        onRefresh
    } = ControlledQueryHook(woqlClient, query, false, 10)

    function handleCopy (commit) {
        copyToClipboard(commit)
        let copyMessage="Copied to clipboard !"
        setCopied(copyMessage)
    }

    function getCopyButton (cell) {
        let cmt = cell.row.original["Commit ID"]["@value"]
        return <span className="d-flex">
            <Button variant="light" size="sm" className="ml-5" title={`Copy - ${cmt}`} onClick={(e) => handleCopy(cmt)}>
                hello 
            </Button>
        </span>
    }

   //let tableConfig = getCommitsTabConfig(result, limit , cellClick, getCopyButton)

    useEffect(() => {
        let tConf = getCommitsTabConfig(result, limit , cellClick, getCopyButton)
        setTableConfig(tConf)
    }, [result])

    return <React.Fragment>
        
        {result && result.binding && <h6> {`Last updated by ${result.bindings[0].Author["@value"]} ${printts(result.bindings[0].Time["@value"])} - ${result.bindings[0].Message["@value"]} `}</h6>}

        <h6 className="fw-normal text-muted mb-2 fw-bol">{`Commit Logs on ${branch}`}</h6>
        {copied && <p className="text-warning">
            {copied} !
        </p>
        }

        {result && tableConfig && rowCount && <WOQLTable
            dowloadConfig={{filename:"test.csv",headers:["Author","Commit ID"]}}
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
            onRefresh={onRefresh}
        />}
    </React.Fragment>
}