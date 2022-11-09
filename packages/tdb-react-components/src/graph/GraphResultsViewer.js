import * as d3 from 'd3';

function GraphResultsViewer(config,result) {
	this.svg;
	this.visid = randomString(8);
	this.currentDate = Date.now() / 1000; // nowish
	// Individual links, nodes and text graphical elements
	this.link_elements;
	this.node_elements;
	this.text_elements;
	// DOM object that this this is directly drawn into
	this.container = false;
	// Map of ids to loaded nodes for ease
	this.loadedNodes = {};
	this.focusNodes = [];
	// Currently displayed nodes and links
	this.nodes;
	this.links;
	// Var for selecting and deselecting elements
	this.selected_id;
	this.setConfigOptions(config);
	this.result=result
}

/*
 * Loads the graph with new data and optionally starts the animation
 */
GraphResultsViewer.prototype.load = function(domElement,show) {
	//this.initD3(this.d3DOM);
	/*
	* empty the dom object
	*/
	this.initD3(domElement)
	this.loadNewData();
	this.updateGraph();
	if(show){
		this.updateSimulation("init");
	}
}

/*
 * Called to issue a new set of datapoints
 */
GraphResultsViewer.prototype.setData = function(dqr, show){
	//this.setFocusNodeFromResult(dqr);
	if(this.result){
		this.clear();
	}
	this.result = dqr;
	//if(this.svg){
		this.load(show);
	//}
}

GraphResultsViewer.prototype.loadNewData = function(){
	this.nodes = this.result.getNodes().slice();//jQuery.extend(true, [], this.result.getNodes());
	for(var i = 0 ; i<this.nodes.length; i++){
		this.loadedNodes[this.nodes[i].id] = this.nodes[i];
	}
	this.links = this.result.getEdges();
	//this.browser.rebuildController();
}


/*
 * Called to indicate that the current set of datapoints has been updated
 */
GraphResultsViewer.prototype.updateData = function(dqr, show) {
	this.setFocusNodeFromResult(dqr);
	this.result = dqr;
	this.reload(show, "update", this.fix_nodes);
}

GraphResultsViewer.prototype.setFocusNodeFromResult = function(dqr) {
	var fn = dqr.getFocusNode();
	if(fn){
		this.selected_id = fn;
		this.focusNodes.push(fn);
	}
}

/*
 * Called to indicate that the filter setting has been changed on the current datapoints
 */
GraphResultsViewer.prototype.setFilter = function(dqr, show){
	this.simulation.stop();
	this.reload(show, "filter", true);
}

GraphResultsViewer.prototype.wake = function() {
	if(this.simulation)	this.updateSimulation("wake");
}

GraphResultsViewer.prototype.hibernate = function() {
	this.simulation.stop();
}

/*
 * Called when more data is added to the result but the query remains the same
 */
GraphResultsViewer.prototype.reload = function(show, mode, no_animate) {
	for(var i = 0 ; i<this.nodes.length; i++){
		this.loadedNodes[this.nodes[i].id] = this.nodes[i];
	}
	var nnodes = this.result.getNodesAndFringes().slice()//jQuery.extend(true, [], this.result.getNodesAndFringes());
	this.nodes = [];
	var snode = this.loadedNodes[this.selected_id];
	for(var i = 0 ; i<nnodes.length; i++){
		var nnode = nnodes[i];
		if(this.loadedNodes[nnode.id]){
			if(nnode.id == this.selected_id){
				this.loadedNodes[nnode.id].fx = this.loadedNodes[nnode.id].x;
				this.loadedNodes[nnode.id].fy = this.loadedNodes[nnode.id].y;
			}
			else if(!no_animate) {
				this.loadedNodes[nnode.id].fx = null;
				this.loadedNodes[nnode.id].fy = null;
			}
			else if(this.loadedNodes[nnode.id].x){
				this.loadedNodes[nnode.id].fx = this.loadedNodes[nnode.id].x;
				this.loadedNodes[nnode.id].fy = this.loadedNodes[nnode.id].y;
			}
		}
		else {
			if(this.explode_out && snode.x){
				nnode.x = snode.x;
				nnode.y = snode.y;
			}
			this.loadedNodes[nnode.id] = nnode;
		}
		this.nodes.push(this.loadedNodes[nnode.id]);
	}
	this.links = this.result.getLinks();
	this.updateGraph();
	if(show){
		//this.browser.rebuildController();
		this.updateSimulation(mode);
	}
}

