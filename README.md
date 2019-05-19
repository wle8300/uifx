~😬 include a demo!!!
~ arg validation

## Lightweight audio library designed for UI sound effects (sfx)

I needed a library to play short audio clips to use for my JavaScript frontend apps. This library will preload your audio files, and only provides two methods:

- `play()`
- `adjustVolume(`0.0 ~ 1.0`)`

The volume default is (`1.0`) which is the loudest possible for the device's speakers.

## Install

```
npm install --save beep-audio
```

## Usage

```
import Beep from 'beep-audio'
import PromptSuccess from './audio-files/success.mp3'

const noise = new Beep({
  url: PromptSuccess,
  volume: 0.4
})

noise.adjustVolume(0.5).play()
//or
noise.adjustVolume(0.5)
noise.play()
```

## Technical

It uses the `Audio` ([mdn](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement)) API under-the-hood, and preloads audio files so it'll be immediately ready for playback without lag. Ideally your sfx should be locally packaged with your app. That's the fastest.

Also, this differs from other audio libraries because it spawns a new player everytime you call the `beep.play()` method. This means you don't have to wait for the sfx to finish before playing it again. You can do a thousand of plays within 1sec if you wanted!

The library doesn't have any dependencies.

