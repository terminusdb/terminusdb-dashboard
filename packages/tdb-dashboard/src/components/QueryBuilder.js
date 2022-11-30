import React, {useState} from "react"
import {Card, OverlayTrigger, Col,Button} from "react-bootstrap"
import {USE_QUERY_CONFIG} from "./constants"
import {BsClipboard} from "react-icons/bs"
import {trimWOQL, copyToClipboard} from "./utils"
import {queryDescription} from "../queryDescription"

export const QueryBuilder = ({showQueryBuilder}) => {
 
    const [info, setinfo] = useState(false)

    function handleExampleCopy (example) {
        copyToClipboard(example)
    }

    /* Description of selected query */
    const Documentation = ({info}) => { 
        return <Card  size="sm" className="query-description-card">
            <Card.Header>
                <strong className="mt-1">{trimWOQL(info.id)}</strong>
            </Card.Header>
            <Card.Body className="d-block">
                <h6>{info.description}</h6>
                {info.params.length>0 && <React.Fragment>
                    <h6 className="text-info fw-bold mt-3">Params</h6>
                    <Params params={info.params}/>
                </React.Fragment>}
                {info.examples && <React.Fragment>
                    <h6 className="text-info fw-bold mt-3">Examples</h6>
                    <code>{info.examples[0]}</code> <br/>
                    <Button {...USE_QUERY_CONFIG} onClick={(e) => handleExampleCopy(info.examples)}>
                        <i className={USE_QUERY_CONFIG.icon}/>{USE_QUERY_CONFIG.label}
                    </Button>
                </React.Fragment> }
                
            </Card.Body>
            
        </Card>
    }

    /* list of queries */
    const Queries = () => {
        let arr=[]

        function handleClick (e, item) {
            setinfo(item)
        }

        queryDescription.map((item) => {
            arr.push(<OverlayTrigger
                trigger="click"
                key={"left"}
                placement={"left"}
                rootClose={true}
                overlay={
                
                  <div id={`popover-positioned-${"left"}`} style={{width: "400px"}}>
                    <Documentation info={item}/>
                  </div>
                }
              >
                    <pre className="query-name-pre mr-2 ml-2">
                        {trimWOQL(item.id)}
                    </pre> 
            </OverlayTrigger>
            )
        })
        return arr
    } 

    /* params of selected query */
    const Params = ({params}) => {
        let arr = []
        params.map(item => {
            arr.push(
                <React.Fragment>
                    <h6>{`${item.name} - ${item.description}`}</h6>
                </React.Fragment>
            )
        })
        return arr
    }

    return <Card variant="dark">  
        <Card.Body className= "d-flex" style={{background: "#444"}}>
            <Col className="query-builder-card">
                <Queries/>
            </Col>
        </Card.Body>
    </Card>
}