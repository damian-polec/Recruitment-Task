import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Button.scss';

const button = (props) => (
  <button
    id={props.id} 
    className={props.design}
    onClick={props.click}
    disabled={props.isDisabled}
    >
    {props.children}
    {props.design === 'Search_Button' && (<i>{!props.isLoading ? <FontAwesomeIcon icon='search' /> : <FontAwesomeIcon icon='spinner' spin />}</i>)}
    {props.design === 'Accordion_Button' && (<i>{!props.isActive ? <FontAwesomeIcon icon='plus' /> : <FontAwesomeIcon icon='minus' />}</i>)}
  </button>
)

export default button;