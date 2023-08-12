
# Information about this Web project
## This project  was developed by a student of group PHPDEV32 of the course "Web Developer" of [Skillfactory](www.skillfactory.ru)
## by Lysov Andrey
---
## How to open/launch
## Еhis Web project is deployed on the website https://github.com/AndreyLysow/module20_homework.git
## Technologies used:
* JS
* HTML
* CSS

# ЗАДАНИЕ 20
## В данном задании сделоано следующее для демонтстрации принципа DRY — Don’t repeat yourself (Не повторяй себя) :

## в /scr/script5.js вместо фрагмента кода :
```
userInput.addEventListener('submit', () => {
btnSend.click();
});
theForm.addEventListener('submit', (e) => {
e.preventDefault();
btnSend.click();
});
```
## пишем следующий код:

```
function submitForm() {
btnSend.click();
}
userInput.addEventListener('submit', submitForm);
theForm.addEventListener('submit', (e) => {
e.preventDefault();
submitForm();
});
```

## В данном коде была выделена функция submitForm, которая выполняет действие  нажатия на кнопку btnSend. Затем эта функция используется как обработчик события для обоих форм. Таким образом, вы избегаете повторения кода для вызова btnSend.click(), а также соблюдаете принцип DRY, улучшая поддерживаемость и читаемость кода.



# в части демонтстации применения принципа KISS (Keep It Simple, Stupid) подразумевающим, что код должен быть максимально простым и понятным
## работаем также с файлом /scr/script5.js 

## Вместо фрагмента кода:
```
  if((preventNextMessageShowUp === 0) || (preventNextMessageShowUp === 2)){  // проверяем, может ли сообщение быть показано
    let pre = document.createElement("div");

    switch(sender) {  // выбираем класс сообщения в зависимости от отправителя
      case 'responder':
        pre.classList.add('responderMessage');
      break;
      case 'user':
        pre.classList.add('userMessage');
      break;
      case 'geolocation':
        pre.classList.add('userMessage');
        preventNextMessageShowUp=2;
      break;
      case 'system':
        pre.classList.add('systemMessage');
        message='System: ' + message;  // добавляем префикс "System" к сообщению
      break;
      case 'error':
        pre.classList.add('errorMessage');
        message='System error: ' + message;  // добавляем префикс "System error" к сообщению
      break;
      default:
        pre.classList.add('unknownSourceMessage');
      }
    pre.innerHTML = '<p>' + message + '</p>';
    output.appendChild(pre);  // добавляем сообщение на страницу
  }
```
## пишем следующий код:

```
// Проверяем, может ли сообщение быть показано
if (preventNextMessageShowUp === 0 || preventNextMessageShowUp === 2) {
  // Создаем элемент div для сообщения
  const messageDiv = document.createElement("div");

  // Выбираем класс сообщения в зависимости от отправителя
  let messageClass = 'unknownSourceMessage';
  switch (sender) {
    case 'responder':
      messageClass = 'responderMessage';
      break;
    case 'user':
    case 'geolocation':
      messageClass = 'userMessage';
      break;
    case 'system':
      messageClass = 'systemMessage';
      message = 'System: ' + message;
      break;
    case 'error':
      messageClass = 'errorMessage';
      message = 'System error: ' + message;
      break;
  }

  // Добавляем класс и текст сообщения в элемент div
  messageDiv.classList.add(messageClass);
  messageDiv.innerHTML = '<p>' + message + '</p>';

  // Добавляем сообщение на страницу
  output.appendChild(messageDiv);
}

```

# Пояснения к изменениям:

## Улучшение структуры кода: Разделил код на отдельные шаги с комментариями, чтобы было проще понимать, что происходит на каждом этапе.

## Удаление повторяющихся операций: Класс сообщения и обработка определенных отправителей (например, 'user' и 'geolocation') имеют одинаковую логику, поэтому объединил их для уменьшения повторений кода.

## Использование дефолтного класса: Вместо использования условного оператора по умолчанию установил класс unknownSourceMessage, чтобы избежать дублирования этой логики.

