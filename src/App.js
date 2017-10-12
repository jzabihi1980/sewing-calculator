import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './board';
import StitchPanel from './stitch_panel';
import SkillSelector from './skill_selector';
import PowerSelector from './power_selector';

class App extends Component {

  constructor() {
    super();
    this.state = {
      moves: [{x: 0, y: 0}],
      stitchCount: 0,
      skill: null,
      skills: [
        {
          display: '縫う',
          rate: 1.0,
          move: {
            x: 0,
            y: 0,
            count: 1,
          },
          isCriticalEnabled: true,
        },
        {
          display: '滝', 
          rate: 1.0,
          move: {
            x: 0,
            y: 1,
            count: 2,
          },
          isCriticalEnabled: true,
        },
        {
          display: '横',
          rate: 1.0,
          move: {
            x: 1,
            y: 0,
            count: 2,
          },
          isCriticalEnabled: true,
        },
        {
          display: '大滝',
          rate: 1.0,
          move: {
            x: 0,
            y: 1,
            count: 3,
          },
          isCriticalEnabled: true,
        },
        {
          display: '水平',
          rate: 1.0,
          move: {
            x: 1,
            y: 0,
            count: 3,
          },
          isCriticalEnabled: true,
        },
        {
          display: 'たすき',
          rate: 1.0,
          move: {
            x: 1,
            y: 1,
            count: 2,
          },
          isCriticalEnabled: true,
        },
        {
          display: '逆たすき',
          rate: 1.0,
          move: {
            x: -1,
            y: 1,
            count: 2,
          },
          isCriticalEnabled: true,
        },
        {
          display: '2倍',
          rate: 2.0,
          move: {
            x: 0,
            y: 0,
            count: 1,
          },
          isCriticalEnabled: true,
        },
        {
          display: '3倍',
          rate: 3.0,
          move: {
            x: 0,
            y: 0,
            count: 1,
          },
          isCriticalEnabled: true,
        },
        {
          display: 'かげん',
          rate: 0.5,
          move: {
            x: 0,
            y: 0,
            count: 1,
          },
          isCriticalEnabled: true,
        },
        {
          display: 'ほぐし',
          rate: -0.5,
          move: {
            x: 0,
            y: 0,
            count: 1,
          },
          isCriticalEnabled: false,
        }
      ],
      squares: [
        [
          {
            hitpoint: 18,
            defBgCol: '#f0f0f0',
            fgCol: '#222',
            bgCol: this.defBgCol,
          },
          {
            hitpoint: 20,
            defBgCol: '#f0f0f0',
            fgCol: '#222',
            bgCol: this.defBgCol,
          },
          {
            hitpoint: 22,
            defBgCol: '#f0f0f0',
            fgCol: '#222',
            bgCol: this.defBgCol,
          },
        ],
        [
          {
            hitpoint: 24,
            defBgCol: '#f0f0f0',
            fgCol: '#222',
            bgCol: this.defBgCol,
          },
          {
            hitpoint: 26,
            defBgCol: '#f0f0f0',
            fgCol: '#222',
            bgCol: this.defBgCol,
          },
          {
            hitpoint: 28,
            defBgCol: '#f0f0f0',
            fgCol: '#222',
            bgCol: this.defBgCol,
          },
        ],
        [
          {
            hitpoint: 30,
            defBgCol: '#f0f0f0',
            fgCol: '#222',
            bgCol: this.defBgCol,
          },
          {
            hitpoint: 32,
            defBgCol: '#f0f0f0',
            fgCol: '#222',
            bgCol: this.defBgCol,
          },
          {
            hitpoint: 34,
            defBgCol: '#f0f0f0',
            fgCol: '#222',
            bgCol: this.defBgCol,
          },
        ],
      ],
      power: 1,
      powers: [
        {
          display: "弱い",
          rate: 0.5,
        },
        {
          display: "普通",
          rate: 1.0,
        },
        {
          display: "強い",
          rate: 1.5,
        },
        {
          display: "最強",
          rate: 2.0,
        },
      ],
    };
  }

  resetState() {
    this.setState({
      stitchCount: 0,
      skill: 0,
      moves: [{x: 0, y: 0}],
    })
  }

