import React, { Component } from 'react';
import './App.css';
import './components/circle.css';
import GameOver from './components/GameOver';
import Circle from './components/circle';

class App extends Component {
  state = {
    showGameOver: false,
    active: 0,
    rounds: 0,
    pace:1000,
    timer:null,
    activeCircle:null,
  /*   clicked: false, */
    circles: [
      { id: 1, color: 'red' },
      { id: 2, color: 'yellow' },
      { id: 3, color: 'green' },
      { id: 4, color: 'blue' },
    ]
  };

  
  getRndInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  pickeNew = (active) => {
    const nextActiveNumber = this.getRndInt(0, 4);
    if (nextActiveNumber !== active) {
      return nextActiveNumber;
    }

    return this.pickeNew(active);
  };

  startGame = () => {
    let { active, rounds, pace } = this.state;
    const nextActive = this.pickeNew(active);
    active = nextActive;
    console.log(active, rounds, pace)


    
    if (rounds >= 10) {
      return this.endGame();
    }

    const timer = setTimeout(this.startGame,pace);
    this.setState({timer,pace: pace -10, rounds:rounds +1, activeCircle:active})
    
    
  };

  endGame = () => {
    console.log('game ended');
    this.setState({timer:null, rounds:0})
    this.setState({activeCircle:null})
  };

 /*  clickCircle = () => {
    if (this.item.id !== active) {
      return endGame()
    } */

  handleCircleClick = () => {
    /* if (this.item.id !== active) {
      return endGame() */
    
  }

  enableCircles = () => {
    const { circles } = this.state
  
    circles.forEach((circle) => {
      circle.style.pointerEvents = 'auto'
    })
  }
 
  render() {
    
    const {circles,activeCircle} = this.state;
    const circleComponents = circles.map((item, index) => (
      <Circle 
      key={item.id} 
      color={activeCircle === item.id ? item.color : ''}
      active={activeCircle === item.id}
      onClick={() => this.handleCircleClick}
      />
    ));
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <div>
              <h1>Speed Mania</h1>
              <p>
                Score: <span className="score">0</span>
              </p>
            </div>
            
            {this.state.showGameOver ? <GameOver /> : null}
            <div>
              <button id="start" onClick={this.startGame}>
                Start game
              </button>
              <button id="end" className="hidden" onClick={this.endGame}>
                End game
              </button>
            </div>
            
            <div className="circles">{circleComponents}</div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;