GraphResultsViewer.prototype.clear = function() {
	this.nodes = [];
	this.loadedNodes = {};
	this.links = [];
	this.updateGraph();
	//jQuery(this.d3DOM).empty();
	this.scale_factor = 1;
}

/*
 * Called to initialise the DOM when it is first loaded (called after setData)
 */
GraphResultsViewer.prototype.initDOM = function(vdom) {
	if(!this.width) this.width = this.setWidth();
	if(!this.height) this.height = this.setHeight();
	this.d3DOM = vdom;
	if(this.result){
		this.load(true);
	}
}

/*
 * Generate the div that contains the visualisation panel
 */
GraphResultsViewer.prototype.getAsDOM = function() {
	var vdom = document.createElement("div");
	vdom.setAttribute("class", "terminus-gviz-panel");
	vdom.setAttribute("id", this.visid);
	vdom.setAttribute("width", "100%");
	this.container = vdom;
	return vdom;
}

/*
 * Calculates the width of the container area available for the SVG
 */
GraphResultsViewer.prototype.setWidth = function() {
	if(this.container && this.container.clientWidth){
		this.width = this.container.clientWidth;
	}
	else if(this.container.parentNode && this.container.parentNode.clientWidth){
		this.width = this.container.parentNode.clientWidth;
	}
	else {
		var w = jQuery(this.container).width();
		if(w == 0){
			w = jQuery(this.container.parentNode).width();
		}
		if(w == 0) {
			w = 800;
		}
		this.width = w;
	}
	return this.width;
}

GraphResultsViewer.prototype.setHeight = function() {
	if(this.container && this.container.clientHeight){
		this.height = this.container.clientHeight;
	}
	else if(this.container.parentNode && this.container.parentNode.clientHeight){
		this.height = this.container.parentNode.clientHeight;
	}
	else {
		var w = jQuery(this.container).height();
		if(w == 0){
			w = jQuery(this.container.parentNode).height();
		}
		if(w == 0) {
			w = 400;
		}
		this.height = w;
	}
	return this.height;
}


GraphResultsViewer.prototype.initD3 = function(jqid) {
	var self = this;
	try{
		d3.select(jqid).selectAll("svg").remove();
	}catch(err){
		console.log('no svg')
	}
	/********************* Seed the data **************************/
	this.svg = d3.select(jqid).append("svg").attr("width", this.width).attr("height", this.height);

	var distanceFun = function(link){
		return self.getLinkDistance(link);
	}

	// create the force object
	this.simulation  = d3.forceSimulation()
		//link distance varies with link type
	    .force("link", d3.forceLink().distance(distanceFun).id(function(link) { return link.id; }))
	    //charge is the same for all nodes
	    .force('charge', d3.forceManyBody().strength(function(node){ return self.getCharge(node)}))
	    //collision radius changes with node type
	    .force('collision', d3.forceCollide().radius(function(node) {
	    	return (self.getCollisionRadius(node));
	    }))
		.force("center", d3.forceCenter(this.width / 2, this.height / 2));

	// node drag
	this.drag_drop = d3.drag()
		.on('start', function(node) {
			node.fx = node.x
			node.fy = node.y
		})
		.on('drag', function(node) {
			self.simulation.restart()
			node.fx = d3.event.x;
			node.fy = d3.event.y;
		})
		.on('end', function(node) {
			node.fx = null;
			node.fx = null;
			self.simulation.stop()
		});

	this.svg.append("rect")
	   .attr("width", this.width)
	   .attr("height", this.height)
	   .style("fill", "none")
	   .style("pointer-events", "all")
	   .call(d3.zoom().on("zoom", function(){self.zoomed()}));

	// Append graphic element to svg which are groups for graph elements
	this.link_group = this.svg.append("g").classed("links", true);
	this.node_group = this.svg.append("g").classed("nodes", true);
}

GraphResultsViewer.prototype.zoomed = function() {
	this.current_transform = d3.event.transform;
	if(this.node_elements)
		this.node_elements.attr("transform", d3.event.transform);
    if(this.link_elements)
        this.link_elements.attr("transform", d3.event.transform);
	if(this.path_items)
        this.path_items.attr("transform",  d3.event.transform);

}


/***
 * updates the svg with the current nodes and links
 */
