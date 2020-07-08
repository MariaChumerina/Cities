import * as React from 'react';
import russianCities from '../russian-cities.json';
import { List } from '../List/List.jsx';
import ShowingCities from '../ShowingCities/ShowingCities.jsx';
import './Form.css';
import { uniq } from 'lodash';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      cities: [],
      chosenCities: [],
      showingCities: [],
    };
  }

  componentDidMount() {
    const cities = russianCities.map(({ name }) => name);
    const value = localStorage.getItem('value') ? localStorage.getItem('value') : '';
    const showingCities = localStorage.getItem('showingCities')
        ? localStorage.getItem('showingCities').split(',') : [];
    this.setState({ cities, value, showingCities });
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ value });
    localStorage.setItem('value', value);
  }

  handleClick = (e) => {
    const { textContent } = e.target;
    const { chosenCities } = this.state;
    this.setState({ chosenCities: uniq([textContent, ...chosenCities])});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { chosenCities, showingCities } = this.state;
    const result = uniq([...chosenCities, ...showingCities]);
    this.setState({ showingCities: result, chosenCities: [], value: '', });
    localStorage.setItem('value', '');
    localStorage.setItem('showingCities', result.join(','));
  }

  handleRemove = (key) => () => {
    const { showingCities } = this.state;
    const updated = showingCities.filter((city) => city !== key);
    this.setState({ showingCities: updated });
    localStorage.setItem('showingCities', updated.join(','));
  }

  getPossibleCities() {
    const { cities, value } = this.state;

    return cities.filter((city) => {
      const regExp = new RegExp(`^${value}`, 'i');
      return regExp.test(city);
    })
    .map((city, i) => (
      <div className='card card-selected' key={`${city}_${i}`} onClick={this.handleClick}>
         <List city={city} />
      </div>
        )
    )
  }


  render() {
    const { value, showingCities } = this.state;

    return (
        <>
          <form className='mt-5' onSubmit={this.handleSubmit}>
            <div className="form-group w-50">
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
              {value.length > 2 && this.getPossibleCities()}
            </div>
            <button type='submit' className="btn btn-secondary mt-1">Подтвердить</button>
          </form>
          {showingCities.length ? <ShowingCities onRemove={(key) => this.handleRemove(key)} cities={showingCities}/> : []}
        </>
    );
  }
}