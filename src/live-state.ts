import { proxy, useSnapshot } from "valtio";

let stateProxy: any;
let channel: any;

export function useLiveState(socket: any, topic: string, initialState: Object) {
  if (!stateProxy) {
    stateProxy = proxy(initialState);
  }
  if (!channel) {
    channel = socket.channel(topic, { token: "123" });
    channel.join();
    channel.on("state:change", (payload: { state: Object }) => {
      Object.assign(stateProxy, payload.state);
    });
  }

  const pushFn = (evt: String, payload: Object) =>
    channel.push(`lvs_evt:${evt}`, payload);
  const state = useSnapshot(stateProxy);
  return [pushFn, state];
}
