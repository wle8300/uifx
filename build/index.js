'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UIfx = function UIfx(file, config) {
  _classCallCheck(this, UIfx);

  _initialiseProps.call(this);

  var namespace = "uifx";
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
  var validateURI = function validateURI(file) {
    if (!file) {
      throw Error('Requires valid URI path for "file"');
    } else return file;
  };
  var validateVolume = function validateVolume(volume) {
    var message = '"Volume" must be an number between 0.0 and 1.0';

    if (volume && typeof volume !== "number") throw Error(message);
    if (volume < 0 || volume > 1) throw Error(message);

    return volume ? volume : 1.0;
  };
  var validateThrottleMs = function validateThrottleMs(throttleMs) {
    var message = '"throttleMs" must be a number greater than zero';

    if (throttleMs && typeof throttleMs !== "number") throw Error(message);
    if (throttleMs < 0) throw Error(message);

    return throttleMs ? throttleMs : 0;
  };
  var volume = validateVolume(config && config.volume);
  var throttleMs = validateThrottleMs(config && config.throttleMs);
  var appendAudioElement = function appendAudioElement(file) {
    // hack to force browser
    // to preload audio file

    // hash function: https://stackoverflow.com/a/8831937/11330825
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
    var id = namespace + '-' + hash(file);
    var audioElement = document.createElement("audio");

    audioElement.id = id;
    audioElement.src = file;
    audioElement.preload = "auto";

    document.body.appendChild(audioElement);
    return file;
  };

  this.file = appendAudioElement(validateURI(file));
  this.volume = volume;
  this.throttleMs = throttleMs;
  this.play = throttleMs > 0 ? throttle(this.play, throttleMs) : this.play;
  this.setVolume = this.setVolume;
  this.validateVolume = validateVolume;
};

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.play = function (volume) {

    _this.validateVolume(volume);

    var audioElement = new Audio(_this.file);
    audioElement.load();
    audioElement.addEventListener("loadeddata", function () {

      audioElement.volume = volume >= 0 && volume <= 1 ? volume : _this.volume;

      var audioElementPromised = audioElement.play();

      audioElementPromised.then(function () {
        // autoplay started, everyting is ok
      }).catch(function (error) {
        console.log('UIfx says: "had a problem playing file: ' + _this.file + '"');
      });
    });

    return _this;
  };

  this.setVolume = function (volume) {
    _this.validateVolume(volume);

    _this.volume = volume;

    return _this;
  };
};

exports.default = UIfx;