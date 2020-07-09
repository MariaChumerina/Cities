import React from 'react';

export function List({ city, classes }) {
  return (
        <li className={classes}>
          {city}
        </li>
  );
}