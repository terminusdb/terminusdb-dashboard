import React from "react"
import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';
import {GraphContextObj} from './hook/graphObjectContext'

function handleModelChange(changes) {
  //alert('GoJS model changed!');
}

// This variation on ForceDirectedLayout does not move any selected Nodes
// but does move all other nodes (vertexes).
class ContinuousForceDirectedLayout extends go.ForceDirectedLayout {
  isFixed(v) {
    return v.node.isSelected;
  }

  // optimization: reuse the ForceDirectedNetwork rather than re-create it each time
  doLayout(coll) {
    if (!this._isObserving) {
      this._isObserving = true;
      // cacheing the network means we need to recreate it if nodes or links have been added or removed or relinked,
      // so we need to track structural model changes to discard the saved network.
      this.diagram.addModelChangedListener(e => {
        // modelChanges include a few cases that we don't actually care about, such as
        // "nodeCategory" or "linkToPortId", but we'll go ahead and recreate the network anyway.
        // Also clear the network when replacing the model.
        if (e.modelChange !== "" ||
          (e.change === go.ChangedEvent.Transaction && e.propertyName === "StartingFirstTransaction")) {
          this.network = null;
        }
      });
    }
    var net = this.network;
    if (net === null) {  // the first time, just create the network as normal
      this.network = net = this.makeNetwork(coll);
    } else {  // but on reuse we need to update the LayoutVertex.bounds for selected nodes
      this.diagram.nodes.each(n => {
        var v = net.findVertex(n);
        if (v !== null) v.bounds = n.actualBounds;
      });
    }
    // now perform the normal layout
    super.doLayout(coll);
    // doLayout normally discards the LayoutNetwork by setting Layout.network to null;
    // here we remember it for next time
    this.network = net;
  }
}
// end ContinuousForceDirectedLayout

