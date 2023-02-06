import { eventListener, initializer, makeWaSocket } from ".";

export class Launcher {
  // @ts-ignore
  constructor() {}
  public async buildProps() {
      const props = await initializer();
      const socket = makeWaSocket(props.state);
      eventListener(socket, props, this);
  }
}