GraphResultsViewer.prototype.updateGraph = function(nodes, links) {
	var self = this;

	var follow_node_wrapper = function(graph_node){
		self.nodeSelected(graph_node);
	}
	var zoomed = function(){
		self.zoomed();
	}

	nodes = (typeof nodes != "undefined" ? nodes : this.nodes);
	links = (typeof links != "undefined" ? links : this.links);
	this.node_elements  = this.node_group.selectAll("g").data(nodes);
	this.node_elements.exit().remove();

	/*Create and place the "blocks" containing the circle and the text */
    var node_enter = this.node_elements.enter().append("g");
	node_enter.attr("transform", function (d) { return "translate(" + d.x + ","+ d.y + ")" ;});

	//node_enter. attr("y",  function(node){ return node.y})
	
	// enter and create new ones
	node_enter.append("circle")
		.style('opacity', 0.99)
		.attr('r', function(node){return self.getRadius(node)})
		.attr("cx",  function(node){ return node.x})
		.attr("cy",  function(node){ return node.y})
		.attr("type", function(node) {return self.isFringe(node) ? "fringe" : "node"})
		.call(self.drag_drop)
		.on("mouseover", function(d){ d3.select(this).style("cursor", "pointer"); })
		.on("mouseout", function(d){ d3.select(this).style("cursor", "default"); })
		.on('click', follow_node_wrapper)

		/*node_enter.append("text")
		.attr("x",  function(node){ return node.x})
		.attr("y",  function(node){ return node.y})
		.append("tspan")


		.text(function(node) { return self.getNodeIconUnicode(node)})*/
		

		

	
	// merge new and old nodes
	this.node_elements = node_enter.merge(this.node_elements);

	this.styleNodeElements();

	// update LINKS ********************************************
	
	this.link_elements  = this.link_group.selectAll("path").data(links)

	// remove old links
	this.link_elements.exit().remove();

	// enter and create new ones
    var link_enter = this.link_elements.enter().append("path")

    // merge new and old links
	this.link_elements = link_enter.merge(this.link_elements)

    this.styleLinkElements();

	//var node_enter = this.svg.enter().append("g");

	this.path_items = this.svg.selectAll('g.item').data(links)
	this.path_items.exit().remove();
	const ep_tems = this.path_items.enter().append('g')
  					.classed('item', true);

	ep_tems.append('path')
	.style("pointer-events", "none")

    .attr('class', 'edgepath')
	.attr('fill-opacity', 0)
	.attr('stroke-opacity', 0)
	.attr('fill', 'blue')
	.attr('stroke', 'red')
	.attr('id', function(d,i) {return 'edgepath'+i})
	
	//to be review??
	
	
	this.edgepaths = this.svg.selectAll(".edgepath").data(links)

	//this.edgelabels = this.svg.selectAll(".edgelabel").data(links)
	//this.edgelabels.exit().remove();
    ep_tems.append('text')
        .attr('class', 'edgelabel')
		//.attr('dominant-baseline', 'central')
       // .attr('dx', 50)
        .attr('dy', 0)
		.attr('font-size', function(link){ return self.getEdgeIconSize(link)})
        .attr('fill', function(link){ return self.getEdgeIconColor(link)})
        .attr('id', function(d,i) {return 'edgelabel'+i})

    //if(el_enter) this.edgelabels = el_enter.merge(this.edgelabels)

    this.edgelabels = this.svg.selectAll(".edgelabel").data(links)
	/*this.edgelabels.append('textPath')
		//this link the test with the path created
        .attr('xlink:href',function(d,i) {return '#edgepath'+i})
        .style("pointer-events", "none")
		.style("text-anchor","middle")
		//.attr("startOffset","10%")
		// this get the test to see in the link
        .text(function(d,i){return self.getEdgeIconText(d)});*/

	if(ep_tems) this.path_items = ep_tems.merge(this.path_items)		


   // this.styleTextElements();

	//execute the current state of the pan-zoom transform
	if(this.current_transform){
		if(this.node_elements)
			this.node_elements.attr("transform", this.current_transform);
	    if(this.link_elements)
	    	this.link_elements.attr("transform", this.current_transform);
        if(this.edgelabels)
	    	this.edgelabels.attr("transform", this.current_transform);
		if(this.path_items ){
			this.path_items.attr("transform", this.current_transform);
		}
        /*if(this.edgepaths)
	    	this.edgepaths.attr("transform", this.current_transform);*/
	}
}
function positionLink(d) {
    var offset = 30;

    var midpoint_x = (d.source.x + d.target.x) / 2;
    var midpoint_y = (d.source.y + d.target.y) / 2;

    var dx = (d.target.x - d.source.x);
    var dy = (d.target.y - d.source.y);

    var normalise = Math.sqrt((dx * dx) + (dy * dy));

    var offSetX = midpoint_x + offset * (dy / normalise);
    var offSetY = midpoint_y - offset * (dx / normalise);

    return "M" + d.source.x + "," + d.source.y +
        "S" + offSetX + "," + offSetY +
        " " + d.target.x + "," + d.target.y;
}


