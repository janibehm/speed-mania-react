import { Component } from 'react';
import './App.css';
import './components/circle.css'
import Circle from './components/circle';
import GameOver from './components/GameOver';

class App extends Component() {

    state = {
      score: 0,
      rounds:0,
      showGameOver: false,
      colors:["red", "blue", "green", "yellow"]
      
    }

    

    endHandler(){
      this.setState({
        showGameOver:true
      })
    }  

    clickHandler(){
      this.setState({
        score: +10
      })
    }

    circleHandler(){
      this.setState({

      })
    }

  
  
    render(){
    return (
      <div className="App">
        <header className="App-header">
        <div>
        <div>
          <h1>Speed Mania</h1>
          <p>Score: <span class="score">0</span></p>
        </div>
        <div>
          {this.state.colors.map((color)=> {
             return <Circle key={color} color={color}/>
          })
           
          }
        </div>
        {this.state.showGameOver} && <GameOver/>
        <div>
          <button id="start" >Start game</button>
          <button id="end" class="hidden">End game</button>
        </div>
     
      </div>
        </header>
      </div>
    );
  }
  }
  

export default App;
