import React from 'react'

/* Style */
import './Component.scss'

/* Assets */
import reactLogo from '../../assets/img/react.png'

export default props => {
  return (
    <div className="container-fluid d-flex flex-column align-items-center my-2">
      <h1>My APP!</h1>
      <img src={reactLogo} alt="ReactJS"/>
      <h6>Developed by Felipe Minuzzo</h6>
    </div>
  )
} 