
export const MANDATORY_INFO_MESSAGE="This is an example of a Person document with simple fields associated with it. All the fields are Mandatory in the schema, which means they have to be filled"
export const OPTIONAL_INFO_MESSAGE="This is an example of a Person document with simple fields associated with it. All the fields are Optional in the schema, which means it is not mandatory to fill these fields and can be blank"
export const SET_INFO_MESSAGE="A set specifies an unordered set of values of a class or data type. A set consists of zero or multiple items."
export const LIST_INFO_MESSAGE="A list specifies an ordered collection of values of a class or data type. An ordered collection means values are displayed in the order they are entered in the form."

// Advanced 
export const CHOICE_CLASSES_INFO_MESSAGE="This is an example enabling a choice between different document classes. The document Guy has field member_of (which is a Set), Guy can be member_of both Art, Music or Dance groups."
export const CHOICE_SUBDOCUMENTS_INFO_MESSAGE="This is an example enabling a choice between different sub document classes. The document Student has field favorite_subject (mandatory), second_favorite_subject (optional), studied (set)."

// ui frames - bootstrap classes
export const UI_FRAME_BOOTSTRAP_CLASSNAMES_INFO_MESSAGE=`This example which shows a simple Person Document with altered look and feel using bootstrap classes. Note: The frames would show name field but its hidden from the form. Checkout UI Frames bvelow to see the bootstrap classes`
export const UI_FRAME_HIDDEN_INfO_MESSAGE="This example is of an Employee document with all field set to hidden except for designation field. Checkout UI Frames to see the fields hidden."
export const UI_FRAME_WIDGET_INFO_MESSAGE="This example is of a Teacher document. Checkout UI Frames - ui:widget property tells the form which UI widget should be used to render a field. Note field DOB is of type - xsd:dateTime. On setting ui:widget to alt-date, only date will be displayed in the form UI. Field favorite_teacher is of type xsd:boolean, on setting ui:widget to radio, the boolean field will be rendered as radio button in the form. Likewise checkout all other fiels in the example which are rendered base don what is entered in ui:widget field."

// geo json 
export const GEO_POINT_INFO_MESSAGE="Coordinates points to a single position."
export const GEO_LINE_STRING_INFO_MESSAGE="Coordinates points to an array of two or more positions."
export const GEO_POLYGON_INFO_MESSAGE="Coordinates points to an array of linear coordinate arrays."
export const GEO_MULTIPOLYGON_INFO_MESSAGE="Coordinates points to an array of Polygon coordinate arrays"

// Diff Viewer
export const DIFF_VIEWER_INFO_MESSAGE="TerminusDB represents objects such as documents and schemas in JSON-LD format. Use DiffViewer to easily compare these objects to obtain differences between them."

// Sys 
export const SYS_JSON_INFO_MESSAGE="In this example property can be stored as type sys:JSON to view data in JSON format"

// Multi Language
export const MULTI_LANGUAGE="In this example, enter the langugae code in the below input box and note the form changing property labels to matching langugae code. The Langugae code and corresponding labels and comments should be described into the schema for the form to support multi language."