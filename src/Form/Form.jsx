import * as React from 'react';
import russianCities from '../russian-cities.json';
import List from '../List/List.jsx';
import ShowingCities from '../ShowingCities/ShowingCities.jsx';
import './Form.css';
import cn from 'classnames';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      cities: [],
      selectedCities: [],
      showingCities: [],
    };
  }

  componentDidMount() {
    const cities = russianCities.map(({ name }) => name);
    const value =  localStorage.getItem('value')
         ? localStorage.getItem('value') : '';
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
    const { selectedCities, showingCities } = this.state;
    if (!showingCities.includes(textContent)) {
      this.setState({ selectedCities: [textContent, ...selectedCities]});
    } if (selectedCities.includes(textContent)) {
      const updated = selectedCities.filter((city) => city !== textContent);
      this.setState({ selectedCities: updated });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { selectedCities, showingCities } = this.state;
    const result = [...selectedCities, ...showingCities];
    this.setState({ showingCities: result, selectedCities: [], value: '', });
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
    const { cities, value, selectedCities, showingCities } = this.state;
    return cities.filter((city) => {
      const regExp = new RegExp(`^${value}`, 'i');
      return regExp.test(city) && !showingCities.includes(city);
    })
    .map((city, i) => (
      <List city={city}
            classes={cn({ 'list-group-item': true,
                          'item-selected': selectedCities.includes(city),
                          'item-hover': true,
                          'item-hidden': showingCities.includes(city),
            })}
            key={`${city}_${i}`}
      />
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
                <div className='list-group overflow-scroll' onClick={this.handleClick}>
                  {this.getPossibleCities()}
                </div>
              </div>}
            </div>
            <button type='submit' className="btn btn-secondary mt-1">
              Подтвердить
            </button>
          </form>
          {showingCities.length
              ? <ShowingCities onRemove={(key) => this.handleRemove(key)} cities={showingCities}/> : []}
        </div>
    );
  }
}