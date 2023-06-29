import React, { useEffect }  from "react";
import {Container , Card, Button, Col,Row,Alert} from "react-bootstrap"
import Stack from "react-bootstrap/Stack"
import { useParams, NavLink} from "react-router-dom";
import { RiUserFollowFill } from "react-icons/ri"
import { BsToggleOn, BsSearch, BsKey } from "react-icons/bs"
import {SiHandlebarsdotjs} from "react-icons/si"
import { useOpenAI } from "../hooks/useOpenAI";
import { RxCheckbox } from "react-icons/rx"
import {WOQLClientObj} from '../init-woql-client'
import {FiAlertTriangle} from 'react-icons/fi'

const StepDetail = ({ stepNumber, stepComponent, icon}) => {
  
  return <Card className="bg-transparent mb-3 border border-secondary justify-content-center"
    style={{height: "9rem"}}>
    <Card.Body>
      <Stack>
        <h3 className="text-light fw-bold">{icon}</h3>
        <div className="text-light">
          <span className="fw-bold">{`${ stepNumber }.  `}</span> { stepComponent }
        </div>
      </Stack>
    </Card.Body>
  </Card>
}


function getStep(stepNumber,supMode) {
  let { organization,dataProduct } = useParams()
  const stepOptions= {
    "step1":<>
              Visit <NavLink href="https://platform.openai.com/account/api-keys" className={"mr-1"}>Open AI</NavLink>
              and create a your Secret API Key
            </>,
    "step2": {"LOCAL":<>
                Copy and paste your generated OpenAI API Key in your environment variables, restart the application
              </>,
              "REMOTE":<>
                Copy and paste your generated OpenAI API Key in your <NavLink to={`/${organization}/profile`} className={"mr-1"}>Profile page</NavLink>
                </>
              },
    "step3":<>
            Go to <NavLink to={`/${organization}/${dataProduct}/openai_configuration`} className={"mr-1"}>Open AI configuration </NavLink> page
            to add a graphql query and an handlebar template for every Document
            </>,
    "step4": <>
              In your profile turn on the Indexing button next to the OpenAI Key field.
              All data products in your team will begin to index.
              </>,
    "step5": <>
              Use VectorLink to Semantically search your data products and use the vector embeddings to talk to OpenAI.
              Click <NavLink href="https://terminusdb.com/docs/" className={"mr-1"}>here</NavLink>for more info on how to use VectorLink.
              </>
  }
  const step = stepOptions[`step${stepNumber}`]
  return supMode ? step[supMode] : step
}


export const DisplayNoIndexingAction = ({ helpDescription }) => {
  const {clientUser} = WOQLClientObj()
  const connection_type = clientUser.connection_type==="LOCAL" ? "LOCAL" : "REMOTE"
  
  return <div className="text-center justify-content-center">
    <Alert variant="primary bg-dark text-warning" className="mx-4 ml-4 mr-4"><span className="d-flex justify-content-center"><FiAlertTriangle size={24} className="mr-3"/><h5>
      Experimental Feature</h5></span></Alert> 
    <h4 className="text-light fw-bold">Get started with Indexing Actions</h4>
    <h5 className="text-light fw-bold">{helpDescription}</h5>
    <Container className="my-5">
      <h6 className="text-light small">
        {`After following the below steps, you can start Indexing your data using the Change Request workflow`}
      </h6>
      <Row>
        <Col md={3}></Col>
        <Col md={6}>
          <StepDetail stepNumber={1} stepComponent={getStep(1)} icon={<BsKey/>}/>
          <StepDetail stepNumber={2} stepComponent={getStep(2, connection_type)} icon={<RiUserFollowFill/>}/>
          <StepDetail stepNumber={3} stepComponent={getStep(3)} icon={<SiHandlebarsdotjs/>}/>
          <StepDetail stepNumber={4} stepComponent={getStep(4)} icon={<RxCheckbox/>}/>
          <StepDetail stepNumber={5} stepComponent={getStep(5)} icon={<BsSearch/>}/>
        </Col>
        <Col md={3}></Col>
      </Row>
    </Container>
  </div>
}