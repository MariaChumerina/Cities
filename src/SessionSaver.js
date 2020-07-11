class SessionSaver {
  static USER_TYPED_VALUE_KEY = 'value';

  static DISPLAYING_CITIES_KEY = 'displayingCities';

  static SEPARATOR = ',';

  setDisplayingCities(cities) {
    localStorage.setItem(SessionSaver.DISPLAYING_CITIES_KEY, cities.join(SessionSaver.SEPARATOR));
  }

  getDisplayingCities() {
    const serializedCities = localStorage.getItem(SessionSaver.DISPLAYING_CITIES_KEY);
    return serializedCities ? serializedCities.split(SessionSaver.SEPARATOR) : [];
  }

  getUserLastTypedValue() {
    return localStorage.getItem(SessionSaver.USER_TYPED_VALUE_KEY) || '';
  }

  setUserTypedValue(value) {
    localStorage.setItem(SessionSaver.USER_TYPED_VALUE_KEY, value);
  }
}

export const sessionSaver = new SessionSaver();
