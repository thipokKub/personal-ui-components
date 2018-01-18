/*  [Status] Finished
*   Last Updated: 2018-01-18 13:47:41
*/

import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { RippleButton } from '../Others/Ripple/index';

const BtnGenerator = (themeName) => {
    const Btn = ({ children, refFunc, isRipple, color, ...props}) => {
        color = color || 'rgba(255, 255, 255, 1)';
        if(isRipple) {
            return (
                <RippleButton
                    {...props}
                    className={`${themeName} btn ${_.get(props, 'className', '')}`}
                    ref={(me) => {
                        typeof refFunc === "function" && refFunc(me)
                    }}
                    color={color}
                    duration={400}
                >
                    {
                        (() => {
                            if (typeof children === "undefined" || children === null) return [];
                            if (children.constructor === Array || React.isValidElement(children) || typeof children === "string") return children;
                            return [];
                        })()
                    }
                </RippleButton>
            );
        }

        return (
            <button
                {...props}
                className={`${themeName} btn ${_.get(props, 'className', '')}`}
                ref={(me) => {
                    typeof refFunc === "function" && refFunc(me)
                }}
            >
                {
                    (() => {
                        if (typeof children === "undefined" || children === null) return [];
                        if (children.constructor === Array || React.isValidElement(children) || typeof children === "string") return children;
                        return [];
                    })()
                }
            </button>
        );
    }

    Btn.propTypes = {
        refFunc: PropTypes.func,
        className: PropTypes.string,
        isRipple: PropTypes.bool
    }

    return Btn;
}

export default BtnGenerator;