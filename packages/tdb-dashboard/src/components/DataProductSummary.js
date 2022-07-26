import React, {useState, useEffect} from "react"
import {Col} from "react-bootstrap"
import {BsBriefcase, BsBucket} from "react-icons/bs"
import {BiGitCommit} from "react-icons/bi"
import {WOQLClientObj} from '../init-woql-client'
import {BranchControl} from "../hooks/BranchControl"

export const DataProductSummary = ({dataProductDetails}) => {

    const {branches, branch, ref} = WOQLClientObj()
    const [branchCount, setBranchCount]= useState(0)

    useEffect(() => {
        let count=0
        for (var key in branches){
            count+=1
        }
        setBranchCount(count)
    }, [branches])
   
    return <div className="d-flex mb-5">
        <div className="col-4 col-xl">
            <div className="card">
                <div className="card-body">
                    <div className="row align-items-center gx-0">
                        <div className="col">
                            <h6 className="text-uppercase text-muted mb-2">
                            Branches
                            </h6>
                            <span className="h2 mb-0">
                            {branchCount}
                            </span>
                        </div>
                        <div className="col-auto">
                            <span className="h2 text-muted mb-0"><BsBriefcase/></span>
                        </div>
                    </div> 
                </div>
            </div>
        </div>

        <div className="col-4 col-xl">
            <div className="card">
                <div className="card-body">
                    <div className="row align-items-center gx-0">
                        <div className="col">
                            <h6 className="text-uppercase text-muted mb-2">
                            Size
                            </h6>
                            <span className="h2 mb-0">
                            345 KB
                            </span>
                        </div>
                        <div className="col-auto">
                            <span className="h2 text-muted mb-0"><BsBucket/></span>
                        </div>
                    </div> 
                </div>
            </div>
        </div>

        <div className="col-4 col-xl">
            <div className="card">
                <div className="card-body">
                    <div className="row align-items-center gx-0">
                        <div className="col">
                            <h6 className="text-uppercase text-muted mb-2">
                            COMMITS
                            </h6>
                            <span className="h2 mb-0">
                            7344
                            </span>
                        </div>
                        <div className="col-auto">
                            <span className="h2 text-muted mb-0"><BiGitCommit/></span>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    </div>
}


