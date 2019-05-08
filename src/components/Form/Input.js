import React from 'react';

import './Input.scss';

const input = (props) => {
  return (
    <input
      className='Input' 
      type='text' 
      name='country'
      value={props.value}
      onChange={props.change} 
      />
  )
}

export default input;