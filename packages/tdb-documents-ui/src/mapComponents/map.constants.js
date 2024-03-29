
import icon from "../constants"

// default options
export const MAP_OPTION = {
	center: [15.2999988, -61.3833318],
	zoom: 11,
	zoomDelta: 0.5,
	zoomSnap: 0,
	wheelPxPerZoomLevel: 100,
	fullscreenControl: true,
	fullscreenControlOptions: {
		position: 'topleft'
	}
}

// options for the marker
export const MARKER_OPTION = {
	clickable: true,
	icon: icon
}

// arrow options
export const ARROW_OPTION = {
	yawn: 50, 				// width of the opening of the arrowhead
	size: '4%', 			// size of the arrowhead.
	frequency: 2,			// How many arrowheads are rendered on a polyline.
	fill: 2,
	offsets: { end: "15px" }
}

// line color for maps 
export const LINE_COLOR = "#ff7800"