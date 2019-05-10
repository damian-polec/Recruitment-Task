import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.scss';

const Backdrop = props => 
  ReactDOM.createPortal(
    <div 
      className='Backdrop'
      onClick={props.onClick}/>,
    document.getElementById('backdrop-root')
  );

  export default Backdrop;