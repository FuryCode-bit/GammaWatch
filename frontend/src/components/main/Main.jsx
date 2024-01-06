import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import api from '../../api/api';
import axios from "axios";

import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'

import Radiacao from "./../../static/radiacao.jpg"
import Radiacao1 from "./../../static/radiacao1.jpeg"
import Radiacao2 from "./../../static/radiacao2.jpeg"
import Radiacao3 from "./../../static/radiacao3.jpg"

import Ist from "./../../static/ist.jpg"
import Efeitos from "./../../static/efeitos.jpg"

import Button from '@mui/material/Button';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,}
  from "reactstrap"

function Item(props)
{
    return (
        <Paper style={{
            backgroundImage: `url(${props.item.image})`,
            height: "100vh",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            textAlign: "left",
            color: "#fff",
            textShadow: "initial"
        }}>
            <h1 style={{marginLeft: "150px", width: "500px"}}>{props.item.name}</h1>
        </Paper>
    )
}

function MainComponent() {
  
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [userTeams, setUserTeams] = useState([]);
  
  var items = [
    {
        name: "A Rede que Protege Portugal desde 1989",
        image: Radiacao
    },
    {
        name: "Promovendo a Segurança: Monitorização de Radiação em Todo o Lado.",
        image: Radiacao1
    },
    {
        name: "Protegendo Ambientes: Rastreio de Radioatividade a Nível Nacional.",
        image: Radiacao2
    },
    {
        name: "Defendendo a Saúde: Soluções de Vigilância de Radiação em Tempo Real.",
        image: Radiacao3
    }
]

  return (
    <>
        <Container fluid className="p-0">
            <Row>
                <Carousel style={{overflow: "hidden"}}>
                    {
                        items.map( (item, i) => <Item key={i} item={item} /> )
                    }
                </Carousel>
            </Row>
            <Row style={{marginLeft: "40px", marginRight: "40px", paddingTop: "50px"}}>
                <Col sm="12" md="6" lg="6" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <img src={Efeitos} alt="Image" style={{width: '300px', overflow: 'hidden', objectFit :"cover"}}/>
                </Col>
                <Col sm="12" md="5" lg="5" style={{marginLeft: "50px"}}>
                    <h1>Descobre mais sobre os<br />  efeitos da radiação</h1>
                    <p style={{marginTop: "15px", fontSize: "20px"}}>
                        Protegendo Portugal desde 1989, a RADNET monitoriza a radioatividade, detetando variações e garantindo segurança. Conheça nosso compromisso com a segurança radiológica.
                    </p>
                    <Button style={{color: "#fff", backgroundColor: "#00A499", width: "150px", height: "50px"}} onClick={() => navigate("/sobre")}>Descobre aqui!</Button>
                </Col>
            </Row>
            <Row style={{marginLeft: "30px", marginRight: "30px", paddingTop: "40px", marginBottom: "30px"}}>
                <Col sm="12" md="6" lg="6" style={{marginLeft: "50px"}}>
                    <h1>Descobre mais sobre o<br /> Campus Tecnológico e Nuclear</h1>
                    <p style={{marginTop: "15px", fontSize: "20px"}}>
                        Base de Inovação Nuclear: O Campus Tecnológico e Nuclear do Técnico, em Loures, é um polo de excelência em ciências nucleares, abrigando o Reator Português de Investigação e líder em Segurança e Proteção Radiológica.
                    </p>
                    <Button style={{color: "#fff", backgroundColor: "#00A499", width: "150px", height: "50px"}} onClick={() => window.location.href = "https://tecnico.ulisboa.pt/pt/sobre-o-tecnico/campi/tecnologico-e-nuclear/"}>Descobre aqui!</Button>
                </Col>
                <Col sm="12" md="5" lg="5" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <img src={Ist} alt="Image" style={{height: '200px', overflow: 'hidden', objectFit :"cover"}}/>
                </Col>
            </Row>
            <Row style={{backgroundColor: "#00A499", justifyContent: "center", paddingTop: "30px" , paddingBottom: "30px"}}>
                <Col sm="12" md="4" lg="4" style={{display: "flex", justifyContent: "center"}}>
                    <img src={Radiacao1} alt="Image" style={{width: '200px', height: '200px', borderRadius: '50%', overflow: 'hidden', objectFit :"cover"}}/>
                </Col>
                <Col sm="12" md="4" lg="4" style={{display: "flex", justifyContent: "center"}}>
                    <img src={Radiacao2} alt="Image" style={{width: '200px', height: '200px', borderRadius: '50%', overflow: 'hidden', objectFit :"cover"}}/>
                </Col>
                <Col sm="12" md="4" lg="4" style={{display: "flex", justifyContent: "center"}}>
                    <img src={Radiacao3} alt="Image" style={{width: '200px', height: '200px', borderRadius: '50%', overflow: 'hidden', objectFit :"cover"}}/>
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default MainComponent