/* eslint-disable import/extensions */
import API_KEY from '../key.js';
import CityCard from './components/CityCard.js';

const form = document.querySelector('.top-banner form');
const msg = document.querySelector('.msg');
const list = document.querySelector('.cities');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!event.target.elements.city.value) {
    return;
  }

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${event.target.elements.city.value}&units=metric&appid=${API_KEY}`;

  fetch(url)
    .then((response, reject) => {
      if (response.ok) {
        return response.json();
      }
      return reject();
    })
    .then((data) => {
      msg.textContent = '';
      const {
        main, name, sys, weather,
      } = data;
      const cityCard = new CityCard(main, name, sys, weather);
      list.appendChild(cityCard.htmlElement);
    })
    .catch(() => {
      msg.textContent = 'Please search for a valid city 😩';
    });
});
