import React from 'react';
import PropTypes from 'prop-types';
import {EventsBar} from './EventsBar';

import {zip, daydiff, cummulativeSeparation} from '../helpers';
import Constants from '../Constants';

export const Timeline = (props) =>{

    if (!props.containerWidth) {
      return false;
    }
    const dates=props.values || []

    if(dates.length===0) return <div>NO Value</div>
    // Calculate the distances for all events
    const events = cummulativeSeparation(
      dates,
      props.labelWidth,
      props.minEventPadding,
      props.maxEventPadding,
      props.linePadding,
    );

    const visibleWidth = props.containerWidth - 80;

    const totalWidth = Math.max(
      events[events.length - 1].distance + props.linePadding,
      visibleWidth
    );

    let barPaddingRight = 0;
    let barPaddingLeft = 0;
    if (!props.isOpenEnding) {
      barPaddingRight = totalWidth - events[events.length - 1].distance;
    }
    if (!props.isOpenBeginning) {
      barPaddingLeft = events[0].distance;
    }

    return (
      <EventsBar
        gotoPosition={props.gotoPosition}
        width={props.containerWidth}
        height={props.containerHeight}
        events={events}
        isTouchEnabled={props.isTouchEnabled}
        loadNextPage={props.loadNextPage}
        loadPreviousPage={props.loadPreviousPage}
        totalWidth={totalWidth}
        visibleWidth={visibleWidth}

        index={props.index}
        styles={props.styles}
        indexClick={props.indexClick}
        labelWidth={props.labelWidth}
        fillingMotion={props.fillingMotion}
        barPaddingRight={barPaddingRight}
        barPaddingLeft={barPaddingLeft}
      />
    );
  //};

}

/**
 * The expected properties from the parent
 * @type {Object}
 */
Timeline.propTypes = {
  // --- EVENTS ---
  // Selected index
  index: PropTypes.number,
  // Array containing the sorted date strings
  values: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    datetime: PropTypes.number.isRequired,
  })).isRequired,
  //values: PropTypes.arrayOf(PropTypes.string).isRequired,
  // Function that takes the index of the array as argument
  indexClick: PropTypes.func,
  // --- POSITIONING ---
  // the minimum padding between events
  minEventPadding: PropTypes.number,
  // The maximum padding between events
  maxEventPadding: PropTypes.number,
  // Padding at the front and back of the line
  linePadding: PropTypes.number,
  // The width of the label
  labelWidth: PropTypes.number,
  // --- STYLING ---
  styles: PropTypes.object,
  fillingMotion: PropTypes.object,
  slidingMotion: PropTypes.object,
  isOpenEnding: PropTypes.bool,
  isOpenBeginning: PropTypes.bool,
  // --- INTERACTION ---
  isTouchEnabled: PropTypes.bool,
  //isKeyboardEnabled: PropTypes.bool,
};

/**
 * The values that the properties will take if they are not provided
 * by the user.
 * @type {Object}
 */
Timeline.defaultProps = {
  // --- POSITIONING ---
  minEventPadding: Constants.MIN_EVENT_PADDING,
  maxEventPadding: Constants.MAX_EVENT_PADDING,
  linePadding: Constants.TIMELINE_PADDING,
  labelWidth: Constants.DATE_WIDTH,
  // --- STYLING ---
  styles: {
    outline: '#dfdfdf',
    background: '#f8f8f8',
    foreground: '#7b9d6f'
  },
  fillingMotion: {
    stiffness: 150,
    damping: 25
  },
  slidingMotion: {
    stiffness: 150,
    damping: 25
  },
  isOpenEnding: true,
  isOpenBeginning: true,
  // --- INTERACTION ---
  isTouchEnabled: true,
};
