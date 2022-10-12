export const PROPERTY_TYPE_NAME={
	STRING_PROPERTY:'StringProperty',
	NUMERIC_PROPERTY:'NumericProperty',
	CHOICE_PROPERTY:'ChoiceProperty',
	GEO_PROPERTY:'GeoProperty',
	TEMPORAL_PROPERTY:'TemporalProperty',
	OBJECT_PROPERTY:'LinkProperty',
	BOOLEAN_PROPERTY:'BooleanProperty',
	JSON_PROPERTY:'JSONProperty'
}

export const getLabelByName=(elementName)=>{
	switch(elementName){
		case CLASS_TYPE_NAME.DOCUMENT_CLASS:
			return CLASS_TYPE_NAME_LABEL.DOCUMENT_CLASS
		case CLASS_TYPE_NAME.OBJECT_CLASS:
			return CLASS_TYPE_NAME_LABEL.OBJECT_CLASS
		case CLASS_TYPE_NAME.CHOICE_CLASS:
			return CLASS_TYPE_NAME_LABEL.CHOICE_CLASS
		case CLASS_TYPE_NAME.OBJECT_CLASSES:
			return CLASS_TYPE_NAME_LABEL.OBJECT_CLASSES
		case CLASS_TYPE_NAME.DOCUMENT_CLASSES:
			return CLASS_TYPE_NAME_LABEL.DOCUMENT_CLASSES
	}
}

export const PROPERTY_TYPE_LABEL={
	STRING_PROPERTY:'String Property',
	NUMERIC_PROPERTY:'Numeric Property',
	CHOICE_PROPERTY:'Enum Property',
	GEO_PROPERTY:'Geo Property',
	TEMPORAL_PROPERTY:'Temporal Property',
	OBJECT_PROPERTY:'Link Property',
    BOOLEAN_PROPERTY:'Boolean Property',
	JSON_PROPERTY:'Boolean Property'
	
}

export const CLASS_TYPE_NAME={
	SCHEMA_ROOT: 'ROOT',
	SCHEMA_GROUP: 'Group',
  	OBJECT_CLASS:'Object',
  	CHOICE_CLASS:"ChoiceClass",
  	DOCUMENT_CLASS:"Document",
  	DOCUMENT_CLASSES:"DocumentClasses",
  	OBJECT_CLASSES:"ObjectClasses",
  	CHOICE_CLASSES:"ChoiceClasses"
}

export const CLASS_TYPE_NAME_LABEL={
	SCHEMA_ROOT:'Schema',
	SCHEMA_GROUP: 'Group',
  	OBJECT_CLASS:'Subdocument',
  	CHOICE_CLASS:"Enum",
  	DOCUMENT_CLASS:"Document",
  	DOCUMENT_CLASSES:"Documents",
  	OBJECT_CLASSES:"Subdocuments ",
  	CHOICE_CLASSES:"Enums"
}

export const getRootIndexObj=(dbName)=>{

	let _rootIndexObj= []

	_rootIndexObj[CLASS_TYPE_NAME.SCHEMA_ROOT]={name: CLASS_TYPE_NAME.SCHEMA_ROOT, 
												type: CLASS_TYPE_NAME.SCHEMA_ROOT, 
												label:`${dbName} ${CLASS_TYPE_NAME_LABEL.SCHEMA_ROOT}`, 
												children:[],
												comment:CLASS_TYPE_NAME_LABEL.SCHEMA_ROOT}

	
	_rootIndexObj[CLASS_TYPE_NAME.OBJECT_CLASSES]={name:CLASS_TYPE_NAME.OBJECT_CLASSES, 
												parents:[],										
		                             			type:CLASS_TYPE_NAME.SCHEMA_GROUP,
		                             			label:CLASS_TYPE_NAME_LABEL.OBJECT_CLASSES,
		                             			children:[],
		                             			comment:CLASS_TYPE_NAME_LABEL.OBJECT_CLASSES}
	
    _rootIndexObj[CLASS_TYPE_NAME.DOCUMENT_CLASSES]={name:CLASS_TYPE_NAME.DOCUMENT_CLASSES, 
												parents:[],											
		                             			type:CLASS_TYPE_NAME.SCHEMA_GROUP,
		                             			label:CLASS_TYPE_NAME_LABEL.DOCUMENT_CLASSES ,
		                             			children:[],
		                             			comment:CLASS_TYPE_NAME_LABEL.DOCUMENT_CLASSES}
		                             			

	_rootIndexObj[CLASS_TYPE_NAME.CHOICE_CLASSES]={name:CLASS_TYPE_NAME.CHOICE_CLASSES, 
												parents:[],											
		                             			type:CLASS_TYPE_NAME.SCHEMA_GROUP,
		                             			label:CLASS_TYPE_NAME_LABEL.CHOICE_CLASSES ,
		                             			children:[],
		                             			comment:CLASS_TYPE_NAME_LABEL.CHOICE_CLASSES}	
	return _rootIndexObj	                             			  

}