function _linkArc(d){
	return `M${d.source.x},${d.source.y}A0,0 0 0,1 ${d.target.x},${d.target.y}`}
	
//var color = d3.scaleOrdinal(["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3"]);

GraphResultsViewer.prototype.updateSimulation = function(mode) {
	var self = this;
	//move all of the graphical elements corresponding to the nodes with each tick
	var ticker = function(){
		self.node_elements.selectAll("circle")
			.attr("cx",  function(node){ return node.x})
			.attr("cy",  function(node){ return node.y});
		self.node_elements.selectAll("text")
			.attr("x",  function(node){ return node.x})
			.attr("y",  function(node){ return node.y});
		self.link_elements
			.attr('d', _linkArc);
		self.edgepaths
            .attr('d', _linkArc);
    }
	if(this.show_force){
		this.simulation.nodes(this.nodes).on('tick', ticker).force('link').links(this.links);
	}
	else {
		this.simulation.nodes(this.nodes).on('end', ticker).force('link').links(this.links);
	}
	if(this.nodes.length){
		if(mode == "wake" || mode == "init"){
			this.simulation.restart();
		}
		else if(mode == "filter"){
			this.simulation.restart();
		}
		else {
			this.simulation.alpha(1).restart();
		}
	}
}
//function(d) { return color(d.text); })
GraphResultsViewer.prototype.styleNodeElements = function() {
	//const nodeImg= this.getNodeImage({id:"Part/3020",radius:30,image:"https://cdn.rebrickable.com/media/parts/elements/4211395.jpg"})
	var self = this;
	if(this.node_elements){
		this.node_elements.each(function(node){
			var g = d3.select(this);
			var sel = g.select("circle");
			sel.select("title").remove();
			sel.attr('r', self.getRadius(node));
			sel.attr("stroke", "white")
        	sel.attr("stroke-width", 3)
			//sel.attr("opacity", 0.2)
			sel.classed("highlighted", function(node) { return self.focusNodes.indexOf(node.id) != -1});
			
			

			if(node.image){
				sel.style("fill", "#fff")
				sel.style("fill", function(node){return self.getNodeImage(node)})
			}else{
				g.append("text")
				.attr("x",  function(node){ return node.x})
				.attr("y",  function(node){ return node.y})
				.append("tspan")
				.text(function(node) { return self.getNodeIconUnicode(node)})
			

				sel.style("fill", self.getNodeColour(node));
				sel.append("title")
				.classed("terminus-gnode-title", true)
				.text(self.getNodeText(node));
				var txt = g.select("text");

				txt.select("title").remove();
				//to see a text in the right top corner
				if(node.toptext)txt.append("tspan").text(node.toptext).attr("dy",-15)
				txt.attr('text-anchor', 'middle')
					//.attr('class','labelClassName')
					.attr("title", self.getNodeText(node))
					.attr('dominant-baseline', 'central')
					.style('font-family', "'" + self.fontfam + "'")
					.style('font-weight', self.getNodeIconWeight(node))
					.style('font-size', self.getNodeIconSize(node))
					.style("fill", self.getNodeIconColour(node))
				//	.text(self.getNodeIconUnicode(node))//"\uf061")
					.append("title")
						.classed("terminus-gnode-title", true)
						.text(self.getNodeText(node));
			
				}
		});
	}
}


GraphResultsViewer.prototype.styleLinkElements = function() {
	var self = this;
	if(this.link_elements){
		this.link_elements.each(function(link){
            var sel = d3.select(this);
            sel.select("title").remove();
            sel.text(self.getLinkText(link));
			sel.attr('fill-opacity', 0)
			sel.attr("stroke-width", self.getLineWidth(link));
			sel.attr("marker-end", self.getEdgeArrow(link));
			sel.style("stroke", self.getEdgeColour(link));
			sel.append("title")
				.classed("terminus-glink-title", true)
				.text(self.getLinkText(link));
		});
	}
}

