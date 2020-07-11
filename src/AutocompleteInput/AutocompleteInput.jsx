import * as React from 'react';
import { sessionSaver } from '../SessionSaver.js';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './AutocompleteInput.css';

export default class AutocompleteInput extends React.Component {
  state = {
    value: '',
  }

  componentDidMount() {
    this.setState({
      value: sessionSaver.getUserLastTypedValue(),
    });
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ value });
    sessionSaver.setUserTypedValue(value);
  }

  renderItemsList() {
    const { items, selectedItems, displayingItems } = this.props;
    const { value } = this.state;
    return items.filter((item) => {
      const isItemMatchValue = item.toLowerCase().startsWith(value.toLowerCase());
      return isItemMatchValue && !displayingItems.includes(item);
    })
    .map((item, i) => (
            <li key={`${item}_${i}`}
                className={classNames({
                  'list-group-item': true,
                  'item-selected': selectedItems.includes(item),
                  'item-hover': true,
                })}
            >
              {item}
            </li>
        )
    );
  }

  render() {
    const { value } = this.state;
    const { onSelect } = this.props;

    return (
        <>
          <input
              className="form-field"
              list="json-datalist"
              id='chooseItem'
              value={value}
              onChange={this.handleChange}
              placeholder="Введите название" />
          {value.length > 2 &&
          <div>
            <ul className='list-group  list-group-autocomplete overflow-scroll' onClick={onSelect}>
              {this.renderItemsList()}
            </ul>
          </div>}
        </>
    );
  }
}

AutocompleteInput.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func,
  selectedItems: PropTypes.arrayOf(PropTypes.string),
  displayingItems: PropTypes.arrayOf(PropTypes.string),
}