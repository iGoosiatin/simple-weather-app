export default class CityCard {
  constructor(main, name, sys, weather) {
    this.main = main;
    this.name = name;
    this.sys = sys;
    this.weather = weather;

    const icon = `https://openweathermap.org/img/wn/${
      weather[0].icon
    }@2x.png`;

    this.htmlElement = document.createElement('li');
    this.htmlElement.classList.add('city');

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
    this.htmlElement.innerHTML = markup;
  }
}
