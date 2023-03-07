
import { FaPray } from "react-icons/fa"
import * as CONST from "../constants"
import { getAnyOfCreateNew } from "./helpers"

function getThing (alteredAnyOf, thing) {
    let frame = alteredAnyOf.filter(arr => arr.title === thing)
    return frame
}


function addLimitedAnyOfs(alteredAnyOf, limit, setted) {
    let anyOf = [...alteredAnyOf], settedLimit = setted
    if(limit === 3) {
        //anyOf = [alteredAnyOf[0]] // pass CONST.LINK_EXISTING_DOCUMENT
        anyOf = getThing (alteredAnyOf, CONST.LINK_EXISTING_DOCUMENT)
        settedLimit = true
        return { anyOf, settedLimit }
    }
    else {
        //anyOf = alteredAnyOf // CORRECT 1
        //anyOf=addLimitedAnyOfs([...alteredAnyOf], limit)
        limit += 1
        let rec = addLimitedAnyOfs([...alteredAnyOf], limit, settedLimit)
        if(rec.settedLimit) {
            // stop here
            anyOf = rec.anyOf
        }
        else {
            //anyOf = alteredAnyOf 
            //anyOf[1].properties["friends_with"]["anyOf"] = alteredAnyOf
            anyOf[0].properties["friends_with"]["anyOf"] = rec.anyOf
        }
        
    }
    console.log("anyOf", limit, anyOf)
    return { anyOf, settedLimit }
}


export function alterAnyOf(anyOf, exractedProperties, item) {
   
    let constructed = []
    let sampleAnyOf = [...anyOf]
    
    let alteredAnyOf = [...anyOf]

    anyOf.map(arr => {
        if(arr.title === CONST.LINK_EXISTING_DOCUMENT) {
            constructed.push(arr)
        }
        else {
            //CONST.LINK_NEW_DOCUMENT
            let createNew={}
            for(let props in arr) {
                if(props === "properties") {
                    createNew["properties"] = {}
                    // subProps
                    for(let subProps in arr["properties"]) {
                        createNew["properties"][subProps] = {}
                        if(subProps === item) {
                            // subSubProps
                            
                            for(let subSubProps in arr["properties"][subProps]) {
                                // anyOf
                                if(subSubProps === "anyOf") {
                                    let limit=0
                                    let limited = addLimitedAnyOfs(alteredAnyOf, limit, false)
                                    createNew["properties"][subProps]["anyOf"] = limited
                                }
                                //title/type/@metadata
                                else createNew["properties"][subProps][subSubProps] = arr["properties"][subProps][subSubProps] 
                            }
                        }
                        else createNew["properties"][subProps] = arr["properties"][subProps] // name
                    }
                }
                else createNew[props] = arr[props] // description/title
            }
        }
    })
    
    

    return alteredAnyOf
}



