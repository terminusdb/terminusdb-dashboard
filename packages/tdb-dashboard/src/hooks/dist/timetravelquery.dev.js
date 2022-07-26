"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commitsQueryByBranch = commitsQueryByBranch;
exports.previousCommits = previousCommits;

var _terminusdbClient = require("@terminusdb/terminusdb-client");

function commitsQueryByBranch() {
  var branchName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'main';
  var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  return _terminusdbClient.WOQL.limit(limit).select("v:Parent ID", "v:Commit ID", "v:Time", "v:Author", "v:Branch ID", "v:Message").and(_terminusdbClient.WOQL.triple("v:Branch", "@schema:name", _terminusdbClient.WOQL.string(branchName)), _terminusdbClient.WOQL.triple("v:Branch", "@schema:head", "v:Active Commit ID"), _terminusdbClient.WOQL.or(_terminusdbClient.WOQL.and(_terminusdbClient.WOQL.triple("v:Active Commit ID", "@schema:identifier", "v:Commit ID"), _terminusdbClient.WOQL.triple("v:Active Commit ID", "@schema:timestamp", "v:Time"), _terminusdbClient.WOQL.triple("v:Active Commit ID", "@schema:author", "v:Author"), _terminusdbClient.WOQL.triple("v:Active Commit ID", "@schema:message", "v:Message"), _terminusdbClient.WOQL.triple("v:Branch", "@schema:name", "v:Branch ID"), _terminusdbClient.WOQL.opt().triple("v:Parent", "@schema:parent", "v:Parent Node").triple("v:Parent Node", "@schema:identifier", "v:Parent ID")), _terminusdbClient.WOQL.and(_terminusdbClient.WOQL.path("v:Active Commit ID", "@schema:parent+", "v:Parent", "v:Path"), _terminusdbClient.WOQL.triple("v:Parent", "@schema:identifier", "v:Commit ID"), _terminusdbClient.WOQL.triple("v:Parent", "@schema:timestamp", "v:Time"), _terminusdbClient.WOQL.triple("v:Parent", "@schema:author", "v:Author"), _terminusdbClient.WOQL.triple("v:Parent", "@schema:message", "v:Message"), _terminusdbClient.WOQL.opt().triple("v:Parent", "@schema:parent", "v:Parent Node").triple("v:Parent Node", "@schema:identifier", "v:Parent ID"))));
} //not include the commit_id
//get the commits older that commit_id


function previousCommits(commit_id, limit) {
  return _terminusdbClient.WOQL.limit(limit).select("v:Parent ID", "v:Commit ID", "v:Time", "v:Author").and(_terminusdbClient.WOQL.and(_terminusdbClient.WOQL.triple("v:Active Commit ID", "@schema:identifier", _terminusdbClient.WOQL.string(commit_id)), _terminusdbClient.WOQL.path("v:Active Commit ID", "@schema:parent+", "v:Parent", "v:Path"), _terminusdbClient.WOQL.triple("v:Parent", "@schema:identifier", "v:Commit ID"), _terminusdbClient.WOQL.triple("v:Parent", "@schema:timestamp", "v:Time"), _terminusdbClient.WOQL.triple("v:Parent", "@schema:author", "v:Author"), _terminusdbClient.WOQL.triple("v:Parent", "@schema:message", "v:Message"), _terminusdbClient.WOQL.triple("v:Parent", "@schema:parent", "v:Parent ID")));
} //to be fix

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