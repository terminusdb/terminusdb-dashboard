import TerminusClient from '@terminusdb/terminusdb-client'
import {format, subSeconds} from "date-fns"
//import deAT from 'date-fns/locale/de-AT/index'
//import {XSD_DATA_TYPE_PREFIX, XDD_DATA_TYPE_PREFIX} from "./constants"
import {FiCopy} from "react-icons/fi"
import React, {useState} from "react"
import {VscGitPullRequestDraft} from "react-icons/vsc"
import {AiOutlineDeleteRow,AiOutlineClose} from "react-icons/ai"
import {VscGitPullRequest} from "react-icons/vsc"
import {BiCheck} from "react-icons/bi" 
import Badge from "react-bootstrap/Badge"
import Button from "react-bootstrap/Button"
import {
	OPEN,
	REJECTED,
	MERGED, 
	SUBMITTED,
    CLOSE
} from "./constants"

export const isArray = (arr) => {
    if (!Array.isArray(arr) || !arr.length) {
        return false
    }
    return true
}

export const shortenURL=(url) => {
    return TerminusClient.UTILS.shorten(url)
}

export const covertStringToId = (str) => {
    return "doc:" + str.replace(/ /g, "_")
}

export const convertToWOQL = (str) => {
    const myj = JSON.parse(str)
    let WOQL=TerminusClient.WOQL
    return WOQL.json(myj)
}

export const arrayEquals = (a, b) => {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
}

export const legalURLID = (idstr) => {
    if(!idstr.match(/^[0-9a-z_\-]+$/)) {
        return false
    }
    if(idstr.length > 40) return false
    return true
}

export function queryTimeDisplay(t) {
    let qtime = t ? t / 1000 : false
    return qtime ? ' (' + qtime + ' seconds' + ')' : ''
}

export function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export function formatTripleCount(tc){
    if(tc == 1) return tc + " triple"
    if(tc < 999){ return tc + " triples" }
    return tc.toLocaleString() + " triples"
}

export function formatCommits (ct) {
    if(ct == 1) ct += " commit"
    else ct += " commits"
    return ct
}

export function formatClassesCount (ct) {
    if(ct == 1) ct += " class"
    else ct += " classes"
    return ct
}

export function formatPropertiesCount (ct) {
    if(ct == 1) ct += " property"
    else ct += " properties"
    return ct
}

export function formatLastCommitTimeStamp (meta) {
    let ct = "Last commit"
    if(meta['Author']) ct += " by " + meta['Author']["@value"]
    if(meta['Time']) ct += " at " + printts(meta['Time']["@value"])
    if(meta['Message']) ct += ' "' + meta['Message']["@value"] + '"'
    return ct
}

export const printts = (ts) => {
    let f = "MMM d, yyyy - HH:mm:ss"
    return format(new Date(ts * 1000), f)
}

export const printtsDate = (ts) => {
    let f = "MMM d, yyyy"
    return format(new Date(ts * 1000), f)
}


export const printtsTime = (ts) => {
    let f = "HH:mm:ss"
    return format(new Date(ts * 1000), f)
}

export const printtsTimeRegualar = (ts) => {
    let f = "dd-MM-yy hh.mm"
    return format(new Date(ts * 1000), f)
}

export const getUsing = (woqlClient, commit) =>  {
    return woqlClient.resource("ref", commit)
}

// pure js easy function to copy a string to clipboard
export const copyToClipboard = (str) => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

/**
 * 
 * @param {*} id document ID 
 * @returns copy document ID to clipboard
 */
 export const CopyButton = ({text, title, label, css, onClick}) => {
    const onClickObj = typeof onClick === "function" ?  {onClick:onClick} : {onClick:(e) => copyToClipboard(text)}
    return <Button variant="transparent" 
        className={`text-light ${css}`}
        title={title}
        {...onClickObj}>
            <FiCopy className='mb-1'/> {label && <span>{label}</span>}
    </Button>
}

export function trimWOQL (str) {
    let check = "WOQL."
    if(typeof str === "string" && str.includes(check)) {
        return str.substr(check.length, str.length)
    }
    return str
}

export function trimText (text) {
    let length = 250
    let trimmedText = text.substring(0, length)
    return trimmedText + "..."
}

export const refreshDBList = (meta, woqlClient) => {
    let id = id || woqlClient.db()
    let org = org || woqlClient.organization()
    let usings = [org + "/" + id]
    let sysClient = woqlClient.copy()
    sysClient.setSystemDb()

    return TerminusClient.WOQL.lib().assets_overview(usings, sysClient, true)
        .then((res) =>{
            if(res[0]){
                let local = res[0]
                let dbs = woqlClient.databases()
                local.label = meta.label
                local.comment = meta.comment
                dbs.push(local)
                woqlClient.databases(dbs)
            }
        })
        .catch((err) => console.log(err))
}




