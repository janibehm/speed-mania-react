import styles from './Modal.module.css'

const Modal = ({closeModal,score}) => {
    return (  
    <div className={styles.overlay}>
    <div className={styles.modal}>
        <button className='close' onClick={closeModal}>X</button>
      <p>Ups, game over!</p>
      <p>Your score was <span>{score}</span></p>
  </div>
   </div> 
  )
  
}

export default Modal

