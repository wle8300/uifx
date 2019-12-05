### <img src="logo.png" width="50" style="display: inline;" />




__uifx__ is a library for playing sound effects on the web


<br/>
<br/>
<br/>


### Demo

https://wle8300.github.io/uifx-demo/


<br/>


### Usage

```shell
npm install --save uifx
```

```js
import UIfx from 'uifx'
import bellAudio from './my-sounds/bell.mp3'

const bell = new UIfx(
  bellAudio,
  {
    volume: 0.4, // number between 0.0 ~ 1.0
    throttleMs: 100
  }
)

// playback
bell.play()

// temporarily change volume
bell.play(0.25)   // plays at 0.25 volume
bell.play()       // reverts to 0.4 volume

// set volume
bell.setVolume(0.5)
bell.play()       // plays at 0.5 volume

// ...also chainable!
bell.setVolume(0.5).play()
```

<br/>


### Technical

It uses the [`HTMLAudioElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement) API so it's available for all major desktop/mobile browsers. It also preloads audio files so sounds are immediately ready for playback.

Even though `UIfx` will preload audio over the network, it's usually advisable to package your audio files locally since you don't want to rely on a 3rd-party to host your audio files.

The library has zero dependencies.

TypeScript definitions are included.


<br/>


### Why use UIfx?
 
It's designed specifically for soundfx so it preloads audio files to ensure it's immediately playable, and will spawns an audio player for each playback. This makes it lightweight and performant when compared to fully-fledged libraries like SoundManager or Howler.


