import React from 'react'
import "./Button.css"
function Button({isActive, clicked}) {
  return (
    <button  className="btn" onClick= {clicked}  > { isActive?"Get Another User " : "Get User"}</button>
  )
}

export default Button