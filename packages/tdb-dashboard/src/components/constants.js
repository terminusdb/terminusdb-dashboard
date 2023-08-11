
import React from "react"
import {AiOutlineMail, AiOutlineDatabase, AiOutlineInfoCircle} from "react-icons/ai"
import {BsFileEarmarkCheck} from "react-icons/bs"
import {BiCode, BiBookReader} from "react-icons/bi"
import {MdBubbleChart} from "react-icons/md"
import {SiGithubactions} from "react-icons/si"
import {BsBookmarkPlus} from "react-icons/bs"
import * as PATH from "../routing/constants"
import {GrGraphQl} from "react-icons/gr"
import {BiGitPullRequest} from "react-icons/bi"
import {SiOpenai} from "react-icons/si"
import {RiSearchLine} from "react-icons/ri"
import {FaCog} from "react-icons/fa"

import logo from "../assets/logo.png"

//User Messages
export const SERVER_LOADING_MESSAGE = "Setting up TerminusCMS ... "
export const SCHEMA_LOADING_MESSAGE = "The schema being loaded... "


// icon bar configuration
export const TERMINUSDB_ICON = "TerminusX"
export const DEFAULT_ICON_BAR_ACTIVE_KEY = "dataProductExplorer"

//where we go if we click terminusdb logo
export const IconBarConfig = {
    logo: {
        title: "TerminusDB",
        key:"TerminusDB",
        img: <img src={logo} className="logo-img"/>,
        /*svg: <React.Fragment> 
            <svg width="48" height="48" xmlns="http://www.w3.org/2000/svg">
            <g fill="#00C08B">
            <path d="M37.97 14.853c4.118 6.47 3.236 15-2.205 20.441C32.676 38.382 28.559 40 24.147 40a17.03 17.03 0 01-8.823-2.5c-.148-.147-.442-.441-.442-.735-.147-.294 0-.736.147-1.03.147-.294.442-.44.883-.588.294-.147.735 0 1.03.147 5.44 3.53 12.646 2.647 17.058-1.912 4.412-4.558 5.294-11.764 1.912-17.058-.441-.589-.147-1.471.44-1.765.295-.147.59-.294 1.03-.147.147 0 .442.147.589.44z"/><path d="M44.147 36.912c-.294.44-.588.588-1.03.588-.293 0-.588-.147-.735-.147-.588-.441-.735-1.177-.44-1.912 5.44-8.382 4.41-19.559-2.648-26.617C32.53 2.059 21.647.735 13.412 5.588a2.323 2.323 0 01-2.353 2.353 2.323 2.323 0 01-2.353-2.353 2.323 2.323 0 012.353-2.353c.294 0 .735 0 1.03.147 9.264-5.588 21.47-4.117 29.117 3.53 7.794 7.94 9.118 20.588 2.941 30z"/><path d="M14.588 14.118c-4.559 4.558-5.294 11.764-1.912 17.058.442.589.148 1.471-.44 1.765-.148.147-.442.147-.736.147-.441 0-.882-.294-1.176-.588-3.971-6.324-3.089-14.853 2.352-20.294 5.442-5.441 14.118-6.324 20.589-2.059.588.441.735 1.177.44 1.765-.44.588-1.176.735-1.764.44-5.588-3.676-12.794-2.94-17.353 1.766z"/><path d="M24.294 19.559c-2.353 0-4.118 1.912-4.118 4.117 0 2.353 1.912 4.118 4.118 4.118 2.353 0 4.118-1.912 4.118-4.118 0-2.205-1.912-4.117-4.118-4.117zm0 5.735c-.882 0-1.618-.735-1.618-1.47 0-.883.736-1.618 1.618-1.618.882 0 1.47.735 1.47 1.618 0 .735-.735 1.47-1.47 1.47z"/><path d="M39.735 41.912a2.323 2.323 0 01-2.353 2.353c-.294 0-.588 0-.882-.147A23.852 23.852 0 0124.294 47.5c-6.323 0-12.5-2.5-16.912-6.912-7.794-7.794-9.264-20.294-3.235-29.706.294-.294.588-.44.882-.588.442 0 .736 0 1.03.294.294.147.441.441.588.736.147.294 0 .735-.147 1.029-5.441 8.235-4.118 19.412 2.794 26.323 6.765 6.765 17.5 8.089 25.735 3.236a2.323 2.323 0 012.353-2.353 2.323 2.323 0 012.353 2.353z"/></g></svg>
        </React.Fragment>,*/
        iconCss: "mb-sm-3 mb-md-0 mt-3 mb-3",
        rowCss: ""
    },
    dataProductView: {
        title: "Data Products",
        key:"data_products",
        path: PATH.DATA_PRODUCTS,
        icon: <AiOutlineDatabase size={24}/>
    },
    openAI: {
        title: "OpenAI Configuration",
        key: "open_ai_configuration",
        path: PATH.OPENAI_CONF,
        icon: <SiOpenai size={24}/>
    },
    dataProductExplorer: {
        title: "Data Product Explorer",
        key: "data_products_explorer",
        path: PATH.PRODUCT_EXPLORER,
        icon: <BiCode size={24}/>
    },
    dataProductModal:{
        title: "Data Product Model",
        key: "data_products_model",
        path: PATH.PRODUCT_MODELS,
        icon: <MdBubbleChart size={24}/>
    },
    dataProductManage: {
        title: "Manage Data Product",
        key: "manage_data_product",
        path: PATH.PRODUCT_MANAGE,
        icon: <SiGithubactions size={24}/>
    },
    documentExplorer: {
        title: "Document Explorer",
        key: "document_explorer",
        path: PATH.DOCUMENT_EXPLORER,
        icon: <BsFileEarmarkCheck size={24}/>
    },
    feedback: {
        title: "Feedback",
        key:"feedback",
        path: PATH.FEEDBACK,
        icon: <AiOutlineMail size={24}/>
    },
    tutorials: {
        title: "Example Data Products",
        key: "example_data_products",
        path: PATH.EXAMPLES_PRODUCTS,
        icon: <BsBookmarkPlus size={24}/>
    },
    graphiql :{
        title: "Graphiql interface",
        key: "graphiql_interface",
        path: PATH.GRAPHIQL,
        icon: <GrGraphQl size={24}/>
    },
    changes :{
        title: "Data Products Change Requests",
        key: "data_product_changes",
        path: PATH.CHANGE_REQUESTS,
        icon: <BiGitPullRequest size={24}/>
    },
    search :{
        title: "Free text search",
        key: "free_text_search",
        path: PATH.SEARCH,
        icon: <RiSearchLine size={24}/>
    },
    actions :{
        title: "Indexing Monitoring",
        key: "indexing_actions",
        path: PATH.ACTIONS,
        icon: <FaCog size={24}/>
    }
}


