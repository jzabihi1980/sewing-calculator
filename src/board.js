import React from 'react';
// import ReactDOM from 'react-dom';

export default class Board extends React.PureComponent {

  renderSquare(i) {
    const hitpoints = this.props.hitpoints.slice(0);
    return (
      <button
        value={hitpoints[i]}
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
