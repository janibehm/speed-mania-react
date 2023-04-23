import React from 'react'
import './circle.css'

const Circle = (props) => {
  
    return (
        <div className='circle' style={{ backgroundColor: props.color}}></div>
        
    )
}

export default Circle