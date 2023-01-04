import React, {useState, useEffect} from "react"
import {InitObj} from "./init"
import {DiffViewer} from '@terminusdb/terminusdb-documents-ui'
import {OLD_VALUE, CHANGED_VALUE} from "./constants"
import {getSelectedTypeData} from "./utils"

export const Output = () => {
    const {
        type,
        frames, 
        tdbClient,
        diff, 
        setDiff,
        doc, 
        setDoc,
        dataProduct
	} = InitObj()

    useEffect(() => {
        if(type) { 
            setDoc(getSelectedTypeData(dataProduct, type))
        }
    }, [type])

    useEffect(() => { 
        async function getDiffs(tdbClient) {
            console.log("doc", doc)
            let result_patch = await tdbClient.getJSONDiff(doc[OLD_VALUE], doc[CHANGED_VALUE])
            setDiff(result_patch)
        }
        if(doc && tdbClient) {
            getDiffs(tdbClient)
        }
    }, [doc]) 


    if(!frames) return "LOADING ..."
    if(!type) return "LOADING ..."
    if(!diff) return "LOADING ..." 
    
    if(Object.keys(doc[OLD_VALUE]).length === 0 && 
        Object.keys(doc[CHANGED_VALUE]).length === 0) {
            return <>No data provided to show diffs ... </>
    }

    return <div className="w-100">
        <DiffViewer 
            oldValue={doc[OLD_VALUE]} 
            newValue={doc[CHANGED_VALUE]}
            frame={frames}
            type={type}
            diffPatch={diff}/>
    </div>
}

