import React from 'react';

class LoadingEllipsis extends React.Component {
  constructor(props) {
    super(props);

    this._dotInterval = null;
    this.state = {
      dotCount: 0,
      dots: ''
    };

    this.updateDots = this.updateDots.bind(this);
  }

  componentDidMount() {
    this._dotInterval = setInterval(this.updateDots, 500);
  }

  componentWillUnmount() {
    clearInterval(this._dotInterval);
  }

  updateDots() {
    var count = this.state.dotCount + 1;
    if(count >= 4) count = 0;
    var dots = ".".repeat(count);
    this.setState({dotCount: count, dots: dots});
  }

  render() {
    return(
      <span className="loading-ellipsis">
        {this.props.children || 'loading'}
        <span className="dot-holder">
          <span className="invisi-dots">...</span>
          <span className="dots">{this.state.dots}</span>
        </span>
      </span>
    );
  }
}

module.exports = LoadingEllipsis;
