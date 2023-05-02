
# terminusdb-documents-ui
SDK to build UI from terminusdb documents. This package includes a ``<FrameViewer/>`` component which displays a TerminusDB schema driven Form in three modes (Create/ Edit or View) 

## Installation
Install the dependancy from npm
```npm install @terminusdb/terminusdb-documents-ui```
 
## Usage
Then import dependancy as shown below
```import {FrameViewer} from '@terminusdb/terminusdb-documents-ui'```

To import css is light or dark mode 

```import '@terminusdb/terminusdb-documents-ui/dist/css/terminusdb__darkly.css'```   or
```import '@terminusdb/terminusdb-documents-ui/dist/css/terminusdb__light.css'```
  
## Run sandbox

Run sandbox to get a demo on how to use ``<FrameViewer/>`` component.
```npm run sandbox```
In this project, for the purpose of the demo Frames & Data are provided in the form of JSONs in ``src/lego.constants.js``

Otherwise frames can be retrieved by using TerminusDB Client. Refer [getSchemaFrame()](https://terminusdb.com/docs/guides/reference-guides/javascript-client-reference/woqlclient#getschemaframe)
  

### Create

```
import { FrameViewer } from  '@terminusdb/terminusdb-documents-ui'
import { LEGO_FRAMES } from  "./lego.constants"

let frame = LEGO_FRAMES

// Search component to be displayed in UI when user wants to link a document. This is just a 
// dummy example where the user can choose 3 Ids from the below table. Users can load GraphQL 
// search component as well to search for documents. 
const  Search = ({ setSelected }) => {
	function  handleClick(e){
		if(setSelected) setSelected({ id:  e.target.id, label:  e.target.name })
	}

	return  <React.Fragment>
		Search this dummy result ....
		<Row id={"ID 1"}  name="first id"  onClick={handleClick}>
			{"ID 1"}
		</Row>
		<Row id={"ID 2"}  name="second id"  onClick={handleClick}>
			{"ID 2"}
		</Row>
		<Row id={"ID 3"}  name="third id"  onClick={handleClick}>
			{"ID 3"}
		</Row>
	</React.Fragment>
}

/**
* @param  {*}  data extracted from Form on click of Submit button
* function to handle on Submit of form 
*/
function  handleSubmit(data) {
	console.log(`Submitted data - ${data}`)
}

return <FrameViewer
	frame={frame} 								// frames
	mode={"Create"} 							// mode in which to display the form
	onSelect={<Search/>} 						// displays a Search component 
	formData={{}} 								// instance data - empty in create mode
 	onSubmit={handleSubmit} 					// Callback submit function
	type={"Theme"}/> 							// type of document to display in form
```


### Edit
  
```
import { FrameViewer } from  '@terminusdb/terminusdb-documents-ui'
import { LEGO_FRAMES, THEME_DATA } from  "./lego.constants"

let frame = LEGO_FRAMES, data = THEME_DATA // filled data to display in Edit mode

// Search component to be displayed in UI when user wants to link a document. This is just a 
// dummy example where the user can choose 3 Ids from the below table. Users can load GraphQL 
// search component as well to search for documents. 
const  Search = ({ setSelected }) => {
	function  handleClick(e){
		if(setSelected) setSelected({ id:  e.target.id, label:  e.target.name })
	}

	return  <React.Fragment>
		Search this dummy result ....
		<Row id={"ID 1"}  name="first id"  onClick={handleClick}>
			{"ID 1"}
		</Row>
		<Row id={"ID 2"}  name="second id"  onClick={handleClick}>
			{"ID 2"}
		</Row>
		<Row id={"ID 3"}  name="third id"  onClick={handleClick}>
			{"ID 3"}
		</Row>
	</React.Fragment>
}

/**
* @param  {*}  data extracted from Form on click of Submit button
* function to handle on Submit of form 
*/
function  handleSubmit(data) {
	console.log(`Submitted data - ${data}`)
}

/**
*
* @param  {*}  clicked callback function which returns back the ID of element clicked
* function which handles click on a document link. On click the function will
* return back document ID clicked.
*/
function  handleTraverse (clicked) {
	alert(`You have clicked on document ID ${clicked}`)
}

return <FrameViewer
	frame={frame} 								// frames
	mode={"Edit"} 							    // mode in which to display the form
	onTraverse={handleTraverse} 				// Callback traverse links function
	onSelect={<Search/>} 						// displays a Search component 
	formData={data} 							// instance data 
 	onSubmit={handleSubmit} 					// Callback submit function
	type={"Theme"}/> 							// type of document to display in form
```


### View
  
```
import { FrameViewer } from  '@terminusdb/terminusdb-documents-ui'
import { LEGO_FRAMES, THEME_DATA } from  "./lego.constants"

let frame = LEGO_FRAMES, data = THEME_DATA // filled data to display in Edit mode

/**
*
* @param  {*}  clicked callback function which returns back the ID of element clicked
* function which handles click on a document link. On click the function will
* return back document ID clicked.
*/
function  handleTraverse (clicked) {
	alert(`You have clicked on document ID ${clicked}`)
}

return <FrameViewer
	frame={frame} 								// frames
	mode={"View"} 							    // mode in which to display the form
	onTraverse={handleTraverse} 				// Callback traverse links function
	formData={data} 							// instance data 
	type={"Theme"}/> 							// type of document to display in form
```
### Theme Selector
FrameViewer is based on [Bootswatch](https://bootswatch.com/cosmo/) Themes. Use props ``theme`` in ``<FrameViewer/>`` component to change themes at an application level. Note that if using ``theme`` parameter in FrameViewers the css will change at an application level. If the preference is to just alter the look & feel of the FrameViwer in a project then the ``<FrameViewer/>`` component is shipped with a dark mode and a light mode. 


```
import { FrameViewer } from  '@terminusdb/terminusdb-documents-ui'
return <FrameViewer
	frame={frame} 								// frames
	mode={"View"} 							  // mode in which to display the form
	onTraverse={handleTraverse} 	// Callback traverse links function
	formData={data} 							// instance data 
	theme="darkly"								// pass a bootswatch theme - like darkly/ pulse
	type={"Theme"}/> 							// type of document to display in form
```

```
import { FrameViewer } from  '@terminusdb/terminusdb-documents-ui'
return <FrameViewer
	frame={frame} 								// frames
	mode={"View"} 							  // mode in which to display the form
	onTraverse={handleTraverse} 	// Callback traverse links function
	formData={data} 							// instance data 
	theme="minty"								// pass a bootswatch theme - like darkly/ pulse
	type={"Theme"}/> 							// type of document to display in form
```

A Theme selector can also be enabled by passing ``showThemeSelector={true}`` 
```
import { FrameViewer } from  '@terminusdb/terminusdb-documents-ui'
return <FrameViewer
	frame={frame} 								// frames
	mode={"View"} 							    // mode in which to display the form
	onTraverse={handleTraverse} 				// Callback traverse links function
	formData={data} 							// instance data 
	showThemeSelector={true}					// use the selector to swap themes
	type={"Theme"}/> 							// type of document to display in form
```

### CSS
If you dont want to use themes at an application level then import CSS to make the ``<FrameViewer/>`` component appear in dark or light mode. 

#### Light mode
```
import { FrameViewer } from  '@terminusdb/terminusdb-documents-ui'
import "@terminusdb/terminusdb-documents-ui/dist/css/terminusdb__light.css"
return <FrameViewer
	frame={frame} 								// frames
	mode={"View"} 							    // mode in which to display the form
	onTraverse={handleTraverse} 				// Callback traverse links function
	formData={data} 							// instance data 
	type={"Theme"}/> 							// type of document to display in form
```

#### Dark mode
```
import { FrameViewer } from  '@terminusdb/terminusdb-documents-ui'
import  "@terminusdb/terminusdb-documents-ui/dist/css/terminusdb__darkly.css"
return <FrameViewer
	frame={frame} 								// frames
	mode={"View"} 							    // mode in which to display the form
	onTraverse={handleTraverse} 				// Callback traverse links function
	formData={data} 							// instance data 
	type={"Theme"}/> 							// type of document to display in form
```