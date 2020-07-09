import React from 'react';

export default function List({ city, classes }) {
  return (
        <li className={classes}>
          {city}
        </li>
  );
}