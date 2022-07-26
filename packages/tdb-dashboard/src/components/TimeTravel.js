import React, {useState, useEffect, useRef} from "react"
import {BiTimer, BiTime, BiMessageAltDetail} from "react-icons/bi"
import {BsFillCircleFill, BsCalendar} from"react-icons/bs"
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import {TimeTravelControl} from "../hooks/TimeTravelControl"
import {Button, Card, Row, Col} from "react-bootstrap"
import {TERMINUS_SUCCESS} from "./constants"
import {Alerts} from "./Alerts"
import {AiOutlineUser} from "react-icons/ai"
import {printtsDate, printtsTime} from "./utils"
import {WOQLClientObj} from '../init-woql-client'
import {FaPlus} from "react-icons/fa"
import {Loading} from "./Loading"
import {PROGRESS_BAR_COMPONENT} from "./constants"
import {BranchSelector} from "./BranchSelector"
import {DatePicker} from "./DatePicker"
import {FaInfoCircle} from "react-icons/fa"


export const TimeTravel = ({show}) => {
 
    let cardColor = "#303030", transparantColor = "transparent", activeColor = "#00bc8c"
    const  {branch, chosenCommit,setHead} = WOQLClientObj()
  
    const {currentItem, 
        dataProvider, 
        //setSelectedValue, 
        setCurrentDay,
        loadNextPage,
        olderCommit, 
        loadPreviousPage,
        setReloadQuery,
        currentDay,
        setStartTime,
        loading,
        setLoading,
        } = TimeTravelControl() 

    useEffect(() => { // when new commit logs are loaded on click of previous or next 
        if(dataProvider.length > 0) {
            setLoading(false)
        }
    }, [dataProvider])
    
    const [reportAlert, setReportAlert] = useState(false)

    const handleTimeTravel = (e, commit, selectedVaue) => {
        e.preventDefault()
        //setSelectedValue(selectedVaue)
        //setHead sets chosenCommit too
        if(commit && setHead){
            setHead(branch, commit)
         }
    }
  
    useEffect(() => {
        if(chosenCommit && setHead){
            setHead(branch, chosenCommit)
            let message = `The state of data product has been set to date ${chosenCommit.label}`
            setReportAlert(<Alerts message={message} type={TERMINUS_SUCCESS} onCancel={setReportAlert}/>)
         }
    }, [chosenCommit])

    // useEffect(() => {
    //     if(show){
    //         setReloadQuery(Date.now())
    //     }
    // }, [show])


    const TimelineElements = () => {
        if(!dataProvider) return <div/>

        let timeElements = []
        let selectedCounter = 0

        dataProvider.map((item) => {

            var iconStyle = { background: transparantColor, color: '#444' }
            var disabled = false
            var cardHeaderDateColor="text-warning"
            var currentDateColor 
            //to be review I had select in the dataprovider
            
            if(chosenCommit && chosenCommit.commit == item.commit) { // to highlight current commit on jumping to a particular commit
                iconStyle = { background: activeColor, color: '#444' }
                disabled = true
                currentDateColor = "current-time-point"
                cardHeaderDateColor = "text-dark"
            }else if (item.isHeadCommit){
                iconStyle = { background: activeColor, color: '#444' }
                disabled = true 
                currentDateColor = "current-time-point"
            }

            timeElements.push(<VerticalTimelineElement key={item.commit} 
                className="vertical-timeline-element--work"
                contentStyle={{ background: cardColor, color: '#fff' }}
                contentArrowStyle={{ borderRight: '7px solid #00bc8c' }}
                iconStyle={iconStyle}
                icon={<BsFillCircleFill />}
                >
                <Card variant="success" className=" time-travel-card" id={item.commit}>

                    <Card.Header className={`d-flex ${currentDateColor}`}>
                      <h6 className="w-100 float-left">
                          Commited on 
                          <strong className={`ml-1 ${cardHeaderDateColor}`}>{printtsDate(item.time)}</strong></h6>
                      <h6 className="d-flex"><BiTime className="mr-1"/>{printtsTime(item.time)} </h6>
                    </Card.Header>

                    <Card.Body>
                        <h6 className="text-muted">
                          <AiOutlineUser className="mr-3 ml-3 mt-1"/>{item.author}
                        </h6>
                        <h6 className="text-muted">
                            <BiMessageAltDetail className="mr-3 ml-3 mt-1"/>{item.message}
                        </h6>
                        <div>
                            {!disabled && <Button variant="light" 
                              className="mr-3" 
                              title={"Time Travel to this Commit"} 
                              onClick={(e) =>   handleTimeTravel(e, item, selectedCounter)}>
                                <BiTimer className="me-2"/>{"Time Travel to this point"}
                            </Button>}
                            {disabled && <h6 className="text-success mt-3">
                                You are at this point in time  
                            </h6>}
                        </div>
                    </Card.Body>
                </Card>
            </VerticalTimelineElement>  )  
            selectedCounter += 1
        })

        return timeElements
    }

    function handleLoadMore() {
        setLoading(true);
        loadNextPage();
    }


    //only if the older commit has a parent we can load extra commit
    return (
      <React.Fragment>
        {/*reportAlert && <React.Fragment>{reportAlert}</React.Fragment>*/}
        

        <Row>
          <Col md={6}>
            <h6 className="text-muted fw-bold">
              <FaInfoCircle className="mr-2" />
              Time Travel to a selected Date
            </h6>
            <DatePicker currentDay={currentDay} setStartTime={setStartTime} />
          </Col>
          <Col md={6}>
            <h6 className="text-muted fw-bold">
              <FaInfoCircle className="mr-2" />
              Time travel on a selected Branch
            </h6>
            <BranchSelector />
          </Col>
        </Row>

        {dataProvider.length > 0 && loading==false ? (
          <VerticalTimeline layout="1-column-left" className="mt-3">
            <TimelineElements />
            {/*olderCommit && olderCommit.parent && 
                <Button variant="link" className="float-right text-info" onClick={loadPreviousPage}>Load More</Button>
            */}
            {olderCommit && (
              <VerticalTimelineElement
                iconOnClick={handleLoadMore}
                iconClassName="time-travel-load-more-icon"
                icon={
                  <FaPlus
                    className="text-info"
                    style={{ cursor: "pointer" }}
                    title="Load more"
                  />
                }
              />
            )}
          </VerticalTimeline>
        ) : (
          <Card variant="success">
            <Card.Header className={`d-flex`}>
            {loading ? <Loading message="Loading Commit Logs from History" type={PROGRESS_BAR_COMPONENT}/> :  <h6 className="w-100">No commits found</h6>}
             
            </Card.Header>
          </Card>
        )}
      </React.Fragment>
    );
}

