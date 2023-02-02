export const MANDATORY_PROP = "Mandatory"

export const TOOLBAR_LABELS={"ResetButtonTooltip":"Reset the schema to the last save",
	                            "UndoButtonTooltip":"Undo",
	                            "RedoButtonTooltip":"Redo",
	                            "SaveButtonTooltip" : "Save ",
	                            "EditModeTooltip" : "Change to Edit Mode",
	                            "ViewModeTooltip" : "Change to View Mode",
	                            "ZoomInTooltip": "Zoom In",
	                            "ZoomOutTooltip": "Zoom Out",
	                            "ResetViewPoint": "Reset View",
								"CommitLabel": "Enter a description to tag update",
								"ClosePanel": "Close Panel",
								"OpenPanel": "Open Panel"
                      		}


export const TERMINUS_IMAGE_BASE = "https://assets.terminusdb.com/terminusdb-console/images/"
export const TERMINUS_FONT_BASE = "https://assets.terminusdb.com/terminusdb-console/fonts/"

export const PROPERTY_TYPE_BY_CLASS = {'string':'xsd:string',
										'json':'xdd:json',
										'base64Binary':'xsd:base64Binary',
										'html':'xdd:html',
										'url':'xdd:url',
										'email':'xdd:email',
										'name':'xsd:Name',
										'NCname':'NCName',
										'any URI':'xsd:anyURI',
										'normalizedString': "xsd:normalizedString",
										'lang string':'rdf:langString'}

//decimal, integer ,  decimalRange,long, bite,short,
export const PROPERTY_STRING_BY_RANGE={'string':'xsd:string',
										'json':'xdd:json',
										'base64Binary':'xsd:base64Binary',
										'html':'xdd:html',
										'url':'xdd:url',
										'email':'xdd:email',
										'name':'xsd:Name',
										'NCname':'NCName',
										'any URI':'xsd:anyURI',
										'normalizedString': "xsd:normalizedString",
										'lang string':'rdf:langString'}

export const PROPERTY_NUMBER_BY_RANGE={ 'integer':'xsd:integer',
										'decimal':'xsd:decimal',
										'long':'xsd:long',
										'byte':'xsd:byte',
										'short':'xsd:short',
										'decimalRange':'xdd:decimalRange',
										'unsignedByte':'xsd:unsignedByte',
										'unsignedInt':'xsd:unsignedInt',
										'unsignedLong':'xsd:unsignedLong',
										'positiveInteger':'xsd:positiveInteger',
										'nonNegativeInteger':'xsd:nonNegativeInteger',
										'nonPositiveInteger':'xsd:nonPositiveInteger',
										'negativeInteger':'xsd:negativeInteger'}


export const PROPERTY_GEO_BY_RANGE={'coordinate':'xdd:coordinate',
									'coordinatePolyline':'xdd:coordinatePolyline',
									'coordinatePolygon':'xdd:coordinatePolygon'}

export const PROPERTY_TEMPORAL_BY_RANGE={'dateTime':'xsd:dateTime',
										 'gYear':'xsd:gYear',
										 'gYearRange':'xdd:gYearRange',
										 'gMonth':'xsd:gMonth',
										 'gDay':'xsd:gDay',
										 'gYearMonth':'xsd:gYearMonth',
										 'gMonthDay':'xsd:gMonthDay',
										 'duration':'xsd:duration',
										 'dateRange':'xdd:dateRange',
										 'date':'xsd:date',
										 'time':'xsd:time',
										 'dateTimeStamp':'xsd:dateTimeStamp'}


export const ELEMENT_BASE_CONST={
	SCHEMA_ELEMENT_LABEL_ID:'label',
	SCHEMA_ELEMENT_DESCRIPTION_ID:'description',
	SCHEMA_ELEMENT_ID:'id',
	SCHEMA_ELEMENT_ABSTRACT_ID : 'abstract',

	LABEL_TEXT:'Label',
	DESCRIPTION_TEXT:'Label',
	ID_TEXT:'Unique ID',
	ABSTRACT_TEXT:'Abstract',

	LABEL_PLACEHOLDER:'Enter a label',
	DESCRIPTION_PLACEHOLDER:'Enter a Label',
	ID_PLACEHOLDER:'Enter a valid Unique ID',
	ABSTRACT_PLACEHOLDER:'Abstract',
}


export const STRING_TYPE_LABEL='String Type';
export const STRING_TYPE_ELEMENT_ID='value_type';

export const GEO_PROPERTY_VALUE_ID='value_type';