// Cance New Data product
export const CANCEL_BUTTON = {icon: "fas fa-times", variant:"outline-info", label: "Close"}
//New Data product create button configurations
export const CREATE_NEW_DATA_PRODUCT_BUTTON = {label: "Create Data Product", title: "Create", icon: "fas fa-check", variant: "info"}
// New Data product Form configurations
export const newDataProductForm = {
    id: {
        placeholder: "ID for Data Product - spaces are not allowed",
        type: "text",
        id: "id"
    },
    label: {
        placeholder: "Name for Data Product",
        type: "text",
        id: "label"
    },
    description: {
        placeholder: "Description for Data Product",
        type: "textarea",
        id: "description"
    },
    header: "New Data Product"
}

// Delete Data product Form configurations
export const deleteDataProductForm = {
    placeholder: "Please type the Data Product ID you wish to delete",
    type: "text"
}


//New Branch create button configurations
export const CREATE_NEW_BRANCH_BUTTON ={id:"create_new_branch_button" , label: "New Branch", title: "Create a new branch", icon: "fas fa-check", size:"sm", variant:"info"}// New Branch Form configurations
export const NEW_BRANCH = "New Branch"
export const newBranchForm = {
    id: {
        placeholder: "ID for Branch - include lowercase characters, numbers and underscores and be no more than 40 characters long",
        type: "text",
        id: "id"
    },
    select:{
        head: "Branch from current head",
        empty: "Empty branch",
        choose: "Choose commit to branch from"
    },
    header: "New Branch"
}

// View history
export const VIEW_HISTORY = {label: "Time Travel", title: "Time travel on history of this Data Product"}


//Prograss bar types
export const PROGRESS_BAR_COMPONENT = "Component"

/*** query pane constants ***/
// buttons to display document classes
export const DOCUMENT_CLASS_BUTTONS_CONFIG = {variant: "dark", queryName: "Class library"}
export const DOCUMENT_CLASS_LABEL_CONFIG = {color: "#ddd", label: "Document Classes"}

// buttons to display properties
export const PROPERTY_BUTTONS_CONFIG = {variant: "light", queryName: "Property library"}
export const PROPERTY_LABEL_CONFIG = {color: "#ddd", label: "Properties"}


