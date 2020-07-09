import React from 'react';
import './Showing-cities.css'

export default function ShowingCities({ cities, onRemove }) {
    return (
        <>
            <h5 className='mt-5'>Выбранные города:</h5>
            <ul className='list-group mt-3 mb-5 list-width'>
              {cities.map((city) => (
                <li className='list-group-item d-flex justify-content-between align-items-baseline' key={city}>
                  {city}
                  <button type='button' className='btn btn-link mobile-hide' onClick={onRemove(city)}>
                    Удалить
                  </button>
                  <button type='button' className='btn btn-link mobile-btn' onClick={onRemove(city)}>
                    X
                  </button>
                </li>
                  )
              )}
            </ul>
        </>
    );
}