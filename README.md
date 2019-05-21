### Audio library designed for UI sound effects (UIfx)

Demo: https://wle8300.github.io/uifx-demo/

## Usage

```
npm install --save uifx
```

```
import UIfx from 'uifx'
import bellAudio from './my-sounds/bell.mp3'

const bell = new UIfx({
  asset: bellAudio,
  volume: 0.4, // number between 0.0 ~ 1.0
  throttleMs: 100
})

// playback
bell.play()

// temporarily change volume
bell.play(0.25) // will play at 0.25 volume
bell.play() // reverts back to 0.4 volume

// set volume
bell.setVolume(0.5).play()
// ...chainable
bell.setVolume(0.5)
bell.play()
```


## Technical

It uses the `Audio` API under-the-hood ([Mozilla](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement)), and will preload audio files so assets are immediately ready for playback. Ideally you'll probably wanna package your mp3 files along with your app.

The library doesn't have any dependencies.


## Why use UIfx?
 
 The main technical distinctive of `UIfx` is that it spawns a new audio player upon playback. This is a small, but important distinction from what SoundManager or Howler provide since short sound effects have different technical requirements than lengthy audio files (e.g., playing a song).



