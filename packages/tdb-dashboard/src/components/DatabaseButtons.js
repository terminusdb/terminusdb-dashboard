import React, { useEffect } from 'react';
import {TDBReactWorkerButtonGroup} from '@terminusdb-live/tdb-react-layout';
import {DOCUMENT_CLASS_BUTTONS_CONFIG, PROPERTY_BUTTONS_CONFIG, DOCUMENT_CLASS_LABEL, PROPERTIES_LABEL, NO_PROPERTIES} from "./constants.js"
import {getPropertiesOfClass, getPropertyRelation, getDocumentClasses} from '../queries/GeneralQueries'
import {isArray, shortenURL} from "./utils"
import {DatabaseInfoControl} from "../hooks/DatabaseInfoControl"
import {QueryPaneObj} from "../hooks/queryPaneContext"
import {WOQLClientObj} from '../init-woql-client'
 
// db list
export const DatabaseButtons = () => {
    const {woqlClient} = WOQLClientObj()
    const {addQueryPane} = QueryPaneObj() 
    
    if(!woqlClient) return ""
    const dataProduct = woqlClient.db()

    const { 
        setCurrentClass,
        currentClass,
        setQuery,
        properties,
        classes} = DatabaseInfoControl(woqlClient, dataProduct) 

    const handleClassButtonClick = (id) => {
        let q = getPropertiesOfClass(id, dataProduct, woqlClient)
        setCurrentClass(shortenURL(id))
        setQuery(q)
    }

    const handlePropertyClick = (property) => {
        let q = getPropertyRelation(property, dataProduct, woqlClient)
        addQueryPane(q)
    }
    
    return <React.Fragment>
        {/*<hr className="my-3 mr-3 border-indigo dropdown-divider nav-bar-dropdown-divider" role="separator"></hr>
        <p className="text-muted">Connected to - <strong className="text-info">{dataProduct}</strong></p>*/}
        <p className="nav-labels text-muted">{DOCUMENT_CLASS_LABEL}</p>
        <div className="flex-column mt-3 mb-5">
            {/*<TDBReactWorkerButtonGroup  onLoad="https://hub-dev.dcm.ist/api/workers/admin/cg6zav1618490058380" config={DOCUMENT_CLASS_BUTTONS_CONFIG} onClick={handleClassButtonClick}/>*/}
            <TDBReactWorkerButtonGroup startData={classes} config={DOCUMENT_CLASS_BUTTONS_CONFIG} onClick={handleClassButtonClick}/>
            
        </div>
        
        {properties && isArray(properties) && <React.Fragment>
            <p className="nav-labels text-muted">{PROPERTIES_LABEL}</p>
            <div className="flex-column mt-3">
                <TDBReactWorkerButtonGroup startData={properties} config={PROPERTY_BUTTONS_CONFIG} onClick={handlePropertyClick}/>
            </div>
        </React.Fragment>
        }

        {currentClass && !isArray(properties) && <React.Fragment>
            <p className="nav-labels text-muted">{PROPERTIES_LABEL}</p>
            <div className="flex-column mt-3">
                <h6 className="nav-labels">{NO_PROPERTIES + currentClass}</h6>
            </div>
        </React.Fragment>
        }
    </React.Fragment>
}