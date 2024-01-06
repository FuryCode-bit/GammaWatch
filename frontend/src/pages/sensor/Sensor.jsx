import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import SensorComponent from '../../components/sensor/Sensor';
import Header from '../../components/navbar/header';

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

function Sensor() {

  const { ide, ids } = useParams();

  const teste = true

  const navigate = useNavigate();

  const [leituras, setLeituras] = useState([])
  const [sensorCounter, setSensorCounter] = useState(0)
  const [estacao, setEstacao] = useState({})
  const [sensoresLista, setSensoresLista] = useState([])

  return (
    <>
    <Row>
      <Header/>
    </Row>
    </>
  )
}

export default Sensor