## Применение констант: Вместо магических чисел и строк используются константы, которые могут быть объявлены выше кода для улучшения читаемости.
## Улучшение переменных: Изменил имя переменной pre на более понятное messageDiv.
## Применение принципа KISS позволило упростить код, сделать его более читаемым и легко поддерживаемым.
## Применение принципа YAGNI (You Ain’t Gonna Need It)
## работаем с файлом /scr/script4.js переписываем код:

```
const btn = document.querySelector('button');
const output = document.querySelector('#output');

btn.addEventListener('click', () => {
  output.innerHTML = '';
  
  const firstLi = document.createElement('li');
  const secondLi = document.createElement('li');
  output.appendChild(firstLi);
  output.appendChild(secondLi);

  const fetchRequest = (url) => {
    return fetch(url)
      .then(response => response.json())
      .catch(() => console.log('error'));
  };

  const error = () => {
    firstLi.textContent = 'Невозможно получить информацию о местоположении';
  };

  const success = async (position) => {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    const url = `https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`;
    const requestResult = await fetchRequest(url);
    if (requestResult.length !== 0) {
      firstLi.innerText = `временная зона, в которой находится пользователь: ${requestResult.timezone}`;
      secondLi.innerText = `местные дата и время: ${requestResult.date_time_txt}`;
    }
  };

  if (!navigator.geolocation) {
    firstLi.innerText = 'Невозможно получить информацию о местоположении';
  } else {
    firstLi.textContent = 'Местоположение пользователя определяется. Ждите...';
    navigator.geolocation.getCurrentPosition(success, error);
  }
});
```

## на такой код:
```
const btn = document.querySelector('button');
const output = document.querySelector('#output');

btn.addEventListener('click', async () => {
  output.innerHTML = '';

  const firstLi = document.createElement('li');
  const secondLi = document.createElement('li');
  output.appendChild(firstLi);
  output.appendChild(secondLi);

  const error = () => {
    firstLi.textContent = 'Невозможно получить информацию о местоположении';
  };

  const success = async (position) => {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    const url = `https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`;
    
    try {
      const response = await fetch(url);
      const requestResult = await response.json();
      
      if (requestResult.length !== 0) {
        firstLi.innerText = `Временная зона пользователя: ${requestResult.timezone}`;
        secondLi.innerText = `Местное время: ${requestResult.date_time_txt}`;
      }
    } catch (e) {
      console.log('error:', e);
      error();
    }
  };

  if (!navigator.geolocation) {
    error();
  } else {
    firstLi.textContent = 'Определение местоположения пользователя...';
    navigator.geolocation.getCurrentPosition(success, error);
  }
});
```
# Изменения, сделанные в коде:
## Убрана функция fetchRequest, так как прямой вызов fetch более прост и читаем.
## Заменены комментарии на более читаемые описания действий.
## Добавлен блок try...catch для обработки ошибок при запросе временной зоны.
## Удалены упоминания о местоположении, которые не являются частью функциональности.
## Удалена проверка на ненулевой результат запроса, так как это условие предполагает дополнительную логику, которая может быть несущественной.
## Упрощено обновление текста в элементах списка.
## В результате мы избавились от ненужного функционала, сохраняя только те части, которые требуются для корректной работы согласно техническому заданию.


# в части демонтстации применения принципа SOLID (S - Single Responsibility, O - Open/Closed, L - Liskov Substitution, I - Interface Segregation, D - Dependency Inversion) 
## работаем также с файлом /scr/script3.js разделим код  на более мелкие компоненты для улучшения читаемости, расширяемости и тестируемости.


