import React, { Component } from 'react';
import './App.css';
import './components/circle.css';
import Modal from './components/Modal';
import Circle from './components/circle';

class App extends Component {
  state = {
   /*  activeElement:null, */
    showModal: false,
    active: 0,
    rounds: 0,
    pace:1500,
    timer:null,
    activeCircle:null,
    clicked: false,
    circles: [
      { id: 1, color: 'red' },
      { id: 2, color: 'yellow' },
      { id: 3, color: 'green' },
      { id: 4, color: 'blue' },
    ]
  };



  
  getRndInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  pickNew = (active) => {
    const nextActiveNumber = this.getRndInt(0, 4);
    if (nextActiveNumber !== active) {
      return nextActiveNumber;
    }

    return this.pickNew(active);
  };

  /*   enableCircles = () => {
    const { circles } = this.state
  
    circles.forEach((circle) => {
      circle.style.pointerEvents = 'auto'
    })
  }  */

  startGame = (id) => {
    let { active, rounds, pace } = this.state;
    const nextActive = this.pickNew(active);
    active = nextActive;
    console.log(`active ${active}, rounds ${rounds}, pace ${pace}`)

   /*  this.enableCircles();  */
    if (rounds >= 10) {
      return this.endGame();
    }

    const timer = setTimeout(this.startGame,pace);
    this.setState({timer,pace: pace -10, rounds:rounds +1, activeCircle:active})
    
    this.clickHandler = this.clickHandler.bind(this);
   
    
  };

  endGame = () => {
    console.log('game ended');
    this.setState({timer:null, rounds:10})
    this.setState({activeCircle:null})
  };

  modalHandler = (e) => {
    e.preventDefault()
    this.setState({
      showModal: !this.state.showModal
    })
  }

  clickHandler = (id) => {
    console.log(`clickHandler id ${id}`);  
    console.log(this.state.activeCircle);
    if (id !== this.state.activeCircle) {
      this.endGame();
    }
  };
  

  render() {

    const {circles,activeCircle} = this.state;
    const circleComponents = circles.map((item) => (
      <Circle
      key={item.id}
      color={activeCircle === item.id ? item.color : ""}
      active={activeCircle === item.id}
      id={item.id}
      onClick={() => this.clickHandler(item.id)}
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
            
            {this.state.showGameOver ? <Modal /> : null}
            <div>
              <button id="start" onClick={this.startGame}>
                Start game
              </button>
              <button id="end" className="hidden" onClick={this.endGame}>
                End game
              </button>
            </div>
            
            <div className="circles">{circleComponents}</div>
            {this.state.showModal && <Modal closeModal={this.modalHandler}/>}
        
          </div>
        </header>
      </div>
    );
  }
}

export default App;