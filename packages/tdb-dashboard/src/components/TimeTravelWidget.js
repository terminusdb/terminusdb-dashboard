
import React from "react"
import {Button} from "react-bootstrap"
import {BiTimer} from "react-icons/bi"
import {WOQLClientObj} from '../init-woql-client'

export const TimeTravelWidget = ({setShowTimeTravel}) => {
    const {chosenCommit}=WOQLClientObj()
    const iconColor = chosenCommit && chosenCommit.time ? "#f39c12" : "#00bc8c"

    return <Button className="btn-lg border-0" 
        title="Time Travel through history of Data Product" 
        variant="outline-dark"
        onClick={(e) => setShowTimeTravel(true)} > 
            <BiTimer style={{color: iconColor, fontSize: "35px"}} className="time-travel-icon"/>
    </Button>
}