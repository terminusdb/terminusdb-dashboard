import React from 'react';
import PropTypes from 'prop-types';
/**
 * the fade effect at the end of the timeline
 */
export const Faders = (props) => (
   <ul>
    <li className="history__nav__faders history__nav__faders--left"/>
    <li className="history__nav__faders history__nav__faders--right"/>
  </ul>
);