// intialize the diagram
function initDiagram() {
  const $ = go.GraphObject.make;

  // color config
  const linkColor = "gray",
    highlightedLinkColor = "#ffb266",//"#00A9C9",
    selectedNodeColor = "#DC3C00",
    nodeColor = "black",
    nodeStroke = "red",
    UnselectedBrush = "lightgray";  // item appearance, if not "selected"
    //const SelectedBrush = "dodgerblue";   // item appearance, if "selected"
    const SelectedBrush = selectedNodeColor

  // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";

  // intialise diagram
  const diagram = $(go.Diagram, {
    allowDelete: false,
    allowCopy: false,
    //layout: $(go.ForceDirectedLayout),
    initialAutoScale: go.Diagram.Uniform,  // an initial automatic zoom-to-fit
    contentAlignment: go.Spot.Center,  // align document to the center of the viewport
    layout:
      $(ContinuousForceDirectedLayout,  // automatically spread nodes apart while dragging
        { defaultSpringLength: 30, defaultElectricalCharge: 150 }),
    // do an extra layout at the end of a move
    //"SelectionMoved": e => e.diagram.layout.invalidateLayout(),
    "undoManager.isEnabled": true,
    model: new go.GraphLinksModel(
      {
        linkFromPortIdProperty: "fromPort",
        linkToPortIdProperty: "toPort",
        linkKeyProperty: 'key'  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
      })
  });

  const lay = diagram.layout;
  let arrangement ="100 100"
  let arrangementSpacing = new go.Size();
      arrangement = arrangement.split(" ", 2);
      arrangementSpacing.width = parseFloat(arrangement[0], 10);
      arrangementSpacing.height = parseFloat(arrangement[1], 10);
      lay.arrangementSpacing = arrangementSpacing;

      let stiffness = "0.05";
      stiffness = parseFloat(stiffness, 10);
      lay.defaultSpringStiffness = stiffness;

      let length = "150";
      length = parseFloat(length, 10);
      lay.defaultSpringLength = length;

  function isPortSelected(item) {
    return item && item.fill !== UnselectedBrush;  // assume the port is a Shape
  }

  function setPortSelected(item, sel) {
    if (!item) return;
    if (sel) {
      item.fill = SelectedBrush;
    } else {
      item.fill = UnselectedBrush;
    }
  }

  function onPortClick(e, tb) {
    var shape = tb.panel.findObject("SHAPE");
    if (shape !== null) {
      var oldskips = shape.diagram.skipsUndoManager;
      shape.diagram.skipsUndoManager = true;
      if (e.control || e.meta) {
        setPortSelected(shape, !isPortSelected(shape));
        shape.part.isSelected = shape.part.ports.any(isPortSelected);
      } 
      else if (e.shift) {
        // alternative policy: select all Ports between this item and some other one??
        if (!isPortSelected(shape)) setPortSelected(shape, true);
        shape.part.isSelected = true;
      } 
      else {
        if (!isPortSelected(shape)) {
          // deselect all sibling items
          shape.part.ports.each(it => {
            if (it !== shape) setPortSelected(it, false);
          });
          setPortSelected(shape, true);
        }
        shape.part.isSelected = true;
      }
      shape.diagram.skipsUndoManager = oldskips;
    }
  }

      // the item template for properties
  /*var propertyTemplate = $(go.Panel, 
    "Horizontal",
    $(go.TextBlock, // property name, underlined if scope=="class" to indicate static property
    { isMultiline: false, editable: false, stroke:"#f8f8f8"  },
    new go.Binding("text", "name").makeTwoWay(),
    //new go.Binding("stroke", "red"),
    new go.Binding("isUnderline", "scope", s => s[0] === 'c')),
  );*/

  var propertyTemplate = $(go.Panel, 
    "Horizontal",
    $(go.TextBlock, // property name, underlined if scope=="class" to indicate static property
    { isMultiline: false, editable: false, stroke:"#f8f8f8"  },
    new go.Binding("text", "name").makeTwoWay(),
    //new go.Binding("stroke", "red"),
    new go.Binding("isUnderline", "scope", s => s[0] === 'c')),
    new go.Binding("portId", "name"),  // this Panel is a "port"
          {
            background: "transparent",  // so this port's background can be picked by the mouse
            fromSpot: go.Spot.Right,  // links only go from the right side to the left side
            toSpot: go.Spot.Left,
            // allow drawing links from or to this port:
            fromLinkable: true, toLinkable: true
          },
          $(go.Shape,
            {
              width: 12, height: 12, column: 0, strokeWidth: 2, margin: 4,
              // but disallow drawing links from or to this shape:
              fromLinkable: false, toLinkable: false
            })
  );

  // highlight all Links and Nodes coming out of a given Node
  function showConnections(node) {
    var diagram = node.diagram;
    diagram.startTransaction("highlight");
    // remove any previous highlighting
    diagram.clearHighlighteds();
    // for each Link coming out of the Node, set Link.isHighlighted
    node.findLinksOutOf().each(function(l) { l.isHighlighted = true; });
    // for each Node destination for the Node, set Node.isHighlighted
    node.findNodesOutOf().each(function(n) { n.isHighlighted = true; });
    // for each Link coming out of the Node, set Link.isHighlighted
    node.findLinksInto().each(function(m) { m.isHighlighted = true; });
    // for each Node destination for the Node, set Node.isHighlighted
    node.findNodesInto().each(function(o) { o.isHighlighted = true; });
    diagram.commitTransaction("highlight");
  }

  // when the user clicks on the background of the Diagram, remove all highlighting
  diagram.click = function(e) {
    diagram.startTransaction("no highlighteds");
    diagram.clearHighlighteds();
    diagram.commitTransaction("no highlighteds");
  };
  

  // define a simple Node template
  diagram.nodeTemplate =
  $(go.Node, "Auto", { // the whole node panel
    selectionAdorned: true,
    resizable: true,
    layoutConditions: go.Part.LayoutStandard & ~go.Part.LayoutNodeSized,
    fromSpot: go.Spot.AllSides,
    toSpot: go.Spot.AllSides,
    isShadowed: true,
    shadowOffset: new go.Point(3, 3),
    shadowColor: "#343434"
  },
  { // when the user clicks on a Node, highlight all Links coming out of the node
    // and all of the Nodes at the other ends of those Links.
    click: function(e, node) { showConnections(node); }  // defined below
  },
  new go.Binding("location", "location").makeTwoWay(),
  // whenever the PanelExpanderButton changes the visible property of the "LIST" panel,
  // clear out any desiredSize set by the ResizingTool.
  new go.Binding("desiredSize", "visible", v => new go.Size(NaN, NaN)).ofObject("LIST"),
  // define the node's outer shape, which will surround the Table
  
  $(go.Shape, "RoundedRectangle",
    {fill: nodeColor, stroke: nodeStroke, strokeWidth: 2 },
    //{fill: "rgb(255, 178, 102)", stroke: "black", strokeWidth: 3 },
    // the Shape.stroke color depends on whether Node.isHighlighted is true
    new go.Binding("stroke", "isHighlighted", function(h) { return h ? highlightedLinkColor : "black"; })
    .ofObject()
    /*{ fill: "black", stroke: "black", strokeWidth: 3 }*/),
  
  $(go.Panel, "Table",
    { margin: 8, stretch: go.GraphObject.Fill },
    $(go.RowColumnDefinition, { row: 0, sizing: go.RowColumnDefinition.None }),
    // the table header
    $(go.TextBlock,
      {
        //stroke: "#fed893",
        stroke: "#f9d891",
        row: 0, alignment: go.Spot.TopCenter,
        margin: new go.Margin(0, 24, 0, 2),  // leave room for Button
        font: "bold 16px sans-serif"
      },
      new go.Binding("text", "key")),
    
      // properties
      $(go.TextBlock, "Properties",
        { row: 1, font: "italic 10pt sans-serif", stroke: "#f9d891" },
      new go.Binding("visible", "visible", v => !v).ofObject("PROPERTIES")),
      $(go.Panel, "Vertical", { name: "PROPERTIES" },
        new go.Binding("itemArray", "properties"),
        {
          row: 1, margin: 3, stretch: go.GraphObject.Fill,
          defaultAlignment: go.Spot.Left, background: null,
          itemTemplate: propertyTemplate
        }
      ),
      $("PanelExpanderButton", "PROPERTIES",
      { row: 1, column: 1, alignment: go.Spot.TopRight, visible: false, "ButtonIcon.stroke": "white",
      "ButtonBorder.fill": "darkblue",
      "ButtonBorder.stroke": "transparent",
      "_buttonFillOver": "#3450DC",
      "_buttonStrokeOver": "#f9d891" },
      new go.Binding("visible", "properties", arr => arr.length > 0)),
      //new go.Binding("visible", "properties", arr => arr.length > 0)),
      //new go.Binding("itemArray", "items")),
        /*$(go.Panel, "Vertical",
        { name: "RIGHTPORTS", alignment: go.Spot.Default }, //alignment: new go.Spot(1, 0.5, 0, 7) }
        new go.Binding("itemArray", "items"),
        { itemTemplate: makeItemTemplate(false) })*/
      //)
    )  // end Table Panel
  );  // end Node

  // define the Link template
  diagram.linkTemplate = $(go.Link,
    { layerName: "Background" }, // don't cross in front of any nodes} 
    { routing: go.Link.Normal, toShortLength: 4, selectable: true  },
    $(go.Shape,
      { isPanelMain: true, stroke: "black", strokeWidth: 3 },
      // the Shape.stroke color depends on whether Link.isHighlighted is true
      new go.Binding("stroke", "isHighlighted", function(h) { return h ? highlightedLinkColor : linkColor; })
          .ofObject()),
    $(go.Shape, { toArrow: "standard", stroke: null, strokeWidth: 3 },
      // the Shape.fill color depends on whether Link.isHighlighted is true
      new go.Binding("fill", "isHighlighted", function(h) { return h ? highlightedLinkColor : linkColor; })
        .ofObject()),
        $(go.Panel, "Auto",
        $(go.Shape,  "RoundedRectangle",// the label background, which becomes transparent around the edges
          {
            fill: "#3450DC" /*$(go.Brush, "Radial",
              { 0: "rgb(245, 245, 245)", 0.7: "rgb(245, 245, 245)", 1: "rgba(245, 245, 245, 0)" })*/,
            stroke: null// '#f9d891'
          }),
        $(go.TextBlock, "transition",  // the label text
          {
            textAlign: "center",
            stroke: '#f9d891', //"# toShortLength: -3 ",
            font: "14pt helvetica, arial, sans-serif",
            margin: 2,
            editable: false  // enable in-place editing
          },
          // editing the text automatically updates the model data
          new go.Binding("text").makeTwoWay())
    )
  );

  // legend 
  //setupForLegend(diagram);  // this creates a diagram just like the first example

  //diagram.add(
    //$(go.Part, { location: new go.Point(0, -40) },
     // $(go.TextBlock, "A Title", { font: "bold 24pt sans-serif", stroke: "green" })));
     

  return diagram;
}

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


