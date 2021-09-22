/* eslint-disable import/extensions */
import API_KEY from '../key.js';

const form = document.querySelector('.top-banner form');
const msg = document.querySelector('.msg');
const list = document.querySelector('.cities');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const city = event.target.elements.city.value;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

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
      const icon = `https://openweathermap.org/img/wn/${
        weather[0].icon
      }@2x.png`;

      const li = document.createElement('li');
      li.classList.add('city');
      const markup = `
  <h2 class="city-name" data-name="${name},${sys.country}">
    <span>${name}</span>
    <sup>${sys.country}</sup>
  </h2>
  <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup>
  </div>
  <figure>
    <img class="city-icon" src=${icon} alt=${weather[0].main}>
    <figcaption>${weather[0].description}</figcaption>
  </figure>
`;
      li.innerHTML = markup;
      list.appendChild(li);
    })
    .catch(() => {
      msg.textContent = 'Please search for a valid city 😩';
    });
});
