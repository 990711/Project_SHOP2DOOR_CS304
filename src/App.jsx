import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Map from "./Components/RiderMap";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <RiderMap/>
    </>
  );
}

export default App;
