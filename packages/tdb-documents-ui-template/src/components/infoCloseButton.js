import React from "react"
import { FaTimes } from "react-icons/fa"
import { Button } from "react-bootstrap"

/**
 * 
 * @param {*} type setShowFrames constant to hide display of document frames
 * @returns a close button icon
 */
 export const CloseInfoButton = ({ setShowInfo }) => { 

  function handleClose (e) {
      let info = { frames: false, history: false }
      setShowInfo(info)
  }
  // on close button display document list table
  return <Button variant="light" 
    className="btn-sm btn text-dark float-right ms-auto" 
    tilte={`Close`}
    onClick={handleClose}>
    <FaTimes/>
  </Button>
}