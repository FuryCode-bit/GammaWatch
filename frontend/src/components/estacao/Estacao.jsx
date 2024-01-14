import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import api from '../../api/api';
import Header from '../navbar/header';
import TabelaSensores from "./TabelaSensores"
import TabelaLeituras from './tabelaLeituras';

import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,}
  from "reactstrap"

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import LineChart from '../graficos/LineChart';

import Abrantes from "./../../static/Abrantes.jpg"
import Beja from "./../../static/Beja.jpg"
import Braganca from "./../../static/Braganca.jpg"
import CasteloBranco from "./../../static/CasteloBranco.jpg"
import Coimbra from "./../../static/Coimbra.jpg"
import Elvas from "./../../static/Elvas.jpg"
import PenhasDouradas from "./../../static/PenhasDouradas.jpg"
import Evora from "./../../static/Evora.jpg"
import Faro from "./../../static/Faro.jpg"
import Fratel from "./../../static/Fratel.jpg"
import Funchal from "./../../static/Funchal.jpg"
import Junqueira from "./../../static/Junqueira.jpg"
import Juromenha from "./../../static/Jurumenha.jpg"
import Lisboa from "./../../static/Lisboa.jpg"
import Meimoa from "./../../static/Meimoa.jpg"
import Pocinho from "./../../static/Pocinho.jpg"
import PontaDelgada from "./../../static/PontaDelgada.jpg"
import Portalegre from "./../../static/Portalegre.jpg"
import Porto from "./../../static/Porto.jpg"
import Sines from "./../../static/Sines.jpg"
import Minas from "./../../static/Minas.jpg"
import imagemDefault from "./../../static/404.png"

import InfoComponent from './InfoComponente';
import TabelaAlertas from './tabelaAlertas';

Chart.register(CategoryScale);

