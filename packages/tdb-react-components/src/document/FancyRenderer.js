import React, {useState, useEffect} from 'react'
import TerminusClient from '@terminusdb/terminusdb-client'
import { DocumentRenderer } from "./DocumentRenderer"

export const FancyRenderer = ({frame, mode, view, errors, client}) => {  
    const [types, setTypes] = useState(false)
    const [docs, setDocs] = useState(false)
    let wq = TerminusClient.WOQL
    useEffect(() => {
        if(frame){
            let ntypes = {}
            let ndocs = {}
            let all_classes = frame.document.getPossibleContainedClasses()
            let q1 = wq.and(wq.lib().classes(), wq.member("v:Class ID", all_classes))
            client.query(q1).then((r) => {
                for(var i = 0; i<r.bindings.length; i++){
                    ntypes[r.bindings[i]["Class ID"]] = r.bindings[i]
                }
                setTypes(ntypes)
            })
            let all_docs = frame.document.getDocumentLinks()
            if(all_docs){
                let q2 = wq.and(wq.lib().document_metadata(), wq.member("v:Document ID", all_docs))
                client.query(q2).then((r2) => {
                    for(var i = 0; i<r2.bindings.length; i++){
                        ndocs[r2.bindings[i]["Document ID"]] = r2.bindings[i]
                    }
                    setDocs(ndocs)
                })
            }
            else {
                console.log("No docs", frame.document)
            }
        }
    }, [client])

    const getAutoSave = () => {
        return {
            save: function(frame, msg, newval, newtype, newlang){
                return client.query(frame.saveQuery(newval, newtype, newlang), msg)
            },
            delete: function(frame, msg){
                return client.query(frame.deleteQuery(), msg)
            },
            load: function(frame, msg){
                return client.query(TerminusClient.WOQL.read_object(frame.subjid))
            }
        }
    }

    if(!frame) return false
    return (
        <div className="wiki-full-page">
           <DocumentRenderer 
                expansion="block"
                frame={frame.document} 
                mode={mode}
                types={types}
                docs={docs}
                errors={errors}
                client={client}
                autosave={getAutoSave()}
                view={view} 
           />
        </div>
    )
}

/*
export const FancyPageHeader = ({frame, mode, view, types}) => {
    const [active, setActive] = useState(false)
    const toggleActive = () => setActive(!active) 


    let id = TerminusClient.UTILS.shorten(frame.subject())

    let edittit =  <TextareaAutosize minRows={1} className="wiki wiki-title" placeholder={"Enter " + type + "  name"} >{lab}</TextareaAutosize>
    let readtit = <span className="wiki wiki-title">{lab}</span>

    let editdesc = <TextareaAutosize minRows={1} className="wiki wiki-description" placeholder={"Enter " + type + " description"} >{desc}</TextareaAutosize>
    let readdesc = <span className="wiki wiki-description">{desc}</span>


    return <span className="wiki-title-row" onMouseEnter={toggleActive} onMouseLeave={toggleActive}>
        <ValueRow frame={frame} readversion={readtit} editversion={edittit} mode={mode} />
        <ValueRow frame={frame} readversion={readdesc} editversion={editdesc} mode={mode} />
    </span>
}
*/


