import React from 'react';

import './CityDesc.scss';

const cityItem = (props) => (
  <div
    id={props.id} 
    className={props.isActive ? ['City_Desc', 'active'].join(' ') : 'City_Desc'}>
    <p className='Desc'>{props.children}</p>
  </div>
)

export default cityItem;