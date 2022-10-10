import reactLogo from "./assets/react.svg";
import "./App.css";
import { Socket } from "phoenix";
import { useLiveState } from "./live-state";

let socket = new Socket("ws://localhost:4000/socket", {
  params: { userToken: "123" },
});
socket.connect();

function App() {
  const [pushEvent, state] = useLiveState(socket, "counter", { count: 0 });
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => pushEvent("increment", {})}>
          count is {state.count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
