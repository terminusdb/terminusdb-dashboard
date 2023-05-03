/** sorts alphabetically  */
function sortBy(a, b) {
    a = a.toLowerCase()
    b = b.toLowerCase()

    return (a < b) ? -1 : (a > b) ? 1 : 0
}

/** sorts strings in json object alphabetically  */
export function sortAlphabetically (list, byID) {
    return list.sort(function (a, b) {
        if(!byID) return sortBy(a.name, b.name) 
        else return sortBy(a["@id"], b[["@id"]]) 
    })
}