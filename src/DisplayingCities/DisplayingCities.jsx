import React from 'react';
import './DisplayingCities.css';

function DisplayingCityItem({ city, onRemove }) {
  const handleClickRemove = React.useCallback(() => onRemove(city), [onRemove, city]);

  return (
      <li className='list-group-item d-flex justify-content-between align-items-baseline' key={city}>
        {city}
        <button type='button' className='btn btn-link' onClick={handleClickRemove}>
          &#10005;
        </button>
      </li>
  );
}

export default function DisplayingCities({ cities, onRemove }) {
  return (
      <div className='list-width list-position'>
          <p className='mt-5 mt-md-0 mb-0'>
            Выбранные города:
          </p>
          <ul className='list-group mt-2 mb-5'>
            {cities.map((city) => <DisplayingCityItem key={city} city={city} onRemove={onRemove}/>)}
          </ul>
      </div>
    );
}