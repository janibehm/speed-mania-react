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
    circles: [
      { id: 1, color: 'red' },
      { id: 2, color: 'yellow' },
      { id: 3, color: 'green' },
      { id: 4, color: 'blue' },
    ],
  };
  
  getRndInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  pickeNew = (active) => {
    const nextActive = this.getRndInt(0, 3);
    if (nextActive !== active) {
      return nextActive;
    }

    return this.pickeNew(active);
  };

  startGame = () => {
    let { active, rounds, pace } = this.state;
    const nextActive = this.pickeNew(active);
    active = nextActive;
    
    if (rounds >= 10) {
      return this.endGame();
    }

    const timer = setTimeout(this.startGame,pace);
    this.setState({timer,pace: pace -10, rounds:rounds +1})
    
    
  };

  endGame = () => {
    console.log('game ended');
    this.setState({timer:null, rounds:0})
  };

/*   clickCircle = (i) => {
      if(i !== active){
        return this.endGame()
      }
  }
 */
  render() {
    const circles = this.state.circles.map((item) => (
      <Circle 
      key={item.id} 
      color={item.color}
      active={this.state.activeCircle === item.id}
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

            {this.state.showGameOver && <GameOver />}
            <div>
              <button id="start" onClick={this.startGame}>
                Start game
              </button>
              <button id="end" className="hidden" onClick={this.endGame}>
                End game
              </button>
            </div>
            <div className="circles">{circles}</div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;