function EstacaoComponent({ teste, estacoes }) {
  
  const navigate = useNavigate();

  const [display, setDisplay] = useState(false);
  
  const [chartData, setChartData] = useState({
    datasets: [
      {
        label: 'Riscos Radiação (nSv/h)', // Modify the label according to your data
        data: [],
        borderColor: "#00A499",
        backgroundColor: "rgba(0, 164, 153, 0.5)",
        pointStyle: 'circle',
        pointRadius: 5,
        pointHoverRadius: 15
      }
    ]
  });

  const [chartDataTotal, setChartDataTotal] = useState({
    datasets: [
      {
        label: 'Riscos Radiação (nSv/h)', // Modify the label according to your data
        data: [],
        borderColor: "#00A499",
        backgroundColor: "rgba(0, 164, 153, 0.5)",
        pointStyle: 'circle',
        pointRadius: 5,
        pointHoverRadius: 15
      }
    ]
  });

  const [estacaoCounter, setEstacaoCounter] = useState(0)
  const [estacao, setEstacao] = useState({})
  const [sensoresLista, setSensoresLista] = useState([])
  const [alertasLista, setAlertasLista] = useState([])
  const [sensoresListaFiltrados, setSensoresListaFiltrados] = useState([])
  const [lastElement, setLastElement] = useState("")
  const [leituras, setLeituras] = useState([])
  const length = estacoes.length
  const [sensorID, setSensorID] = useState(0)
  const [sensorPage, setSensorPage] = useState(false)

  const [firstReadingDate, setFirstReadingDate] = useState("")
  const [lastReadingDate, setLastReadingDate] = useState("")
  
  const navigateSensor = () => {
    setSensorPage(true)
  };

  useEffect(() => {

    if (estacoes.length > 0) {
      setEstacao(estacoes[estacaoCounter]);
    }

    async function getLeituras() {
      try {
        const response = await api.post('/LeiturasEstacao', { id: estacoes[estacaoCounter] });
        if (teste) {
          console.log("Leituras data from API:", response.data);
        }
        
        setLeituras(response.data);
    
        const leiturasData = response.data;

        const groupedData = leiturasData.reduce((result, currentValue) => {
          (result[currentValue.dia] = result[currentValue.dia] || []).push(currentValue);
          return result;
        }, {});

        const result = [];
        
        for (const [day, dayValues] of Object.entries(groupedData)) {
          let sum = 0;
          let count = dayValues.length;
        
          dayValues.forEach((item) => {
            sum += item.valor;
          });
        
          const avg = sum / count;
          result.push({ day, avg });
        }
        
        console.log("Result: ", result);

        const firstElement = result[0].day;
        setFirstReadingDate(firstElement)

        // Get the last element of the array
        const lastElement = result[result.length - 1].day;
        setLastReadingDate(lastElement)
        
        let labels = result.map((item) => item.day);
        let values = result.map((item) => item.avg.toFixed(4));
        
        if (result.length >= 30) {
          labels = labels.slice(-30);
          values = values.slice(-30);
        }
        
        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Valor médio por dia (nSv)',
              data: values,
              borderColor: "#00A499",
              backgroundColor: "rgba(0, 164, 153, 0.5)",
              pointStyle: 'circle',
              pointRadius: 5,
              pointHoverRadius: 5
            }
          ]
        });
      } catch (error) {
        if (teste) {
          console.log("Error fetching user info:", error);
        }
        console.error("Error fetching user info:", error);
      }
    }

    async function getSensors() {
      try {
        const response = await api.post('/sensoresEstacao', { id: estacoes[estacaoCounter] });
        setSensoresLista(response.data);
      } catch (error) {
        console.error('Error retrieving sensors from the station:', error);
        return [];
      }
    }

    async function getAlerts() {
      try {
        const response = await api.post('/alertasEstacao', { id: estacoes[estacaoCounter] });
        setAlertasLista(response.data);
      } catch (error) {
        console.error('Error retrieving sensors from the station:', error);
        return []; 
      }
    }

    getSensors();
    getLeituras();
    getAlerts();    
    
  }, [estacoes, estacaoCounter]);

      // Function to handle decrementing the counter
      const getImageEstacao = (nome) => {
        switch (nome) {
          case "Abrantes":
            return Abrantes;
          case "Beja":
            return Beja;
          case "Braganca":
            return Braganca;
          case "Castelo Branco":
            return CasteloBranco;
          case "Coimbra":
            return Coimbra;
          case "Elvas":
            return Elvas;
          case "Penhas Douradas":
            return PenhasDouradas;
          case "Evora":
            return Evora;
          case "Faro":
            return Faro;
          case "Fratel":
            return Fratel;
          case "Funchal":
            return Funchal;
          case "Junqueira":
            return Junqueira;
          case "Juromenha":
            return Juromenha;
          case "Lisboa":
            return Lisboa;
          case "Meimoa":
            return Meimoa;
          case "Pocinho":
            return Pocinho;
          case "Ponta Delgada":
            return PontaDelgada;
          case "Portalegre":
            return Portalegre;
          case "Porto":
            return Porto;
          case "Sines":
            return Sines;
          case "Minas Urgeiriça":
            return Minas;
          default:
            return imagemDefault; // Return null for unknown cities or handle accordingly
        }
      };

    // Function to handle decrementing the counter
    const handleDecrement = () => {
      setEstacaoCounter(prevCounter => {
        if (prevCounter - 1 < 0) {
          return length-1; // Reset counter to the last index if it goes below 0
        }
        return prevCounter - 1;
      });
    };

  // Function to handle incrementing the counter
  const handleIncrement = () => {
    setEstacaoCounter(prevCounter => {
      if (prevCounter + 1 >= length) {
        return 0; // Reset counter to 0 if it exceeds the array length
      }
      return prevCounter + 1;
    });
  };

  const findSensorNameById = (id) => {
    const sensor = sensoresLista.find(sensor => sensor.IDS === id);
    return sensor ? sensor.modelo : null;
  };

  useEffect(() => {
    // Function to group sensor readings by day and calculate daily average
    const processSensorReadings = (sensorReadings) => {
      const groupedData = sensorReadings.reduce((result, currentValue) => {
        (result[currentValue.dia] = result[currentValue.dia] || []).push(currentValue);
        return result;
      }, {});
  
      const result = [];
  
      for (const [day, dayValues] of Object.entries(groupedData)) {
        let sum = 0;
        let count = dayValues.length;
  
        dayValues.forEach((item) => {
          sum += item.valor;
        });
  
        const avg = sum / count;
        result.push({ day, avg });
      }
  
      let labels = result.map((item) => item.day);
      let values = result.map((item) => item.avg.toFixed(4));
  
      return {
        labels: labels,
        values: values
      };
    };
  
    // Filter the array to get all readings from sensor 1
    const sensorReadings = leituras.filter((leitura) => leitura.IDS === sensorID && leitura.IDE === estacao.IDE);
    // Calculate the month of the first and last readings
    setSensoresListaFiltrados(sensorReadings);
  
    // Get the last element's IDNR
    const lastElementIDNR = sensorReadings.length > 0 ? sensorReadings[sensorReadings.length - 1].IDNR : null;
    setLastElement(lastElementIDNR);
    
    console.log("sensorReadings: ", sensorReadings);
  
    // Process sensor readings
    const processedData = processSensorReadings(sensorReadings);
  
    setChartDataTotal({
      labels: processedData.labels,
      datasets: [
        {
          label: 'Valor médio por dia (nSv)',
          data: processedData.values,
          borderColor: "#00A499",
          backgroundColor: "rgba(0, 164, 153, 0.5)",
          pointStyle: 'circle',
          pointRadius: 5,
          pointHoverRadius: 5
        }
      ]
    });

    console.log("sensorReadings: ", sensorReadings);
  }, [leituras, sensorPage])
    
  return (
    <> {sensorPage?
      <>
      <Row>
        <Header/>
      </Row>
      <Container style={{ overflow: "hidden" }}>
        <Row style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
          <Col sm="8" md="4" lg="4">
          
          </Col>
          <Col sm="8" md="4" lg="4" style={{ backgroundColor: "lightgray", textAlign: "center", borderRadius: "15px" }}>
            <Row className="justify-content-center">
                <>
                  <Col sm="4" md="4" lg="4">
                  </Col>
                  <Col sm="4" md="4" lg="4">
                    <h4>{findSensorNameById(sensorID)}</h4>
                  </Col>
                  <Col sm="4" md="4" lg="4">
                  </Col>
                </>
            </Row>
          </Col>
          <Col sm="8" md="4" lg="4" style={{display: "flex", justifyContent: "center"}}>
            <Row style={{display: "flex"}}>
              <Col sm="12" md="12" lg="12">
                <Button onClick={() => setDisplay(!display)}>{display? "Ver Gráfico" : "Ver Tabela"}</Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{ marginTop: "15px" }}>
          <Col sm="12" md="6" lg="6">
            <Row style={{ height: "250px", marginTop: "10px", marginLeft: "30px", backgroundColor: "lightGray", margin: "10px", alignItems: "center", display: "flex" }}>
              <Col sm="6" md="6" lg="6" style={{display: "flex", textAlign: "center", justifyContent: "center", borderRight: "1px solid black"}}>
                <h1 style={{fontSize: "180px"}}>{lastElement == null? "N/A" : lastElement - 1}</h1>
              </Col>
              <Col sm="6" md="6" lg="6">
                <Row style={{display: "flex"}}>
                  <Col md="3" lg="3">
                    <h5>sensor:</h5>
                  </Col>
                  <Col md="9" lg="9" style={{ textAlign: 'left'}}>
                    <p>{findSensorNameById(sensorID)}</p>
                  </Col>
                </Row>
                <Row style={{display: "flex"}}>
                  <Col md="3" lg="3">
                    <h5>Estacao:</h5>
                  </Col>
                  <Col md="3" lg="3" style={{ textAlign: 'left'}}>
                    <p>{estacao.localizacao}</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col sm="12" md="6" lg="6"  >
            <Row style={{ display: "flex", height: '300px', alignItems: "center", maxHeight: "250px", marginTop: "10px", backgroundColor: "lightgray", marginRight: "30px", textAlign: "center", overflow: "scroll" }}>
                {
                  alertasLista.length < 1?
                    <h4 style={{fontSize: "40px"}}>N/A</h4>
                  :
                    <Row style={{display: "flex"}}>
                      <h4 style={{fontSize: "25px"}}>Alertas</h4>
                      <TabelaAlertas alertasLista={alertasLista}/>
                    </Row>
                }
            </Row>
          </Col>
          </Row>
          <Row style={{ maxHeight: "300px", minHeight: "300px", marginTop: "10px", marginLeft: "30px", backgroundColor: "lightGray", margin: "10px", overflowY: "scroll" }}>
              <Row style={{padding: "10px", height: "290px"}}>
              {
                display?
                  <TabelaLeituras leiturasLista={sensoresListaFiltrados} />
                :
                  <LineChart chartData={chartDataTotal} />
              }
              </Row>
          </Row>
      </Container>
      </>
    :
      <Container style={{ overflow: "hidden" }}>
        <Row style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
          <Col sm="8" md="4" lg="4" style={{ backgroundColor: "lightgray", textAlign: "center", borderRadius: "15px" }}>
            <Row className="justify-content-center">
              {length > 0 ? (
                <>
                  <Col sm="3" md="3" lg="3">
                    <button onClick={() => handleDecrement()}>Anterior</button>
                  </Col>
                  <Col sm="6" md="6" lg="6">
                    <h4>{estacao.localizacao}</h4>
                  </Col>
                  <Col sm="3" md="3" lg="3">
                    <button onClick={() => handleIncrement()}>Proximo</button>
                  </Col>
                </>
              ) : (
                <h4>A carregar</h4>
              )}
            </Row>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col sm="4" md="4" lg="4"></Col>
          <Col sm="4" md="4" lg="4" style={{textAlign: "center"}}>
            <p>
              {estacao.tipo > 2 ? `Estação móvel ativa de ${firstReadingDate} a ${lastReadingDate}` : null}
            </p>
          </Col>
          <Col sm="4" md="4" lg="4"></Col>
        </Row>
        <Row>
          <Col sm="12" md="8" lg="8">
            <Row style={{ height: "250px", marginTop: "10px", marginLeft: "30px", backgroundColor: "lightGray", margin: "10px", alignItems: "center", display: "flex" }}>
              <LineChart chartData={chartData} />
            </Row>
            <Row style={{ maxHeight: "300px", minHeight: "300px", marginTop: "10px", marginLeft: "30px", backgroundColor: "lightGray", margin: "10px", overflowY: "scroll" }}>
              <TabelaSensores estacao={estacao} sensoresLista={sensoresLista} navigateSensor={navigateSensor} setSensorID={setSensorID}/>
            </Row>
          </Col>
          <Col sm="12" md="4" lg="4"  >
            <Row style={{ display: "flex", height: '300px', alignItems: "center", maxHeight: "250px", marginTop: "10px", backgroundColor: "lightgray", marginRight: "30px" }}>
              <img src={getImageEstacao(estacao.localizacao)} alt="Image" style={{width: '100%', height: '230px', objectFit :"cover"}}/>
            </Row>
            <Row style={{ display: 'flex', height: '300px', marginTop: '10px', backgroundColor: 'lightgray', marginRight: '30px' }}>
              <InfoComponent estacao={estacao}/>
            </Row>
          </Col>
        </Row>
      </Container>
    }</>
  )
}

export default EstacaoComponent