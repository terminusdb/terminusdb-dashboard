import TerminusClient from '@terminusdb/terminusdb-client'
import {format, subSeconds} from "date-fns"
import deAT from 'date-fns/locale/de-AT/index'
import {XSD_DATA_TYPE_PREFIX, XDD_DATA_TYPE_PREFIX} from "./constants"

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


export function trimWOQL (str) {
    let check = "WOQL."
    if(str.includes(check)) {
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

