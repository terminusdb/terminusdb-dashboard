/*{
    "@type":"api:InsertDocumentErrorResponse",
    "api:error": {
      "@type":"api:SchemaCheckFailure",
      "api:witnesses": [
        {
      "@type":"instance_not_cardinality_one",
      "class":"terminusdb:///schema#Groups",
      "instance":"terminusdb:///data/Groups/d2a58a70f2853b14216d1ec2bfe75cc42778d265a41d22f055a1b7c6ed341cf4",
      "predicate":"terminusdb:///schema#num009"
        }
      ]
    },
    "api:message":"Schema check failure",
    "api:status":"api:failure"
  }

@type: "api:InsertDocumentErrorResponse"
api:error: {@type: "api:SchemaCheckFailure",…}
@type: "api:SchemaCheckFailure"
api:witnesses: [{@type: "invalid_predicate", class: "terminusdb:///schema#Doc01",…}]
0: {@type: "invalid_predicate", class: "terminusdb:///schema#Doc01",…}
@type: "invalid_predicate"
class: "terminusdb:///schema#Doc01"
predicate: "terminusdb:///schema#hello"
subject: "terminusdb:///data/Doc01/3631f3f75274aaf628f7d410dd1195717a2f2f7736907f55cd62738e0502b01e"
api:message: "Schema check failure"
api:status: "api:failure"
*/

const messageMapping={instance_not_cardinality_one:"Cardinality Violation the Document"}

export function errorMessageFormatter (jsonErr,errorMessage){
    const jsonError = jsonErr.data || {}
    if(jsonError['api:error'] && Array.isArray(jsonError['api:error']['api:witnesses'])){
        const type = jsonError['api:error']["@type"]
        const error = jsonError['api:error']['api:witnesses']['0']

        if(error["@type"]=== "instance_not_cardinality_one"){
            const className = error['instance']
            let classId
            if(typeof className === "string"){
              classId= className.substring(0, className.lastIndexOf("/")+1)
            }
            return {title: "CARDINALITY VIOLATION", 
                text:  `you can not add a MANDATORY property, there are instances of the Document  ${classId}`}
          }

        if(error["@type"]=== "invalid_predicate"){
            const className = error['class']
            const predicate = error['predicate']

            return {title: "SCHEMA CHECK FAILURE", 
                text: `There are instances of the document ${className} `}

        }
        if(error["@type"]=== "not_a_class_or_base_type"){
          const className = error['class']
          const predicate = error['predicate']

          return {title: "SCHEMA CHECK FAILURE", 
              text: `${className} is not a class or a base type`}

      }
    }else if(jsonErr.status === 403 && jsonError.action === "'@schema':'Action/schema_read_access'"){
          return {title:"API Forbidden", text:"You do not have the permissions to access the dataproduct schema"}
    }
    return {title:"SCHEMA CHECK FAILURE", text:errorMessage}
}