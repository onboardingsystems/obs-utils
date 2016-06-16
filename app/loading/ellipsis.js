import React from 'react';

var LoadingEllipsis = React.createClass({
  _dotInterval: null,

  getInitialState() {
    return {
      dotCount: 0,
      dots: ''
    }
  },

  componentDidMount() {
    this._dotInterval = setInterval(this.updateDots, 500);
  },

  componentWillUnmount() {
    clearInterval(this._dotInterval);
  },

  updateDots() {
    var count = this.state.dotCount + 1;
    if(count >= 4) count = 0;
    var dots = ".".repeat(count);
    this.setState({dotCount: count, dots: dots});
  },

  render() {
    return(
      <span className="loading-ellipsis" style={{opacity: "0.75", fontStyle: "italic"}}>
        {this.props.children || 'loading'}
        <span className="dot-holder" style={{position: "relative"}}>
          <span className="invisi-dots" style={{opacity: "0.0"}}>...</span>
          <span className="dots" style={{position: "absolute", top: "0", left: "0"}}>{this.state.dots}</span>
        </span>
      </span>
    );
  }
});

module.exports = LoadingEllipsis;
