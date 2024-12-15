import TopBar from "./components/Topbar";
import LogDisplay from "./components/LogDisplay";
import { useState } from "react";

function App() {
  const [logs, setLogs] = useState([]);

  return (
    <>
      <TopBar logs={logs} setLogs={setLogs} />
      <LogDisplay logs={logs} />
    </>
  );
}

export default App;
