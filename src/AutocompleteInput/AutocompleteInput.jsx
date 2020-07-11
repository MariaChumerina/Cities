import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { sessionSaver } from '../SessionSaver.js';
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
    const {
      items, selectedItems, displayingItems, onSelect,
    } = this.props;
    const { value } = this.state;
    return items.filter((item) => {
      const isItemMatchValue = item.toLowerCase().startsWith(value.toLowerCase());
      return isItemMatchValue && !displayingItems.includes(item);
    })
      .map((item) => (
        <li
          key={`${item}`}
          className={classNames({
            'list-group-item': true,
            'item-selected': selectedItems.includes(item),
            'item-hover': true,
          })}
        >
          <option onClick={onSelect}>
            {item}
          </option>
        </li>
      ));
  }

  render() {
    const { value } = this.state;
    const { id } = this.props;

    return (
      <>
        <input
          className="form-field"
          list="json-datalist"
          id={id}
          value={value}
          onChange={this.handleChange}
          placeholder="Введите название"
        />
        {value.length > 2 && (
        <div>
          <ul className="list-group list-group-autocomplete overflow-scroll">
            {this.renderItemsList()}
          </ul>
        </div>
        )}
      </>
    );
  }
}

AutocompleteInput.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  displayingItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
};
