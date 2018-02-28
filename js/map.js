'use strict';

/* Массивы настроек объявлений */

var AVATARS = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'
];

var OFFER_TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var OFFER_TYPES = [
  'flat',
  'house',
  'bungalo'
];

var OFFER_TIMES = [
  '12:00',
  '13:00',
  '14:00'
];

var OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var OFFER_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

/*
  Функция generateOffers генерирует уникальные объявления о сдаче недвижимости
*/
var generateOffers = function () {
  /*
  * Функция getRandomInteger генерирует случайное целое число в заданном диапазоне
  */
  var getRandomInteger = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  };

  var shuffle = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  /*
  * Функция getUnicINdexes генерирует перемешанный массив индексов массива
  */
  var getUnicIndexes = function (arrayLength) {
    var indexes = [];
    for (var i = 0; i < arrayLength; i++) {
      indexes[i] = i;
    }

    shuffle(indexes);

    return indexes;
  };

  var getRandomProperty = function (array) {
    var index = getRandomInteger(0, array.length - 1);
    return array[index];
  };

  var getFeatures = function () {
    var featuresCount = getRandomInteger(0, OFFER_FEATURES.length);
    var features = [];

    if (featuresCount > 0) {
      var indexes = [];

      for (var i = 0; i < OFFER_FEATURES.length; i++) {
        indexes[i] = i;
      }
      shuffle(indexes);

      indexes = indexes.slice(0, featuresCount);

      for (var j = 0; j < featuresCount; j++) {
        var index = indexes[j];
        features[j] = OFFER_FEATURES[index];
      }
    }

    return features;
  };

  var offersCount = 8;
  var offers = [];
  var arrayIndexes = getUnicIndexes(offersCount);

  for (var i = 0; i < offersCount; i++) {
    var index = arrayIndexes[i];
    var avatar = AVATARS[index];
    var title = OFFER_TITLES[index];
    var addressX = getRandomInteger(300, 900);
    var addressY = getRandomInteger(150, 500);
    var address = '' + addressX + ', ' + addressY;
    var price = getRandomInteger(1000, 1000000);
    var type = getRandomProperty(OFFER_TYPES);
    var roomsNumber = getRandomInteger(1, 5);
    var guestsNumber = getRandomInteger(1, 100);
    var checkin = getRandomProperty(OFFER_TIMES);
    var checkout = getRandomProperty(OFFER_TIMES);
    var features = getFeatures();
    var photos = OFFER_PHOTOS;
    shuffle(photos);

    offers[i] = {
      'author': {
        'avatar': avatar
      },

      'offer': {
        'title': title,
        'address': address,
        'price': price,
        'type': type,
        'rooms': roomsNumber,
        'guests': guestsNumber,
        'checkin': checkin,
        'checkout': checkout,
        'features': features,
        'description': '',
        'photos': photos
      },

      'location': {
        'x': addressX,
        'y': addressY
      }
    };
  }

  return offers;
};

/* функция убирает класс .map--faded у блока .map */
var showMap = function () {
  var mapElement = document.querySelector('.map');
  mapElement.classList.remove('map--faded');
};

/* функция создает массив меток объявлений пользователей на основе массив исходных данных data*/
var generatePins = function (data) {
  var pins = [];

  for (var i = 0; i < data.length; i++) {
    var pinIconWidth = 45;
    var pinIconHeight = 70;
    var addressX = data[i].location.x - Math.floor(pinIconWidth / 2);
    var addressY = data[i].location.y - pinIconHeight;
    var avatar = data[i].author.avatar;

    pins[i] = {
      'innerHTML': '<img src=' + avatar + ' width="40" height="40" draggable="false">',
      'classList': 'map__pin',
      'style': 'left: ' + addressX + 'px; top: ' + addressY + 'px;'
    };
  }

  return pins;
};

/* функция размещает маркеры в блоке маркеров */
var placePins = function (pins) {
  var mapPinsElement = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pins.length; i++) {
    var pin = document.createElement('button');
    pin.classList.add(pins[i].classList);
    pin.innerHTML = pins[i].innerHTML;
    pin.setAttribute('style', pins[i].style);

    fragment.appendChild(pin);
  }

  mapPinsElement.appendChild(fragment);
};

/* генерируем данные */
var generatedOffers = generateOffers();

/* генерируем маркеры на основе данных */
var generatedPins = generatePins(generatedOffers);

/* делаем карту активной */
showMap();

/* добавляем сгенерированные маркеры на карту */
placePins(generatedPins);

/* функция возвращает объект одного объявления */
var getGeneratedOffer = function (index) {
  var offer = generatedOffers[index];

  return offer;
};

/* соответствие типов жилья назвванию */
var offerTypes = {
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

/* функция показывает карточку объявления */
var fillInOfferCard = function (offer) {
  var mapElement = document.querySelector('.map');
  var offerTemplate = document.querySelector('template').content.children[0];

  var offerTitle = offer.offer.title;
  var offerAddress = offer.offer.address;
  var offerPrice = offer.offer.price + "&#x20bd;/ночь";
  var offerType = offerTypes(offer.offer.type);
  var guestsAndRooms = offer.offer.rooms + ' комнаты для ' + offer.offer.guests +' гостей';
  var chekInOut = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;

};