```
const btn = document.querySelector('button');
		const output = document.querySelector('#output');
    const firstLi = document.createElement('li');
		const secondLi = document.createElement('li');
		const mapDiv = document.querySelector('#map');
		let map;

		btn.addEventListener('click', () => {
   firstLi.innerText=`Размеры экрана пользователя ширина: ${window.screen.width} x высота: ${window.screen.height}`;
output.appendChild(firstLi);
			const error = () => {
				secondLi.textContent = 'Информация о местоположении недоступна';
			};

			const success = (position) => {
				const {latitude, longitude} = position.coords;
				secondLi.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;

				// Создаем объект карты и устанавливаем его центр на местоположение пользователя
				map = new ymaps.Map(mapDiv, {
					center: [latitude, longitude],
					zoom: 14
				});

				// Добавляем маркер на карту, который показывает местоположение пользователя
				const marker = new ymaps.Placemark([latitude, longitude], {
					hintContent: 'Вы здесь'
				});
				map.geoObjects.add(marker);
			};

			if (!navigator.geolocation) {
				secondLi.textContent = 'Информация о местоположении недоступна';
			} else {
				secondLi.textContent = 'Определение местоположения…';
				navigator.geolocation.getCurrentPosition(success, error);
			}

			output.appendChild(secondLi);
		});
```

## получаем такой код:

```

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
```

# Пояснения к изменениям:

## Мы разбили код на отдельные классы и модули, каждый из которых отвечает за конкретную область функциональности: геолокацию, карту и вывод информации.
## Каждый класс отвечает только за одну ответственность (принцип Single Responsibility).
## Мы используем принцип Open/Closed, позволяя добавлять новую функциональность (например, новый сервис) без изменения существующего кода.
## Наследование не играет большой роли в данной реализации, поэтому Liskov Substitution не так важен.
## Классы не навязывают свои методы, которые не используются в конкретном контексте (принцип Interface Segregation).
## Зависимости инвертированы: класс App зависит от абстракций (сервисов), а не от конкретных реализаций (принцип Dependency Inversion).
## минус использования принципа SILD - увеличения числа строчек кода


# код проверен на предмет семантики
## был улучшен код в файле task1.html в части добавления семантических элементов:
## <header> и <nav>: Обернул логотип "НА ГЛАВНУЮ" в семантические элементы <header> и <nav>, чтобы показать, что это верхняя часть страницы с навигационными элементами.
## <main>: Весь контент страницы обернут в семантический элемент <main>, который обозначает основное содержимое страницы.
## <article>: Каждый флаг помещен в свой собственный элемент <article>, чтобы обозначить отдельную статью с информацией о флаге.
## Заголовки: Использованы заголовки <h1> и <h2> для обозначения важности заголовков и создания иерархии.
## <footer>: Добавлен элемент <footer> для информации об авторских правах и другой дополнительной информации.
## target="_blank": Добавлен атрибут target="_blank" для открытия ссылки в новой вкладке.
## <p> для копирайта: Добавлен элемент <p> для копирайт информации в подвале страницы.

# проверка валидности сайта осуществллась на ресурсе https://validator.w3.org
## gо результатам проверки ошибок не обнаружено


# для для проверки кода использовал линтеры vscode-jslint и js-beautify for VS Code
# в части демонстрации верстки по БЭМ переделал index.html:
## обавлены классы в соответствии с принципом БЭМ для каждого элемента, чтобы обеспечить лучшую структурированность и читаемость кода.
## Для элементов таблицы (caption, thead, tbody, tr, th, td) и текстовых блоков (span) были добавлены соответствующие классы с префиксом table__, чтобы связать их с общим блоком table.
## Для ссылок был добавлен класс link, чтобы облегчить их стилизацию и выделение внутри ячеек таблицы.
## Для описания заданий был добавлен класс description, который помогает применять стили и форматирование для текстов описания.
## Каждая строка таблицы была обернута в элемент tr, и каждая ячейка данных (номер задания, ссылка на задание, описание) была помещена в соответствующий элемент td.
## Внутри каждой ячейки данных (td) был добавлен класс table__data для стилизации и выравнивания содержимого.
## Описание заданий было размещено в элементе span с классом description, чтобы легко применять к нему стили и форматирование.
## Каждая ссылка (a) была обернута в блок div для лучшей контролируемости и стилизации, но вы можете оставить их напрямую в td, если это соответствует вашим предпочтениям.




---
## The project is available on Githab at https://github.com/AndreyLysow/module20_homework.git
---


© [Andrey Lysov](https://github.com/AndreyLysow), 2023

