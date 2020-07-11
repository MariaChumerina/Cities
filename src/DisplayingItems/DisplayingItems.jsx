import React from 'react';
import './DisplayingItems.css';
import PropTypes from 'prop-types';

function DisplayingItem({ item, onRemove }) {
  const handleClickRemove = React.useCallback(() => onRemove(item), [onRemove, item]);

  return (
    <li className="list-group-item" key={item}>
      {item}
      <button type="button" className="btn-link" onClick={handleClickRemove}>
        &#10005;
      </button>
    </li>
  );
}

DisplayingItem.propTypes = {
  item: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default function DisplayingItems({ items, onRemove }) {
  return (
    items.length
      ? (
        <ul className="list-group list-group-displaying">
          {items.map((item) => <DisplayingItem key={item} item={item} onRemove={onRemove} />)}
        </ul>
      ) : <p className="grey-color">Нет выбранных городов.</p>
  );
}

DisplayingItems.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onRemove: PropTypes.func.isRequired,
};
