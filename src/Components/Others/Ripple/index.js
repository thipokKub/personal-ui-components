import './style.min.css';

import React, { Component } from 'react';
import _ from 'lodash';

export class Ripple extends Component {
    constructor() {
        super();
        this.state = {
            animate: false,
            width: 0,
            height: 0,
            top: 0,
            left: 0
        }
    }

    render() {
        let style = {
            top: this.state.top + "px",
            left: this.state.left + "px",
            width: this.state.width + "px",
            height: this.state.height + "px"
        }

        if(typeof this.props.color === "string") {
            style = {
                ...style,
                background: this.props.color
            }
        }
        if(typeof this.props.duration === "number" && this.props.duration >= 0) {
            style = {
                ...style,
                animationDuration: `${this.props.duration/1000}s`
            }
        }
        return (
            <div className={"Ripple " + (this.state.animate ? "is-reppling" : "")} ref="ripple" style={style}></div>
        )
    }


    reppling(cursorPos) {

        // Get the element
        let $ripple = this.refs.ripple
        let $button = $ripple.parentElement

        let buttonStyle = window.getComputedStyle($button)
        let buttonPos = $button.getBoundingClientRect()

        const borderWidth = parseFloat(buttonStyle["borderWidth"].replace(/px/, ''));

        let buttonWidth = $button.offsetWidth + 2*borderWidth
        let buttonHeight = $button.offsetHeight + 2*borderWidth

        // Make a Square Ripple
        let rippleWidthShouldBe = Math.max(buttonHeight, buttonWidth)

        // Make Ripple Position to be center
        let centerize = rippleWidthShouldBe / 2

        this.setState({
            animate: true,
            width: rippleWidthShouldBe,
            height: rippleWidthShouldBe,
            top: cursorPos.top - buttonPos.top - centerize - borderWidth,
            left: cursorPos.left - buttonPos.left - centerize - borderWidth
        })
    }

    componentWillReceiveProps(nextProps) {
        let cursorPos = nextProps.cursorPos

        // Prevent Component duplicates do ripple effect at the same time
        if (cursorPos.time !== this.props.cursorPos.time) {
            // If Has Animated, set state to "false" First
            if (this.state.animate) {
                this.setState({ animate: false }, () => {
                    this.reppling(cursorPos)
                })
            }
            // else, Do Reppling
            else this.reppling(cursorPos)
        }
    }
}

export class RippleButton extends Component {
    constructor() {
        super();
        this.state = {
            cursorPos: {}
        }
    }

    render() {
        const { type } = this.props;
        if(type === "label") {
            return (
                <label
                    {...this.props}
                    ref="button"
                    className={`Ripple-parent ${_.get(this.props, 'className', '')}`}
                    onMouseUp={this.handleClick.bind(this)}
                    onTouchEnd={this.handleClick.bind(this)}
                >
                    {this.props.children}
                    <Ripple cursorPos={this.state.cursorPos} color={this.props.color} duration={this.props.duration} />
                </label>
            )
        }
        return (
            <button
                {...this.props}
                ref="button"
                className={`Ripple-parent ${_.get(this.props, 'className', '')}`}
                onMouseUp={this.handleClick.bind(this)}
                onTouchEnd={this.handleClick.bind(this)}
            >
                {this.props.children}
                <Ripple cursorPos={this.state.cursorPos} color={this.props.color} duration={this.props.duration}/>
            </button>
        )
    }

    handleClick(e) {
        // Get Cursor Position
        let cursorPos = {
            top: e.clientY,
            left: e.clientX,
            time: Date.now()
        }
        this.setState({ cursorPos: cursorPos })
    }
}
