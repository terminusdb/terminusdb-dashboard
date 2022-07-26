import React from "react"
import {Card, Button} from "react-bootstrap"
import {WOQLClientObj} from '../init-woql-client'
import {AiOutlineClose, AiOutlineRollback} from "react-icons/ai"
import {TimeTravel} from "./TimeTravel"

export const TimeTravelContainer = ({show, setShowTimeTravel}) => { 
    const {branch,setHead}=WOQLClientObj()

    const goToLatestCommit = () => {
      setHead("main", { commit: false, time: false });
    };

    let sliderClass = 'time-travel-slider'
    if(show) {
        sliderClass = 'time-travel-slider open'
    }

    return <div className={`mt-5 ${sliderClass}`}>
        <Card variant="dark" className="time-travel-scroller">
                <Card.Header className="d-flex">
                    <h6 className="mr-4 mt-2 w-100 float-left">Time travel on branch  -  <strong className="text-success">{branch}</strong></h6>
                    <div className="float-right w-100 text-right">
                        <Button variant="light" className="mr-3" title={"Go to the latest commit of main branch"} onClick={(e) => goToLatestCommit()}>
                            <AiOutlineRollback />
                        </Button>
                        <Button variant="light" className="mr-3" title={"Close Time Travel View"} onClick={(e) => setShowTimeTravel(false)}>
                            <AiOutlineClose />
                        </Button>
                    </div>
                </Card.Header>
                <Card.Body>
                   {show && <TimeTravel show={show}/>}
                </Card.Body>
        </Card>
    </div>
}