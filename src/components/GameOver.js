const GameOver = () => {
    return (  <div className="overlay">
    <div className="modal">
      <p>Ups, game over!</p>
      <p>Your score was <span className="scoreEnd">0</span></p>
      <button id="close">close</button>
    </div>
  </div>)
}

export default GameOver