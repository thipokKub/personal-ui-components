/*  [Status] Finished
*   Last Updated: 2018-01-18 13:50:48
*/

import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const SelectBoxGenerator = (themeName) => {
    const SelectBox = (props) => {
        const { onChange, value, refFunc, ...other } = props;
        return (
            <select
                {...other}
                onClick={onChange}
                onChange={onChange}
                value={value}
                className={`${themeName} ${_.get(other, 'className', '')}`}
                ref={(me) => {
                    typeof refFunc === "function" && refFunc(me)
                }}
            >
                {
                    _.get(other, 'options', []).map((text, index) => {
                        return (
                            <option value={text} key={index}>{text}</option>
                        );
                    })
                }
            </select>
        );
    }

    SelectBox.propTypes = {
        value: PropTypes.any,
        onChange: PropTypes.func,
        refFunc: PropTypes.func,
        options: PropTypes.arrayOf(PropTypes.string),
        className: PropTypes.string
    }

    return SelectBox;
}

export default SelectBoxGenerator;