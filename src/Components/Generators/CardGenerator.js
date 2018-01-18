/*  [Status] Finished
*   Last Updated: 2018-01-18 13:48:01
*/

import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const CardGenerator = (themeName) => {
    const Card = (props) => {
        const { refFunc, flex, center, inlineFlex, clickAble, column, roundCorner, ...other } = props;
        return (
            <section
                {...other}
                className={`${themeName} card${flex ? ' flex' : ''}${inlineFlex ? ' inline-flex' : ''}${(inlineFlex || flex) && center ? ' center' : ''}${(inlineFlex || flex) && column ? ' column' : ''}${clickAble ? ' click-able' : ''}${roundCorner ? ' round-corner' : ''} ${_.get(other, 'className', '')}`}
                ref={(me) => {
                    typeof refFunc === "function" && refFunc(me)
                }}
            />
        );
    }

    Card.propTypes = {
        refFunc: PropTypes.func,
        className: PropTypes.string
    }

    return Card;
}

export default CardGenerator;