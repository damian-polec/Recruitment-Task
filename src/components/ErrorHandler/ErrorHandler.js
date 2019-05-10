import React, { Fragment } from 'react';

import Backdrop from '../Backdrop/Backdrop';
import Modal from '../Modal/Modal';

import './ErrorHandler.scss';

const errorHandler = props => (
  <Fragment>
    {props.error && <Backdrop onClick={props.onHandle} />}
    {props.error && (
      <Modal
        title={props.isValid ? "An Error Occurred" : 'Incorrect Input'}
        onAcceptModal={props.onHandle}
        acceptEnabled
      >
        <p className='Error_Message'>{props.error.message}</p>
      </Modal>
    )}
  </Fragment>
);

export default errorHandler;
