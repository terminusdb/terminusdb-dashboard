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
            //console.log("doc", doc)
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

    //unfolded diffs
    /*let testFrames = {
        "@context": {
          "@base": "terminusdb:///data/",
          "@schema": "terminusdb:///schema#",
          "@type": "Context"
        },
        "category": {
          "@key": {
            "@type": "Random"
          },
          "@type": "Class",
          "@unfoldable": [],
          "name": {
            "@class": "xsd:string",
            "@type": "Optional"
          },
          "notes": {
            "@class": "xsd:string",
            "@type": "Optional"
          },
          "has_other": {
            "@class": "subCategory",
            "@type": "Optional"
          }
        },
        "subCategory": {
          "@key": {
            "@type": "Random"
          },
          "@type": "Class",
          "@unfoldable": [],
          "subCategory_description": {
            "@class": "xsd:string",
            "@type": "Optional"
          }
        },
        "job": {
          "@key": {
            "@type": "Random"
          },
          "@type": "Class",
          "@unfoldable": [],
          "company": {
            "@class": "xsd:string",
            "@type": "Optional"
          },
          "title": {
            "@class": "xsd:string",
            "@type": "Optional"
          },
          "nonUnfoldable_property": {
            "@class":"nonUnfoldable", 
            "@type":"Optional"
          },
          "section": {
            "@class":"category", 
            "@type":"Optional"
          }
        },
        "nonUnfoldable" : {
          "@key": {
            "@type": "Random"
          },
          "@type": "Class",
          "paragh": {
            "@class": "xsd:string",
            "@type": "Optional"
          }
        },
        "person": {
          "@key": {
            "@type": "Random"
          },
          "@type": "Class",
          "works_as": {
            "@class": "job",
            "@type": "Optional"
          }
        }
      }*/
      
    let testFrames = {
      "@context": {
        "@base": "terminusdb:///data/",
        "@schema": "terminusdb:///schema#",
        "@type": "Context"
      },
      "body": {
        "@key": {
          "@type": "Random"
        },
        "@metadata": {
          "render_as": {
            "optMarkDown": "markdown",
            "setMarkDown": "markdown"
          }
        },
        "@type": "Class",
        "m_like": "xsd:boolean",
        "like": {
          "@class": "xsd:boolean",
          "@type": "Optional"
        },
        "optMarkDown": {
          "@class": "xsd:string",
          "@type": "Optional"
        },
        "setMarkDown": {
          "@class": "xsd:string",
          "@type": "Set"
        },
        "text": {
          "@class": "xsd:string",
          "@type": "Set"
        }
      }
    }
    
    return <div className="w-100">
        <DiffViewer 
            oldValue={doc[OLD_VALUE]} 
            newValue={doc[CHANGED_VALUE]}
            frame={testFrames}
            type={"body"}
            diffPatch={diff}/>
    </div>
}

