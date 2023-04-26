import styles from './Modal.module.css'

const Modal = (props) => {
    return (  
    <div className={styles.overlay}>
    <div className={styles.modal}>
        <button className='close' onClick={props.closeModal}>X</button>
      <p>Ups, game over!</p>
      <p>Your score was <span className="scoreEnd">0</span></p>
  </div>
  </div>
  )
  
}

export default Modal

