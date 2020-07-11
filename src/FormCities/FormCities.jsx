import * as React from 'react';
import { sessionSaver } from '../SessionSaver.js';
import DisplayingItems from '../DisplayingItems/DisplayingItems.jsx';
import './FormCities.css';
import AutocompleteInput from '../AutocompleteInput/AutocompleteInput.jsx';
import russianCities from '../russian-cities.json';

export default class FormCities extends React.Component {
  state = {
    cities: [],
    selectedCities: [],
    displayingCities: [],
  };

  componentDidMount() {
    const cities = russianCities.map(({ name }) => name);
    this.setState({
      cities,
      displayingCities: sessionSaver.getDisplayingCities(),
    });
  }

  handleClick = (e) => {
    const { textContent } = e.target;
    const { selectedCities } = this.state;
    this.setState({
      selectedCities: selectedCities.includes(textContent)
        ? selectedCities.filter((city) => city !== textContent) : [textContent, ...selectedCities],
    });
  }

  handleSubmit = () => {
    const { selectedCities, displayingCities } = this.state;
    const result = [...selectedCities, ...displayingCities];
    this.setState({ displayingCities: result, selectedCities: [] });
    sessionSaver.setUserTypedValue('');
    sessionSaver.setDisplayingCities(result);
  }

  handleRemove = (removedCity) => {
    const { displayingCities } = this.state;
    const updated = displayingCities.filter((city) => city !== removedCity);
    this.setState({ displayingCities: updated });
    sessionSaver.setDisplayingCities(updated);
  }

  render() {
    const { cities, selectedCities, displayingCities } = this.state;

    return (
      <div className="display-flex mobile-direction margin-top">
        <form className="form-position mobile-direction form-width display-flex" onSubmit={this.handleSubmit}>
          <div className="form-input">
            <label htmlFor="chooseItem">
              Выберите город:
            </label>
            <AutocompleteInput
              id="chooseItem"
              items={cities}
              onSelect={this.handleClick}
              selectedItems={selectedCities}
              displayingItems={displayingCities}
            />
          </div>
          <div className="btn-block-position btn-block-width">
            <button type="submit" className="btn">
              Подтвердить
            </button>
          </div>
        </form>
        <div className="margin-top-mobile">
          <div>
            Выбранные города:
          </div>
          <DisplayingItems onRemove={this.handleRemove} items={displayingCities} />
        </div>
      </div>
    );
  }
}
