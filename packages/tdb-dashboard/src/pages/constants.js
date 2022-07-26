
// Register Organization constants
export const WELCOME_MESSAGE = "Welcome to"
export const SERVICE_NAME = "TerminusCloud"
export const SERVICE_TITLE = "Create an organization to start using our cloud service"

// organization form components
export const organizationForm = {
    label: "Organization",
    placeholder: "Organization can be a business, team or a person", 
    submit: "Submit"
}

// button to create new data product
export const NEW_DATA_PRODUCT_BUTTON= {label:"New Data Product", title: "Create New Data Product", icon: "fas fa-plus", variant: "info", size:"sm"}

//feedback button 
export const SEND_FEEDBACK_CONFIG = {label:"Send", title: "Send Feedback", icon: "far fa-envelope", variant: "info", size:"sm"}


// data product label in data product view
export const DATA_PRODUCT_LABEL = "Data Products"

// views
export const DATA_PRODUCTS_VIEW = "Data Products"
export const DATA_PRODUCT_EXPLORER_VIEW = "Data Product Explorer"
export const DATA_PRODUCT_MODEL_VIEW =  "Data Product Model"
export const DATA_PRODUCT_MANAGE_VIEW = "Manage Data Product"

// schema view
export const SCHEMA_MODEL_VIEW = "View Model"
export const SCHEMA_CLASSES_VIEW = "View Classes"
export const SCHEMA_PROPERTIES_VIEW = "View Properties"
export const SCHEMA_EDITOR_VIEW = "View Editor" 


// Data Product health status 
export const DATA_PRODUCT_HEALTHY="Healthy"
export const DATA_PRODUCT_STALE="Stale"
export const DATA_PRODUCT_UNSTABLE="Unstable"

// Tabs on Profile page 
export const PYTHON_TAB="Python"
export const JS_TAB="JavaScript"
export const CURL_TAB="curl"

// Tabs on Model Builder page
export const GRAPH_TAB = "Graph"
export const JSON_TAB="JSON"

export const js_code = function(cloud_url,team,email){
    return `const TerminusClient = require("@terminusdb/terminusdb-client")

//Assign your key to environment variable TERMINUSDB_ACCESS_TOKEN
const client = new TerminusClient.WOQLClient("${cloud_url}", {
                                             user:"${email}",
                                             organization:"${team}",
                                             token: process.env.TERMINUSDB_ACCESS_TOKEN})
async function getSchema() {
    client.db("test")
    const schema = await client.getSchema()
}                                           
`
}

export const py_code = function(cloud_url,team){
    return `#!/usr/bin/python3
from terminusdb_client import WOQLClient
team = "${team}"
client = WOQLClient("${cloud_url}")
# make sure you have put the token in environment variable
client.connect(team=team, use_token=True)

# Code: API key environment configuration
# export TERMINUSDB_ACCESS_TOKEN="my API key here"
`

}

export const invitationText = function(team){
return {line1: 'You have been invited',
    line2: `to join the ${team} team.`,
    line3: "To accept this invite please confirm"
    }
}


export const MEMBERS_TAB="Members"
export const INVITATION_TAB="Invitations"