GraphResultsViewer.prototype.styleTextElements = function() {
	var self = this;
	if(this.text_elements){
		this.text_elements.each(function(link){
            var sel = d3.select(this);
            sel.attr("fill", "Black")
                .style("font", "normal 12px Arial")
                //.attr("dy", ".35em")
                .attr("text-anchor", "middle")
                .attr('dominant-baseline', 'central')
				.style('font-family', "'" + self.fontfam + "'")
				.style('font-weight', 20)
				.style('font-size', 20)
                .text("hello world")
		});
	}
}

GraphResultsViewer.prototype.getNodeImage = function (node){
	const getHas = node.id.substring(node.id.indexOf("/")+1)
	const imgId = `image__${getHas}` 
	this.svg.append('svg:defs').selectAll("pattern")
	.data([imgId])
	.join("pattern")

//	defs.append("svg:pattern")
	.attr("id", imgId )
    .attr("width", node.radius*2)
    .attr("height", node.radius*2)
    .attr("patternUnits", "objectBoundingBox")
    .append("svg:image")
	.attr("width", node.radius*2)
    .attr("height", node.radius*2)
    .attr("xlink:href", node.image)
    .attr("x", 0)
    .attr("y", 0);
	return `url(#${imgId})`
}


//create arrow
GraphResultsViewer.prototype.getEdgeArrow = function(edge) {
	if(edge){
        var dir = this.getEdgeDirection(edge);

		const markerBoxWidth = 10  
		const markerBoxHeight = 10

		const refX = markerBoxWidth / 2
		const refY = markerBoxHeight / 2

		const markerWidth = markerBoxWidth / 2;
		const markerHeight = markerBoxHeight / 2;

		const arrowPoints = [[0, 0], [0, 7], [7, 3.5]];


		/*.attr("viewBox", "0 -5 10 10")
.attr("refX", function(d) { 
   return force.nodes()[d.target].radius + 10;   // Add the marker's width               
})
.attr("refY", 0)
.attr("markerWidth", 10)                         // markerWidth equals viewBox width
.attr("markerHeight", 10)*/
		//if(dir){ // "target": propValue,
	
			const id = `${edge.source}__${edge.target}__${edge.text}`
			var col = this.getArrowColour(edge);
			this.svg.append("svg:defs").selectAll("marker")
				.data([id])
				.join("marker")
				.attr("id", id)
				.attr("refY", 3.5)
				.attr("refX", (Math.ceil((this.getArrowOffset(edge) + 7+3)/edge.size)))
				.attr("markerWidth", 7)//this.getArrowWidth(edge))
				.attr("markerHeight", 7)//this.getArrowHeight(edge))
				.attr("orient", "auto")
				//The markerUnits attribute defines the coordinate system for the markerWidth 
				// and markerHeight attributes and the contents of the <marker>.
				.append("svg:path")
					.attr('d', d3.line()(arrowPoints))	
					//.attr("d", "M 0 0 L 10 5 L 0 10 z")
					.style("fill", col)
					.style("opacity", "1");
				return "url(#" + id + ")";
		//}
	}

	return "";
}

GraphResultsViewer.prototype.nodeSelected = function(selected_node) {
	var self = this;
	if(this.selected_id == selected_node.id && this.selection_grows){
		this.selection_grows = false;
		this.styleNodeElements();
	}
	else {
		this.selection_grows = true;
		this.selected_id = selected_node.id;
        this.styleNodeElements();
        if(this.onClick) this.onClick(selected_node.id, selected_node)
		//this.browser.nodeSelected(selected_node);
		if(this.isFringe(selected_node)){
			//this.browser.followNode(selected_node);
		}
	}
}

GraphResultsViewer.prototype.getScaleTransform = function(x, y, scale_factor){
	return "scale("+ scale_factor + ") translate(" + x + "," + y + ")";
}

GraphResultsViewer.prototype.scale = function(min_ratio) {
    // the new dimensions of the molecule
    new_mol_width = this.width * min_ratio;
    new_mol_height = this.height * min_ratio;

    var y_trans = (this.height - new_mol_height) ;

    var x_trans = (this.width - new_mol_width);
    // do the actual moving
    var self = this;
    if(this.node_elements)
    	this.node_elements.transition()
        .duration(750).attr("transform", function(node){ return self.getScaleTransform(x_trans, y_trans, min_ratio)});
    if(this.link_elements)
        this.link_elements.transition()
        .duration(750).attr("transform", function(node){ return self.getScaleTransform(x_trans, y_trans, min_ratio)});
	this.scale_factor = min_ratio;
	this.svg.selectAll("marker").attr("markerWidth", this.getArrowWidth())
			.attr("markerHeight", this.getArrowHeight());
}