export const getColumnsFromResults = (results) => {
    let columns = []
    for(var k in results[0]) columns.push(k)
    //columns[columns.length] = "Delete"
    //columns[columns.length] = "Copy"
    // add delete and copy button for document explorer
    return columns
}

export function checkIfObject (obj) {
    if(typeof obj !== "object") return false
    return true
}

export function checkIfNoProperties (frames){
    if(Object.keys(frames).length === 0) return true
    if(Object.keys(frames).length === 1){
        for(var key in frames){
            if(key == "@key"){
                return true
            }
        }
    }
    return false
}

export function deleteBlankField (json, id) {
    Object.keys(json).forEach(function(key){
        if (key === id) {
          delete json[id]
        }
    })
    return json
}


export function displayIDOfLinkedDocuments (results) {
    if(results.length === 0) return results
    let newResults=[]
    results.map(item => {
        let newJson={}
        for(var key in item) {
            if(isArray(item[key])) { //linked document
                let docArr = item[key]
                let idArr=[]
                docArr.map(doc => {
                    if(Object.keys(doc).length>0) { // subdocument
                        for(var d in doc) {
                            if( d === "@id") {
                                idArr.push({"@id": doc["@id"]})
                            }
                        }
                    }

                })
                newJson[key]=idArr
            }
            else newJson[key] = item[key]
        }
        newResults.push(newJson)
    })
    return newResults
}

/**
 * Note - maybe should move this logic to client.getDocumentClasses
 * @param {*} classRes - document classes 
 * @returns - returns formatted document classes withour prefixes
 */
export function formatClassResults(classRes) {
    if(!Array.isArray(classRes)) return classRes
    let formatted=[]
    classRes.map(classes => {
        let newFormatted={}
        for(var item in classes) {
            if(item === "@id") {
                let variableID=classes["@id"]
                let splitWords = classes[item].split(":")
                if(splitWords.length > 1) { // prefix included in class name
                    variableID=splitWords[1]
                }
                newFormatted["@id"]=variableID
            }
            else newFormatted[item]=classes[item]
        }
        formatted.push(newFormatted)
    })
    return formatted
}

//from cms

export const getDays = (timestamp) =>{
	const oneDay = 86400000
	return Math.round((Date.now() - timestamp)/oneDay)
}

export const iconTypes={
	[OPEN]:<VscGitPullRequestDraft className="text-muted mb-1 mr-1" size={20}/>,
	[SUBMITTED]:<VscGitPullRequest className="text-warning mb-1 mr-1" size={20}/>,
	[REJECTED]:<AiOutlineDeleteRow className="text-danger mb-1 mr-1" size={22}/>,
    [MERGED] :<BiCheck className="success__color mb-1 mr-1" size={24}/>, 
    [CLOSE] :<AiOutlineClose className="text-danger mb-1 mr-1" size={22}/>
}


export const status = { 
	[OPEN]:<Badge bg="warning text-dark" >OPEN</Badge>,
    [SUBMITTED]: <Badge bg="warning text-dark">Review required</Badge>,
    [REJECTED]: <Badge bg="danger text-dark">{REJECTED}</Badge>,
    [MERGED]:  <Badge bg="success text-dark">{MERGED}</Badge>,
    [CLOSE]:  <Badge bg="danger text-dark">{CLOSE}</Badge>
}

/** just get change request ID, remove "Changerequest/" from ID */
export function extractID(id) {
    if(typeof id === "string"){
        let str= id.split("/") 
        return str[1]
    }
    return ""
}

/** sorts alphabetically  */
function sortBy(a, b) {
    a = a.toLowerCase()
    b = b.toLowerCase()
    return (a < b) ? -1 : (a > b) ? 1 : 0;
}

/** sorts strings in json object alphabetically  */
export function sortAlphabetically (list, byID) { 
    return list.sort(function (a, b) {
        if(!byID) return sortBy(a.name, b.name) 
        else return sortBy(a["@id"], b[["@id"]]) 
    })
}

// function which displays CR Conflict errors 
export const getCRConflictError = (errorData, currentCRObject, setCurrentCRObject) => {

    function handleConflict (e) {
       if(setCurrentCRObject) {
           let currentCRObjectTmp = {...currentCRObject}
           currentCRObjectTmp["manageConflict"] = true
           setCurrentCRObject(currentCRObjectTmp)
       }
    }

    let messageTitle = `It looks like there are conflicts.`
	let message = `Fix these conflicts and then update or exit the Change Request.` 
	return <div className="w-100">
        <div>{messageTitle}</div>
        <div className='d-block mb-3 mt-2'>
            <div>{`Click here to resolve conflit`}</div>
            <Button className='btn-secondary' onClick={handleConflict}>
                Resolve Conflict
            </Button>
        </div>
        <div>{message}</div>
		<pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(errorData, null, 2)}</pre>
	</div>
}

export function decodeUrl(id){
    let idDecode
    try{
         idDecode= atob(id)
    }catch(err){
        return undefined
    }
    return idDecode
}

