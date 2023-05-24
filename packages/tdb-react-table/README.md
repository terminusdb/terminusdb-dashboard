  

# TerminusDB React Table
Learn how to include TerminusDB React Table components in your project.

## Installation
The best way to use @terminusdb/terminusdb-react-table is via the npm package which you can install with npm (or yarn if you prefer).

`npm install @terminusdb/terminusdb-react-table`

the library contents two main components [`TDBReactTable`](#tdbreacttable) and [`AdvancedSearch`](#advancedsearch)

## TDBReactTable
### Props
| props |description |
|--|--|
|`start:Number`| the pagination start value, we view the row from start to start+limit |
|`limit:Number`| Determines the amount of rows on any given page, 10 is the default value|
|`totalRows:Number`| The total number of row|
|`result:Array `| The data array that you want to display on the table |
|`config`|The table configuration the main options are `columns:Array<Column>` required - The core columns configuration object for the entire table. `rowClick : Function` A function which acts as a callback when the table row is clicked|
|`orderBy:Array`| - An array of sorting object. the sorting object should contain an `id` key with the corresponding column ID to sort by. An optional `desc` key (defaults to `false`) . This information is stored in state|
|`filterBy:Array`| - An array of objects, each having a column `id` and a corresponding filter `value`. This information is stored in state|
|`downloadConfig:Object`| - The download config object should contain an filename for the file output, an headersLabel array with the list of the columns to add to the files and a className to styling the download button component |
|`setFilters:Function`| - A function which acts as a callback when the columns input filter is setter and the Enter key if pressed, your should implement your own row filter outside of the table|
|`setOrder:Function`| - A function which acts as a callback when the columns sort arrow is clicked. You should implement your own sorting outside of the table
|`setLimits:Function(currentlimit:Number,currentstart:Number)`| - A function which act as a callback when the pageSize or the pageIndex change in the table. You should implement your own sorting outside of the table
|`setHiddenColumns:Function(id:String, checked:Bool)`| - A function which act as a callback when the hide/show check box if clicked |

### Column Options
The following options are supported on any column object you can pass to columns.
| props |description |
|---|---|
| `accessor:String|Function(originalRow, rowIndex) => any` | - Require - This string/function is used to build the data model for your column.
| `id: String`| - Required - This is the unique ID for the column. It is used by reference in things like sorting, grouping, filtering etc.
|`Header: String`| - Optional, the column title, the id will used if this property is not provided
|`width:Number`| - Optional |
|`minWidth: Number`| - Optional |
|`maxWidth: Number`| - Optional |
|`disableSortBy : Bool`| - Disables sorting for the column.
|`disableFilters:Bool`| - Disables filter for the column.
|`renderer: String or Function`| - Optional, - The available value for the string value are `json` - `number` - `string` - `image`, If you pass a function instead this will receives the table instance and cell model as props and should return a JSX object or a string
|`filter:Object`| - This object should have a `type` property, the available value for type are : `list` , `number`, `string` or `boolean` and an `options` object where you can set the operator for the filter if you would like to override the default one

### Usage

```javascript

import  React, {useState,useEffect} from  'react';
import {TDBReactTable} from  '@terminusdb/terminusdb-react-table'
import {columnsConfiguration} from  './columnsConfiguration'
import  data  from  './data.json'
import  './terminusdb-react-table-main.css'
import {Container,Alert,Row} from  "react-bootstrap"

const  App = (props) =>{
	const [rowSelected, setRowSelected] = useState(false)
	const [limit, setLimit] = useState(5)
	const [start, setStart] = useState(0)
	const [filter, setFilter] = useState([])
	const [order, setOrder] = useState([])
	const  hiddenColumnsArr = ['_id','desc','MGLT','length', 						  'cost_in_credits','max_atmosphering_speed','_speed','crew',
'passengers','cargo_capacity','consumables','hyperdrive_rating',
'starship_class','created,edited','url']

const [dataWithPagination, setData] = useState(data)
const  onRowClick = (row) =>{
	setRowSelected(row.original['fullID'])
}

const  tableConfigObj = {}
tableConfigObj.columns = columnsConfiguration
tableConfigObj.rowClick = onRowClick

const  setHiddenColumns = (id, selected)=>{
		//implement a setHiddenColumns function to store the status
}

const  changeFilters = (filterArr)=>{setFilter(filterArr)}
const  changeLimits = (currentlimit,currentpage)=>
				setLimit(currentlimit)
				setStart(currentpage)
				}

const  changeOrders = (orderArr)=>{setOrder(orderArr)}

useEffect(() => {
	const  tmpData = data.slice(start,(limit+start))
	setData(tmpData)
},[limit,start])

return  <Container  className='my-5'>
	<Alert><pre>{`Row selected id ${rowSelected}`}
	You need to Impemant a logic to change the Hidden status</pre>	</Alert>

<Alert><pre>{`YOU NEED TO IMPLEMENT A FILTER LOGIC, Table filter ${JSON.stringify(filter)}`}</pre></Alert>

<Alert><pre>{`YOU NEED TO IMPLEMENT AN ORDER LOGIC, Table order ${JSON.stringify(order)}`}</pre></Alert>

<Row  className='width-100 overflow-auto text-break'  >
<TDBReactTable
	result={dataWithPagination}
	config ={tableConfigObj}
	hiddenColumnsArr = {hiddenColumnsArr}
	setHiddenColumns = {setHiddenColumns}	
	limit={limit}
	start={start}
	orderBy={[]}
	filterBy={[]}
	setFilters = {changeFilters}
	setLimits={changeLimits}
	setOrder={changeOrders}
	loading={false}
	totalRows={10}
/>
</Row>
</Container>
}

export  default  App;
```
[TdbReactTable Code](https://github.com/terminusdb/terminusdb-dashboard/tree/main/packages/tdb-react-table/src)
[Codesandbox](https://codesandbox.io/s/github/terminusdb/dashboard-examples-sandbox/tree/main/terminusdb-react-table-examples/table-basic-conf)

## AdvancedSearch

### Props

| props |description |
|--|--|
|`setFilter:Function(advFilter:Object)`| A function which act as a callback when the advanced filter `Filter Data` button is clicked |
|`fields:Object`| the Advanced Search fields description
  
### fields Options

The following options are supported on any files object you can pass to field, the keys in fields is the name of id of the field itself.

| props |description |
|---|---|
|`label:String` | - Required - is the field label
|`type:string`| - Required - is the field widget match type for graphql |
|`valueSources:Array`| - Required - for the default widget this is always ["value"]
|`typeValue:String`| - Required - the graphql value type (String,BigInt )
|`operators:Array`| - Optional - an Array of available operator
|`defaultOperator:String`| - Optional - the default operator for the type
|`fieldSettings`| - Optional - an Array of options for the type select valuetype ENUM
|`subfields`| - Optional - a list of subfield for the type `!group` valuetype Object
```json
{"myfield":{
	"label":"myfiledLabel",
	"type":"text",
	"valueSources":["value"],
	"typevalue":"String"
	}
}
```
[advancedSearchMatchType code](....)

**you can use the follow method to format the advancedSearch fields**

```javascript
import {advancedSearchMatchType} from  "@terminusdb/terminusdb-react-table/advancedSearchUtils"

const  stringFormat = advancedSearchMatchType("String")
stringFormat.label= "myPropertyName"
const  fields = {"myPropertyName" :  stringFormat}
```

[AdvancedSearch Code](https://github.com/terminusdb/terminusdb-dashboard/tree/main/packages/tdb-react-table/src)
[Codesandbox](https://codesandbox.io/s/github/terminusdb/dashboard-examples-sandbox/tree/main/terminusdb-react-table-examples/advanced-search)