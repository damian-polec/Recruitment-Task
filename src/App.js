import React, { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Autocomplete from 'react-autocomplete';
import Input from './components/Form/Input';
import Button from './components/Button/Button';
import './App.scss';

library.add(faSearch);

const App = () => {
  const [inputForm, setInputForm] = useState({
    value: '',
    isValid: false,
    isTouched: false
  })


  const onChangeHandler = (event, value) => {
    console.log(value);
    setInputForm({
      ...inputForm,
      value: value
    })
  }
  const onSubmitHandler = event => {
    event.preventDefault();
  }

  return (
    <div className='App'>
      <form 
        className='Form'
        onSubmit={(event) => onSubmitHandler(event)}>
        <Autocomplete
          value={inputForm.value}
          getItemValue={(item) => item}
          wrapperStyle={
            {
              width: 'calc(100% - 75px)',            
              height: '100%',            
              fontSize: '2rem',            
              border: 'none',
            }
          }
          items={[
            'Poland',
            'Germany',
            'Spain',
            'France'
          ]}
          onChange={(event, value) => onChangeHandler(event, value)}
          onSelect={(val) => setInputForm({...inputForm, value: val})}
          shouldItemRender= {(item, value) => {
            return item.substring(0, value.length).toLowerCase().indexOf(value.toLowerCase()) !== -1
          }}
          selectOnBlur={true}
          renderItem={(item, isHighlighted) => 
            <div
              className={isHighlighted ? ['Autocomplete_Item', 'Is_Highlighted'].join(' ') : ['Autocomplete_Item', 'Is_Not_Highlighted'].join(' ')} 
              key='item'>{item}</div>
          }
        />
        <Button />
      </form>
    </div>
  )
}

export default App;