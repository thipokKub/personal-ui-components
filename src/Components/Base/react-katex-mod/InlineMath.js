import React from 'react';
import createMathComponent from './createMathComponent';
import PropTypes from 'prop-types';

const InlineMath = ({ html, className, style, refFunc }) => {
  className = className ? className : '';
  style = style ? style : {};
  refFunc = typeof refFunc === "function" ? refFunc : () => { };

  return <span ref={(me) => refFunc(me)} className={className} style={style} dangerouslySetInnerHTML={{__html: html}} />;
};

InlineMath.propTypes = {
  html: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.string),
  refFunc: PropTypes.func
};

export default createMathComponent(InlineMath, { displayMode: false });
