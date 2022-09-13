const server = localStorage.getItem("terminusdb-server-override") || process.env.TERMINUSDB_SERVER || window.location.origin

//there is no default key
//let key=  localStorage.getItem("terminusdb-key-override") || process.env.TERMINUSDB_KEY 

//const userName=  localStorage.getItem("terminusdb-user-override") || process.env.TERMINUSDB_USER 

const connection_type = process.env.CONNECTION_TYPE 


export const localSettings = {
    server : server,
    //key : key,
    //user: userName,
    connection_type :connection_type
}