// button to run query
export const RUN_QUERY_CONFIG = {label:"Run", title: "Run Query", icon: "fas fa-play", variant: "info", size:"sm"}
export const COPY_QUERY_CONFIG = {label: "Copy Query", title: "Copy Query", icon: "far fa-clipboard", variant: "light"}
export const QUERY_BUILDER_CONFIG = {label: "Query Builder", title: "Query Builder Helps with queries", icon: "fas fa-terminal", variant: "light"}
export const USE_QUERY_CONFIG = {label: "Copy", title: "Copy an example query to clipboard", icon: "far fa-hand-pointer", variant: "light"}
// button to save query
export const SAVE_QUERY_CONFIG = {label:"Save", title: "Save query as favorite", icon: "far fa-star", variant: "light", size:"sm"}
// button to get new query pane
export const NEW_PANE_CONFIG = {label:"New Query Pane", title: "Add New Query Pane", icon: "fas fa-plus", variant: "info", size:"sm"}
// button to collapse a pane
export const COLLAPSE_BUTTON_GROUP={label:"Collapse", title: "Collapse Pane", icon: "fas fa-chevron-up", variant: "outline-info", size:"sm"}
export const UNCOLLAPSE_BUTTON_GROUP={label:"Open", title: "Open Pane", icon: "fas fa-chevron-down", variant: "outline-info", size:"sm"}


// link buttons for standard queries
export const GET_CLASSES_LINK={label:"Get Classes", title: "Get Classes", type: "link", variant: "light", size:"sm"}
export const GET_PROPERTIES_LINK={label:"Get Properties", title: "Get Properties", type: "link", variant: "light", size:"sm"}
export const GET_DOCUMENT_METADATA_LINK={label:"Get Document Meta data", title: "Get Properties", type: "link", variant: "light", size:"sm"}

//views to see results
export const TABLE_VIEW = "TABLE"
export const GRAPH_VIEW = "GRAPH"
export const JSON_VIEW = "JSON"
export const FORM_VIEW="FORM"

// download controllers for result views
export const TABLE_RESULT_CONTROLLER = {variant: "outline-info", list:["Save as .csv", "Save as .txt", "Save as .json"]}
export const GRAPH_RESULT_CONTROLLER = {variant: "outline-info", list:["Save as .png", "Save as .svg"]}


//button group for query actions
export const ACTIONS_QUERY_BUTTON_GROUP={variant: "light", size: "sm",
    buttons: [{id: "Copy", title: "Copy Script", icon: "far fa-clipboard"},
        {id: "Import", title: "Import Script", icon: "fas fa-arrow-up"},
        {id: "Export", title: "Export Script", icon: "fas fa-arrow-down"}
    ]}



//button group for language switcher
export const LANGUAGE_SWITCHER_BUTTON_GROUP= {variant: "light", size: "sm", defaultValue: "js",  buttons: [{id: "js", title: "JS", label: "JS"}, {id: "json", title: "JSON-LD", label: "JSON-LD"}]}
//button group for view chooser
export const VIEW_SWITCHER_BUTTON_GROUP= {variant: "light", size: "sm", buttons: 
    [
    //{id: GRAPH_VIEW, title: GRAPH_VIEW, label: GRAPH_VIEW},
   
    {icon: "fas fa-border-none", id: TABLE_VIEW, title: TABLE_VIEW, label: TABLE_VIEW},
   // {icon: "fas fa-bezier-curve", id: GRAPH_VIEW, title: GRAPH_VIEW, label: GRAPH_VIEW},
    {id: JSON_VIEW, title: JSON_VIEW, label: JSON_VIEW}]}


//text area for commit msg
export const COMMIT_TEXT_AREA = { placeholder:"Add an optional description for update", icon: "far fa-envelope"}
// text area to input name of saved query
export const SAVE_QUERY_NAME_TEXT_AREA = {placeholder:"Add a name to save query as"}

// language list for query pane
export const LANGUAGE_LIST = ["JS", "JSON-LD"]
export const JS = "js"
export const JSONLD = "json"


//Labels
export const DOCUMENT_CLASS_LABEL =  "Document Classes"
export const PROPERTIES_LABEL =  "Properties"

//Messages
export const NO_PROPERTIES = "No properties for class "


// side bar tabs
export const DATABASE_TAB = "Database"
export const SAMPLE_QUERIES = "Sample Queries"
export const SAVED_QUERIES = "Saved Queries"

