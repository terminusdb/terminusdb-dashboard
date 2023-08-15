import React, {useState} from "react"
import {Card, Button} from "react-bootstrap"
import {WOQLClientObj} from '../init-woql-client'
import {AiOutlineClose, AiOutlineRollback} from "react-icons/ai"
import {TimeTravel} from "./TimeTravel"

export const TimeTravelContainer = ({show, setShowTimeTravel}) => { 
    const {branch,setHead}=WOQLClientObj()
    const [needRefresh,setNeedrefresh] = useState(Date.now())
    const goToLatestCommit = () => {
      setHead(branch, { commit: false, time: false });
      setNeedrefresh(Date.now())
    };

    let sliderClass = 'time-travel-slider'
    if(show) {
        sliderClass = 'time-travel-slider open'
    }

    return <div className={`mt-5 ${sliderClass}`}>
        <Card variant="dark" className="time-travel-scroller h-100">
                <Card.Header className="d-flex"> 
                    <h6 className="mr-4 mt-2 w-100 float-left">Time travel on branch  -  <strong className="text-success">{branch}</strong></h6>
                    <div className="float-right w-100 text-right">
                        <Button variant="light" className="mr-3" 
                            id={`roll_back_to_head`}
                            data-cy={`roll_back_to_head`}
                            title={`Go to the latest commit of ${branch} branch`} 
                            onClick={(e) => goToLatestCommit()}>
                            <AiOutlineRollback />
                        </Button>
                        <Button variant="light" 
                            data-cy={`close__time__travel__widget`}
                            id={`close__time__travel__widget`}
                            className="mr-3" title={"Close Time Travel View"} onClick={(e) => setShowTimeTravel(false)}>
                            <AiOutlineClose />
                        </Button>
                    </div>
                </Card.Header>
                <Card.Body>
                   {show && <TimeTravel refreshTime={needRefresh}/>}
                </Card.Body>
        </Card>
    </div>
}