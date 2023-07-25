import React, { useCallback } from 'react';
import { GraphContextObj } from './hook/graphObjectContext'
import ReactFlow, {
  getBezierPath, 
  BaseEdge, 
  addEdge,
  ConnectionLineType,
  MarkerType,
  Panel,
  useNodesState,
  useEdgesState} from 'reactflow';
import dagre from 'dagre';
  
  
import 'reactflow/dist/style.css';

function CustomEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
}) {
  const edgePathParams = {
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  };

  const [path] = getBezierPath(edgePathParams);

  return <BaseEdge path={path} markerEnd={markerEnd} />;
}

const edgeTypes = {
  custom: CustomEdge,
};

const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes, edges, direction = 'TB') => {
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


const dataTypePrefix = {
	["xsd:"]: "xsd:",
	["xdd:"]: "xdd:"
} 

export const isDataType = (field) => {
	if(!field) return false
	if(typeof field === "object") return false
  const subStr = field.substring(0, 4) 
  /*if(subStr === "xsd:") return true
  if(subStr === "xdd:") return true
  return false*/
	return dataTypePrefix[field.substring(0, 4)] || false
}


export const SchemaLinks = () => { 
  const { objectPropertyList, nodePropertiesList, getSchemaGraph } = GraphContextObj();

  //console.log("getSchemaGraph", JSON.parse(getSchemaGraph()))

  let schema = JSON.parse(getSchemaGraph()), nodeList = [], linkList=[]

  schema.map (item => {

    

    //let obj = {}, property={}
    //obj["properties"] = []
    if(item.hasOwnProperty("@id")){

      

      for(let prop in item) {
        if(prop === "@key") continue // review
        else if(prop === "@inherits") continue // review
        else if(prop === "@abstract") continue // review
        else if(prop === "@oneOf") continue // review
        else if(prop === "@value") continue // review
        else if(prop === "@metadata") continue 
        else if(prop === "@type") continue
        else if(prop === "@subdocument") continue
        else if(prop === "@unfoldable") continue
        else if(prop === "@documentation") continue
        else if(prop === "@id") {
          nodeList.push({
            id: item["@id"], 
            data: { label: item["@id"] },
            position,
          })
        }
        else { 
          // link 
          
          let propertyName = item[prop]["@class"] ? item[prop]["@class"] : item[prop]
          /*let property = {}
          //if(propertyName.sub)
          property["name"] = `${prop} | ${propertyName}`
          property["iskey"] = true // review
          property["figure"] = "MinusLine"
          property["color"] = "#fed893"
          obj["properties"].push(property)*/
          if(!isDataType(propertyName)) {
            // links 
            linkList.push({
              id: `${item["@id"]}->${propertyName}`,
              source: item["@id"],
              target: propertyName, 
              //type: edgeType,
              markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 20,
                height: 20,
                color: '#FF0072',
              },
              animated: false,
              label: prop
            })

            
            /*let linkObj = {
              from: item["@id"], 
              fromPort: `${prop} | ${propertyName}`, 
              to: propertyName,
              toPort: propertyName,
              text: prop
            }
            linkArray.push(linkObj)*/
          }
        }
      }
      //dataArray.push(obj)
    }
  })
  

  console.log("nodeList", nodeList)
  console.log("linkList", linkList)

  

  const initialNodes = nodeList, initialEdges = linkList

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initialNodes,
    initialEdges
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, type: ConnectionLineType.SmoothStep, animated: true }, eds)
      ),
    []
  );
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

  return <div style={{height: "800px"}}>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      edgeTypes={edgeTypes}
      connectionLineType={ConnectionLineType.SmoothStep}
      fitView
    >
      <Panel position="top-right">
        <button onClick={() => onLayout('TB')}>vertical layout</button>
        <button onClick={() => onLayout('LR')}>horizontal layout</button>
      </Panel>
    </ReactFlow>
  </div>
}