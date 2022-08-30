# terminusdb-documents-ui
SDK to build UI from terminusdb documents

## Run playground
Run playground to get a demo.

Create a new data product in TerminusX and name it ```Playground```. 
Go to /product_model page and copy paste the schema from file - playground/src/schema.json.

Make a .env file and add the following

```
SERVER=https://cloud.terminusdb.com/ 
USER=<your email>
TEAM=<your team>
DATA_PRODUCT="Playground"
TOKEN=<your token>
```
After adding .env file, run the below command
```npm run playground```

## Run test
To connect to a particular data product in TerminusX - add the following variables to .env file 

```
SERVER=https://cloud.terminusdb.com/
USER=<your email>
TEAM=<your team>
DATA_PRODUCT=<your data product ID>
TOKEN=<your token>
```

After adding .env file, run the below command
```npm run test```
    

## Installation

Install the dependancy from npm

```npm install @terminusdb/terminusdb-documents-ui```

Then import dependancy as shown below

```import {FrameViewer} from '@terminusdb/terminusdb-documents-ui'```

## Usage

### Create

```
    let frame = "Person": {
	  "@key": {
		"@fields": [
		  "name",
		  "works_as"
		],
		"@type": "Lexical"
	  },
	  "@type": "Class",
	  "likes": {
		"@class": {
		  "@id": "Color",
		  "@type": "Enum",
		  "@values": [
			"red",
			"blue",
			"green"
		  ]
		},
		"@type": "Optional"
	  },
	  "name": "xsd:string"
	}

    return <FrameViewer
        frame={frame}
        mode={"Create"}
        type={"Person"}/>
```

### View
Note - make sure filled document is provided in View mode

```
    let frame = "Person": {
	  "@key": {
		"@fields": [
		  "name",
		  "works_as"
		],
		"@type": "Lexical"
	  },
	  "@type": "Class",
	  "likes": {
		"@class": {
		  "@id": "Color",
		  "@type": "Enum",
		  "@values": [
			"red",
			"blue",
			"green"
		  ]
		},
		"@type": "Optional"
	  },
	  "name": "xsd:string"
	}

    let data = {
        "@id": "Person/Peter%20+terminusdb%3A%2F%2F%2Fdata%2FJob%2Fadmin",
        "@type": "Person",
        "likes": "blue",
        "name": "Peter "
    }

    return <FrameViewer
        frame={frame}
        mode={"View"}
        formData={data}
        type={"Person"}/>
```

