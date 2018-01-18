/*  [Status] Untest
*   Last Updated: 2018-01-18 13:49:20
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isRequiredIf from 'react-proptype-conditional-require';

const options = ["none", "defaultImg", "defaultBg", "jsxCallback"]

const isArray = (obj) => (typeof obj !== "undefiend" && obj !== null && obj.constructor === Array);
const chooseString = (obj, ind) => {
    if(isArray(obj)) {
        return obj[ind];
    }
    return obj;
}

const ImageGenerator = (themeName) => {
    class Image extends Component {
        constructor(props) {
            super(props);
            this.state = {
                isError: false,
                isDefaultError: false,
                randInd: -1
            }
            if(isArray(props.defaultBg) || isArray(props.defaultClass)) {
                this.state = {
                    isError: false,
                    isDefaultError: false,
                    randInd: Math.floor(Math.random() * props.defaultBg.length)
                }
            }
            this.onError = this.onError.bind(this);
            this.onDefaultError = this.onDefaultError.bind(this);
        }

        onError() {
            this.setState({
                isError: true
            })
        }

        onDefaultError() {
            this.setState({
                isDefaultError: true
            })
        }

        render() {
            const { src,
                className,
                option,
                defaultImg,
                defaultBg,
                jsxCallback,
                disableDefaultBg,
                defaultBg,
                defaultClass,
                ...other } = this.props;
            const { isError, isDefaultError } = this.state;
            if (isError) {
                if (!isDefaultError && option === options[1]) {
                    return (<img
                        {...other}
                        src={defaultImg}
                        className={`${themeName} ${className}`}
                        onError={this.onDefaultError}
                    />);
                } else if(option === options[2]) {
                    return (<div
                        {...other}
                        className={`${themeName} ${className} ${disableDefaultBg ? chooseString(defaultClass, randInd) : ''}`}
                        style={!disableDefaultBg ? {
                            backgroundColor: chooseString(defaultBg, randInd)
                        } : {}}
                    />)
                } else if(option === options[3]) {
                    return jsxCallback();
                }
                return null;
            }

            return (
                <img
                    {...other}
                    src={src}
                    className={`${themeName} ${className}`}
                    onError={this.onError}
                />
            );
        }
    }

    Image.propTypes = {
        src: PropTypes.string.isRequired,
        option: PropTypes.string.isRequired,
        defaultImg: isRequiredIf(PropTypes.string, (props, propName, componentName) => {
            return props.option === options[1]
        }),
        defaultBg: isRequiredIf(PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]), (props, propName, componentName) => {
            return !props.disableDefaultBg && props.option === options[2]
        }),
        disableDefaultBg: isRequiredIf(PropTypes.bool, (props, propName, componentName) => {
            return props.option === options[2]
        }),
        defaultClass: isRequiredIf(PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]), (props, propName, componentName) => {
            return props.disableDefaultBg && props.option === options[2]
        }),
        jsxCallback: isRequiredIf(PropTypes.func, (props, propName, componentName) => {
            return props.option === options[3]
        })
    }

    return Image;
}

export default ImageGenerator;