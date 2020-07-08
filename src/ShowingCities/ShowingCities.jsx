import React from 'react';

export default function ShowingCities({ cities, onRemove }) {
    return (
        <ul className='list-group mt-3 w-50'>
          {cities.map((city) => (
              <>
                <li className='list-group-item d-flex justify-content-between' key={city}>
                  {city}
                  <button type='button' className='btn' onClick={onRemove(city)}>
                    Удалить
                  </button>
                </li>
              </>
              )
          )}
        </ul>
    );
}