import React, { Component } from 'react';
import './App.css';
import './components/circle.css';
import Modal from './components/Modal';
import Circle from './components/circle';
import { ReactComponent as SpeakerOnIcon } from './SpeakerOnIcon.svg';
import { ReactComponent as SpeakerOffIcon } from './SpeakerOffIcon.svg';


/* import startGameSound from './sounds/startGame.mp3';
import endGameSound from './sounds/endGame.mp3';
 */
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
      olume: 0.5,
      timer: null,
      activeCircle: null,
      isPlying: false,
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
    this.setState({ gameRunning: true });
    let { rounds, pace, circles, activeCircle } = this.state; 
    const nextActive = this.pickNew(activeCircle); 
  
    if (rounds >= 10) {
      return this.endGame();
    }
  
    const timer = setTimeout(this.startGame, pace);
    this.setState({ timer, rounds: rounds + 1, activeCircle: nextActive });
    console.log(rounds);
  
    const activeCircleObject = circles.find((circle) => circle.id === nextActive); // find the circle with the nextActive id
    if (activeCircleObject) {
      console.log(activeCircleObject.color); 
    }
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