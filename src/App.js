import React, { Component } from 'react';
import './App.css';
import './components/circle.css';
import Modal from './components/Modal';
import Circle from './components/circle';
import { ReactComponent as SpeakerOnIcon } from './SpeakerOnIcon.svg';
import { ReactComponent as SpeakerOffIcon } from './SpeakerOffIcon.svg';

import backgroundMusic  from './sounds/backgroundMusic.mp3';
import click from './sounds/click.wav';

const musicBackground = new Audio(backgroundMusic);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      gameRunning: false,
      showModal: false,
      active: 0,
      rounds: 0,
      pace: 800,
      volume: 0.5,
      timer: null,
      activeCircle: null,
      isPlying: false,
      counter:3,
      displayGo: false,
      circles: [
        { id: 1, color: 'red' },
        { id: 2, color: 'yellow' },
        { id: 3, color: 'green' },
        { id: 4, color: 'blue' },
      ],
    };

    this.clickHandler = this.clickHandler.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  startCountDown = () => {
    this.setState({counter:3});
    this.intervalId = setInterval(() => {
      this.setState(prevState => {
        if(prevState.counter < 1){
          this.setState({displayGo:true});
          setTimeout(() => {
            this.startGame();
          },1000)
      
          clearInterval(this.intervalId);
        }
        else{
          return {counter:prevState.counter -1};
        }
      });
    },1000);
  }

  
  getRndInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  pickNew = (activeCircle) => {
    const nextActiveNumber = this.getRndInt(1, 4);
    if (nextActiveNumber !== activeCircle) {
      return nextActiveNumber;
    }

    return this.pickNew(activeCircle);
  };
  startGame = () => {
 
    musicBackground.play();
    musicBackground.loop = true;
    this.setState({ gameRunning: true,displayGo:false });
    let { rounds, pace, activeCircle } = this.state; 
    const nextActive = this.pickNew(activeCircle); 
  
    if (rounds >= 50) {
      return this.endGame();
    }
  
    const timer = setTimeout(() => {
      if(this.state.gameRunning){
        this.startGame();
      }
    }, pace);

    this.setState({ timer, rounds: rounds + 1, activeCircle: nextActive });
   
  };
  endGame = () => {
    this.setState({timer: null, rounds: 0, activeCircle: null, showModal: true,gameRunning:false});
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
    else{
      const clickSound = new Audio(click);
      clickSound.play();
      this.setState({score:this.state.score +10})
    }
    this.setState((prevState) => ({
      pace: prevState.pace -5,
    }));
    console.log(this.state.score,this.state.pace)
    
  };

  musicHandler = () => {
    const {isPlaying }= this.state;
    if(isPlaying){
      musicBackground.volume = 1;
    }
    else{
      musicBackground.volume = 0;
    }
    this.setState({isPlaying: !isPlaying});
  }

  handleVolumeChange = (event) => {
    const volume = event.target.value;
    musicBackground.volume = volume;
    this.setState({ volume });
  }

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
              <div>
        <label htmlFor="volume">Music Volume: </label>
        <input
          id="volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={this.state.volume}
          onChange={this.handleVolumeChange}
        />
      </div>
      <div onClick={this.musicHandler}>
             {this.state.isPlaying ? <SpeakerOffIcon width="50" height="50" /> :<SpeakerOnIcon width="50" height="50" /> }
            </div>
    
              <p>
                Score: <span className="score">{this.state.score}</span>
              </p>
           
            </div>
            <div>
            <p>
              <span className="counter">
                {this.state.counter > 0 ? this.state.counter : (this.state.displayGo ? "GO" : '')}
              </span>
            </p>
          
             <button id="start" onClick={this.startCountDown}>
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