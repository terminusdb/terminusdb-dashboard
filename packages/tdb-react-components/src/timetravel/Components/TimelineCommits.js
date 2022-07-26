import React, {useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import {Timeline} from './Timeline';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {DateRangePicker,isInclusivelyBeforeDay,SingleDatePicker} from "react-dates";
/*
* I have to remove moment
*/

import moment from 'moment';
import { SizeMe } from 'react-sizeme'
/*
* I have to remove react-use-dimensions
*/
import useDimensions from "react-use-dimensions";
import {useCommitsControl} from '../hook/useCommitsControl';

/*
* I have to fix the size start
*/
export const TimelineCommits = ({woqlClient,setHead,branch,setError,currentStartTime,currentCommit,headMessage,firstCommit,onChange}) =>{

    const [ref, { x, y, width }] = useDimensions();

    const currentDay=currentStartTime ? moment.unix(currentStartTime) : moment();

    const {dataProviderValues,
          loadPreviousPage,
          gotoPosition,
          startTime,
          setStartTime,
          setSelectedValue,
          loadNextPage} = useCommitsControl(woqlClient, setError, branch, currentDay.unix(), currentCommit, firstCommit);
    /*
    * set the day in the calendar
    */
    const [selectedDay, onDateChange] = useState( currentDay);
    const [focused,onFocusChange] = useState(false);

    useEffect(() => {
        if(onChange) onChange(currentItem)
    }, currentItem)

    const startConf={ isTouchEnabled: true,
                      //isKeyboardEnabled: true,
                      isOpenEnding: true,
                      isOpenBeginning: true,
                      minEventPadding: 20,
                      maxEventPadding: 120,
                      linePadding: 100,
                      labelWidth: 200,
                      fillingMotion:{ stiffness:150, damping: 25},
                      slidingMotion:{ stiffness:150, damping: 25}}
    /*to be removed*/
    const styles={
                background: 'white', //'#f8f8f8',
                foreground: '#00C08B',//'#7b9d6f',
                outline: '#dfdfdf'
              }
    const setSelectedCommit=()=>{
       if(setHead){
          setHead(currentItem)
       }
    }

    const dataProvider= dataProviderValues.dataProvider;
    const currentItem = dataProvider.length>0  ? dataProvider[dataProviderValues.selectedValue] : {label:'No Value',author:'',message:''}
    const buttonActive = dataProvider.length>0 ? {onClick:setSelectedCommit} : {disabled:true}
    const buttonVisible = setHead ? {} : {style:{visibility:'hidden'}};

    if(!currentItem) return null
    return ( 
      <div className="history__nav__content">
        <div className="history__nav__row">
            <SingleDatePicker
                showDefaultInputIcon
                date={selectedDay}
                onDateChange={(selectedDay)=>{
                      onDateChange(selectedDay)
                      setStartTime(selectedDay.add(1, 'day').unix())}}
                 focused={focused}
                 onFocusChange={({focused})=>{
                     onFocusChange(focused)
                 }}
                 numberOfMonths={1}
                 displayFormat='DD-MM-YYYY'//'YYYY-MM-DD'
                 placeholder='dd-mm-yyyy'//"yyyy-mm-dd"
                 isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
                 />
              <div className="history__nav__display__commit">
                  <span className="history__nav__display__test">
                  {`${currentItem.label} - ${currentItem.author}` }</span>
                  <span className="history__nav__display__test">{`${currentItem.message}` }</span>
              </div>
            <button className="tdb__button__base tdb__button__base--bgreen" {...buttonActive} {...buttonVisible}>
                {headMessage}
            </button>
        </div>
          <div className="history__nav__slider__content" ref={ref}>
                  <Timeline
                    containerWidth={width}
                    containerHeight={100}
                    index={dataProviderValues.selectedValue}
                    indexClick={(index) => {
                       setSelectedValue(index)
                    }}
                    loadPreviousPage={loadPreviousPage}
                    loadNextPage={loadNextPage}
                    {...startConf}
                    styles={styles}
                    values={dataProvider}
                    gotoPosition={gotoPosition}
                  />
          </div>
      </div>
    );
  //}
}
//  {/*<SizeMe monitorWidth={true}>{({ size }) => */}
/*TimelineCommits.propTypes = {
  // woqlClient object
  woqlClient: PropTypes.object.isRequired,
  setHead: PropTypes.func,
  branch:PropTypes.string,
  setError:PropTypes.func,
  currentStartTime:PropTypes.number,
  currentCommit:PropTypes.string,
  headMessage:PropTypes.string,
  firstCommit:PropTypes.number

  // Array containing the sorted date strings
  /*values: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    datetime: PropTypes.number.isRequired,
  })).isRequired,*/
//};

//https://terminusdb.com/api/private/user

TimelineCommits.defaultProps = {
  branch:'main',
  currentStartTime:null
};
