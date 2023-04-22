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
    let { active, rounds } = this.state;
    const nextActive = this.pickeNew(active);
    let timer;
    let pace = 1000;
    if (rounds >= 10) {
      return this.endGame();
    }

    timer = setTimeout(this.startGame, pace);
  };

  endGame = () => {
    console.log('game ended');
    clearTimeout(this.timer);
  };

  render() {
    const circles = this.state.circles.map((item) => (
      <Circle key={item.id} color={item.color} />
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