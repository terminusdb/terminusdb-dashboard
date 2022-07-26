
import {storeQueries} from "../queries/GeneralQueries"

export const handleRunQuery = (woqlQuery, updateQuery, commitMessage) => {
    if(woqlQuery){
        if(updateQuery) updateQuery(woqlQuery, commitMessage)
    }
}

export const handleError = (err) => {
    console.log("error", err)
}


export const handleSaveQuery = (saveQuery, setSaveQuery, saveQueryName) => {
    if(saveQuery){
        let q = storeQueries(saveQuery, saveQueryName)
        if(setSaveQuery) setSaveQuery(q)
    }
}