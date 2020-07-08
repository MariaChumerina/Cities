import * as React from 'react';
import russianCities from '../russian-cities.json';
import { List } from '../List/List.jsx';
import { ChosenCities } from '../ChosenCities/ChosenCities.jsx';
import './Form.css';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      cities: [],
      chosenCities: [],
    };
  }

  componentDidMount() {
    const cities = russianCities.map(({ name }) => name);
    const value = localStorage.getItem('value') ? localStorage.getItem('value') : '';
    this.setState({ cities, value });
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ value });
    localStorage.setItem('value', value);
  }

  handleClick = (e) => {
    const { textContent } = e.target;
    const { chosenCities } = this.state;
    this.setState({ chosenCities: [textContent, ...chosenCities]});
    console.log('click', chosenCities, e.target.textContent);
  }

  handleSubmit = () => {
    const { chosenCities } = this.state;
    return chosenCities.map((city, i) => (
        <ChosenCities city={city} key={`${city}_${i}`}/>
        )
    )
  }

  getPossibleCities() {
    const { cities, value } = this.state;
    return cities.filter((city) => {
      const regExp = new RegExp(`^${value}`, 'i');
      return regExp.test(city);
    })
    .map((city, i) => (
      <div className='card card-selected' key={`${city}_${i}`} onClick={this.handleClick}>
         <List city={city}/>
      </div>
        )
    )
  }


  render() {
    const { value } = this.state;

    return (
        <form className='mt-5' onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input list="json-datalist" value={value} onChange={this.handleChange}/>
            {value.length > 2 && this.getPossibleCities()}
          </div>
          <button type='submit' className="btn btn-secondary">Подтвердить</button>
        </form>
    );
  }
}