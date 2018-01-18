import React from 'react';
import createMathComponent from './createMathComponent';
import PropTypes from 'prop-types';

const BlockMath = ({ html, className, style, refFunc }) => {
  className = className ? className : '';
  style = style ? style : {};
  refFunc = typeof refFunc === "function" ? refFunc : () => {};

  return <div ref={(me) => refFunc(me)} className={className} style={style} dangerouslySetInnerHTML={{__html: html}} />;
};

BlockMath.propTypes = {
  html: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.string),
  refFunc: PropTypes.func
};

export default createMathComponent(BlockMath, { displayMode: true });
