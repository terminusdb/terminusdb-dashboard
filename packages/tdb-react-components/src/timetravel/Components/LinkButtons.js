import React from 'react';
import PropTypes from 'prop-types';
import Constants from '../Constants';

// icons
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

export const LinkButtons = (props) => {
  const buttonBackEnabled = Math.round(props.position) < 0 || props.firstElement.parent!=="";
  const buttonForwardEnabled = Math.round(props.position) > Math.round(props.maxPosition) || props.lastElement.isLastCommit===false; 

  const iconLeftActive=buttonBackEnabled ? '' : 'history__nav__link__icon--inactive'
  const iconRightActive=buttonForwardEnabled ? '' : 'history__nav__link__icon--inactive'
  const linkLeftActive=buttonBackEnabled ? '' : 'history__nav__link--inactive'
  const linkRightActive=buttonForwardEnabled ? '' : 'history__nav__link--inactive'


  return (
    <ul className="history__nav__link__wrapper">
      <li className={`history__nav__link history__nav__link--left ${linkLeftActive}`}
        key={Constants.LEFT}
        onClick={() => props.updateSlide(Constants.LEFT)}>
        <FaAngleLeft className={`history__nav__link__icon ${iconLeftActive}`}/>
      </li>
      <li className={`history__nav__link history__nav__link--right ${linkRightActive}`}
        onClick={() => props.updateSlide(Constants.RIGHT)}>
        <FaAngleRight className={`history__nav__link__icon ${iconRightActive}`}/>
      </li>
    </ul>
  );
}

LinkButtons.propTypes = {
  // The function to update the slide
  updateSlide: PropTypes.func.isRequired,
  // Information about what portion of the timeline is visible between buttons
  position: PropTypes.number.isRequired,
   // The maximum position in the timeline component 
  maxPosition: PropTypes.number
};
