import TerminusClient from '@terminusdb/terminusdb-client';

//return false I can not run the query
export const makeWOQLFromString =(str, lang)=>{
    if(str === "") return false
    switch(lang){
        case "json":
             const myj = JSON.parse(str)
             return new TerminusClient.WOQL.json(myj)
        case "js":
            const WOQL = TerminusClient.WOQL
             let prelude = WOQL.emerge()
             var nw = eval(prelude + "\n" + str)
            // if(!nw) throw new Error("The ")
             //console.log(prelude)
             return nw;
        case "python":
            throw "Python is not supported for editing queries through the console";
    }
}

export const makeWOQLIntoString = (woql, lang)=>{
    if(typeof woql !== "object") return ""
    if(lang === "js" || lang === "python" && woql){
        return woql.prettyPrint(lang)
    }
    else if(lang === "json" && woql){
        return JSON.stringify(woql.json(), undefined, 2);
    }
    else return ""
}
