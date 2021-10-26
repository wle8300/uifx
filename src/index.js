export default class UIfx {
  constructor(file, config) {
    const namespace = "uifx";
    const throttle = (fn, delay) => {
      let lastCall = 0;
      return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
          return;
        }
        lastCall = now;
        return fn(...args);
      };
    };
    const validateURI = file => {
      if (!file) {
        throw Error('Requires valid URI path for "file"');
      } else return file;
    };
    const validateVolume = volume => {
      const message = '"Volume" must be an number between 0.0 and 1.0';

      if (volume && typeof volume !== "number") throw Error(message);
      if (volume < 0 || volume > 1) throw Error(message);

      return volume ? volume : 1.0;
    };
    const validateThrottleMs = throttleMs => {
      const message = '"throttleMs" must be a number greater than zero';

      if (throttleMs && typeof throttleMs !== "number") throw Error(message);
      if (throttleMs < 0) throw Error(message);

      return throttleMs ? throttleMs : 0;
    };
    const volume = validateVolume(config && config.volume);
    const throttleMs = validateThrottleMs(config && config.throttleMs);
    const appendAudioElement = file => {
      // hack to force browser
      // to preload audio file

      // hash function: https://stackoverflow.com/a/8831937/11330825
      const hash = str => {
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
      const id = `${namespace}-${hash(file)}`;

      if (!document.getElementById(id)) {
        let audioElement = document.createElement("audio");

        audioElement.id = id;
        audioElement.src = file;
        audioElement.preload = "auto";

        document.body.appendChild(audioElement);
      }
      return file;
    };

    this.file = appendAudioElement(validateURI(file));
    this.volume = volume;
    this.throttleMs = throttleMs;
    this.play = throttleMs > 0 ? throttle(this.play, throttleMs) : this.play;
    this.setVolume = this.setVolume;
    this.validateVolume = validateVolume;
  }

  play = volume => {
    
    this.validateVolume(volume);

    const audioElement = new Audio(this.file);
    audioElement.load();
    audioElement.addEventListener("loadeddata", () => {
    
      audioElement.volume = volume >= 0 && volume <= 1 ? volume : this.volume;
    
      const audioElementPromised = audioElement.play();
      
      audioElementPromised
        .then(() => {
          // autoplay started, everyting is ok
        })
        .catch(error => {
          console.log(`UIfx says: "had a problem playing file: ${this.file}"`)
        });
    });

    return this;
  };

  setVolume = volume => {
    this.validateVolume(volume);

    this.volume = volume;

    return this;
  };
}
