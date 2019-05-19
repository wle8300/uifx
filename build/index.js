"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var throttle = function throttle(fn, delay) {
  var lastCall = 0;
  return function () {
    var now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn.apply(undefined, arguments);
  };
};

var Beep = function Beep(props) {
  _classCallCheck(this, Beep);

  _initialiseProps.call(this);

  var url = props.url;
  var volume = props.volume || 1.0;
  var throttleMs = props.throttleMs || 0;

  // hack to force browser
  // to preload audio file
  var appendAudioElement = function appendAudioElement(url) {
    // hash function
    // credit: https://stackoverflow.com/a/8831937/11330825
    var hash = function hash(str) {
      var hash = 0;
      if (str.length === 0) {
        return hash;
      }
      for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
      }
      return Math.abs(hash);
    };
    var id = "boink-" + hash(url);
    var audioElement = document.createElement("audio");

    audioElement.id = id;
    audioElement.src = url;
    audioElement.preload = "auto";

    document.body.appendChild(audioElement);
    return;
  };

  // argument validation
  if (!url) throw Error('Requires valid "url" for audio file');
  if (volume) {
    if (typeof volume !== "number" || volume < 0 || volume > 1.0) {
      throw Error('"Volume" must be a number between 0.0 and 1.0');
    }
  }

  appendAudioElement(url);

  this.url = url;
  this.volume = volume;
  this.throttleMs = throttleMs;
  this.play = throttle(this.play, throttleMs);
  this.adjustVolume = this.adjustVolume;
};

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.play = function () {
    var audioElement = new Audio(_this.url);

    audioElement.addEventListener("loadeddata", function () {
      audioElement.volume = _this.volume;
      audioElement.play();
    });

    return _this;
  };

  this.adjustVolume = function (volume) {
    _this.volume = volume;
    return _this;
  };
};

exports.default = Beep;