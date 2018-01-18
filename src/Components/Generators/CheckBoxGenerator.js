/*  [Status] Unfinished
*   Last Updated: 2018-01-18 14:21:48
*   Support multistate and value of checkbox (depend on CSS)
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

function getVal(state, index) {
    return state[index].value || state[index];
}

const CheckBoxGenerator = (props) => {
    class CheckBox extends Component {
        constructor(props) {
            super(props);
            this.state = {
                currentState: props.initialState
            };

            this.onChangeState = this.onChangeState.bind(this);
        }

        componentWillReceiveProps(nextProps) {
            if(!_.isEqual(nextProps.options, props.options)) {
                this.onChangeState(0)
            } else if (!_.isEqual(nextProps.initialState, props.initialState)) {
                if (this.state.currentState < nextProps.options.length && this.state.currentState >= 0) {
                    this.onChangeState(nextProps.initialState)
                } else {
                    this.onChangeState(0)
                }
            }
        }

        onChangeState(nextState) {
            const { states, onChange } = this.props;
            const { currentState } = this.state;
            nextState = nextState ? nextState : (currentState + 1) % states.length;

            this.setState({
                currentState: nextState
            }, () => {
                typeof onChange === "function" && onChange(getVal(this.props.states, nextState))
            })
        }

        render() {
            const { className, style, disabled, refFunc, states } = this.props;
            const { currentState } = this.state;

            return (
                <div
                    ref={(me) => {
                        typeof refFunc === "function" && refFunc(me)
                    }}
                    className={className ? className : ''}
                    style={style ? style : {}}
                    disabled={disabled ? true : false}
                    onClick={() => this.onChangeState()}
                >
                    This is a (multi state) check box with state {currentState} {getVal(states, currentState)}
                </div>
            );
        }
    }

    CheckBox.propTypes = {
        initialState: PropTypes.number.isRequired,
        states: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.shape({
                value: PropTypes.string.isRequired,
                className: PropTypes.string
            })),
            PropTypes.arrayOf(PropTypes.string)
        ]).isRequired,
        onChange: PropTypes.func,
        className: PropTypes.string,
        style: PropTypes.objectOf(PropTypes.string),
        disabled: PropTypes.bool,
        refFunc: PropTypes.func
    }

    return CheckBox;
}

export default CheckBoxGenerator;
