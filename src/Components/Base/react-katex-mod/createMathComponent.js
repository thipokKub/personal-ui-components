import React from 'react';
import KaTeX from 'katex';
import PropTypes from 'prop-types';

const createMathComponent = (Component, { displayMode }) => {
  class MathComponent extends React.Component {
    constructor(props) {
      super(props);

      this.usedProp = props.math ? 'math' : 'children';

      this.state = this.createNewState(null, props);
    }

    componentWillReceiveProps() {
      this.setState(this.createNewState);
    }

    shouldComponentUpdate(nextProps) {
      return nextProps[this.usedProp] !== this.props[this.usedProp];
    }

    createNewState(prevState, props) {
      try {
        const html = this.generateHtml(props);

        return { html, error: undefined };
      } catch(error) {
        return { error, html: undefined };
      }
    }

    generateHtml(props) {
      return KaTeX.renderToString(
        props[this.usedProp],
        { displayMode }
      );
    }

    render() {
      if(this.state.html) {
        return <Component refFunc={this.props.refFunc} className={this.props.className} style={this.props.style} html={this.state.html} />;
      }

      if(this.props.renderError) {
        return this.props.renderError(this.state.error);
      }

      throw this.state.error;
    }
  }

  MathComponent.propTypes = {
    children: PropTypes.string,
    math: PropTypes.string,
    renderError: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.objectOf(PropTypes.string),
    refFunc: PropTypes.func
  };

  return MathComponent;
};


export default createMathComponent;
