
export function decodeUrl(id){
    let idDecode
    try{
         idDecode= atob(id)
    }catch(err){
        return undefined
    }
    return idDecode
}