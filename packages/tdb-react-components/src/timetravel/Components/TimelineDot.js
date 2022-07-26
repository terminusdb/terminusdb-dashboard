import React from 'react';
import PropTypes from 'prop-types';
/**
 * The markup for the dot on the timeline
 */
export const TimelineDot = (props) =>{
  let dotType = ''
  if (props.index < props.selected) {
    dotType = 'history__nav__dot--back'
  } else if (props.index === props.selected) {
    dotType = 'history__nav__dot--current'
  }

  return (
    <li
      key={ props.datetime }
      id={`timeline-dot-${props.datetime}`}
      className={`history__nav__dot__label`}
      onClick={() => props.onClick(props.index)}
      style={{left: props.distanceFromOrigin - props.labelWidth / 2}}
    >
      { props.label }
      <span
        key='dot-dot'
        className={`history__nav__dot ${dotType}`}
        style={{ left: props.labelWidth / 2 - props.dotsWidth / 2}}
      />
    </li>
  )
}

/**
 * propTypes
 * @type {Object}
 */
TimelineDot.defaultProps = {
  dotsWidth:12
}

TimelineDot.propTypes = {
  // The index of the currently selected dot 
  selected: PropTypes.number.isRequired,
  // The index of the present event (used for deciding the styles alongside selected)
  index: PropTypes.number.isRequired,
  // The actual date of the event (used as key and id)
  datetime: PropTypes.number.isRequired,
  // The onClick handler ( in this case to trigger the fillingMotion of the timeline )
  onClick: PropTypes.func.isRequired,
  // The date of the event (required to display it)
  label: PropTypes.string.isRequired,
  // The width you want the labels to be
  labelWidth: PropTypes.number.isRequired,
  // The width of the dots
  dotsWidth: PropTypes.number,
  // The numerical value in pixels of the distance from the origin
  distanceFromOrigin: PropTypes.number.isRequired
};