export const BOOLEAN_TYPE_DATAPROVIDER = {label: 'Boolean Type', id:'range',
											options:[{label:'Boolean', value:'xsd:boolean'}]}

export const JSON_TYPE_DATAPROVIDER = {label: 'JSON Type', id:'range',
											options:[{label:'JSON', value:'sys:JSON'}]}



/*
*/
export const STRING_TYPE_DATAPROVIDER={label: 'String Type',
	                                   id:'range',
	                                   options:[{label:'String', value:'xsd:string'},
									  {label:'Json', value:'xdd:json',description:'A JSON Encoded String'},
									  //{label:'Text', value:'text'},
									  {label:'Base64 Binary', value:'xsd:base64Binary', description:'An xsd:base64Binary value.'},

									  {label:'URL', value:'xdd:url' ,'description':'A valid url.'},
									  {label:'HTML', value:'xdd:html', description:'A safe HTML string'},
									  //{label:'RDFA', value:'rdfa'},
									  {label:'Email', value:'xdd:email',description:'A valid email address.'},
									  {	label:'Name', value:'xsd:Name', descriptyion:'A valid name'},
									  {	label:'NCName', value:'xsd:NCName', descriptyion:'A valid NC name'},
									  {	label:'Any URI', value:'xsd:anyURI', descriptyion:'A valid URI'},
									  {	label:'NMTOKEN', value:'xsd:NMTOKEN', descriptyion:'A valid NM Token'},
									  {	label:'Language String', value:'rdf:langString', descriptyion:'A language string'}
									  ]}

			



export const CLASS_PROPERTIES_LIST=[{label:'Enum Property', id:'ChoiceProperty',range:''},
		    					   {label:'Numeric Property', id:'NumericProperty',defaultRange:'xsd:decimal'},
		    					   {label:'String Property', id:'StringProperty',defaultRange:'xsd:string'},
		    					  // {label:'Geo Property', id:'GeoProperty',defaultRange:'xdd:coordinate'},
		    					   {label:'Temporal Property', id:'TemporalProperty',defaultRange:'xsd:dateTime'},
								   {label:'Boolean Property', id:'BooleanProperty',defaultRange:'xsd:boolean'},
								   {label:'JSON Property', id:'JSONProperty',defaultRange:'sys:JSON'},
		    					   {label:'Link Property', id:'LinkProperty',defaultRange:''}]


export const GET_ICON_NAME={StringProperty:'custom-img-string',
							BooleanProperty:'custom-img-string',
							JSONProperty:'custom-img-string',		
							NumericProperty:'custom-img-number_alt',
							ChoiceProperty:'custom-img-choice',
							//GeoProperty:'custom-img_map',
							TemporalProperty:'custom-img-temporal',
							LinkProperty:'custom-img-classes'}


export const UNITS_ELEMENT_ID='units';
export const PRECISION_ELEMENT_ID='value_type';
export const NUMERIC_TYPE_ELEMENT_ID='interpretation';

export const NUMBER_PROPERTY_PRECISION_DATAPROVIDER={label:'Precision',
													id:'range',
													options:[{label:'Decimal', value:'xsd:decimal'},
										            {label:'Integer', value:'xsd:integer',description:'A simple number. An xsd:integer value.'},
										            //{label:'Decimal', value:'xsd:decimal', description:'A decimal value (e.g. 23.34)'},
										            {label:'Decimal Range', value:'xdd:decimalRange',description:'Uncertain range of decimal values (e.g.[23.4, 4.143]. Enables uncertainty to be encoded directly in the data'},
										            {label:'Long', value:'xsd:long', description:'An xsd:long value.'},
										            {label:'Byte', value:'xsd:byte', description:'An xsd:byte value'},
										            {label:'Short', value:'xsd:short', description:'An xsd:short value'},
										            {label:'Unsigned Byte', value:'xsd:unsignedByte', description:'An xsd:unsignedByte value'},
										            {label:'Unsigned Integer', value:'xsd:unsignedInt', description:'An xsd:unsignedInt value'},
										            {label:'Unsigned Long', value:'xsd:unsignedLong', description:'An xsd:unsignedLong value'},
										            {label:'Positive Integer', value:'xsd:positiveInteger',description:'A simple number greater than 0. An xsd:positiveInteger value.'},
										            {label:'Non-negative Integer', value:'xsd:nonNegativeInteger',description:"A simple number that can't be less than 0. An xsd:nonNegativeInteger value."},
										            {label:'Non-positive Integer', value:'xsd:nonPositiveInteger',description:"A number less than or equal to zero. An xsd:nonPositiveInteger value."},
										            {label:'Negative Integer', value:'xsd:negativeInteger',description:'A negative integer. An xsd:negativeInteger value.'}]};

