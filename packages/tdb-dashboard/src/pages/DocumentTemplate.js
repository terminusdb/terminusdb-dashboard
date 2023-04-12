import React, { useState, useEffect } from "react"
import { Layout } from "./Layout"
import { Outlet } from 'react-router-dom'
import { Button } from "react-bootstrap"
import { FrameViewer } from "@terminusdb/terminusdb-documents-ui"
import { WOQLClientObj } from '../init-woql-client'
import { DocumentsUIHook } from "@terminusdb/terminusdb-documents-ui"
import { canUseLayoutEffect } from "@apollo/client/utilities"

const TestComponent = ({ setTest }) => {
    function handleClick (e) {
        setTest(Date.now())
    }
    return <Button variant="light" className="btn btn-sm" onClick={handleClick}>Add</Button>
}

const Display = () => {

    const {
        woqlClient, 
    } = WOQLClientObj()

    const  {frames, getUpdatedFrames} = 
    DocumentsUIHook(woqlClient)

    useEffect (() => {
        if(woqlClient) {
            let framesTST = getUpdatedFrames()
        }
    }, [woqlClient]) 

   
    //return <>{"TEST"}</>

    return <>{frames && <FrameViewer
        frame={frames}
        uiFrame={{}} 
        type={"Asset"}
        formData={{}}
        //onSelect={<Search/>}
        //onSelect={handleSelect} 
        //language={"ka"} 
        mode={"Create"}
        //hideSubmit={mode===VIEW ? true : false}
        //onTraverse={handleTraverse}
        //submitButton={submitJSON}
        //onSubmit={handleSubmit}
        //className={"test-calander"}
    />}
    </>
}

export const DocumentTemplate = (props) => {
    const [test, setTest] =useState(false)
    return <Layout >
            <main role="main" className="content ml-5 mr-5 mb-5 d-flex flex-column">
                <TestComponent setTest={setTest}/>
                { test && <Display/>}
                <Outlet/> 
            </main>
        </Layout>
}