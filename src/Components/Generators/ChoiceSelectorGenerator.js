/*  [Status] Unfinished
*   Last Updated: 2018-01-18 15:21:20
*   Support multistate and value of checkbox (depend on CSS)
*   Support limiting answer in minimum or maximum amount
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const ChoiceSelectorGenerator = (props) => {
    class ChoiceSelector extends Component {
        constructor(props) {
            super(props);
            this.state = {
                currentState: []
            };
            this.onSelect = this.onSelect.bind(this);
        }

        componentWillReceiveProps(nextProps) {
            if (!_.isEqual(nextProps.options, props.options)) {
                this.setState({
                    currentState: []
                })
            } else if (!_.isEqual(nextProps.initialValue, props.initialValue)) {
                //Validate initial value and set new currentState
                const { nOptions } = nextProps.options.map((obj) => obj.value);
                nextProps.initialValue.reduce((result, value) => {
                    nOptions.reduce((result, value) => {
                        return result = result && nOptions.indexOf(value) != -1
                    })
                }, true) && (
                        //If the above code is validated. Then it will set new currentState
                        this.setState({
                            currentState: nextProps.initialValue
                        })
                    )
            }
        }

        onSelect(index) {
            const { options } = this.props;
            if (index < 0 || index > options.length) return;
            if (this.state.currentState.indexOf(options[index].value) === -1) {
                const newArr = Array.from(this.state.currentState);
                newArr.splice(index, 1);
                this.setState({
                    currentState: newArr
                })
                if (typeof options[index].onSelect === "function") options[index].onSelect(newArr);
            } else {
                const newArr = Array.from(this.state.currentState).concat(options[index].value);
                this.setState({
                    currentState: newArr
                })
                if (typeof options[index].onDeselect === "function") options[index].onDeselect(newArr);
            }
        }

        render() {
            const { options, className, style, disabled, refFunc, maximum, minimum } = this.props;
            return (
                <div
                    ref={(me) => {
                        typeof refFunc === "function" && refFunc(me)
                    }}
                    className={className ? className : ''}
                    style={style ? style : {}}
                    disabled={disabled ? true : false}
                >
                    This is a (multi state) choice selector
                </div>
            );
        }
    }

    ChoiceSelector.PropTypes = {
        options: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.string.isRequired,
            className: PropTypes.string,
            onSelect: PropTypes.func,
            onDeselect: PropTypes.func
        })).isRequired,
        onChange: PropTypes.func,
        className: PropTypes.string,
        style: PropTypes.objectOf(PropTypes.string),
        disabled: PropTypes.bool,
        refFunc: PropTypes.func,
        maximum: PropTypes.number,
        minimum: PropTypes.number,
        initialValue: PropTypes.arrayOf(PropTypes.string)
    }

    return ChoiceSelector;
}

export default ChoiceSelectorGenerator;
