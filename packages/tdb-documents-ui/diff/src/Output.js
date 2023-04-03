import React, {useState, useEffect} from "react"
import {InitObj} from "./init"
import {DiffViewer} from '@terminusdb/terminusdb-documents-ui'
import {OLD_VALUE, CHANGED_VALUE} from "./constants"
import {getSelectedTypeData} from "./functions"
import {oldData, changedData} from "./diff.constants"
import "../../src/css/terminusdb__styles"

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
            let result_patch = await tdbClient.getJSONDiff(oldData["Person"], changedData["Person"])
            setDiff(result_patch)
        }
        if(tdbClient) {
            getDiffs(tdbClient)
        }
    }, [tdbClient]) 


    if(!frames) return "LOADING ..."
    if(!type) return "LOADING ..."
    if(!diff) return "LOADING ..." 
    
    /*if(Object.keys(doc[OLD_VALUE]).length === 0 && 
        Object.keys(doc[CHANGED_VALUE]).length === 0) {
            return <>No data provided to show diffs ... </>
    }*/

    let testFrames = {
      "@context": {
        "@base": "terminusdb:///data/",
        "@schema": "terminusdb:///schema#",
        "@type": "Context"
      },
      "Address": {
        "@documentation": [
          {
            "@comment": "An Address",
            "@label": "Address",
            "@language": "en",
            "@properties": {
              "AddressLine1": {
                "@comment": "Address Line one",
                "@label": "Address Line 1"
              },
              "Country": {
                "@comment": "A Country ",
                "@label": "Country"
              },
              "postalCode": {
                "@comment": "A valid Postal Code",
                "@label": "Zip Code"
              }
            }
          },
          {
            "@comment": "მისამართი",
            "@label": "მისამართი",
            "@language": "ka",
            "@properties": {
              "AddressLine1": {
                "@comment": "მისამართის ხაზი პირველი",
                "@label": "მისამართის ხაზი 1"
              },
              "Country": {
                "@comment": "\\x1CA5\\ვეყანა",
                "@label": "ქვეყანა"
              },
              "postalCode": {
                "@comment": "მოქმედი საფოსტო კოდი",
                "@label": "\\x1C96\\იპ კოდი"
              }
            }
          }
        ],
        "@key": {
          "@type": "Random"
        },
        "@subdocument": [],
        "@type": "Class",
        "AddressLine1": "xsd:string",
        "City": {
          "@class": "xsd:string",
          "@type": "Optional"
        },
        "Country": "xsd:string",
        "postalCode": "xsd:string"
      },
      "Animal": {
        "@key": {"@type": "Random"},
        "@type": "Class",
        "@documentation": {
          "@comment": "an Animal",
          "@properties": {
              "owned_by": "owned by owner",
              "nickName": "pet's nick names",
              "category": "blah"
          }
        },
        "@unfoldable": [],
        "owned_by":{
          "@class": "Person",
          "@type": "Optional"
        },
        "category": "xsd:string",
        "nickName": "xsd:string"
      },
      "Person": {
        "@key": {
          "@type": "Random"
        },
        "@type": "Class",
        //"likes": "Animal"
        "nickNames": {
          "@class": "xsd:string",
          "@type": "Set"
        },
        "name": {
          "@class": "xsd:string",
          "@type": "Optional"
        },
        "age": {
          "@class": "xsd:decimal",
          "@type": "Optional"
        },
        "permanentAddress":  {
          "@class": "Address",
          "@subdocument": []
        },
        "manYAddress":  {
          "@class": {
            "@class": "Address",
            "@subdocument": []
          },
          "@type": "Set"
        }
      }
    }
    
    return <div className="w-100">
        <DiffViewer 
            oldValue={oldData["Person"]} 
            newValue={changedData["Person"]}
            frame={testFrames}
            type={"Person"}
            diffPatch={diff}/>
    </div>
}

