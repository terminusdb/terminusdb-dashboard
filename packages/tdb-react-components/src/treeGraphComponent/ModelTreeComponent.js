import React,{useState,useEffect,useRef} from 'react';
import {Tree} from './graph/graphTree';
import { tree, hierarchy } from 'd3-hierarchy';
import {Card} from "react-bootstrap"

import { select as d3Select, selectAll as d3SelectAll, event as d3Event } from 'd3-selection';
import { zoom as d3Zoom } from 'd3-zoom';
import { zoomIdentity as d3ZoomIdentity } from 'd3-zoom';

import { drag as d3Drag } from 'd3-drag';

export const ModelTreeComponent = (props)=>{
    /**
     * Configures zoom upon graph with default or user provided values.<br/>
     * {@link https://github.com/d3/d3-zoom#zoom}
     * @returns {undefined}
     */

    const selectedNode=props.selectedNodeObject && props.selectedNodeObject.name ? props.selectedNodeObject.name : null;
    const treeGraphWrapper = useRef(null);
    const treeGraphContainer = useRef(null);
      
    const [upadateGraph,setTick]=useState(null)

    const [graphTransform, setTransform]=useState();

    const zoomElement=d3Zoom().scaleExtent([0.1, 8]).on('zoom', function(){_zoomed()});

    const [zoomFactor,setZoomFactor]=useState(1);

    const changeSelectedNode = (nodeId)=>{
        if(selectedNode===nodeId)return
          _moveNodeToFront(nodeId);

        if(props.changeCurrentNode)props.changeCurrentNode(nodeId);
    }

    const _moveNodeToFront = (nodeId)=>{
        const nodeElement=props.graphDataProvider.get(nodeId);
        if(nodeElement){
            props.graphDataProvider.delete(nodeId);
            props.graphDataProvider.set(nodeId,nodeElement);
            //_tick();
        }
     }  

    const focusOnNode=(nodeId) =>{

        let node=props.graphDataProvider.get(nodeId);

        if(node){         
            let height=props.height || 500;
            let width=props.width || 1000
            
            const nodeR=200;

            const widthHalf=width/2;
            const startOffset=300;
            
            d3Select('#treeGraphWrapper')
              .transition()
              .duration(1000)
              .tween("zoom", function() {
               return function(t) {
                  var K =1.2
                  var nodeX = widthHalf-(node.x*K);
                  var nodeY= (0 -( (node.y*K)-startOffset));
                  var ts = d3ZoomIdentity//.scale(4)
                   .translate(nodeX, nodeY)
                   .scale(K);

                  d3Select("#treeGraphWrapper").call(zoomElement.transform, ts);
                };
          });

        }      
    }

    const _linkObjectToD3Action = () =>{
        const customNodeDrag = d3Drag()
            .on('start', _onDragStart)
            .on('drag', _onDragMove)
           // .on('end', _onDragEnd);

        d3Select('#treeGraph')
            .selectAll('.node')
            .call(customNodeDrag)
    }

    useEffect(() => {
         //startDataProsition();      
         if(treeGraphWrapper.current && props.width){
          _zoomConfig(treeGraphWrapper.current)       
        }
    }, [treeGraphWrapper.current,props.width])

    useEffect(() => {
      //if(selectedNode && props.addedNewNode===true){
      _linkObjectToD3Action();
      if(props.isFocusOnNode)focusOnNode(selectedNode);
      //}
    },[selectedNode,props.graphDataProvider])

    useEffect(()=>{
      if(props.zoomEvent){
        switch(props.zoomEvent.type){
          case "ZOOM_IN":
            zoomIn()
            break;
          case "ZOOM_OUT":
            zoomOut()
            break;
          case "RESET_ZOOM":
            resetZoom()
            break;
        }
      }
    },[props.zoomEvent])

    /**
     * Handles d3 'drag' event.
     * {@link https://github.com/d3/d3-drag/blob/master/README.md#drag_subject|more about d3 drag}
     * @param  {Object} ev - if not undefined it will contain event data.
     * @param  {number} index - index of the node that is being dragged.
     * @param  {Array.<Object>} nodeList - array of d3 nodes. This list of nodes is provided by d3, each
     * node contains all information that was previously fed by rd3g.
     * @returns {undefined}
     */
    const _onDragMove = (ev, index, nodeList) => {
        const id = nodeList[index].id;
        // this is where d3 and react bind
        // graphData is a Map() 
        let draggedNode = props.graphDataProvider.get(id);

        draggedNode.x += d3Event.dx;
        draggedNode.y += d3Event.dy;

        _tick();
        
    };

    /**
     * The tick function simply calls React set state in order to update component and render nodes
     * along time as d3 calculates new node positioning.
     * @param {Object} state - new state to pass on.
     * @returns {undefined}
     */
    const _tick = () => {
        setTick(Date.now());
    }

//d3Zoom

      const zoomIn=()=>{
         let height=props.height || 500;
         let width=props.width || 1000

         const newZoom=graphTransform.k + 0.2;

         //const step= ((graphTransform.x/graphTransform.k)*0.2)/2
         //??
         //const xOffset=graphTransform.x-step;
         //const yOffset=graphTransform.y*newZoom;

         d3Select(treeGraphWrapper.current)
         .call(zoomElement.transform, d3ZoomIdentity
         .translate(graphTransform.x,graphTransform.y)
         .scale(newZoom))
      }

      const zoomOut=()=>{
         const newZoom=Math.max((graphTransform.k - 0.2),0.1);               
         d3Select(treeGraphWrapper.current)
         .call(zoomElement.transform, d3ZoomIdentity
         .translate(graphTransform.x,graphTransform.y)
         .scale(newZoom))
      }

      const resetZoom=()=>{
         //d3Select(domElement).call(zoomElement.transform, 
           // d3ZoomIdentity.translate(props.width/2,50).scale(0.8))
         d3Select(treeGraphWrapper.current)
         .call(zoomElement.transform, d3ZoomIdentity
         .translate(props.width/2,50,50)
         .scale(0.8))
      }

     /**
       * Handler for 'zoom' event within zoom config.
       * @returns {Object} returns the transformed elements within the svg graph area.
       */
      const _zoomed = () => {
          const transform = d3Event.transform;
          d3SelectAll('#treeGraphContainer').attr('transform', transform);
          setTransform(transform)
      };

      const _zoomConfig = () => {
        if(props.width)resetZoom()
        d3Select(treeGraphWrapper.current).call(zoomElement);  
      }    

      const _onDragStart = () =>{
          var test;
      }

      const onDrop = (e, complete) =>{

      }

      const onDragOver=(e)=>{

        let test=e
        e.preventDefault();
      }
    
      const needRefresh=Date.now();
      const width =props.width;
      const height=props.height;
      const events=false;
      
      return (          
            <div width={width} height={height} id={'treeGraphWrapper'} 
                onDragOver={(e)=>onDragOver(e)}
                onDrop={(e)=>onDrop(e, "complete")}
                ref={treeGraphWrapper}
                >

              <svg width={width} height={height}>
                <defs>
                  <marker
                    className="marker-small"
                    id="markerArrowEnd"
                    viewBox="0 -5 10 10"
                    refX="5"
                    refY="5"
                    markerWidth={4}
                    markerHeight={4}
                    orient="auto"
                    fill={'green'}
                >
                  <path d="M0,-5L10,0L0,5" fill="green" />
                </marker>
               <marker id="markerArrowStart" viewBox="0 0 10 10" refX="5" refY="5"
                    markerWidth="4" markerHeight="4"
                    orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="green" />
                </marker>
                 </defs> 
                <g id={'treeGraphContainer'} ref={treeGraphContainer}>               
                  <rect 
                    opacity={0}
                    width={width}
                    height={height}
                    fill="#ffffff"
                  />
                  <Tree id={'treeGraph'}
                    objectPropertyToRange={props.objectPropertyToRange}
                    isEditMode={props.isEditMode}
                    needRefresh={needRefresh}
                    nodes={[...props.graphDataProvider.values()]}
                    nodeClick={changeSelectedNode}
                    selectedNode={selectedNode}
                    setNodeAction={props.setNodeAction}
                  />
                </g>
              </svg>
            </div>
        )
}


