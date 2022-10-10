import { proxy, useSnapshot } from "valtio";
import { useEffect } from "react";

let stateProxy;
let channel;

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
