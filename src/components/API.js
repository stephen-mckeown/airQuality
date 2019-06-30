
export const fetchCities = () => {
  return fetch("https://api.openaq.org/v1/cities?limit=200&country=GB", { method: 'GET' }).then(res => res.json());
};


export const fetchCityData = (city) => {
  return fetch("https://api.openaq.org/v1/latest?city=" + city, { method: 'GET' }).then(res => res.json());
};