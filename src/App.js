import React, { Component } from 'react';
import './App.css';
import './components/circle.css';
import Modal from './components/Modal';
import Circle from './components/circle';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      gameRunning: false,
      showModal: false,
      active: 0,
      rounds: 0,
      pace: 1000,
      timer: null,
      activeCircle: null,
      circles: [
        { id: 1, color: 'red' },
        { id: 2, color: 'yellow' },
        { id: 3, color: 'green' },
        { id: 4, color: 'blue' },
      ],
    };

    this.clickHandler = this.clickHandler.bind(this);
  }

  getRndInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  pickNew = (active) => {
    const nextActiveNumber = this.getRndInt(0, 4);
    if (nextActiveNumber !== active) {
      return nextActiveNumber;
    }

    return this.pickNew(active);
  };


  startGame = () => {
    this.setState({gameRunning:true})
    let { active, rounds, pace, } = this.state;
    const nextActive = this.pickNew(active);
    active = nextActive;

    if (rounds >= 10) {
      return this.endGame();
    }

    const timer = setTimeout(this.startGame,pace);
    this.setState({timer,rounds:rounds +1,activeCircle:active})
    console.log(rounds)
    
  };

  endGame = () => {
    this.setState({timer: null, rounds: 10, activeCircle: null, showModal: true,gameRunning:false});
  };

  modalHandler = () => {
    this.setState({
      showModal: !this.state.showModal,
      rounds:0,
      score:0
    })
  }

  clickHandler = (id) => {
    if (!this.state.gameRunning) {
      return;
    }
    if (id !== this.state.activeCircle) {
      this.endGame();
    }
    else{this.setState({score:this.state.score +10})}
  };

  render() {

    const {circles,activeCircle, gameRunning} = this.state;
    const circleComponents = circles.map((item) => (
      <Circle
      key={item.id}
      color={activeCircle === item.id ? item.color : ''}
      active={activeCircle === item.id}
      id={item.id}
      gameRunning={gameRunning}
      onClick={gameRunning ? () => this.clickHandler(item.id) : null}
      disabled={!gameRunning}
    />
    
    ));
    return (
      <div className="App">
        <header className="App-header">
        {this.state.showModal && <Modal closeModal={this.modalHandler} score={this.state.score} />}
          <div>
            <div>
              <h1>Speed Mania</h1>
              </div>
              <p>
                Score: <span className="score">{this.state.score}</span>
              </p>
            </div>
            <div>
             <button id="start" onClick={this.startGame}>
              Start Game
             </button>
              <button id="end" className="hidden">
                End game
              </button>
            </div>
            <div className="circles">{circleComponents} </div>
        </header>
      </div>
    );
  }

}
export default App;