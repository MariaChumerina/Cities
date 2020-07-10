import React from 'react';
import './ShowingCities.css'

export default function ShowingCities({ cities, onRemove }) {
    return (
        <div className='list-width list-position'>
            <p className='mt-5 mt-md-0 mb-0'>
              Выбранные города:
            </p>
            <ul className='list-group mt-2 mb-5'>
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
        </div>
    );
}