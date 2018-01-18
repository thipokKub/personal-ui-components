/*  [Status] Unfinished
*   Last Updated: 2018-01-18 13:49:04
*/

import React, { Component } from 'react';
import { withFormsy } from 'formsy-react';
import PropTypes from 'prop-types';

import InputTextGenerator from './InputTextGenerator';
import RSelectWG, { RSelectAsyncWG, RSelectCreateableWG, RSelectAsyncCreatablecWG } from './ReactSelectWrapperGenerator';
import SelectBoxGenerator from './SelectBoxGenerator';
import FileUploadGenerator from './FileUploadGenerator';

const types = ["text", "text:number", "text:password", "text:email",
"date", "date-time", "time", "list", "select", "color", "file", "range",
"jsxCallback"];

const FormInputGenerator = (themeName) => {
    class FormInput extends Component  {
        constructor(props) {
            super(props);
            this.changeValue = this.changeValue.bind(this);
        }
        onValueChange(event) {
            this.props.setValue(event.currentTarget.value);
        }
        render() {
            const errorMessage = this.props.getErrorMessage();
            const { type, jsxCallback } = this.props;
            let InnerJSX = null;

            switch(type) {
                case types[0]:
                case types[1]:
                case types[2]:
                case types[3]:
                    //Normal Text
                    InnerJSX = InputTextGenerator(themeName);
                    break;
                case types[4]:
                case types[5]:
                case types[6]:
                    //Date-time Component
                    InnerJSX = null;
                    break;
                case types[7]:
                    //List: SelectBox or React Select
                    //Depends on type
                    break;
                case types[8]:
                    //Multiple selection (multi-state)
                    break;
                case types[9]:
                    //Color input
                    break;
                case types[10]:
                    //File upload button
                    InnerJSX = FileUploadGenerator(themeName);
                    break;
                case types[11]:
                    //Range slider
                    //Probably react-nouislider
                    break;
                case types[12]:
                    //jsxCallback
                    (typeof jsxCallback === "function") && (InnerJSX = jsxCallback(this.props.getValue()));
                    break;
                default:
            }

            return (
                <div>

                </div>
            );
        }
    }

    FormInput.propTypes = {
        type: (props) => (types.indexOf(props.type) !== -1)
    }
    
    return withFormsy(FormInput);
}
