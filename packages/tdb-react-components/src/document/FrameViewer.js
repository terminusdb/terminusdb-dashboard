import React, {useState, useEffect} from 'react'
import TerminusClient from '@terminusdb/terminusdb-client'
import {TableRenderer} from "./TableRenderer"
import {FancyRenderer} from "./FancyRenderer"

export function FrameViewer({classframe, doc, type, view, mode, errors, extract, onExtract, client, loading, setLoading}){
    const [docobj, setDocObj] = useState()
    const [extractDocs, setExtractDocs] = useState([])

    function ifExistsInExtractDocs(cls) {
        let find=[]
        extractDocs.map((item) => {
            if (item.document.cls==cls) {
                find.push(item)
            }
        })
        return find
    }

    function checkForClassChoices() {
        let properties=docobj.document.properties
        for(var item in properties){
            let store=[]
            if(properties[item].cframe.frame){
                for (let i = 0; i < properties[item].values.length; i++) {
                    if(!properties[item].values[i].isClassChoice()){
                        store.push(properties[item].values[i])
                    }
                }
                properties[item].values=store
                let fr=properties[item].cframe.frame.operands
                if(fr){
                    fr.map((cls) => {
                        let classFrame=ifExistsInExtractDocs(cls.class)
                        if(classFrame.length) {
                            classFrame.map(cf => {
                                properties[item].values.push(cf.document)
                            })
                        }
                    })
                }
            }
        }
    }


    useEffect(() => {
        if(extract && onExtract && docobj ){
            checkForClassChoices()
            let ext = docobj.document.extract()
            //console.log("ext", ext)
            onExtract(ext)
        }
    }, [extract])

    useEffect(() => {
        if(errors){
            console.log("errors", errors)
        }
    }, [errors])


    useEffect(() => {
        if(classframe && view && mode=="edit"){
            let docobj = view.create(client)
            if((classframe && classframe['system:properties'])) {
                if(doc){
                    docobj.load(classframe['system:properties'], doc)
                }
                else {
                    docobj.loadSchemaFrames(classframe['system:properties'])
                }
                docobj.filterFrame()
            }
            setDocObj(docobj)
            setExtractDocs( arr => [...arr, docobj])
        }
        if(classframe && view && mode=="view"){
            let docobj = view.create(client)
            if((classframe && classframe['system:properties'])) {
                if(doc){
                    docobj.load(classframe['system:properties'], doc)
                }
                else {
                    docobj.loadSchemaFrames(classframe['system:properties'])
                }
                docobj.filterFrame()
            }
            setDocObj(docobj)
            setExtractDocs( arr => [...arr, docobj])
        }

    }, [doc, view, classframe])
    if(!docobj) return null
    let docconf = TerminusClient.View.document()
    docconf.all()
    if(type == "fancy"){
        return <FancyRenderer frame={docobj} mode={mode} view = {view} errors={errors} client={client}/>
    }
    else {
        return <TableRenderer frame={classframe} mode={mode} view = {view} errors={errors} client={client} setExtractDocs={setExtractDocs} extractDocs={extractDocs} loading={loading} setLoading={setLoading}/>
    }
}