export const NUMBER_PROPERTY_TYPE_DATAPROVIDER=[{label:'Non Specified', value:''},
											   {label:'Count', value:'count'},
											   {label:'Measure', value:'measure'},
											   {label:'Percentage', value:'percentage'},
											   {label:'Currency', value:'currency'},
											   {label:'Index', value:'index'},
											   {label:'Credit Card Number', value:'cc'}];



/*export const TEMPORAL_SCOPE_TYPE_DATAPROVIDER ={label:'Temporal Scoping',
	                                  id:'scoping', options:[{label:'Non Specified', value:''},
	                                  {label:'Point',value:'timepoint'},
									  {label:'Range',value:'timerange'}]}*/
export const TEMPORAL_PROPERTY_DATAPROVIDER={label: 'Temporal Type',
	                                   id:'range',
	                                   options:
	                                   [{label:'Date-Time',value:'xsd:dateTime',description:''},
	                                   {label:'Year',value:'xsd:gYear',description:'A particular 4 digit year YYYY - negative years are BCE.'},
									   {label:'Year (Uncertain Range)',value:'xdd:gYearRange',description:'A 4-digit year, YYYY, or if uncertain, a range of years. An xdd:gYearRange value.'},
									   {label:'Month',value:'xsd:gMonth',description:'A particular 4 digit year YYYY - negative years are BCE.'},
									   {label:'Day',value:'xsd:gDay',description:'A particular day. An xsd:gDay value. ---DD'},
									   {label:'Year / Month', value:'xsd:gYearMonth',description:'A year and a month. An xsd:gYearMonth value.'},

									   {label:'Month / Day', value:'xsd:gMonthDay',description:'A month and a day. An xsd:gMonthDay value.'},
									   {label:'Duration',value:'xsd:duration',description:'A period of time. An xsd:duration value.'},
									   {label:'Date (Uncertain Range)',value:'xdd:dateRange',description:'A date or a range of dates YYYY-MM-DD'},
									   {label:'Date',value:'xsd:date', description:'A date. An xsd:date value. YYYY-MM-DD'},
									   {label:'Time',value:'xsd:time', description:'A time. An xsd:time value. hh:mm:ss.ssss'},
									  // {label:'Hour',value:'hour'},
									  // {label:'Second',value:'second'},
									  // {label:'Date-Time',value:'xsd:dateTime',description:'An xsd:dateTime value.'},
									   {label:'Date-Time Stamp',value:'xsd:dateTimeStamp',description:'An xsd:dateTimeStamp value.'}]}







export const GEOMETRY_PROPS_DATAPROVIDER={label:'Geometry Type',
    							id:'range',
    							options:[{label:'Coordinate', value:'xdd:coordinate'},

    							//{label:'Coordinate', value:'xdd:coordinate',description:'A particular location on the surface of the earth, defined by latitude and longitude . An xdd:coordinate value.'},
    							{label:'Coordinate Path', value:'xdd:coordinatePolyline',description:'A set of coordinates forming a line on a map, representing a route. An xdd:coordinatePolyline value.'},
    							{label:'Geographic Area',value:'xdd:coordinatePolygon', description:'A shape on a map which defines an area. within the defined set of coordinates   An xdd:coordinatePolygon value.'},
       							]}

export const CONFIDENCE_PROPS_DATAPROVIDER={label:'Value',
    							id:'confidence',
    							options:[{label:'Non Specified', value:''},
    							{label:'Percentage', value:'percent'},
    							{label:'Tag', value:'tag'}]}



export const ELEMENT_BASE_CLASS_LIST=[{value:'', label:'Class'},
	    							  {value:'OrdinaryClass',label:'Ordinary Class'}];

export const ELEMENT_ENTITY_LIST_ITEM={value:'EntityClass',label:'Entity Class'};

//    ELEMENT_RELATIONSHIP_ITEM:{value:'Relationship',label:'Relationship'},

export const  ELEMENT_BASE_LIST=[{value:'', label:'Class'},
		    					{value:'OrdinaryClass',label:'Ordinary Class'},
		    					{value:'EntityClass',label:'Entity Class'},
		    					{value:'Relationship',label:'Relationship'}];


