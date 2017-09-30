import React from 'react';

export default class SkillSelector extends React.PureComponent {

  skills = [
    {
      id: 0,
      name: '滝', 
      move: [0, 3],
      rate: 1.0,
    },
    {
      id: 1,
      name: '横',
      move: [0, 1],
      rate: 1.0,
    },
    {
      id: 2,
      name: '大滝',
      move:[0, 3, 6],
      rate: 1.0,
    },
    {
      id: 3,
      name: '水平',
      move: [0, 1, 2],
      rate: 1.0,
    },
    {
      id: 4,
      name: '2倍',
      move: [0],
      rate: 2.0,
    },
    {
      id: 5,
      name: '3倍',
      move: [0],
      rate: 3.0
    },
  ];

  renderRadios() {
    for (let i; i < skills.size; i++) {
      <Radio name="skill" value={i}>{skills[i].name}</Radio>
    }
  }

  render() {
  }
}