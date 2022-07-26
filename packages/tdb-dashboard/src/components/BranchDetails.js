import React, {useState, useEffect} from "react"
import {Row, Col} from "react-bootstrap"
import {BiGitCommit, BiCircle} from "react-icons/bi"
import {RiBubbleChartLine} from "react-icons/ri"
import {GoLink} from "react-icons/go"
import {BsPencil, BsThreeDots, BsLayoutThreeColumns} from "react-icons/bs"
import {ScopedDetails} from "../hooks/ScopedDetails"
import {formatBytes, formatTripleCount, formatCommits, formatPropertiesCount, formatClassesCount, formatLastCommitTimeStamp} from "./utils"

export const BranchDetails = ({woqlClient, branch, dataProduct}) => {

    const [latest]= ScopedDetails(woqlClient, branch, dataProduct)
    const [details, setDetails]=useState(false)

    useEffect(() => {
        setDetails(latest)
    }, [latest])


    return <Col md={12} className="px-xl-0">
        {details &&  <React.Fragment>
            <div className="d-flex align-items-center">
                <div className="d-block col-md-2">
                    <h6 className="fw-normal text-muted mb-2">Size</h6>
                    <h3>{formatBytes(details['Size']['@value'])}</h3>
                </div>
                <div className="d-block col-md-2">
                    <h6 className="fw-normal text-muted mb-2">Triples</h6>
                    <h3>{formatTripleCount(details['Triples']['@value'])}</h3>
                </div>
                <div className="d-block col-md-2">
                    <h6 className="fw-normal text-muted mb-2">Commits</h6>
                    <h3>{formatCommits(details['Commits']['@value'])}</h3>
                </div>
                <div className="d-block col-md-2">
                    <h6 className="fw-normal text-muted mb-2">Classes</h6>
                    <h3>{formatClassesCount(details['Classes']['@value'])}</h3>
                </div>
                <div className="d-block col-md-2">
                    <h6 className="fw-normal text-muted mb-2">Properties</h6>
                    <h3>{formatPropertiesCount(details['Properties']['@value'])}</h3>
                </div>
            </div>
            <div className="d-block mt-5 mb-5 align-items-center col-md-12">
                <h6 className="fw-normal text-muted mb-2">Last Updated by </h6>
                <h6>{formatLastCommitTimeStamp(details)}</h6>
            </div>
        </React.Fragment>
        }
    </Col>
    
}