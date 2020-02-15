declare module 'uifx' {

  type config = {
    volume?: number;
    throttleMs?: number;
    playbackRate?: number;
  };

  export default class UIFx {

    constructor(file: string, config?: config);

    play: (volume?: number) => UIFx;
    setVolume: (volume: number) => UIFx;
    setPlaybackRate: (rate: number) => UIFx;
  }
}
