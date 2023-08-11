import React, { useCallback } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  MiniMap,
  Controls,
  Background,
  Node,
  Edge, 
  Panel,
  Position,
  ConnectionMode, 
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { GraphContextObj } from '../hook/graphObjectContext'
import { ConstraintsComponent } from '../detailsComponent/ConstraintsComponent';
import { ParentsFilter, GetTitle } from '../detailsComponent/ParentsFilter';
import { createNodesAndEdges } from './utils.js';
import Card from "react-bootstrap/Card"
import Stack from "react-bootstrap/Stack"
//import ButtonEdge from './ButtonEdge';
//import SelfConnectingEdge from './SelfConnectingEdge';
import BiDirectionalEdge from './BiDirectionalEdge';
import BiDirectionalNode from './BiDirectionalNode';
import {Accordion} from '../../form/Accordion';
import {RelationshipView} from '../relationshipView/RelationshipView'
import { PanelLegend } from "./GraphComponents"

const circle__style =  {
  height: "10px",
  width: "10px",
  backgroundColor: "#f8f8f8"
}

const selected__node__circle__style = {
  height: "10px",
  width: "10px",
  backgroundColor: "#FF0072",
}


const edgeTypes = {
  bidirectional: BiDirectionalEdge,
};

const nodeTypes = {
  bidirectional: BiDirectionalNode,
};

const RelationshipGUI = (props) => {
  const { 
    changeCurrentNode,
    selectedNodeObject,
    objPropsRelatedToClass,
    mainGraphObj,
    nodePropertiesList 
  } = GraphContextObj();

  const propertyList = nodePropertiesList || {}

  let { initialNodes, initialEdges } = createNodesAndEdges(selectedNodeObject, objPropsRelatedToClass, propertyList, mainGraphObj);
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges); 

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  if(props.view === `UI_VIEW`) {
    return <div style={{height: "800px"}}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        snapToGrid={true}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        defaultViewport={ {x: -250, y: 0, zoom: 0.5} }
        fitView
        //attributionPosition="top-right"
        connectionMode={ConnectionMode.Loose}
      >
      {/* <Controls />*/}
        <Panel position="right">
          <Accordion titleClassName="tdb__accordion__head"
            title="Info"  
            showBody={true}>
            <Card className='border-0'>
              <Card.Body>
                <label className='fst-italic text-muted small'> This view shows links between selected Document and other documents</label>
                <PanelLegend/>
                <Accordion showBody={false} 
                  arrowOpenClassName = "accordion__arrow fa fa-caret-up"
                  arrowCloseClassName = "accordion__arrow fa fa-caret-down"
                  title={<label className='fst-italic small fw-bold'>{`Relationship Links`}</label>}
                  className='w-100'
                  tooltip={`See Links`}>
                  <RelationshipView/>
                </Accordion>
              </Card.Body>
            </Card> 
          </Accordion>
        </Panel>
        <Background />
      </ReactFlow>
    </div>
  } 

  return <RelationshipView/>
  
};

export default RelationshipGUI;
