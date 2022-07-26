import {WOQL} from '@terminusdb/terminusdb-client'
//https://github.com/terminusdb/terminusdb/issues/478
//when we open the timetravel

export function commitsQueryByBranch(branch='main', limit=10){
    let newLimit=limit + 1
    let query = WOQL.limit(newLimit).select("v:Parent ID","v:Commit ID","v:Time","v:Author", "v:Branch ID","v:Message")
        .and(
            WOQL.triple("v:Branch", "name", WOQL.string(branch)),
            WOQL.triple("v:Branch", "head", "v:Active Commit ID"),
            WOQL.path("v:Active Commit ID", "parent*", "v:Parent", "v:Path"),
            WOQL.triple("v:Parent","identifier","v:Commit ID"),
            WOQL.triple("v:Parent","timestamp","v:Time"),
            WOQL.triple("v:Parent","author","v:Author"),
            WOQL.triple("v:Parent","message","v:Message"),
    )  
    return query   
}


//when we open the timetravel
export function commitsQueryByBranchFilteredByTime(branch='main',limit=10, ts=null){
    let newLimit=limit + 1
    let query = WOQL.limit(newLimit).select("v:Parent ID","v:Commit ID","v:Time","v:Author", "v:Branch ID","v:Message")
        .and(
            WOQL.triple("v:Branch", "name", WOQL.string(branch)),
            WOQL.triple("v:Branch", "head", "v:Active Commit ID"),
            WOQL.path("v:Active Commit ID", "parent*", "v:Parent", "v:Path"),
            WOQL.triple("v:Parent","identifier","v:Commit ID"),
            WOQL.triple("v:Parent","timestamp","v:Time"),
            WOQL.triple("v:Parent","author","v:Author"),
            WOQL.triple("v:Parent","message","v:Message"),
    )  
    //.not().greater("v:Time", ts),

    //let query = WOQL.lib().active_commit_id(branch, 1629892776.571411, "v:test")

    //1629892776.571411
    return query
}



/*export function commitsQueryByBranch(branch='main',limit=10){
    let newLimit=limit + 1
    return WOQL.limit(newLimit).select("v:Parent ID","v:Commit ID","v:Time","v:Author", "v:Branch ID","v:Message")
        .and(
            WOQL.triple("v:Branch", "name", WOQL.string(branch)),
            WOQL.triple("v:Branch", "head", "v:Active Commit ID"),
            WOQL.path("v:Active Commit ID", "parent*", "v:Parent", "v:Path"),
            WOQL.triple("v:Parent","identifier","v:Commit ID"),
            WOQL.triple("v:Parent","timestamp","v:Time"),
            WOQL.triple("v:Parent","author","v:Author"),
            WOQL.triple("v:Parent","message","v:Message"),
    )
}*/



//get the commits older that commit_id
export function previousCommits(commit_id,limit){
    return WOQL.limit(limit).select("v:Parent ID","v:Message","v:Commit ID","v:Time","v:Author").and(
        WOQL.and(
            WOQL.triple("v:Active Commit ID","@schema:identifier",WOQL.string(commit_id)),
            WOQL.path("v:Active Commit ID", "@schema:parent+","v:Parent", "v:Path"),
            WOQL.triple("v:Parent","@schema:identifier","v:Commit ID"),
            WOQL.triple("v:Parent","@schema:timestamp","v:Time"),
            WOQL.triple("v:Parent","@schema:author","v:Author"),
            WOQL.triple("v:Parent","@schema:message","v:Message"),
            WOQL.triple("v:Parent","@schema:parent","v:Parent ID")
            )
    )
} 



//to be fix
/*function getFromTime(branch='main',limit=10,startTime){
    WOQL.limit(limit).select("v:Parent ID","v:Commit ID","v:Time","v:Author", "v:Branch ID").and(
        WOQL.lib().active_commit_id(branch, startTime, "Active Commit ID"),
        //WOQL.triple("v:Branch", "@schema:name", WOQL.string(branchName)),
        WOQL.triple("v:Current Commit ID", "@schema:identifier", "v:Active Commit ID"),
        WOQL.or(
            WOQL.and( triple("v:Current Commit ID","@schema:identifier","v:Commit ID"),
                WOQL.triple("v:Current Commit ID","@schema:timestamp","v:Time"),
                WOQL.triple("v:Current Commit ID","@schema:author","v:Author"),
                WOQL.triple("v:Current Commit ID","@schema:message","v:Message"),
                WOQL.triple("v:Current","@schema:name","v:Branch ID")
                ),
            WOQL.and(
                WOQL.path("v:Current Commit ID", "@schema:parent+","v:Parent", "v:Path"),
                WOQL.triple("v:Parent","@schema:identifier","v:Commit ID"),
                WOQL.triple("v:Parent","@schema:timestamp","v:Time"),
                WOQL.triple("v:Parent","@schema:author","v:Author"),
                WOQL.triple("v:Parent","@schema:message","v:Message"),
                WOQL.triple("v:Parent","@schema:parent","v:Parent ID")
                )
        )
    )
}*/




