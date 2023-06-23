import React  from "react";
import {Container , Card, Button, Col,Row} from "react-bootstrap"
import Stack from "react-bootstrap/Stack"
import { useParams, NavLink} from "react-router-dom";
import { RiUserFollowFill } from "react-icons/ri"
import { BsToggleOn, BsSearch, BsKey } from "react-icons/bs"
import { RxCheckbox } from "react-icons/rx"

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


function getStep1() {
  return <>
    Visit <NavLink href="https://platform.openai.com/account/api-keys" className={"mr-1"}>Open AI</NavLink>
    and create a new Secret API Key
  </>
}

function getStep2() {
  let { organization } = useParams()
  return <>
   Copy and paste your generated OpenAI API Key in your <NavLink to={`/${organization}/profile`} className={"mr-1"}>Profile page</NavLink>
  </>
}

function getStep3() {
  return <>
    In your profile turn on the Indexing button next to the OpenAI Key field. All data products in your team will begin to index.
  </>
}

function getStep4() {
  return <>
    Use VectorLink to Semantically search your data products and use the vector embeddings to talk to OpenAI.
    Click <NavLink href="https://terminusdb.com/docs/" className={"mr-1"}>here</NavLink>for more info on how to use VectorLink.
    </>
}

export const DisplayNoIndexingAction = ({ helpDescription }) => {
  return <div className="text-center justify-content-center">
    <h4 className="text-light fw-bold">Get started with Indexing Actions</h4>
    <h5 className="text-light fw-bold">{helpDescription}</h5>
    <Container className="my-5">
      <h6 className="text-light small">
        {`After following the below steps, you can start Indexing your data using the Change Request workflow`}
      </h6>
      <Row>
        <Col md={3}></Col>
        <Col md={6}>
          <StepDetail stepNumber={1} stepComponent={getStep1()} icon={<BsKey/>}/>
          <StepDetail stepNumber={2} stepComponent={getStep2()} icon={<RiUserFollowFill/>}/>
          <StepDetail stepNumber={3} stepComponent={getStep3()} icon={<RxCheckbox/>}/>
          <StepDetail stepNumber={4} stepComponent={getStep4()} icon={<BsSearch/>}/>
        </Col>
        <Col md={3}></Col>
      </Row>
      {/*<Row>
        <Col md={6}><StepDetail stepNumber={1} stepComponent={getStep1()} icon={<BsKey/>}/></Col>
        <Col md={6}><StepDetail stepNumber={2} stepComponent={getStep2()} icon={<RiUserFollowFill/>}/></Col>
      </Row>
      <Row>
        <Col md={6}>
          
          <StepDetail stepNumber={3} stepComponent={getStep3()} icon={<RxCheckbox/>}/>
          
        </Col>
        <Col md={6}>
        <StepDetail stepNumber={4} stepComponent={getStep4()} icon={<BsSearch/>}/>
        </Col>

      

      </Row>*/}
      
    </Container>
  </div>
}