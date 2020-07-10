import React from 'react';
import './DisplayingItems.css';
import PropTypes from 'prop-types';

function DisplayingItem({ item, onRemove }) {
  const handleClickRemove = React.useCallback(() => onRemove(item), [onRemove, item]);

  return (
      <li className='list-group-item d-flex justify-content-between align-items-baseline' key={item}>
        {item}
        <button type='button' className='btn btn-link' onClick={handleClickRemove}>
          &#10005;
        </button>
      </li>
  );
}

export default function DisplayingItems({ items, onRemove }) {
  return (
      items.length
        ? <ul className='list-group mt-2 mb-5'>
            {items.map((item) => <DisplayingItem key={item} item={item} onRemove={onRemove}/>)}
          </ul> : <p className='mt-2 grey-color'>Нет выбранных городов.</p>
    );
}

DisplayingItems.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string),
  onRemove: PropTypes.func,
}