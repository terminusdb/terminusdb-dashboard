import React from "react"
import Stack from "react-bootstrap/Stack"
import Badge from 'react-bootstrap/Badge';

export const RadioButtonControllers = ({ commitID, handleChange, compareChecked, displayText, recentCommit }) => {
	return <Stack gap={3} direction="horizontal" className="w-100">
    <input
      type="radio"
      name={commitID}
      checked={compareChecked.curr.identifier === commitID || compareChecked.prev.identifier === commitID}
      onChange={(e) => handleChange(commitID)}
    />
    <label data-cy={displayText} className="control-label w-100 mt-2">{displayText}	</label>
    {recentCommit && <Badge bg="success" className="text-dark">Latest</Badge>}
	</Stack>
}
