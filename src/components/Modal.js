import styles from './Modal.module.css'

const Modal = (props) => {
    return (  
    <div className="overlay">
    <div className="modal">
    <div className={styles.modal}>
        <button className='close' onClick={props.closeModal}>X</button>
      <p>Ups, game over!</p>
      <p>Your score was <span className="scoreEnd">0</span></p>
      <button id="close">close</button>
    </div>
  </div>
  </div>
  )
  
}

export default Modal