GraphResultsViewer.prototype.scaleToFit = function() {
    // Center the view on the molecule(s) and scale it so that everything
    // fits in the window
    //no molecules, nothing to do
    if (this.nodes.length === 0)
        return;

    // Get the bounding box
    min_x = d3.min(this.nodes.map(function(d) {return d.x;}));
    min_y = d3.min(this.nodes.map(function(d) {return d.y;}));
    max_x = d3.max(this.nodes.map(function(d) {return d.x;}));
    max_y = d3.max(this.nodes.map(function(d) {return d.y;}));

    // The width and the height of the graph
    mol_width = max_x - min_x;
    mol_height = max_y - min_y;

    mol_width = mol_width * 1.05;
    mol_height = mol_height * 1.05;
    // how much larger the drawing area is than the width and the height
    width_ratio = this.width / mol_width;
    height_ratio = this.height / mol_height;

    // we need to fit it in both directions, so we scale according to
    // the direction in which we need to scale the most
    min_ratio = Math.min(width_ratio, height_ratio);
    if(min_ratio < 1){
    	this.scale(min_ratio);
    }
};

// recentre graph
GraphResultsViewer.prototype.recentre = function(graph_node) {
	this.translated = true;
	// get the x and y you need to transform the nodes by
	this.dcx = (this.width/2-graph_node.x);
	this.dcy = (this.height/2-graph_node.y);
	//zoom.translate([dcx,dcy]); If we do zooming we'll need to do something here
	this.node_elements.attr("transform", "translate("+ this.dcx + "," + this.dcy  + ")");
	this.link_elements.attr("transform", "translate("+ this.dcx + "," + this.dcy  + ")");
	this.path_items.attr("transform", "translate("+ this.dcx + "," + this.dcy  + ")");
	
	//this.edgepaths.attr("transform", "translate("+ this.dcx + "," + this.dcy  + ")");
	//this.edgelabels.attr("transform", "translate("+ this.dcx + "," + this.dcy  + ")");
}


GraphResultsViewer.prototype.setConfigOptions = function(config) {
	//configuration options for different types of behaviour
    // Need to explicitly know font family name for unicode glyphs
    this.onClick = config.onClick
	this.fontfam = (config && (config.fontfamily()) ? config.fontfamily() : "Font Awesome\ 5 Free"),//'Font Awesome 5 Free');
	this.selected_grows = (config && typeof config.selected_grows() != "undefined" ? config.selected_grows() : true);
	this.show_force = (config && typeof config.show_force() != "undefined" ? config.show_force() : true);
	this.fix_nodes = (config && typeof config.fix_nodes() != "undefined" ? config.fix_nodes() : false);
	this.explode_out = (config && typeof config.explode_out() != "undefined" ? config.explode_out(): false);
	this.width = (config && config.width() ? config.width(): 800);
	this.height = (config && config.height() ? config.height(): 800);
	this.defaults = {
		edge: {
			type: "edge",
			distance: (config && config.edge && config.edge.distance ? config.edge.distance : 300),
			arrow: (config && config.edge && config.edge.arrow ? config.edge.arrow : {width: 36, height: 16, color: [210, 213, 218]}),//{ width: 36, height: 16}),
			symmetric: (config && config.edge && config.edge.symmetric ? config.edge.symmetric : true),
			color: (config && config.edge && config.edge.color ? config.edge.color : [120, 118, 116]),//[150,150,255]),
			weight: (config && config.edge && config.edge.weight ? config.edge.weight : 0.3),
            size: (config && config.edge && config.edge.size ? config.edge.size : 2),//3)
            icon: {
				weight: (config && config.edge && config.edge.icon && config.edge.icon.weight ? config.edge.icon.weight : 500),
				color: (config && config.edge && config.edge.icon && config.edge.icon.color ? config.edge.icon.color : [255, 255, 255]),//[0,0,255]),
				unicode: (config && config.edge && config.edge.icon && config.edge.icon.unicode ? config.edge.icon.unicode : "\uf007"),///"\uf238"),////"\uf4fb"),
				size: (config && config.edge && config.edge.icon && config.edge.icon.size ? config.edge.icon.size : 0.8),
				faclass: (config && config.edge && config.edge.icon && config.edge.icon.faclass ? config.edge.icon.faclass : "fas fa-user")
			},
		},
		node: {
			type: "node",
			radius: (config && config.node && config.node.radius ? config.node.radius : 16),//14),
			charge: (config && config.node && config.node.charge ? config.node.charge : -60),
			collisionRadius: (config && config.node && config.node.collisionRadius ? config.node.collisionRadius : 60),
			color: (config && config.node && config.node.color ? config.node.color : [255, 127, 14]),//[245, 114, 7]),//[245, 179, 66]),//[0,255,255]),
			icon: {
				weight: (config && config.node && config.node.icon && config.node.icon.weight ? config.node.icon.weight : 900),
				color: (config && config.node && config.node.icon && config.node.icon.color ? config.node.icon.color : [255, 255, 255]),//[0,0,255]),
				unicode: (config && config.node && config.node.icon && config.node.icon.unicode ? config.node.icon.unicode : "\uf007"),///"\uf238"),////"\uf4fb"),
				size: (config && config.node && config.node.icon && config.node.icon.size ? config.node.icon.size : 10),
				faclass: (config && config.node && config.node.icon && config.node.icon.faclass ? config.node.icon.faclass : "fas fa-user")
			},
			text: {
				color: (config && config.node && config.node.text && config.node.text.color ? config.node.text.color : [0,0,0]),
				size: (config && config.node && config.node.icon && config.node.text.size ? config.node.text.size : 10)
			},
			border: {
				color: (config && config.node && config.node.border && config.node.border.color ? config.node.border.color : [0,0,0]),
				size: (config && config.node && config.node.border && config.node.border.size ? config.node.border.size : 10)
			}
		}
	}
}

