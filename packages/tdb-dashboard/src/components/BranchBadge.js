import React from "react"
import { BiGitBranch } from "react-icons/bi"

export const BranchBadge = ({branchName, variant, dataCy, className}) =>  {
  return 	<label className={`text-${variant} ${className} badge bg-secondary border border-${variant} fw-bold mt-2`}
    data-cy={dataCy}>
    <BiGitBranch className={`mr-1 text-${variant}`}/>
    <>{branchName}</>
  </label>
						
}