//view submit button
export const VIEW_SUBMIT_BUTTON_CONFIG = {label:"Run View", title: "Submit View", icon: "fas fa-cog", variant: "outline-info", size:"sm"}


// graph view config
export const DEFAULT_NODE_SIZE=30
export const DEFAULT_COLLISION_RADIUS=20
export const DEFAULT_NODE_COLOR = "#61DAFB"

// get a default list of size and radius
let sizes = [], radius = []
for (var x=10; x<90; x+=10) {
    sizes.push(x)
}
for (var x=20; x<150; x+=20) {
    radius.push(x)
}

export const NODE_SIZE = {label: "Select node size", defaultLabel: DEFAULT_NODE_SIZE, options: sizes}
export const COLLISION_RADIUS = {label: "Select Collision Radius", defaultLabel: DEFAULT_COLLISION_RADIUS, options: radius}


// button to collapse  config settings for graph view
export const SETTINGS_COLLAPSE_BUTTON_GROUP={label:"Settings", title: "Change graph view", icon: "fas fa-chevron-up", variant: "outline-info", size:"sm"}
export const SETTINGS_UNCOLLAPSE_BUTTON_GROUP={label:"Open Settings", title: "Open Pane", icon: "fas fa-chevron-down", variant: "outline-info", size:"sm"}


// profile route
export const PROFILE_ROUTE = process.env.TERMINUS_BFF_URL + "hub/profile"


// alert types
export const TERMINUS_WARNING = "Terminus Warning"
export const TERMINUS_SUCCESS = "Terminus Success"
export const TERMINUS_DANGER = "Terminus Error"
export const TERMINUS_MESSAGE = "Terminus Message"

//branch actions
export const branchActionConfig = {
    merge : {
        label: "Merge",
        title: "Merge to a branch",
        description: "Merge to a branch"
    },
    reset : {
        label: "Reset",
        title: "Reset to a specific commit",
        description: "Merge to a branch"
    },
    squash : {
        label: "Squash",
        title: "Squash this branch",
        description: "Squash this branch"
    },
    optimize : {
        label: "Optimize",
        title: "Optimize this branch",
        description: "Optimize this branch"
    },
    delete : {
        label: "Delete",
        title: "Delete this branch",
        description: "Delete this branch"
    }
}
export const SWITCH_TO_BRANCH = "Switch to - "

//reset branch form
export const resetFormConfig = {
    title: "Reset",
    id: "reset",
    placeholder: "Enter commit id of interest to reset branch to",
    description: "Force this branch (named graph) to point at a particular commit."
}
export const RESET_BUTTON_CONFIG = {label:"Reset Branch", title: "Reset Branch", variant: "info", size:"sm"}

// squaash branch form
export const squashFormConfig = {
    title: "Are you sure to squash the branch ? you'll lost all the branch's history?",
    id: "squash",
    placeholder: "The description is required",
    description: "Combine a range of commits into one big commit."
}

export const deleteFormConfig = {
    title: "Are you sure to delete the branch ?",
    id: "delete",
    placeholder: "A branch name",
    description: "Please enter the branch name"
}
export const SQUASH_BUTTON_CONFIG = {id:"squash_branch_button" , label:"Squash Branch", title: "Squash Branch", variant: "info", size:"sm"}
export const DELETE_BUTTON_CONFIG = {id:"delete_branch_button" ,label:"Delete Branch", title: "Delete Branch", variant: "danger", size:"sm"}


export const EMPTY_ADDED_DATA = "No added data to display ... "
export const EMPTY_REMOVED_DATA = "No removed data to display ... "

// data products manage constants
export const MANAGE_COLLECTIONS = "Branches"
export const MANAGE_HISTORY = "History"

// time travel constants
export const TIME_TRAVEL_DESCRIPTION = "Time travel on history of data product in a partcular branch and set the state to any commit of interest"
export const TIME_TRAVEL_BUTTON = "Time Travel"

// no data product selected view
export const NO_DATA_PRODUCT_SELECTED_MESSAGE = "Use the sidebar to connect to a Data Product"
export const NoDataProductSelectedStyle = {top: "30%", position: "absolute", width: "100%"}

// search box placeholders
export const SEARCH_DATAPRODUCTS_PLACEHOLDER = "Search Data Products"
export const SEARCH_DOCUMENTS_PLACEHOLDER = "Search Document Types"


// SIMPLE BAR MAX HEIGHT
export const SIMPLE_BAR_MAX_HEIGHT= 300

