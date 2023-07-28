import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, {
  addEdge,
  ConnectionLineType,
  Panel,
  Position,
  useNodesState,
  useReactFlow,
  useEdgesState,
  ReactFlowProvider,
  useStoreApi,
  setViewport
} from 'reactflow';
import dagre from 'dagre';
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Stack from "react-bootstrap/Stack"
import {GraphContextObj} from '../hook/graphObjectContext';
import 'reactflow/dist/style.css';
import {DetailsModelComponent} from '../detailsComponent/DetailsModelComponentView';
import {Accordion} from '../../form/Accordion';
import * as NODE_ACTION_NAME from '../utils/actionType'; 
import * as util from "./utils"
import { PanelLegend } from "./GraphComponents"
import { CLASS_TYPE_NAME } from '../utils/elementsName'
import Dropdown from 'react-bootstrap/Dropdown';
import { SchemaBuilderList } from "../detailsComponent/SchemaControlAccordian"

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

// node & edge set up
const nodeWidth = 172;
const nodeHeight = 36;
const position = { x: 0, y: 0 };
const edgeType = 'simplebezier';


const getLayoutedElements = (nodes, edges, direction = 'LR') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? 'left' : 'top';
    node.sourcePosition = isHorizontal ? 'right' : 'bottom';

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};



const Tree = (props) => { 

  //console.log("treeNodes", treeNodes)

  const {
    selectedNodeObject,
    changeCurrentNode,
    nodePropertiesList,
    addNewProperty,
    removeElement,
    objectPropertyList,
    objPropsRelatedToClass,
  } = GraphContextObj();
  
  
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const { setCenter, fitView } = useReactFlow();



  useEffect(() => {
    if(props.treeNodes) {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        props.treeNodes,
        props.treeEdges
      );
      setNodes(layoutedNodes)
      setEdges(layoutedEdges)
      if(layoutedNodes.length ) {
        let filtered = layoutedNodes.filter(arr => {
          if(arr.id !== 'ROOT' && arr.id !== 'DocumentClasses' && arr.id !== 'ChoiceClasses') 
            return arr
        })
        if(filtered.length) {
          const x = filtered[0].position.x + filtered[0].position.x / 2;
          const y = filtered[0].position.y //+ node.height / 2;
          const zoom = 1.85;
          setCenter(x, y, { zoom, duration: 1000 });
        }
        
      }
    }
  }, [props.treeNodes])

  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        nodes,
        edges,
        direction
      );

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );

  useEffect(() => {
    if(selectedNodeObject) { 
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === selectedNodeObject.id) {
            // it's important that you create a new object here
            // in order to notify react flow about the change
            node.style = { ...node.style, backgroundColor: '#FF0072' };
          } 
          else {
            node.style = { ...node.style, backgroundColor: util.getNodeBg(node.data.type) };
          }
          return node;
        })
      );
    }
  }, [selectedNodeObject]);

    
  
  
  const isEditMode = props.isEditMode === false ? false : true
  let showInfoComp=false
	if(!selectedNodeObject || !selectedNodeObject.name ||
		selectedNodeObject.type===CLASS_TYPE_NAME.SCHEMA_ROOT ||
		selectedNodeObject.type===CLASS_TYPE_NAME.SCHEMA_GROUP){
		showInfoComp=true;
	}

  const store = useStoreApi();
  const reactFlowWrapper = useRef(null);
  
  const focusNode = (selectedDocumentID) => {
    if(!selectedDocumentID) return
    const { nodeInternals } = store.getState();
    let foundNode = []
    const nodes = Array.from(nodeInternals).map(([, node]) => {
      if(node.id === selectedDocumentID) {
        foundNode.push(node)
        return
      }
    });

    if (foundNode.length > 0) {
      const node = foundNode[0];

      const x = node.position.x + node.position.x / 2;
      const y = node.position.y //+ node.height / 2;
      const zoom = 1.85;

      setCenter(x, y, { zoom, duration: 1000 });
    }};

    const FocusOnButton = () => {
      const [currentAccordianKey, setCurrentAccordianKey] = useState(false)
  
      function handleClicked (selectedDocument) {
        focusNode(selectedDocument)
        setCurrentAccordianKey(false)
      }
  
      function handleAccordianControl (selected) {
        setCurrentAccordianKey(selected)
      }
  
      return <Dropdown autoClose={currentAccordianKey ? "inside" : false}>
        <Dropdown.Toggle variant="secondary">
          {`Focus on `}
        </Dropdown.Toggle>
        <Dropdown.Menu >
          <Dropdown.Item className="gui__focus__dowpdown" onClick={(e) => {
            e.preventDefault();
            //focusNode(selectedNodeObject.id)
          }}>
            <SchemaBuilderList onClicked={handleClicked}
              currentAccordianKey={currentAccordianKey}
              handleAccordianControl={handleAccordianControl} 
              canAdd={false}/>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    }


  const onNodeClick = (event, node) => {
    //on node click 
    if(changeCurrentNode){
			changeCurrentNode(node.id);
		}
  }

  //console.log("nodes ---", nodes)
 
  return  <div style={{height: "1000px"}} ref={reactFlowWrapper} > 
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodeClick={onNodeClick}
    > 
      <Panel position="top-right">
      
        <FocusOnButton/>
      
        <Accordion titleClassName="tdb__accordion__head"
            title="Editor"   
            //className="panel__width"
            showBody={true}>
          <Card className="border border-secondary"  style={{backgroundColor : "black"}}>
            <Card.Body>
              <Stack direction="horizontal" gap={2}>
                <Button onClick={() => onLayout('LR')} variant="light" className="btn-sm ml-3">horizontal layout</Button>
                <Button onClick={() => onLayout('TB')} variant="light" className='ml-1 btn-sm'>vertical layout</Button>
              </Stack>
              <PanelLegend/>
              <div className='h-100 overflow-y-scroll'> 
                  {!showInfoComp && isEditMode===true &&
                    <DetailsModelComponent 
                      customClassName="bg-transparent mt-3"
                      tabBg={`transparent`}
                      objPropsRelatedToClass={objPropsRelatedToClass}
                      objectPropertyList={objectPropertyList}
                      removeElement={removeElement} 
                      addNewProperty={addNewProperty}
                      saveData={props.saveData} 
                      nodePropertiesList={nodePropertiesList}
                      currentNodeJson={selectedNodeObject}
                      custom={props.custom}
                      view={`GRAPH_VIEW`}
                      />}					
              </div>
            </Card.Body>
          </Card>
        </Accordion>
      </Panel>
    </ReactFlow>
  </div>
};

