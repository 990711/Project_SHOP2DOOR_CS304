import { useState } from "react";
//import reactLogo from "./assets/react.svg";
//import viteLogo from "/vite.svg";
import "./App.css";
//import RiderMap from "./Components/RiderMap";
import Header from "./Components/Header"
import Profile from "./Pages/Profile"

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="App" >
      <Header/>
      <Profile/>
      
    </div>
    </>
  );
}

export default App;