/*
 * Dimensions / forces / etc all settable with a scale factor - for zooming
 */
GraphResultsViewer.prototype.getMultiplier = function(node) {
	var mult = (node && node.size ? node.size : 1);
	if(node.id == this.selected_id && this.selection_grows){
		mult = mult * 2;
	}
	return mult;
}

GraphResultsViewer.prototype.getRadius = function(node) {
	var radius = (node && node.radius ? node.radius : this.defaults.node.radius);
	var r = (this.scale_factor ? Math.min(this.scale_factor * radius, radius) : radius);
	r = r * this.getMultiplier(node);
	return r;
}

GraphResultsViewer.prototype.getCollisionRadius = function(node) {
	var colrad = (node && node.collisionRadius ? node.collisionRadius : this.defaults.node.collisionRadius );
	var v = (this.scale_factor ? Math.min(this.scale_factor * colrad, colrad) : colrad);
	return v * this.getMultiplier(node);
}

GraphResultsViewer.prototype.getCharge = function(node) {
	var charge = (node && node.charge ? node.charge : this.defaults.node.charge);
	if(charge < 0){
		var v = (this.scale_factor ? Math.max(this.scale_factor * charge, charge) : charge);
	}
	else {
		var v = (this.scale_factor ? Math.min(this.scale_factor * charge, charge) : charge);
	}
	return v * this.getMultiplier(node);
}

GraphResultsViewer.prototype.getLinkDistance = function(link) {
	var linkDistance = (link && link.distance ? link.distance : this.defaults.edge.distance);
	var x = (this.scale_factor ? Math.min(this.scale_factor * linkDistance, linkDistance) : linkDistance);
	return x;
}

GraphResultsViewer.prototype.getEdgeIconSize = function(edge){
	if(edge && edge.icon && edge.icon.size){
		return edge.icon.size + "em";
	}
	return (this.getMultiplier(edge) + "em");
}


GraphResultsViewer.prototype.getEdgeIconColor = function(edge) {
	var col = (edge && edge.icon && edge.icon.color ? edge.icon.color : this.defaults.edge.icon.color);
    return "rgb("+col.join(",")+")";
}


GraphResultsViewer.prototype.getEdgeIconText= function(edge) {
	if(edge && typeof edge.icon != "undefined"){
		if(edge.icon.unicode){
			return edge.icon.unicode;
		}
		if(edge.icon.label === true) return this.getLinkText(edge);
		else if(edge.icon.label) return edge.icon.label;
    }
    return ""
}