export const GUIComponent = (props) => {

  const {
    selectedNodeObject,
    graphDataProvider
  } = GraphContextObj();

  //const[graphData, setGraphData] = useState(null)
  const [treeNodes, setTreeNodes] = useState(false)
  const [treeEdges, setTreeEdges] = useState(false)
  const [refreshGraph, setRefreshGraph]  = useState(false)

  //console.log("graphDataProvider", graphDataProvider) 

  useEffect(() => {
    if(graphDataProvider) {
      setTreeNodes(false)
      setTreeEdges(false)
      const tmpValue = [...graphDataProvider.values()]
      //setGraphData(tmpValue)

      let initialNodes = [], initialEdges = []
      // gather nodes and edges from graph data 
      tmpValue.map( (dat, index) => {
        if(dat.data) {

          if(dat.data.name ===  "ChoiceClasses" && !dat.data.children.length) return
          if(dat.data.name ===  "DocumentClasses" && !dat.data.children.length) return
          //create nodes
          let nodeID = dat.data.id ? dat.data.id : dat.data.name
          initialNodes.push( 
            {
              id: nodeID,
              data: { 
                label: nodeID, //dat.data.label ?  dat.data.label : dat.data.name, 
                type: dat.data.type,
                toolbarPosition: Position.Top
              },
              position,
              style: selectedNodeObject && nodeID===selectedNodeObject.id ? {
                /*color: "#fff", */
                background: "#ff0072",
              } : util.getNodeColor(dat.data, selectedNodeObject)
            }
          )
          if(dat.data && dat.data.allChildren) {
            dat.data.allChildren.map( edg => {
              //create edges
              initialEdges.push(
                { 
                  id: `${edg.id}-${nodeID}`, 
                  source: nodeID, 
                  target: edg.id, 
                  type: edgeType ,
                  //label: "test"
                }
              )
            })
          }
          else if(dat.data && dat.data.children) {
            dat.data.children.map(edg => {
              //create edges
              initialEdges.push({ 
                id: `${edg.id ? edg.id : edg.name}-${nodeID}`, 
                source: nodeID, 
                target: edg.id ? edg.id : edg.name, 
                type: edgeType ,
                //label: "test"
                })
            })
          }

        }
      })
      setRefreshGraph({
        initialNodes: initialNodes,
        initialEdges: initialEdges,
        refresh: Date.now()
      })
    }
  }, [graphDataProvider])

  useEffect (() => {
    if(refreshGraph) {
      setTreeNodes(refreshGraph.initialNodes)
      setTreeEdges(refreshGraph.initialEdges)
    }
  }, [refreshGraph])

  

  if(!treeEdges && !treeEdges) return <div/>
  return  <ReactFlowProvider>
    <Tree {...props} treeNodes={treeNodes} treeEdges={treeEdges}/>
  </ReactFlowProvider>
}



