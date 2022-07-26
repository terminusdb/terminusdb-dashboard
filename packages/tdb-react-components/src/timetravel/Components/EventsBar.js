import React, {useState,useEffect,useMemo} from 'react';
import {Motion, spring} from 'react-motion';
import PropTypes from 'prop-types';

import Events from './Events';
import EventLine from './EventLine';
import {Faders} from './Faders';
import {LinkButtons} from './LinkButtons';

import Constants from '../Constants';

export const EventsBar = (props)=>{

   const [position,setPosition]=useState(0)
   const [maxPosition,setMaxPosition]=useState(Math.min(props.visibleWidth - props.totalWidth, 0))
 
   const touch = {
      coors: {
        x: 0,
        y: 0
      },
      isSwiping: false,
      started: false,
      threshold: 3}

    const slideToPosition = (position, isClick=false) => {     
      //the width of the timeline component between the two buttons (prev and next)
      //const selectedEvent = props.events[props.index];

      const currentMaxPosition = Math.min(props.visibleWidth - props.totalWidth, 0); // NEVER scroll to the right

      const positionValue=Math.max(Math.min(0, position), currentMaxPosition);

      setPosition(positionValue);
      setMaxPosition(currentMaxPosition);

      /*
      * I have to reload the next page 
      */
      if(positionValue === currentMaxPosition && isClick){
         const firstEvent = props.events.slice(-1)[0];
         if(firstEvent.isLastCommit===false){
            props.loadNextPage({lastPosition:positionValue,maxPosition:currentMaxPosition});
         }
      }
      /*
      * I have to reload the previous page 
      */
      if(positionValue===0 && isClick){
         const lastEvent = props.events[0];
         if(lastEvent.parent!==""){
            props.loadPreviousPage({lastPosition:positionValue,maxPosition:currentMaxPosition});
         }
      }
  }

   useMemo(() => {
        if(props.gotoPosition!==null){
          const selectedEvent=props.events[props.gotoPosition]
          slideToPosition(-(selectedEvent.distance - (props.visibleWidth / 2)));
        }
        //setCandies(allCandies => allCandies.filter(c => c !== candy))
    }, [props.gotoPosition])

    useEffect(() => {
       let selectedEvent = props.events[props.index];
       slideToPosition(-(selectedEvent.distance - (props.visibleWidth / 2)));
    }, [])
  

  const handleTouchStart = (event) => {
    const touchObj = event.touches[0];
    touch.coors.x = touchObj.pageX;
    touch.coors.y = touchObj.pageY;
    touch.isSwiping = false;
    touch.started = true;
  };

  const handleTouchMove = (event) => {
    if (!touch.started) {
      handleTouchStart(event);
      return;
    }

    const touchObj = event.touches[0];
    const dx = Math.abs(touch.coors.x - touchObj.pageX);
    const dy = Math.abs(touch.coors.y - touchObj.pageY);

    const isSwiping = dx > dy && dx > touch.threshold;

    if (isSwiping === true || dx > touch.threshold || dy > touch.threshold) {
      touch.isSwiping = isSwiping;
      const dX = touch.coors.x - touchObj.pageX; // amount scrolled
      touch.coors.x = touchObj.pageX;
      setState({
        position: position - (dX) // set new position
      });
    }
    if (touch.isSwiping !== true) {
      return;
    }
    // Prevent native scrolling
    event.preventDefault();
  };

  const handleTouchEnd = (event) => {
    // Make sure we are scrolled to a valid position
    slideToPosition(position);
    touch.coors.x = 0;
    touch.coors.y = 0;
    touch.isSwiping = false;
    touch.started = false;
  };

  /**
   * This method translates the timeline 
   * @param {string} direction |left|right|
   */
  const updateSlide = (direction) => {
    if (direction === Constants.RIGHT) {
      slideToPosition((position - props.visibleWidth) + props.labelWidth ,true);
    } else if (direction === Constants.LEFT) {
      slideToPosition((position + props.visibleWidth) - props.labelWidth, true);
    }
  }

  const centerEvent = (index) => {
      const event = props.events[index];

      slideToPosition(-event.distance);
  }

  //  passing the index of the clicked entity.
  const touchEvents = props.isTouchEnabled
    ? {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd
    }
    : {};

  // filled value = distane from origin to the selected event
  const filledValue = props.events[props.index].distance - props.barPaddingLeft;
  const eventLineWidth = props.totalWidth - props.barPaddingLeft - props.barPaddingRight;

  return (
      <div
        style={{
          width: `${props.width}px`,
          height: `${props.height}px`,
        }}
        {...touchEvents}
      >
        <div className='history__nav__wrapper'>
          <Motion style={{ X: spring(position)}}
                >{({X}) =>
            <div className='history__nav__events'
              style={{ width: props.totalWidth,
                       WebkitTransform: `translate3d(${X}, 0, 0)px`,
                      transform: `translate3d(${X}px, 0, 0)`}}>
              <EventLine
                left={props.barPaddingLeft}
                width={eventLineWidth}
                fillingMotion={props.fillingMotion}
                backgroundColor={props.styles.outline}
              />
              <EventLine
                left={props.barPaddingLeft}
                width={filledValue}
                fillingMotion={props.fillingMotion}
                backgroundColor={props.styles.foreground}
              />
              <Events
                events={props.events}
                selectedIndex={props.index}
                handleDateClick={props.indexClick}
                labelWidth={props.labelWidth}
              />
            </div>
            }</Motion>
          </div>
        {/* <Faders/> */}
          <LinkButtons
            maxPosition={maxPosition}
            position={position}
            updateSlide={updateSlide}
            firstElement={props.events[0]}
            lastElement={props.events.slice(-1)[0]}
          />
      </div>
    );
  //}
}

EventsBar.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  events: PropTypes.arrayOf(PropTypes.shape({
    distance: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    datetime: PropTypes.number.isRequired,
  })).isRequired,
  isTouchEnabled: PropTypes.bool.isRequired,
  totalWidth: PropTypes.number.isRequired,
  visibleWidth: PropTypes.number.isRequired,
  index: PropTypes.number,
  styles: PropTypes.object.isRequired,
  indexClick: PropTypes.func.isRequired,
  labelWidth: PropTypes.number.isRequired,
  fillingMotion: PropTypes.object.isRequired,
  barPaddingRight: PropTypes.number.isRequired,
  barPaddingLeft: PropTypes.number.isRequired,
}