export const SchemaDiagram = () => { 
  const { objectPropertyList, nodePropertiesList, getSchemaGraph } = GraphContextObj();

  //console.log("getSchemaGraph", JSON.parse(getSchemaGraph()))

  let schema = JSON.parse(getSchemaGraph()), dataArray = [], linkArray=[]

  schema.map (item => {
    let obj = {}, property={}
    obj["properties"] = []
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
          obj["key"] = item["@id"]
          obj["name"] = item["@id"]
          //"color":"lightblue"
          obj["color"] = "lightblue"
          obj["fill"] = "lightblue"
        }
        else { 
          let propertyName = item[prop]["@class"] ? item[prop]["@class"] : item[prop]
          let property = {}
          //if(propertyName.sub)
          property["name"] = `${prop} | ${propertyName}`
          property["iskey"] = true // review
          property["figure"] = "MinusLine"
          property["color"] = "#fed893"
          obj["properties"].push(property)
          if(!isDataType(propertyName)) {
            // links 
            let linkObj = {
              from: item["@id"], 
              fromPort: `${prop} | ${propertyName}`, 
              to: propertyName,
              toPort: propertyName,
              text: prop
            }
            linkArray.push(linkObj)
          }
        }
      }
      /*obj["properties"]=   [
        { name: "owner", type: "String", visibility: "public" },
        { name: "balance", type: "Currency", visibility: "public", default: "0" }
      ]*/
      dataArray.push(obj)
    }
  })
  

  console.log("dataArray", dataArray)
  console.log("linkArray", linkArray)

  var nodeDataArray = dataArray
  var linkDataArray=linkArray

  return <div>
    <ReactDiagram
      initDiagram={initDiagram}
      divClassName='diagram-component'
      nodeDataArray={nodeDataArray}
      linkDataArray={linkDataArray}
      onModelChange={handleModelChange}/>
  </div>
}