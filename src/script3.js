// const btn = document.querySelector('button');
// 		const output = document.querySelector('#output');
//     const firstLi = document.createElement('li');
// 		const secondLi = document.createElement('li');
// 		const mapDiv = document.querySelector('#map');
// 		let map;

// 		btn.addEventListener('click', () => {
//    firstLi.innerText=`Размеры экрана пользователя ширина: ${window.screen.width} x высота: ${window.screen.height}`;
// output.appendChild(firstLi);
// 			const error = () => {
// 				secondLi.textContent = 'Информация о местоположении недоступна';
// 			};

// 			const success = (position) => {
// 				const {latitude, longitude} = position.coords;
// 				secondLi.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;

// 				// Создаем объект карты и устанавливаем его центр на местоположение пользователя
// 				map = new ymaps.Map(mapDiv, {
// 					center: [latitude, longitude],
// 					zoom: 14
// 				});

// 				// Добавляем маркер на карту, который показывает местоположение пользователя
// 				const marker = new ymaps.Placemark([latitude, longitude], {
// 					hintContent: 'Вы здесь'
// 				});
// 				map.geoObjects.add(marker);
// 			};

// 			if (!navigator.geolocation) {
// 				secondLi.textContent = 'Информация о местоположении недоступна';
// 			} else {
// 				secondLi.textContent = 'Определение местоположения…';
// 				navigator.geolocation.getCurrentPosition(success, error);
// 			}

// 			output.appendChild(secondLi);
// 		});


// Вынесем функции и классы в отдельные модули для лучшей организации кода.

// Модуль для работы с геолокацией
class GeolocationService {
	static async getPosition() {
	  return new Promise((resolve, reject) => {
		if (!navigator.geolocation) {
		  reject('Geolocation is not available.');
		} else {
		  navigator.geolocation.getCurrentPosition(resolve, reject);
		}
	  });
	}
  }
  
  // Модуль для работы с картой
  class MapService {
	constructor(mapDiv) {
	  this.mapDiv = mapDiv;
	  this.map = null;
	}
  
	initMap(center, zoom) {
	  this.map = new ymaps.Map(this.mapDiv, { center, zoom });
	}
  
	addMarker(coordinates, hintContent) {
	  const marker = new ymaps.Placemark(coordinates, { hintContent });
	  this.map.geoObjects.add(marker);
	}
  }
  
  // Модуль для работы с выводом информации
  class OutputService {
	constructor(output) {
	  this.output = output;
	}
  
	showInfo(message) {
	  const infoElement = document.createElement('li');
	  infoElement.textContent = message;
	  this.output.appendChild(infoElement);
	}
  }
  
  // Основной модуль приложения
  class App {
	constructor(button, output, mapDiv) {
	  this.button = button;
	  this.outputService = new OutputService(output);
	  this.mapService = new MapService(mapDiv);
  
	  this.button.addEventListener('click', async () => {
		try {
		  const position = await GeolocationService.getPosition();
  
		  this.outputService.showInfo(`Размеры экрана пользователя ширина: ${window.screen.width} x высота: ${window.screen.height}`);
  
		  const { latitude, longitude } = position.coords;
		  this.outputService.showInfo(`Широта: ${latitude} °, Долгота: ${longitude} °`);
  
		  this.mapService.initMap([latitude, longitude], 14);
		  this.mapService.addMarker([latitude, longitude], 'Вы здесь');
		} catch (error) {
		  this.outputService.showInfo('Информация о местоположении недоступна');
		}
	  });
	}
  }
  
  // Инициализация приложения
  const btn = document.querySelector('button');
  const output = document.querySelector('#output');
  const mapDiv = document.querySelector('#map');
  
  new App(btn, output, mapDiv);
  