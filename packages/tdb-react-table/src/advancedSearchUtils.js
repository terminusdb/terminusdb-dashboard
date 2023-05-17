export const advancedSearchMatchType= (fieldType)=> {
  const advancedSearchMatchTypeObj = {
     String: {
      label: 'replaceLabel',
      type: 'text',
      valueSources: ['value'],
      "typevalue":"String"
    },
    Int: {
      label: 'replaceLabel',
      type: 'number',
      valueSources: ['value'],
      "typevalue":"Int"
    },
    BigInt: {
      label: 'replaceLabel',
      type: 'number',
      valueSources: ['value'],
       "typevalue":"BigInt"
    },
    Float: {
      label: 'replaceLabel',
      type: 'number',
      valueSources: ['value'],
      "typevalue":"BigInt"
      
    },
    Boolean: {
      label: 'replaceLabel',
      type: 'boolean',
      defaultValue: true,
      fieldSettings: {
        labelYes: 'true',
        labelNo: 'false'
      }
    },
    ENUM: {
      label: 'replaceLabel',
      valueSources: ['value'],
      operators: ['select_equals', 'select_not_equals'],
      defaultOperator: 'select_equals',
      type: 'select',
      fieldSettings: {
        listValues: []
      },
      "typevalue":"ENUM"
    },
    OBJECT: {
      label: 'replaceLabel',
      type: '!group',
      subfields: {
      }
    },
    DateTime: {
      label: 'replaceLabel',
      type: 'datetime',
      valueSources: ['value'],
      "typevalue":"DateTime"
    },
    Date: {
      label: 'replaceLabel',
      type: 'date',
      valueSources: ['value'],
       "typevalue":"Date"
    }
  }


  const stringType ={ label: 'replaceLabel',
                      type: 'text',
                      valueSources: ['value'],
                      "typevalue":"String"}

  return advancedSearchMatchTypeObj[fieldType] ||  stringType
}