import React, {useState, useEffect} from "react"
import {Button, Modal} from "react-bootstrap"
import {WOQLClientObj} from '../init-woql-client' 
import ProgressBar from 'react-bootstrap/ProgressBar'
import Stack from 'react-bootstrap/Stack'
import { useOpenAI } from "../hooks/useOpenAI"
import { ErrorMessageReport } from "./ErrorMessageReport"
import {SiOpenai} from "react-icons/si"
import { useParams } from "react-router-dom"
 
export const OpenAIModal = ({organization, dataProduct,show,showModal}) => {
    const {currentCRObject} = WOQLClientObj()
    const {changeid} = useParams()
    const {startIndexer ,loading , percentTask, error, setError} = useOpenAI()

    const handleClose = () =>{
        showModal(percentTask)
    }

    const startIndexHandler = () =>{
        //currentCRObject
        startIndexer(changeid,`${organization}/${dataProduct}`,currentCRObject.tracking_branch)
    }

    return <Modal backdrop="static" keyboard={false} size="xl" as={Modal.Dialog} centered show={show} onHide={handleClose}>     
        <Modal.Header>
            <Modal.Title className="h4"><SiOpenai size={24} className="mx-3 mr-3"/> <strong className="text-info"> Index the change request  </strong></Modal.Title>
            <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body className="p-5">
           {error && <ErrorMessageReport error={error} setError={setError}/>}
            <Stack gap={2} className="col-md-5 mx-auto w-100">
            {loading ===false && percentTask< 1 && <Button  variant="info" onClick={startIndexHandler} size="lg">
                    Indexing Your Data
                </Button>}
                { percentTask >0  && percentTask < 1 && <h3>We are indexing your data</h3>}
                {percentTask === 1 && <h3>Indexing complete</h3>}
                {percentTask>0 && <ProgressBar animated variant="info" now={percentTask*100} label={`${percentTask*100}%`} />}
            </Stack>
            </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
    </Modal>
}