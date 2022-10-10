import { proxy, useSnapshot } from "valtio";
import { useEffect } from "react";

let stateProxy;
let channel;

export function useLiveState(socket: any, topic: string, initialState: Object) {
  if (!channel) {
    channel = socket.channel(topic, { token: "123" });
  }
  if (!stateProxy) {
    stateProxy = proxy(initialState);
  }
  if (!channel.joinedOnce) {
    console.log(channel);
    channel
      .join()
      .receive("ok", ({ messages }) => console.log("catching up", messages))
      .receive("error", ({ reason }) => console.log("failed join", reason))
      .receive("timeout", () =>
        console.log("Networking issue. Still waiting...")
      );
    channel.on("state:change", (payload: { state: Object }) => {
      console.log("payload: ", payload);
      Object.assign(stateProxy, payload.state);
    });
    console.log(channel);
  }

  const pushFn = (evt: String, payload: Object) =>
    channel.push(`lvs_evt:${evt}`, payload);
  const state = useSnapshot(stateProxy);
  return [pushFn, state];
}
