import {useEffect, useState} from "react"
import {executeQueryHook} from "./executeQueryHook"
//import {getDocumentClasses} from '../queries/GeneralQueries'

export const DatabaseInfoControl = (woqlClient, dataProduct) => {

    const [currentClass, setCurrentClass] = useState(false)
   // const [classQuery, setClassQuery] = useState(false)
    const [query, setQuery]=useState(false)
    const [properties, setProperties]=useState(false)
    const [classes, setClasses]=useState(false)
    const [propertyResults]=executeQueryHook(woqlClient, query)
   // const [classesResults]=executeQueryHook(woqlClient, classQuery)

    useEffect(() => {
        setCurrentClass(false)
        setProperties(false)
        setQuery(false)
    }, [dataProduct])

    useEffect(() => {
        if(woqlClient){
            woqlClient.document_classes
            //old query for document
            //let q = getDocumentClasses(dataProduct)
            //setClassQuery(q)
        }
    }, [woqlClient, dataProduct])

    useEffect(()=> {
        if(propertyResults) {
            setProperties(propertyResults)
        }
        
    }, [propertyResults])

   /* useEffect(()=> {
        woqlClient.classes().then(result=>{
            setClasses.prototype(result)
        })
         if(classesResults){
            setClasses(classesResults)
        }
        
    }, [classesResults])*/

    return {
        setCurrentClass,
        currentClass,
        setQuery,
        properties,
        classes
    }

}