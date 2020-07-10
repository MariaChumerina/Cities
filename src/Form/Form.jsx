import * as React from 'react';
import russianCities from '../russian-cities.json';
import { sessionSaver } from '../SessionSaver.js';
import ShowingCities from '../ShowingCities/ShowingCities.jsx';
import './Form.css';
import classNames from 'classnames';

export default class Form extends React.Component {
    state = {
      value: '',
      cities: [],
      selectedCities: [],
      showingCities: [],
    };

  componentDidMount() {
    const cities = russianCities.map(({ name }) => name);
    this.setState({
      cities,
      value: sessionSaver.getUserLastTypedValue(),
      showingCities: sessionSaver.getDisplayingCities(),
    });
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ value });
    sessionSaver.setUserTypedValue(value);
  }

  handleClick = (e) => {
    const { textContent } = e.target;
    const { selectedCities } = this.state;
    this.setState({ selectedCities: selectedCities.includes(textContent)
          ? selectedCities.filter((city) => city !== textContent) : [textContent, ...selectedCities] });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { selectedCities, showingCities } = this.state;
    const result = [...selectedCities, ...showingCities];
    this.setState({ showingCities: result, selectedCities: [], value: '', });
    sessionSaver.setUserTypedValue('');
    sessionSaver.setDisplayingCities(result);
  }

  handleRemove = (removedCity) => () => {
    const { showingCities } = this.state;
    const updated = showingCities.filter((city) => city !== removedCity);
    this.setState({ showingCities: updated });
    sessionSaver.setDisplayingCities(updated);
  }

  renderCitiesList() {
    const { cities, value, selectedCities, showingCities } = this.state;
    return cities.filter((city) => {
      const regExp = new RegExp(`^${value}`, 'i');
      return regExp.test(city);
    })
    .map((city, i) => (
      <li key={`${city}_${i}`}
          className={classNames({ 'list-group-item': true,
        'item-selected': selectedCities.includes(city),
        'item-hover': true,
        'item-hidden': showingCities.includes(city),
      })}>
        {city}
      </li>
      )
    );
  }


  render() {
    const { value, showingCities } = this.state;

    return (
        <div className='d-flex mobile-direction mt-5'>
          <form className='form-width mr-md-5' onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor='chooseCity'>
                Выберите город:
              </label>
              <input
                  className="form-control"
                  list="json-datalist"
                  id='chooseCity'
                  value={value}
                  onChange={this.handleChange}
                  placeholder="Введите название города" />
              {value.length > 2 &&
              <div>
                <ul className='list-group overflow-scroll' onClick={this.handleClick}>
                  {this.renderCitiesList()}
                </ul>
              </div>}
            </div>
            <button type='submit' className="btn btn-secondary mt-1">
              Подтвердить
            </button>
          </form>
          {showingCities.length
              ? <ShowingCities onRemove={(city) => this.handleRemove(city)} cities={showingCities}/> : []}
        </div>
    );
  }
}