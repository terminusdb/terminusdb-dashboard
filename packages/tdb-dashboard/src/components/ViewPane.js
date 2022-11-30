import React, {useState, useEffect} from "react"
import {Card, Row, Col, Button} from 'react-bootstrap';
import {TDBReactCollapse} from './layout/TDBReactCollapse'
import {TDBReactSelect} from './layout/TDBReactSelect'
import {TDBReactColorPallet} from './layout/TDBReactColotPallet'
import TerminusClient from '@terminusdb/terminusdb-client'
import {NODE_SIZE, COLLISION_RADIUS, VIEW_SUBMIT_BUTTON_CONFIG, DEFAULT_NODE_COLOR, DEFAULT_COLLISION_RADIUS, DEFAULT_NODE_SIZE,
    SETTINGS_COLLAPSE_BUTTON_GROUP, SETTINGS_UNCOLLAPSE_BUTTON_GROUP} from "./constants"

export const ViewPane = ({queryObj,setGraphConfig}) => {
    const resultObj = queryObj.resultObj
    const result = (resultObj && resultObj.result) ? resultObj.result.bindings : []
    const [showConfig, setShowConfig] = useState(true)
    const [viewConfig, setViewConfig] = useState({size: DEFAULT_NODE_SIZE, 
        collisionRadius: DEFAULT_COLLISION_RADIUS,
        custom: []})

    const [nodes, setNodes] =  useState([])

    let NodeNames = []
    for (var item in result[0]) {
        NodeNames.push(item)
    }
    let selectConfig = {label: "Choose a node", defaultLabel:"Select a node from list", options: NodeNames}

    function onSelectSize(size, viewConfig, setViewConfig) {
        let tmp = {}
        tmp.size = size
        tmp.collisionRadius = viewConfig.collisionRadius
        tmp.custom = viewConfig.custom
        setViewConfig(tmp)
    }

    function onSelectCollisionRadius (radius, viewConfig, setViewConfig) {
        let tmp = {}
        tmp.size = viewConfig.size
        tmp.collisionRadius = radius
        tmp.custom = viewConfig.custom
        setViewConfig(tmp)
    }

    function handleView () {
        //console.log("viewConfig", viewConfig)
        
        const graph=TerminusClient.View.graph();
        graph.height(800).width("1500")
        graph.show_force(true)

        for(var conf in viewConfig.custom) {
            let cf = viewConfig.custom[conf]

            let nd = cf.node, size=  viewConfig.size, radius =  viewConfig.collisionRadius, red = cf.color.r, green = cf.color.g, blue = cf.color.b

            graph.node(nd).color([red, green, blue, 0.3]).size(size).text(nd).icon({label: true, color: [109,98,100]}).collisionRadius(radius)
      
        }
        
        let graphConfig = graph.create(null);
        graphConfig.setResult(result);
        setGraphConfig (graphConfig)
    }


    function onNodeSelect (val) {
        // get array of nodes selected by user to customize
        if(nodes.includes(val)) return
        setNodes(arr => [...arr, val])
    }

    const NodeConfigPane = ({node, setViewConfig, viewConfig}) => {
        const [color, setColor] = useState(DEFAULT_NODE_COLOR)

        function setNewConfig(node, viewConfig, setViewConfig, color) {
            
            for (var item in viewConfig.custom) {
                let temp = viewConfig.custom[item]
                if(node === temp.node) {
                    let tmp = {node: node, color: color}
                    viewConfig.custom[item]= tmp
                    return
                }
            }
            viewConfig.custom.push({node: node, color: color})
            //setViewConfig(arr => [...arr, {node: node, color: setColor}])
        }

        useEffect(() => {
            setNewConfig(node, viewConfig, setViewConfig, color)
        }, [color])

        return <Col>
            <p>{node}</p>
            <TDBReactColorPallet color={color} setColor={setColor}/>
        </Col>
    }

    return <React.Fragment>
    
    {showConfig && <Button className={"mr-1 mb-1 m-1 me-2"}
                        {...SETTINGS_COLLAPSE_BUTTON_GROUP} 
                        onClick={() => setShowConfig((prevExpanded) => !prevExpanded)}>
                      <i className={SETTINGS_COLLAPSE_BUTTON_GROUP.icon}/>
                     {SETTINGS_COLLAPSE_BUTTON_GROUP.label}
                    </Button>}


    {!showConfig && <Button  className={"mr-1 mb-1 m-1 me-2" } 
        {...SETTINGS_UNCOLLAPSE_BUTTON_GROUP} 
        onClick={() => setShowConfig((prevExpanded) => !prevExpanded)}>
         <i className={SETTINGS_UNCOLLAPSE_BUTTON_GROUP.icon}/>
          {SETTINGS_UNCOLLAPSE_BUTTON_GROUP.label}
        </Button>}}

    <TDBReactCollapse isExpanded={showConfig}>
            <Card border="light" className="shadow-sm">
                <Card.Body>
                    <Row>
                        <Col md={3}>
                            <TDBReactSelect config={NODE_SIZE} handleSelect={(e) => onSelectSize(e, viewConfig, setViewConfig)}/>
                        </Col>

                        <Col md={3}>
                            <TDBReactSelect config={COLLISION_RADIUS} handleSelect={(e) => onSelectCollisionRadius(e, viewConfig, setViewConfig)}/>
                        </Col>
                        <Col md={4}>
                            <TDBReactSelect config={selectConfig} handleSelect={onNodeSelect}/>
                        </Col>
                        <Col md={2} className="col-md-2 d-flex align-items-center">
                            <Button className={"mr-1 mb-1 m-1 me-2"} {...VIEW_SUBMIT_BUTTON_CONFIG} onClick={handleView}>
                            <i className={VIEW_SUBMIT_BUTTON_CONFIG.icon}/>
                                 {VIEW_SUBMIT_BUTTON_CONFIG.label}
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        {nodes.map(n =>  <React.Fragment>
                            <Col md={4}>
                                <Card border="light" className="shadow-sm">
                                    <Card.Body>
                                        <Col md={4}>
                                            <NodeConfigPane node={n} setViewConfig={setViewConfig} viewConfig={viewConfig}/> 
                                        </Col>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </React.Fragment>)}
                    </Row>
                </Card.Body>
            </Card>
        </TDBReactCollapse>
    </React.Fragment>
}