import React from "react"
import Card from "react-bootstrap/Card"
import Stack from "react-bootstrap/Stack"
import { ConstraintsComponent } from './ConstraintsComponent';
import { ParentsFilter } from './ParentsFilter';
import  RelationshipFlow  from "../relationshipView/RelationshipFlow"
import { GetTitle } from "./ParentsFilter"
import {Accordion} from  '../../form/Accordion';

export const RelationShipElement = (props) => {

  //if(props.view === `UI_VIEW`) {
    return <Card bg="dark">
     {/* <Card.Header className="border-0">
        <label className="text-muted fst-italic small">{`Shows relationship between documents`}</label>
      </Card.Header>*/}
      <Card.Body className='p-2'>
      {/*props.nodeData.type!=='ChoiceClass' &&
        <ParentsFilter key={`parent__${props.nodeData.name}`} view={props.view}/>
      */}
        {/*<Accordion titleClassName="tdb__accordion__head"
          //title="Add/Remove Parents"  
          //showBody={true}
          title={<GetTitle listDataProvider={props.nodeData.allChildren} title = {"Children List"}/>}
          tooltip="View and Add/Remove Parents">
            <ConstraintsComponent key={`const__${props.nodeData.name}`} view={props.view}/>
        </Accordion>*/}
       <RelationshipFlow nodeData={props.nodeData} view={props.view}/>
      </Card.Body>
    </Card>
  //} 

  /*return <Card className='my-1 bg-transparent border-0'>
    <Card.Body className='p-2'>
      {props.nodeData.type!=='ChoiceClass' &&
        <ParentsFilter key={`parent__${props.nodeData.name}`} view={props.view}/>
      }
      <ConstraintsComponent key={`const__${props.nodeData.name}`}/>
      </Card.Body>
  </Card>*/

}