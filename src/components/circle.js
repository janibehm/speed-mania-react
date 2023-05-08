import React from 'react'
import './circle.css'
        
const Circle = ({ color, active, onClick, disabled }) => {
    return (
      <div
        className={`circle ${color} ${active ? "active" : ""}`}
        style={{ backgroundColor: color }}
        onClick={!disabled ? onClick : null}
      ></div>
    );
  };

  export default Circle

