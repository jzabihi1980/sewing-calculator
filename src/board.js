import React from 'react';
// import ReactDOM from 'react-dom';

export default class Board extends React.PureComponent {

  renderSquare(x, y) {
    const hitpoints = this.props.hitpoints.slice(0);
    const style = {
      backgroundColor:
        (hitpoints[x][y] === 0) ? '#8f8':
        (hitpoints[x][y] <= 4 && hitpoints[x][y] >= -4) ? '#ff8' : '#fff',
    };

    return (
      <button
        value={hitpoints[x][y]}
        style={style}
        onClick={() => this.props.onClick(x, y)}
        onMouseOver={(event) => this.props.onMouseOver(event, x, y)} >{hitpoints[x][y]}</button>
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
