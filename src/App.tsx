import "./App.css";
import { Socket } from "phoenix";
import { useLiveState } from "./live-state";

let socket = new Socket("wss://beam-counter.fly.dev/socket", {
  params: { userToken: "123" },
});
socket.connect();

function App() {
  const [pushEvent, state] = useLiveState(socket, "counter", { count: 0 });
  return (
    <div className="App">
      <div className="card">
        <button onClick={() => pushEvent("increment", {})}>
          {state.count}
        </button>
      </div>
    </div>
  );
}

export default App;
