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

      // var featuresToTake = getUnicIndexes(featuresCount);

      // for (var i = 0; i < featuresCount; i++) {
      //   var index = featuresToTake[i];
      //   features[i] = OFFER_FEATURES[index];
      // }
    }
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
  }
};

// var offerTemplate = {
//   'author': {
//     'avatar': $avatar
//   },
//
//   'offer': {
//     'title': $title,
//     'address': $address,
//     'price': $price,
//     'type': $type,
//     'rooms': $roomsNumber,
//     'guests': $guestQuota,
//     'checkin': $checkinTime,
//     'checkout': $checkoutTime,
//     'features': $features,
//     'description': '',
//     'photos': $photos
//   },
//
//   'location': {
//     'x': 0,
//     'y': 0
//   }
// };
//
// var offers = [];
