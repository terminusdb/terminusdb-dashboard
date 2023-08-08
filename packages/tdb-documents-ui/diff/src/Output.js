import React, {useState, useEffect} from "react"
import {InitObj} from "./init"
import {DiffViewer} from '@terminusdb/terminusdb-documents-ui'
import {OLD_VALUE, CHANGED_VALUE} from "./constants"
import {getSelectedTypeData} from "./functions"
import {oldData, changedData} from "./diff.constants"
import '../../src/css/terminusdb__darkly.css'
//import { STAR_WAR_FRAMES, PEOPLE_OLD_VALUE, PEOPLE_NEW_VALUE } from "./starwars.constants"

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

  let test = {
    "@context": {
      "@base": "terminusdb:///star-wars/",
      "@schema": "terminusdb:///schema/star-wars#",
      "@type": "Context"
    },
    "People": {
      "@type": "Class",
      "vehicle": {
        "@class": "Vehicle",
        "@type": "Set"
      }
    },
    "Vehicle": {
      "@type": "Class",
      "vehicle_class": {
        "@class": "xsd:string",
        "@type": "Optional"
      }
    }
  }

  let oldVal = {
    "@id": "People/1",
    "@type": "People",
    "vehicle": [
      "Vehicle/14",
      "Vehicle/30",
      "Vehicle/30"
    ]
  }

  let newVal = {
    "@id": "People/1",
    "@type": "People",
    "vehicle": [
      "Vehicle/14",
      "Vehicle/24"
    ]
  }
        
    useEffect(() => {
        if(type) {  
            setDoc(getSelectedTypeData(dataProduct, type))
        }
    }, [type])

    useEffect(() => { 
        async function getDiffs(tdbClient) {
            //console.log("doc", doc)
            let result_patch = await tdbClient.getJSONDiff(oldVal, newVal)
            setDiff(result_patch)
        }
        if(tdbClient) {
            getDiffs(tdbClient)
        }
    }, [tdbClient]) 


    if(!frames) return "LOADING ..."
    if(!type) return "LOADING ..."
    if(!diff) return "LOADING ..." 

    function handleTraverse (clicked) {
      alert(`You have clicked on ${clicked} ...`)
    }

    

    return <div className="w-100">
        <DiffViewer 
            oldValue={oldVal} 
            newValue={newVal}
            frame={test}
            type={"People"}
            onTraverse={handleTraverse}
            diffPatch={diff}/>
    </div>
}

