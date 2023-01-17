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

    let testFrames=[
        {"@id":"Color", "@type":"Class", "name":"xsd:string", "rgb":"xsd:string", "transparent":"xsd:boolean"},
        {"@id":"Element", "@type":"Class", "color": {"@class":"Color", "@type":"Optional"}, "image_url": {"@class":"xsd:anyURI", "@type":"Optional"}, "part":"Part"},
        {"@id":"Inventory", "@type":"Class", "inventory_minifigs": {"@class":"InventoryMinifig", "@type":"Set"}, "inventory_parts": {"@class":"InventoryPart", "@type":"Set"}, "setString": {"@class":"xsd:string", "@type":"Set"}, "version":"xsd:positiveInteger"},
        {"@id":"InventoryMinifig", "@key": {"@fields": ["inventory_minifig_id" ], "@type":"Lexical"}, "@subdocument": [], "@type":"Class", "inventory_minifig_id":"xsd:string", "minifig":"Minifig", "quantity":"xsd:positiveInteger"},
        {"@id":"InventoryPart", "@key": {"@fields": ["inventory_part_id" ], "@type":"Lexical"}, "@subdocument": [], "@type":"Class", "element":"Element", "inventory_part_id":"xsd:string", "quantity":"xsd:positiveInteger", "spare":"xsd:boolean"},
        {"@id":"InventorySet", "@key": {"@type":"Random"}, "@subdocument": [], "@type":"Class", "inventory":"Inventory", "quantity":"xsd:positiveInteger"},
        {"@id":"LegoSet", "@type":"Class", "description": {"@class":"xsd:string", "@type":"Optional"}, "image_url": {"@class":"xsd:anyURI", "@type":"Optional"}, "inventory_set": {"@class":"InventorySet", "@type":"Set"}, "name":"xsd:string", "theme":"Theme", "year":"xsd:gYear"},
        {"@id":"Minifig", "@key": {"@fields": ["figure_number" ], "@type":"Lexical"}, "@type":"Class", "figure_number":"xsd:string", "img_url":"xsd:anyURI", "name":"xsd:string", "num_parts": {"@class":"xsd:positiveInteger", "@type":"Optional"}},
        {"@id":"Part", "@key": {"@fields": ["part_number" ], "@type":"Lexical"}, "@type":"Class", "category":"Category", "material":"Material", "name":"xsd:string", "part_number":"xsd:string"},
        {"@id":"PartRelation", "@type":"Class", "left":"Part", "relation_type":"RelationType", "right":"Part"},
        {"@id":"Theme", "@key": {"@fields": ["theme_id", "name" ], "@type":"Lexical"}, "@type":"Class", "image_url": {"@class":"xsd:anyURI", "@type":"Optional"}, "name":"xsd:string", "parent": {"@class":"Theme", "@type":"Optional"}, "theme_id":"xsd:positiveInteger"},
        {"@id":"Apple", "@key": {"@type":"Random"}, "@metadata": {"render_as": {"page":"markdown"}}, "@type":"Class", "lives": {"@class":"address", "@type":"List"}, "page": {"@class":"xsd:string", "@type":"Optional"}, "text": {"@class":"xsd:string", "@type":"List"}},
        {"@id":"address", "@key": {"@type":"Random"}, "@subdocument": [], "@type":"Class", "addressline1": {"@class":"xsd:string", "@type":"Optional"}, "postal": {"@class":"xsd:string", "@type":"Optional"}},
        {"@id":"Botony", "@inherits":"Subject", "@key": {"@type":"Random"}, "@subdocument": [], "@type":"Class", "Grade": {"@class":"xsd:string", "@type":"Optional"}, "number_of_assignments": {"@class":"xsd:integer", "@type":"Optional"}},
        {"@id":"Student", "@key": {"@type":"Random"}, "@type":"Class", "favorite_subject": {"@class":"Subject", "@type":"List"}},
        {"@abstract": [], "@id":"Subject", "@subdocument": [], "@type":"Class", "Number_of_classes_attended": {"@class":"xsd:integer", "@type":"Optional"}, "course_start_date": {"@class":"xsd:dateTime", "@type":"Optional"}},
        {"@id":"Zoology", "@inherits":"Subject", "@key": {"@type":"Random"}, "@subdocument": [], "@type":"Class", "Grade": {"@class":"xsd:string", "@type":"Optional"}, "Notes": {"@class":"xsd:string", "@type":"Optional"}},
        {"@id":"ExperimentalReactor", "@inherits":"Reactor", "@key": {"@fields": ["name" ], "@type":"Lexical"}, "@type":"Class"},
        {"@id":"NuclearPowerPlant", "@key": {"@fields": ["name" ], "@type":"Lexical"}, "@type":"Class", "name":"xsd:string", "reactors":"Reactor"},
        {"@id":"PowerReactor", "@inherits":"Reactor", "@key": {"@fields": ["name" ], "@type":"Lexical"}, "@type":"Class"},
        {"@id":"Reactor", "@type":"Class", "name":"xsd:string"},
        {"@id":"ResearchReactor", "@inherits":"Reactor", "@key": {"@fields": ["name" ], "@type":"Lexical"}, "@type":"Class"}
        ]
        

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

    return <div className="w-100">
        <DiffViewer 
            oldValue={doc[OLD_VALUE]} 
            newValue={doc[CHANGED_VALUE]}
            //frame={frames}
            frame={testFrames}
            type={type}
            diffPatch={diff}/>
    </div>
}

