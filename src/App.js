import React, { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faPlus, faMinus, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Autocomplete from 'react-autocomplete';
import Button from './components/Button/Button';
import CityDesc from './components/CityDesc/CityDesc';
import ErrorHandler from './components/ErrorHandler/ErrorHandler';
import './App.scss';

library.add(faSearch, faPlus, faMinus, faSpinner);

const ITEMS = [
  {code: 'PL', name: 'Poland'},
  {code: 'DE', name: 'Germany'},
  {code: 'FR', name: 'France'},
  {code: 'ES', name: 'Spain'}
]

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputForm, setInputForm] = useState('');
  const [validation, setValidation] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState(null);


  const onChangeHandler = (event, value) => {
    setInputForm(value)
  }
  const onSubmitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const userInput = inputForm
    const isValidInput = ITEMS.findIndex(item => item.name === userInput);
    if(isValidInput < 0) {
      const error = new Error(
        'Input should be one of those countries(Poland, Germany, France, Spain)'
      )
      setValidation(false);
      setIsLoading(false);
      setError(error);
      return;
    }
    const country = ITEMS.find(country => country.name.toLowerCase() === inputForm.toLowerCase());
    const date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).toISOString();
    fetch(`https://api.openaq.org/v1/measurements?country=${country.code}&date_from=${date}&parameter=pm25&order_by=value&sort=desc`)
    .then(res => {
      return res.json()
    })
    .then(resData => {
      const convertData = resData.results.reduce((list, item) => {
        const index = list.findIndex(listItem => listItem.city === item.city);
        if( index === -1 && list.length < 10) {
          item.isActive = false;
          list.push(item);
        }
        return list;
      }, []);
      setData(convertData);
      setIsLoading(false);
    })
    .catch(err => {
      const error = new Error(
        'Something went wrong. Try again later'
      )
      setIsLoading(false);
      setError(error);
    })
    
  }
  const onToggleHandler = (cityName) => {
    const index = data.findIndex(city => city.city === cityName);
    const isDesc = Object.keys(data[index]).indexOf('desc');
    const dataStateCopy = [...data];
    const elementCopy = {...dataStateCopy[index]};
    if(isDesc === -1) {
      fetch(`https://en.wikipedia.org/w/api.php?&origin=*&format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${cityName}`)
        .then(res => {
          return res.json();
        })
        .then(resData => {
          elementCopy.isActive = !elementCopy.isActive
          elementCopy.desc = resData.query.pages[Object.keys(resData.query.pages)[0]].extract;
          dataStateCopy[index] = elementCopy;
          setData(dataStateCopy);
        })  
    } else {
      elementCopy.isActive = !elementCopy.isActive
      dataStateCopy[index] = elementCopy;
      setData(dataStateCopy);
    }
  }

  const errorHandler = () => {
    setValidation(true);
    setError(null)
  }

  let cities = null;
  if(data) {
    cities = data.map(city => {
      return(
      <div className='Accordion_Item' key={city.city}>
        <Button
          design='Accordion_Button'
          isActive={city.isActive}
          click={() => onToggleHandler(city.city)}>
          <div className='City_Data'>
            <h1 className='City-Name'>{city.city}</h1>
            <p className='City_Pollution'>Air Pollution: {city.value} {city.unit}</p>
          </div>
        </Button>
        <CityDesc isActive={city.isActive}>{city.desc}</CityDesc>
      </div> 
      )
    })
  }

  return (
    <div className='App'>
      <ErrorHandler 
        error={error}
        isValid={validation}
        onHandle={errorHandler}/>
      <form 
        className='Form'
        onSubmit={(event) => onSubmitHandler(event)}>
        <Autocomplete
          value={inputForm}
          inputProps={{
            placeholder: 'Country'
          }}
          getItemValue={(item) => item.name}
          wrapperStyle={
            {
              width: 'calc(100% - 75px)',            
              height: '100%',            
              fontSize: '2rem',            
              border: 'none',
            }
          }
          items={ITEMS}
          onChange={(event, value) => onChangeHandler(event, value)}
          onSelect={(val) => setInputForm(val)}
          shouldItemRender= {(item, value) => {
            return item.name.substring(0, value.length).toLowerCase().indexOf(value.toLowerCase()) !== -1
          }}
          selectOnBlur={true}
          renderItem={(item, isHighlighted) => 
            <div
              className={isHighlighted ? ['Autocomplete_Item', 'Is_Highlighted'].join(' ') : ['Autocomplete_Item', 'Is_Not_Highlighted'].join(' ')} 
              key={item.code}>{item.name}</div>
          }
        />
        <Button 
          design='Search_Button'
          isLoading={isLoading} 
          isDisabled={isLoading}/>
      </form>
      {cities}
    </div>
  )
}

export default App;