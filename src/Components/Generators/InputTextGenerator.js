/*  [Status] Finished
*   Last Updated: 2018-01-18 13:49:40
*/

import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const InputTextGenerator = (themeName) => {
    const InputText = ({ refFunc, ...other }) => {
        return (
            <input
                {...other}
                className={`${themeName} ${_.get(other, 'className', '')}`}
                ref={(me) => {
                    typeof refFunc === "function" && refFunc(me)
                }}
            />
        );
    }

    InputText.propTypes = {
        refFunc: PropTypes.func,
        className: PropTypes.string
    }

    return InputText;
}

export default InputTextGenerator;