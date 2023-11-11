import { useState } from "react";
//import reactLogo from "./assets/react.svg";
//import viteLogo from "/vite.svg";
import "./App.css";
//import RiderMap from "./Components/RiderMap";
import Rider_Header from "./Components/Rider_Header"
import Rider_Profile from "./Pages/Rider_Profile"

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="App" >
      <Rider_Header/>
      <Rider_Profile/>
      
    </div>
    </>
  );
}

export default App;
