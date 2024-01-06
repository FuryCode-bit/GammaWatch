import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import api from '../../api/api';
import axios from "axios";

import MainComponent from '../../components/main/Main';

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


function Main({teste}) {
  
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [userTeams, setUserTeams] = useState([]);
  
  return (
    <>
    <Row>
      <Header/>
    </Row>
    <Row style={{height: "100vh", backgroundColor: "#fff", marginTop: "62px", overflowX: "hidden"}}>
      <MainComponent />
    </Row>
    </>
  )
}

export default Main