// button to clone data product
export const CLONE_DATA_PRODUCT_CONFIG = {label:"Clone", title: "Clone Data Product", icon: "fas fa-check", variant: "info", size:"sm"}


//DOCUMENTS
//New Document create button configurations
export const CREATE_NEW_DOCUMENT_BUTTON ={label: "New Document", title: "Create a new Document", icon: "fas fa-plus", size:"sm", variant:"info"}// New Branch Form configurations

export const NEW_OBJECT = "NEW_OBJECT"

export const CREATE_DOCUMENT = "Create"
export const EDIT_DOCUMENT = "Edit"
export const UPDATE_DOCUMENT = "Update"
export const VIEW_DOCUMENT = "View"
export const DELETE_DOCUMENT = "Delete"
export const GET_FRAMES_DOCUMENT = "Frames"

// GRAPH_TYPES
export const SCHEMA_GRAPH_TYPE = "schema"
export const INSTANCE_GRAPH_TYPE = "instance"

// DATA PROPERTY TYPE
export const XSD_DATA_TYPE_PREFIX = "xsd:"
export const XDD_DATA_TYPE_PREFIX = "xdd:"

//select styles
export const multiSelectStyle = {
    multiValue: (base, state) => {
      return state.data.isFixed ? { ...base, backgroundColor: 'gray' } : base;
    }
}

export const singleSelectStyle = {
    singleValue: (base, state) => {
      return state.data.isFixed ? { ...base, backgroundColor: 'gray' } : base;
    }
}

// Code mirror variables
export const EDITOR_READ_OPTIONS = {
    lineWrapping: true,
    lineNumbers: false,
    mode: "javascript",
    theme: 'ayu-dark',
    readOnly:true,
    height: "auto",
    mode: {
      name: "javascript",
      json: true,
      statementIndent: 2
    },
    indentWithTabs: false,
    tabSize: 2,
    autoRefresh:true
}

export const EDITOR_WRITE_OPTIONS = {
    lineNumbers: true,
    mode: "javascript",
    theme: 'ayu-dark',

    height: "auto",
    viewportMargin: Infinity,
    mode: {
      name: "javascript",
      json: true,
      statementIndent: 2
    },
    lineWrapping: true,
    indentWithTabs: false,
    tabSize: 2,
    autoRefresh:true
}


export const EDITOR_READ = {
    theme: "ayu-dark",
    height: "auto",
    viewportMargin: Infinity,
    mode: {
      name: "javascript",
      json: true,
      statementIndent: 2
    },
    lineNumbers: true,
    lineWrapping: true,
    indentWithTabs: false,
    tabSize: 2,
    readOnly:true
}

export const MODEL_BUILDER_EDITOR_OPTIONS = {
    //theme: "ayu-dark",
    theme: "material-darker",
    height: "auto",
    viewportMargin: Infinity,
    mode: "application/ld+json",
    /*mode: {
      name: "javascript",
      json: true,
      statementIndent: 2
    },*/
    lineNumbers: true,
    lineWrapping: true,
    indentWithTabs: false,
    tabSize: 2,
    readOnly:true,
    autoRefresh:true
}


export const DOCUMENT_PREFIX= {
    "@base": "terminusdb:///data/",
    "@schema": "terminusdb:///schema#",
    "@type": "@context"
}

export const DIFFS_PER_PAGE_LIMIT=5

// CR statuses
export const OPEN="Open"
export const MERGED="Merged"
export const SUBMITTED="Submitted"
export const REJECTED="Rejected"
export const CLOSE = "Close"

// CR actions
export const COMMENT="Comment"
export const APPROVE="Approve"
export const REJECT="Reject"
export const UPDATE_BRANCH="Update Change Request"
export const NEED_REBASE="needRebase"


// Document types
export const THEME="Theme"
export const LEGO_SET="LegoSet"

// tabs 
export const DIFFS="Diffs"
export const MESSAGES="Messages"

// consts
export const TRACKING_BRANCH="tracking_branch"

// actions 
export const CREATE="Create"
export const EDIT="Edit"
export const VIEW="View"
export const DELETE="Delete"
export const VIEW_LIST="List"


//ERROR MESSAGE CONSTANTS 
export const ERROR_MORE_INFO_CLASSNAME = "float-right alert_danger alert_danger_text rounded alert_danger_border" 
export const ERROR_DOC_EXPAND_ICON_CLASSNAME = "mr-4 alert_expand_icons bg-transparent border-0 alert_danger_text"
