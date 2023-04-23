import React from 'react'
import './circle.css'

const Circle = (props) => {
  
    return (
        <div className='circle' style={{ backgroundColor: props.color, filter:props.light}}></div>
        
    )
}

export default Circle