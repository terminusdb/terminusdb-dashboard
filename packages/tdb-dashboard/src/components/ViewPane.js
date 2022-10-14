import React, {useState, useEffect} from "react"
import {Card, Row, Col} from 'react-bootstrap';
import {TDBReactColorPallet, TDBReactSelect, TDBReactCollapse, TDBReactButton} from '@terminusdb-live/tdb-react-layout'
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
    
    {showConfig && <TDBReactButton 
                        config={SETTINGS_COLLAPSE_BUTTON_GROUP} 
                        onClick={() => setShowConfig((prevExpanded) => !prevExpanded)}/>}


    {!showConfig && <TDBReactButton 
        config={SETTINGS_UNCOLLAPSE_BUTTON_GROUP} 
        onClick={() => setShowConfig((prevExpanded) => !prevExpanded)}/>}

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
                            <TDBReactButton config={VIEW_SUBMIT_BUTTON_CONFIG} onClick={handleView}/>
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

/*export const ViewPane = ({result, setGraphConfig}) => {
    const [viewConfig, setViewConfig] = useState([])
    const [nodes, setNodes] =  useState([])
    let NodeNames = []
    for (var item in result[0]) {
        NodeNames.push(item)
    }
    let selectConfig = {label: "Choose a node", defaultLabel:"Select a node from list", options: NodeNames}
    let viewSubmitButton = {label:"Run View", title: "Submit View", icon: "fas fa-play", variant: "outline-primary", size:"sm"}
    
 
    function onNodeSelect(val) {
        if(nodes.includes(val)) return
        setNodes(arr => [...arr, val])
    }
    function onViewSubmit() {
        console.log("viewConfig", viewConfig)
        const graph=TerminusClient.View.graph();
        graph.height(800).width("1500")
        graph.show_force(true)
        for(var conf in viewConfig) {
            let cf = viewConfig[conf]
            let nd = cf.node, sz = cf.size, red = cf.color.r, green = cf.color.g, blue = cf.color.b, collisionRadius=cf.collisionRadius
            graph.node(nd).color([red, green, blue, 0.3]).size(sz).text(nd).icon({label: true, color: [109,98,100]}).collisionRadius(collisionRadius)
      
        }
        
        let graphConfig = graph.create(null);
        graphConfig.setResult(result);
        setGraphConfig (graphConfig)
    }
    useEffect(() => {
        console.log("viewConfig in ue", viewConfig)
    }, [viewConfig])
    
    const NodeConfigPane = ({node, setViewConfig, viewConfig}) => {
        const [color, setColor] = useState("#61DAFB")
        function setNewConfig(node, viewConfig, setViewConfig, color, size, rad) {
            
            for (var item in viewConfig) {
                let temp = viewConfig[item]
                var setColor = color ? color : temp.color
                var setSize = size ? size : temp.size 
                var setRadius = rad ? rad : temp.radius 
                if(node === temp.node) {
                    let tmp = {node: node, size: setSize, color: setColor, collisionRadius: setRadius}
                    viewConfig[item]= tmp
                    return
                }
            }
            var setColor = color ? color : "#61DAFB"
            var setSize = size ? size : 30
            var setRadius = rad ? rad : 20
            setViewConfig(arr => [...arr, {node: node, size: setSize, color: setColor, collisionRadius: setRadius}])
        }
        useEffect(() => {
            setNewConfig(node, viewConfig, setViewConfig, color, false, false)
        }, [color])
        
        let sizes = [], radius = []
        for (var x=10; x<90; x+=10) {
            sizes.push(x)
        }
        for (var x=20; x<150; x+=20) {
            radius.push(x)
        }
        let NodeSize = {label: "Select size", defaultLabel: 30, options: sizes}
        let CollisionRadius = {label: "Select Collision Radius", defaultLabel: 20, options: radius}
 
        function onSelectSize(sz, node, viewConfig, setViewConfig) {
            setNewConfig(node, viewConfig, setViewConfig, false, sz, false)
        }
        function onSelectCollisionRadius (rad, node, viewConfig, setViewConfig) {
            setNewConfig(node, viewConfig, setViewConfig, false, false, rad)
        }
        return <Col>
            <p>{node}</p>
            <TDBReactColorPallet color={color} setColor={setColor}/>
            <TDBReactSelect config={NodeSize} handleSelect={(e) => onSelectSize(e, node, viewConfig, setViewConfig)}/>
            <TDBReactSelect config={CollisionRadius} handleSelect={(e) => onSelectCollisionRadius(e, node, viewConfig, setViewConfig)}/>
        </Col>
    }
    
    console.log("nodes", nodes)
    return <Row>
        <Col md={4}>
            <TDBReactSelect config={selectConfig} handleSelect={onNodeSelect}/>
            <TDBReactButton config={viewSubmitButton} onClick={onViewSubmit}/>
        </Col>
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
        
    </Row>
}
*/