import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';

import Main from './pages/main/Main';
import Info from './pages/info/Info';
import Estacao from './pages/estacao/Estacao'
import Sensor from './pages/sensor/Sensor'

import './App.css';

function App() {

  const [debug, setDebug] = useState(false);


  return (
    <Container fluid className="p-0" id="mainContainer" style={{border: debug ? "3px solid red" : "none", overflowX: "hidden"}}>
      <div className="overlay">
        {debug ? <h3>Debug Mode</h3> : null}
      </div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/sobre" element={<Info />} />
          <Route exact path="/estacao" element={<Estacao />} />
          <Route exact path="/sensor/:ide/:ids" element={<Sensor />} />
        
        </Routes>
      </BrowserRouter>
  </Container>
  );
}

export default App;