export const PROPERTY_TYPE_BY_CLASS = { 'sys:JSON':PROPERTY_TYPE_NAME.JSON_PROPERTY,
										'xsd:boolean':PROPERTY_TYPE_NAME.BOOLEAN_PROPERTY,
										'xsd:string':PROPERTY_TYPE_NAME.STRING_PROPERTY,
										'xsd:Name':PROPERTY_TYPE_NAME.STRING_PROPERTY,
										'xsd:NCName':PROPERTY_TYPE_NAME.STRING_PROPERTY,
										"xsd:normalizedString":PROPERTY_TYPE_NAME.STRING_PROPERTY,
										'xsd:anyURI':PROPERTY_TYPE_NAME.STRING_PROPERTY,
									    'xdd:json':PROPERTY_TYPE_NAME.STRING_PROPERTY,
										'xsd:base64Binary':PROPERTY_TYPE_NAME.STRING_PROPERTY,
										'xdd:html':PROPERTY_TYPE_NAME.STRING_PROPERTY,
										'xdd:url':PROPERTY_TYPE_NAME.STRING_PROPERTY,
										'xdd:email':PROPERTY_TYPE_NAME.STRING_PROPERTY,
									    'xsd:integer':PROPERTY_TYPE_NAME.NUMERIC_PROPERTY,
										'xsd:decimal':PROPERTY_TYPE_NAME.NUMERIC_PROPERTY,
										'xsd:long':PROPERTY_TYPE_NAME.NUMERIC_PROPERTY,
										'xsd:byte':PROPERTY_TYPE_NAME.NUMERIC_PROPERTY,
										'xsd:short':PROPERTY_TYPE_NAME.NUMERIC_PROPERTY,
										'xdd:decimalRange':PROPERTY_TYPE_NAME.NUMERIC_PROPERTY,
										'xsd:unsignedByte':PROPERTY_TYPE_NAME.NUMERIC_PROPERTY,
										'xsd:unsignedInt':PROPERTY_TYPE_NAME.NUMERIC_PROPERTY,
										'xsd:unsignedLong':PROPERTY_TYPE_NAME.NUMERIC_PROPERTY,
										'xsd:positiveInteger':PROPERTY_TYPE_NAME.NUMERIC_PROPERTY,
										'xsd:nonNegativeInteger':PROPERTY_TYPE_NAME.NUMERIC_PROPERTY,
										'xsd:nonPositiveInteger':PROPERTY_TYPE_NAME.NUMERIC_PROPERTY,
										'xsd:negativeInteger':PROPERTY_TYPE_NAME.NUMERIC_PROPERTY,
										'xdd:coordinate':PROPERTY_TYPE_NAME.GEO_PROPERTY,
										'xdd:coordinatePolyline':PROPERTY_TYPE_NAME.GEO_PROPERTY,
										'xdd:coordinatePolygon':PROPERTY_TYPE_NAME.GEO_PROPERTY,
										'xsd:dateTime':PROPERTY_TYPE_NAME.TEMPORAL_PROPERTY,
										'xsd:gYear':PROPERTY_TYPE_NAME.TEMPORAL_PROPERTY,
										'xdd:gYearRange':PROPERTY_TYPE_NAME.TEMPORAL_PROPERTY,
										'xsd:gMonth':PROPERTY_TYPE_NAME.TEMPORAL_PROPERTY,
										'xsd:gDay':PROPERTY_TYPE_NAME.TEMPORAL_PROPERTY,
										'xsd:gYearMonth':PROPERTY_TYPE_NAME.TEMPORAL_PROPERTY,
										'xsd:gMonthDay':PROPERTY_TYPE_NAME.TEMPORAL_PROPERTY,
										'xsd:duration':PROPERTY_TYPE_NAME.TEMPORAL_PROPERTY,
										'xdd:dateRange':PROPERTY_TYPE_NAME.TEMPORAL_PROPERTY,
										'xsd:date':PROPERTY_TYPE_NAME.TEMPORAL_PROPERTY,
										'xsd:time':PROPERTY_TYPE_NAME.TEMPORAL_PROPERTY,
										'xsd:dateTimeStamp':PROPERTY_TYPE_NAME.TEMPORAL_PROPERTY}
										


