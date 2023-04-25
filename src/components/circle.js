import React from 'react'
import './circle.css'
        
const Circle = ({ color, active, onClick, id }) => {
    return (
      <div
        className={`circle ${color} ${active ? "active" : ""}`}
        style={{ backgroundColor: color }}
        onClick={() => onClick(id)}
      ></div>
    );
  };

  export default Circle

