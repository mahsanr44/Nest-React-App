import React from 'react'

const Button = ({handleClick,name,styleProp}) => {

  return (
    <div>
         <button
                className={`border-2  rounded-md p-1   text-white ${styleProp}`}
                onClick={handleClick}
              >
                {name}
              </button>
    </div>
  )
}

export default Button