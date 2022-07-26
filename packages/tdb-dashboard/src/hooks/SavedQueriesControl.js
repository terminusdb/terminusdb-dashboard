import {useState, useEffect} from "react"
import {executeQueryHook} from "./executeQueryHook"
import {getStoredQueriesNames} from "../queries/GeneralQueries"
import {WOQLClientObj} from '../init-woql-client'
import {isArray, convertToWOQL} from "../components/utils"

export const SavedQueriesControl = (addQueryPane) => {

    const {woqlClient} = WOQLClientObj()
    const [savedQueryId, setSavedQueryId] = useState(false)

    const [query, setQuery] = useState(false)
    const [queryObject, setQueryObject] = useState(false)

    const [dataProvider]=executeQueryHook(woqlClient, query)
    const [dataProviderQueryObject]=executeQueryHook(woqlClient, queryObject)

    

    useEffect(() => {
        if(woqlClient){
            let q = getStoredQueriesNames()
            setQuery(q)
        }
    }, [woqlClient])

    useEffect(() => {
        var qd=""
        if (isArray(dataProviderQueryObject)) {
            for (var key in dataProvider){
                for (var k in dataProvider[key]) {
                    if(savedQueryId == dataProvider[key]["Worker"]) {
                        if(k == "Query"){
                            qd=dataProvider[key][k]["@value"]
                            break
                        }
                    }
                }
                
            }
            let woqlQuery=convertToWOQL(qd)
            addQueryPane(woqlQuery)
        }
    }, [dataProviderQueryObject])


    return {
        dataProvider,
        setSavedQueryId,
        setQueryObject
    }
}