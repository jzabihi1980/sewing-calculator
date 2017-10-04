import React from 'react';
// import ReactDOM from 'react-dom';

export default class Board extends React.PureComponent {

  renderSquare(i) {
    const hitpoints = this.props.hitpoints.slice(0);
    const style = {
      backgroundColor:
        (hitpoints[i] === 0) ? '#8f8':
        (hitpoints[i] <= 4 && hitpoints[i] >= -4) ? '#ff8' : '#fff',
    };
    return (
      <button
        value={hitpoints[i]}
        style={style}
        onClick={() => this.props.onClick(i)}>{hitpoints[i]}</button>
    );
  }

  render() {
    return (
      <div className="board">
        <div>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
      </div>
    );
  }
}