GraphResultsViewer.prototype.getNodeIconSize = function(node) {
	if(node && node.icon && node.icon.size){
		return node.icon.size + "em";
	}
	return (this.getMultiplier(node) + "em");
}
// this can be usefull to convert rex color to Rgb
function rexToRgb(rexStr ){
    if(typeof rexStr!=="string")return []
    var aRgbHex = rexStr.match(/.{1,2}/g);
    if(aRgbHex.length!==3) return []
    return [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
        ]
}

GraphResultsViewer.prototype.getNodeColour = function(node) {
	const col = (node && node.color ? node.color : this.defaults.node.color);
	if(typeof col === "string")return col
	if(this.isFringe(node)){
		return "rgba("+col.join(",")+",0.25)";
	}
	else {
		return "rgb("+col.join(",")+")";
	}
}

GraphResultsViewer.prototype.getNodeIcon = function(node) {
	var fac = (node && node.icon && node.icon.faclass ? node.icon.faclass : this.defaults.node.icon.faclass);
	return fac;
}

GraphResultsViewer.prototype.getNodeIconUnicode= function(node) {
	if(node && typeof node.icon != "undefined"){
		if(node.icon.unicode){
			return node.icon.unicode;
		}
		if(node.icon.label === true) return this.getNodeText(node);
		else if(node.icon.label) return node.icon.label;
	}
	return this.defaults.node.icon.unicode;
}

GraphResultsViewer.prototype.getNodeIconWeight = function(node) {
	return (node && node.icon && node.icon.weight ? node.icon.weight : this.defaults.node.icon.weight );
}

GraphResultsViewer.prototype.getNodeIconColour = function(node) {
	const col = (node && node.icon && node.icon.color ? node.icon.color : this.defaults.node.icon.color );
	if(typeof col === "string") return col
	if(this.isFringe(node)){
		return "rgba("+col.join(",")+",0.25)";
	}
	else {
		return "rgb("+col.join(",")+")";
	}
}

GraphResultsViewer.prototype.getEdgeColour = function(edge) {
	var col = (edge && edge.color ? edge.color : this.defaults.edge.color );
	var weight = (edge && edge.weight ? edge.weight : this.defaults.edge.weight);
	var nc = col.concat([weight]);
	return "rgba("+nc.join(",")+")";
}

GraphResultsViewer.prototype.getArrowColour = function(edge) {
    var col = (edge && edge.arrow && edge.arrow.color ? edge.arrow.color :
        (edge && edge.color ? edge.color : this.defaults.edge.arrow.color ))
	return "rgb("+col.join(",")+")";
}


GraphResultsViewer.prototype.getEdgeDirection = function(edge) {
	if(edge && edge.symmetric){
		return "M10,-5 L0,0 L10,5";
	}
	return "M0,-5 L10,0 L0,5";
}

GraphResultsViewer.prototype.getLineWidth = function(link) {
    var x = (link && link.size ? link.size : this.defaults.edge.size);
	return x;
}


GraphResultsViewer.prototype.getNodeText = function(node) {
	if(node && node.text) return node.text;
	return node.id;
}

GraphResultsViewer.prototype.getLinkText = function(edge) {
	if(edge && edge.text) return edge.text;
	if(edge && edge.id) return edge.id;
	return "";
}

GraphResultsViewer.prototype.getArrowWidth = function(edge) {
	var w = (edge && edge.arrow && edge.arrow.width ? edge.arrow.width : this.defaults.edge.arrow.width);
	return (this.scale_factor ? Math.min(this.scale_factor * w, w) : w);
}

GraphResultsViewer.prototype.getArrowOffset = function(edge) {
	var w = (edge && edge.arrow && edge.arrow.offset ? edge.arrow.offset : 35)//this.defaults.edge.arrow.width);
	return w
}

GraphResultsViewer.prototype.getArrowHeight = function(edge) {
	var w = (edge && edge.arrow && edge.arrow.height ? edge.arrow.height : this.defaults.edge.arrow.height );
	return (this.scale_factor ? Math.min(this.scale_factor * w, w) : w);
}

GraphResultsViewer.prototype.isNeighbourLink = function(node, link) {
	return link.target.id === node.id || link.source.id === node.id;
}

GraphResultsViewer.prototype.isFringe = function(node){
	if(this.result && this.result.added && this.result.added.upgraded){
		if(this.result.added.upgraded.indexOf(node.id) != -1){
			node.type = "node";
			return false;
		}
	}
	return node.type && node.type == "fringe";
}

function randomString(length) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
    if (! length) {
        length = Math.floor(Math.random() * chars.length);
    }
    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

export default GraphResultsViewer;
