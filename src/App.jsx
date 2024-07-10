import React from "react";
import MainRouter from "./routes/MainRouter";
import "./App.css";
import Footer from "./components/Footer";
import 'bootstrap-icons/font/bootstrap-icons.css';
import TelegramIcon from "./components/TelegramIcon";

function App() {
  return (
    <div className="App">
      <MainRouter /> 
      <Footer/>
      <TelegramIcon/>
    </div>
  );
}

export default App;
