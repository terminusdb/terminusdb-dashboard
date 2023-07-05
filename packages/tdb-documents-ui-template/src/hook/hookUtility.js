function cleanIdValue(keyName, keyValue){
    if(keyValue === "null") return ""
    if(keyName!=="_id") return keyValue
    try{
        const regexp =/(?:\/+.*?\/)(.*$)/g
        const array01 = [...keyValue.matchAll(regexp)];
        return array01[0][1]
    }catch(err){
        return keyValue
    }
}

export function extractDocuments(documentResultsArr) {
    if(!documentResultsArr) {
        //alert(JSON.stringify(documentResultsArr))
        return []
        
    }
    var extractedResults = []
    documentResultsArr.map(item => {
        var newJson = {}
        for (var key in item) {
            // if it is an array this is set type, I can have more than 1 result for row
            //?? I can pust the count
            if (Array.isArray(item[key])) {
                newJson[key] = `Item Count ${(item[key].length)}`
            }
            else if (item[key] && typeof item[key] === "object") {
                //key 
                const objectKey = Object.keys(item[key])
                objectKey.forEach(element => {
                    const columnName = element === "_id" ? `${key}---id` : `${key}---${element}`
                    newJson[columnName] = cleanIdValue(element, item[key][element])
                });
            }
            else {
                if(key==="_id"){
                    newJson["fullID"] = `${item[key]}`
                }
                newJson[key] = cleanIdValue(key, `${item[key]}`)
            }
        }
        extractedResults.push(newJson)
    })
    //console.log("extractedResults", extractedResults)
    return extractedResults
}