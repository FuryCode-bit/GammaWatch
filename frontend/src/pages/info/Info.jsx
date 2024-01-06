import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import api from '../../api/api';
import axios from "axios";

import InfoComponent from '../../components/info/Info';
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

function Info({teste}) {
  
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [userTeams, setUserTeams] = useState([]);
  
  return (
    <>
    <Row>
      <Header/>
    </Row>
    <Row style={{height: "100%", backgroundColor: "#fff", marginTop: "100px", paddingLeft: "15%", paddingRight: "15%", marginBottom: "5%"}}>
      <InfoComponent/>
    </Row>
    </>
  )
}

export default Info