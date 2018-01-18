/*  [Status] Finished
*   Last Updated: 2018-01-18 13:52:04
*/

import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const TextAreaGenerator = (themeName) => {
    class TextArea extends Component {
        constructor(props) {
            super(props);
            this.onResize = this.onResize.bind(this);
        }
        onResize() {
            this.textArea.style.height = 'auto';
            this.textArea.style.height = this.textArea.scrollHeight + 'px';
        }
        componentDidMount() {
            this.textArea.addEventListener("keyup", this.onResize);
            this.onResize();
        }
        componentWillUnmount() {
            this.textArea.removeEventListener("keyup", this.onResize);
        }
        render() {
            const { refFunc, ...props } = this.props;
            return <textarea
                {...props}
                className={`${themeName} ${_.get(props, 'className', '')}`}
                ref={(me) => {
                    this.textArea = me;
                    refFunc && refFunc(me);
                }}
            />
        }
    }

    TextArea.propTypes = {
        refFunc: PropTypes.func,
        className: PropTypes.string
    }

    return TextArea;
}

export default TextAreaGenerator;