  isValidSquare(x, y) {
    const skill = this.state.skill;

    // calculate position that most far square.
    const moveX = x + (skill.move.x * (skill.move.count - 1));
    const moveY = y + (skill.move.y * (skill.move.count - 1));

    console.log(skill.display);
    console.log(`x: ${x} y: ${y}`);
    console.log(`most far X: ${moveX} y: ${moveY}`);

    return (
      moveX >= 0 &&
      moveY >= 0 &&
      moveX < this.state.squares.length &&
      moveY < this.state.squares[moveX].length
    );
  }

  calculateMoves(x, y) {
    const skill = this.state.skill;
    const moves = [];

    for (let i = 0; i < skill.move.count; i++) {
      const moveX = x + (skill.move.x * i);
      const moveY = y + (skill.move.y * i);
      moves.push({x: moveX, y:moveY});
    }

    return moves;
  }

  handleEnterSquare(x, y) {
    if (!this.isValidSquare(x, y)) {
      return;
    }

    const squares = this.state.squares.slice(0);
    const moves = this.calculateMoves(x, y);

    for (let i = 0; i < moves.length; i++) {
      squares[moves[i].x][moves[i].y].bgCol = '#bdf';
    }

    this.setState({squares: squares});
  }

  handleOutSquare(x, y) {
    const squares = this.state.squares.slice(0);
    this.setState({
      squares: squares.map((cols) => {
        return cols.map((square) => {
          square.bgCol = square.defBgCol;
          return square;
        })
      }),
    });
  }

  sewSquare(x, y, stitch) {
    console.log(
      `pos: ${x}, ${y} ` +
      `power: ${this.state.powers[this.state.power].display} ` +
      `skill: ${this.state.skill.display} ` +
      `stitch: ${stitch}`);

    const squares = this.state.squares.slice(0);
    squares[x][y].hitpoint -= stitch;
    squares[x][y].fgCol =
      (squares[x][y].hitpoint === 0) ? '#0b0' :
      (squares[x][y].hitpoint >= -4 && squares[x][y].hitpoint <= 4) ? '#c80' :
      (squares[x][y].hitpoint < -5) ? '#d00' : '#222';
    this.setState({squares: squares});
  }

  handleClickSquare(x, y) {
    if (!this.isValidSquare(x, y)) {
      return;
    }

    this.setState({
      moves: this.calculateMoves(x, y),
      stitchCount: 1,
    });

    const stitch_panel = document.getElementById('stitch_panel');
    stitch_panel.style.display = 'block';
    stitch_panel.style.visibility= 'visible';
    setTimeout( () => {
      stitch_panel.style.opacity = 1;
    }, 10);
  }

  handleClickStitch(stitch) {
    const moves = this.state.moves.slice(0);
    const move = moves.shift();
    const stitch_panel = document.getElementById('stitch_panel');

    this.sewSquare(move.x, move.y, stitch);
    this.setState({moves: moves});

    stitch_panel.style.visibility = 'hidden';
    stitch_panel.style.opacity = 0;

    if (moves.length === 0) {
      stitch_panel.style.display = 'none';
      this.resetState();
    } else {
      stitch_panel.style.visibility = 'visible';
      setTimeout(() => {
        stitch_panel.style.opacity = 1;
        this.setState({stitchCount: this.state.stitchCount + 1});
      }, 150);
    }
  }

  handleChangeSkill(skill) {
    this.setState({skill: skill});
  }

  handleChangePower(event) {
    this.setState({power: event.target.value});
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Board
          squares={this.state.squares}
          onClick={(x, y) => this.handleClickSquare(x, y)} 
          onMouseEnter={(x, y) => this.handleEnterSquare(x, y)}
          onMouseOut={(x, y) => this.handleOutSquare(x, y)} />
        <SkillSelector
          skills={this.state.skills}
          skill={this.state.skill}
          onChange={(skill) => this.handleChangeSkill(skill)} />
        <PowerSelector
          powers={this.state.powers}
          power={this.state.power}
          onChange={(event) => this.handleChangePower(event)} />
        <StitchPanel
          stitchCount={this.state.stitchCount}
          square={this.state.squares[this.state.moves[0].x][this.state.moves[0].y]}
          skill={this.state.skill}
          power={this.state.powers[this.state.power]}
          onClickStitch={(stitch) => this.handleClickStitch(stitch)} />
      </div>
    );
  }
}

export default App;
