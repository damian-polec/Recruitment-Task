import React from 'react';
import ReactDOM from 'react-dom';

import Button from '../Button/Button';

import './Modal.scss';

const modal = props => 
  ReactDOM.createPortal(
    <div className='Modal'>
      <header className='Modal_Header'>
        <h1>{props.title}</h1>
      </header>
      <div className='Modal_Content'>{props.children}</div>
      <div className='Modal_Actions'>
        <Button
          click={props.onAcceptModal}
          design='Modal_Button'>OK</Button>
      </div>
    </div>,
    document.getElementById('modal-root')
  );

export default modal;