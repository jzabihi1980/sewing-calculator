import React from 'react';
// import ReactDOM from 'react-dom';

export default class Board extends React.PureComponent {

  renderSquare(x, y) {
    const squares = this.props.squares.slice(0);
    const style = {
      color: squares[x][y].fgCol,
      backgroundColor: squares[x][y].bgCol,
    };

    return (
      <button
        value={squares[x][y].hitpoint}
        style={style}
        onClick={() => this.props.onClick(x, y)}
        onMouseOver={() => this.props.onMouseOver(x, y)}
        onMouseOut={() => this.props.onMouseOut(x, y)} >{squares[x][y].hitpoint}</button>
    );
  }

  render() {
    return (
      <div className="board">
        <div>
          {this.renderSquare(0, 2)}
          {this.renderSquare(1, 2)}
          {this.renderSquare(2, 2)}
        </div>
        <div>
          {this.renderSquare(0, 1)}
          {this.renderSquare(1, 1)}
          {this.renderSquare(2, 1)}
        </div>
        <div>
          {this.renderSquare(0, 0)}
          {this.renderSquare(1, 0)}
          {this.renderSquare(2, 0)}
        </div>
      </div>
    );
  }
}
