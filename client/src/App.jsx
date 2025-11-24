import { useState } from "react";
import Example from "./components/Example";

export default function App() {
  const [message, setMessage] = useState("");

  const callAPI = async () => {
    const res = await fetch("/api/hello");
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="app-container">
      <h1>myapp2 Frontend (Port 80)</h1>
      <button onClick={callAPI}>Call API</button>
      <p>{message}</p>
      <Example />
    </div>
  );
}
