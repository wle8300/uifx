declare module 'uifx' {

  type config = {
    volume?: number;
    throttleMs?: number;
  };

  export default class UIFx {

    constructor(file: string, config?: config);

    play: (volume?: number) => UIFx;
    setVolume: (volume: number) => UIFx;
  }
}