export const CARDINALITY_MIN_TITLE='Cardinality Min';
export const CARDINALITY_MAX_TITLE='Cardinality Max';


export const mainGraphDescriptionText=`Shows the type inheritance hierarchy of the database schema. Types inherit their parents' properties.`

export const ELEMENT_ICONS ={
	'Document':'custom-img-entities',
	'DocumentClasses':'custom-img-entities',
	'Object':'custom-img-classes',
	'ObjectClasses':'custom-img-classes',
	'ChoiceClass':'custom-img-choice',
	'ChoiceClasses':'custom-img-choice'
}

export const ELEMENT_DESCRIPTIONS ={
	'Document':'Document types are top level objects which are only ever linked to',
	'Object':'Object types are structure types that can appear inside documents',
    'ChoiceClass':'Enum Types or Enumerated Types are sets of possible choices',
    'Properties':'Objects have properties with values to represent their state'
}
export const FIELD_TYPE = "<p>You can choose if the value is Optional|Mandatory|List|Set</p>"
export const ELEMENT_HELP = {
	'enum_property':`You can choose from the Enum List ${FIELD_TYPE}`,
	'link_property' : `You can choose from the Documents List ${FIELD_TYPE}`,
	'key_type': "You can choose the Key type of the class ",
	'key_fields': "You can choose the Key list fields ",
    'abstract': "Abstract types cannot be directly created - their non-abstract sub-types can",
    'class_id': "A unique ID for the element - cannot contain spaces",
    'class_label': "A short name for the element",
    'class_comment': "A textual description of the element - what does it represent",
    'choice_id': "A unique ID for the enum - cannot contain spaces - normally lowercase",
    'choice_label': "A short name for the enum - as it will appear in enum lists",
    'choice_comment': "A description of the enum - what does it represent",
    'property_id': "A unique ID for the propercase - cannot contain spaces - normally starts with a lowercase letter",
    'property_label': "A short name for the property - as it will appear in user interface elements",
    'property_comment': "A description of the property - what does it represent",
    'card_min': "The minimum number of values of this property that must exist for each object",
    'card_max': "The maximum number of values of this property that may exist for each object",
    'string_subtype': `You can choose to make this value be a specific type of string ${FIELD_TYPE}`,
    'number_subtype': `Choose from a decimal, integer or other, more refined numeric types ${FIELD_TYPE}`,
    'geo_subtype': `A geographic point (coordinate), a path (coordinate line) or a shape (coordinate polygon) ${FIELD_TYPE}`,
    'time_subtype': `A date, a date and time, or a range of date times ${FIELD_TYPE}`
}

export const DEFAULT_SCHEMA_VIEW="default"

/*export default {

	OPEN_DETAILS_PANEL:'Open Details Panel',
	CANDIDATES_LIST:'Candidates List',
	EDIT_MODE:'Edit Mode',

	ENTITIES_TITLE:'Entities',
	RELATIONSHIP_TITLE:'Relationship',
	CLASSES_TITLE:'Classes',

	TEMPORAL_PROPERTY_PANEL_TITLE:'Temporal Property',
	GEOGRAPHY_PROPERTY_PANEL_TITLE:'Geography Property',

	TEMPORAL_PROPERTY_PANEL_NAME:'temporalPropertyPanelName',
	GEOGRAPHY_PROPERTY_PANEL_NAME : 'geographyPanel',

	GEOGRAPHY_PANEL_NAME : 'geography',
	TEMPORAL_SCOPING_PANEL_NAME: 'lifespan',
	GEO_TEMPORAL_SCOPING_PANEL_NAME: 'geolifespan',
	CONFIDENCE_PANEL_NAME:'confidencePanel',
	CARDINALITY_PANEL_NAME:'cardinalityPanel',

	NUMERIC_PROPERTY_PANEL_NAME:'numericPropertyPanelName',
	STRING_PROPERTY_PANEL_NAME:'stringPropertyPanelName',

	GEOGRAPHY_TITLE:'Geography',
	TEMPORAL_SCOPING_TITLE:'Lifespan',//'Temporal Scoping',
	GEO_TEMPORAL_SCOPING_TITLE:'Location',
	CONFIDENCE_TITLE:'Confidence',
	CARDINALITY_TITLE:'Cardinality',

	SCHEMA_ELEMENT_CARDINALITY_MIN_TITLE:'Minimum',
	SCHEMA_ELEMENT_CARDINALITY_MAX_TITLE:'Maximun',


	GEOGRAPHY_PROPS_ID :'geographyProps',

};*/
