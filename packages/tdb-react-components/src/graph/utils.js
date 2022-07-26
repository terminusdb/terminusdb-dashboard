export const setConfigOptions = (config)=> {
	//configuration options for different types of behaviour
	// Need to explicitly know font family name for unicode glyphs
	fontfam = (config && (config.fontfamily()) ? config.fontfamily() : 'Font Awesome 5 Free');
	selected_grows = (config && typeof config.selected_grows() != "undefined" ? config.selected_grows() : true);
	show_force = (config && typeof config.show_force() != "undefined" ? config.show_force() : true);
	fix_nodes = (config && typeof config.fix_nodes() != "undefined" ? config.fix_nodes() : false);
	explode_out = (config && typeof config.explode_out() != "undefined" ? config.explode_out(): false);
	width = (config && config.width() ? config.width(): false);
	height = (config && config.height() ? config.height(): false);
	defaults = {
		edge: {
			type: "edge",
			distance: (config && config.edge && config.edge.distance ? config.edge.distance : 70),
			arrow: (config && config.edge && config.edge.arrow ? config.edge.arrow : { width: 36, height: 16}),
			symmetric: (config && config.edge && config.edge.symmetric ? config.edge.symmetric : true),
			color: (config && config.edge && config.edge.color ? config.edge.color : [150,150,255]),
			weight: (config && config.edge && config.edge.weight ? config.edge.weight : 0.3),
			size: (config && config.edge && config.edge.size ? config.edge.size : 4)
		},
		node: {
			type: "node",
			radius: (config && config.node && config.node.radius ? config.node.radius : 14),
			charge: (config && config.node && config.node.charge ? config.node.charge : -60),
			collisionRadius: (config && config.node && config.node.collisionRadius ? config.node.collisionRadius : 20),
			color: (config && config.node && config.node.color ? config.node.color : [0,255,255]),
			icon: {
				weight: (config && config.node && config.node.icon && config.node.icon.weight ? config.node.icon.weight : 900),
				color: (config && config.node && config.node.icon && config.node.icon.color ? config.node.icon.color : [0,0,255]),
				unicode: (config && config.node && config.node.icon && config.node.icon.unicode ? config.node.icon.unicode : "\uf4fb"),
				size: (config && config.node && config.node.icon && config.node.icon.size ? config.node.icon.size : 10),
				faclass: (config && config.node && config.node.icon && config.node.icon.faclass ? config.node.icon.faclass : "fas fa-user-astronaut")
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
	return defaults;
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

GraphResultsViewer.prototype.getNodeIconSize = function(node) {
	if(node && node.icon && node.icon.size){
		return node.icon.size + "em";
	}
	return (this.getMultiplier(node) + "em");
}

GraphResultsViewer.prototype.getNodeColour = function(node) {
	var col = (node && node.color ? node.color : this.defaults.node.color);
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
		if(node.icon.label === true)	return this.getNodeText(node);
		else if(node.icon.label) return node.icon.label;
	}
	return this.defaults.node.icon.unicode;
}

GraphResultsViewer.prototype.getNodeIconWeight = function(node) {
	return (node && node.icon && node.icon.weight ? node.icon.weight : this.defaults.node.icon.weight );
}

GraphResultsViewer.prototype.getNodeIconColour = function(node) {
	var col = (node && node.icon && node.icon.color ? node.icon.color : this.defaults.node.icon.color );
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

GraphResultsViewer.prototype.getEdgeDirection = function(edge) {
	if(edge && edge.symmetric){
		return "M10,-5 L0,0 L10,5";
	}
	return "M0,-5 L10,0 L0,5";
	return false;
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

