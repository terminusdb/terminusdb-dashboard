
//maybe I move the format in the server
export const formatCell=(cell,type,team)=>{
    let userId,capId
    if(typeof cell.row.original["user"] === "string"){
        const userFull = cell.row.original["user"]
        userId = userFull.substr(userFull.lastIndexOf("/")+1)
    }
    if(typeof cell.row.original["capability"] === "string"){
        const capFull = cell.row.original["capability"]
        capId = capFull.substr(capFull.lastIndexOf("/")+1)
    }
    const name = cell.row.original["name"] &&  cell.row.original["name"]["@value"] ? cell.row.original["name"]["@value"] : team  
    const email = cell.row.original["email"] &&  cell.row.original["email"]["@value"] ? cell.row.original["email"]["@value"] : null
    const picture = cell.row.original["picture"] ? cell.row.original["picture"]['@value'] : ''
    const note = cell.row.original["note"] ? cell.row.original["note"] : ''
    const affiliation = cell.row.original["affiliation"] ? cell.row.original["affiliation"] : ''
    return {email:email,
            name: name,
            type:type,
            userid:userId,
            note:note,
            affiliation:affiliation,
            role:cell.row.original["role"],
            //use the 
            scope:cell.row.original["scope"],
            capability:capId,
            picture:picture}
}