/*  [Status] Unfinished
*   Last Updated: 2018-01-18 13:48:23
*/

import React, { Component } from 'react';
import OutsideClick from '../Others/OutsideClick';
import PropTypes from 'prop-types';

import DayPicker from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import isRequiredIf from 'react-proptype-conditional-require';

const types = ["date", "date:multi", "date-time", "date-time:multi", "date-time:multi:time-range", "time", "time-range"];

const DateTimeGenerator = (themeName) => {
    class DateTime extends Component {
        render() {
            const { type } = this.props;
            let InnerJSX = null;
            switch(type) {
                case types[0]:
                    //Date single only
                    break;
                case types[1]:
                    //Date multi only
                    break;
                case types[2]:
                    //Date and time (single date)
                    break;
                case types[3]:
                    //Date and time (multiple dates)
                    break;
                case types[4]:
                    //Date and time (multiple dates with repeated range of time)
                    break;
                case types[5]:
                    //Time only
                    break;
                case types[6]:
                    //Time range
                    break;
                default:
            }
            return null
        }
    }

    DateTimeGenerator.propTypes = {
        type: (props) => types.indexOf(props.type) !== -1,
        isBtn: PropTypes.bool,
        btnText: isRequiredIf(PropTypes.string, (props) => props.isBtn ? true : false),
        onBtnClick: isRequiredIf(PropTypes.string, (props) => props.isBtn ? true : false),
        onChange: PropTypes.func,
        refFunc: PropTypes.func
    }
}

export default DateTimeGenerator;