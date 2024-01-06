import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import api from '../../api/api';

import EstacaoComponent from '../../components/estacao/Estacao';
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

import Header from '../../components/navbar/header';


function Estacao({teste}) {
  // https://www.react-simple-maps.io/
  const navigate = useNavigate();

  const [estacoes, setEstacoes] = useState([]);

  useEffect(() => {
    async function getInfo() {
      try {
        const response = await api.get('/estacoes');
        if (teste) {
          console.log("User data from API:", response);
        }
        //console.log("response: ", response.data); // Assuming response contains data property
        console.log(response.data)
        setEstacoes(response.data); // Update state with response data
  
      } catch (error) {
        if (teste) {
          console.log("Error fetching user info:", error);
        }
        console.error("Error fetching user info:", error);
      }
    }
    getInfo();
  }, []);
  

  return (
    <>
    <Row>
      <Header/>
    </Row>
    <Row style={{height: "100vh", backgroundColor: "#fff", marginTop: "70px"}}>
      <EstacaoComponent teste={true} estacoes={estacoes}/>
    </Row>
    </>
  )
}

export default Estacao