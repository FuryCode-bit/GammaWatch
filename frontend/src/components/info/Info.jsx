import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import api from '../../api/api';
import axios from "axios";
import Mapa from "./../../static/mapa.png"

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

function InfoComponent() {
  
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [userTeams, setUserTeams] = useState([]);
  
  return (
    <>
      <Container>
        <Row>
          <h2 style={{color: "#EB8513"}}>Radioatividade</h2>
          <p>
            A radioatividade não é um fenómeno recente, nem resulta exclusivamente da ação antropogénica. Com efeito, a Terra sempre esteve sujeita à radiação cósmica e da sua constituição sempre fizeram parte alguns radionuclídeos (forma instável de um nuclídeo que liberta energia sob a forma de radiação ionizante para atingir a estabilidade). 
            Atualmente, e após a descoberta da radioatividade, com consequente utilização em várias áreas de atividade, os radionuclídeos presentes no ambiente poderão ter origem natural ou antropogénica. Resultam, basicamente, de quatro fontes principais:
          </p>
          <ul>
            <li>
              Formação de radionuclídeos cosmogénicos, como por exemplo o berílio, 7Be, através da interação da radiação cósmica com gases atmosféricos como o carbono, o azoto e o oxigénio;
            </li>
            <li>
              Radioatividade natural tecnologicamente aumentada, resultante da utilização industrial de matérias-primas que contêm radionuclídeos naturais;
            </li>
            <li>
              Radionuclídeos artificiais, produtos de cisão e ativação, em virtude de atividades antropogénicas (testes nucleares, produção de energia elétrica por via nuclear, produção de radioisótopos, acidentes, entre outros).
            </li>
          </ul>
          <p>
            Independentemente da sua origem, os radionuclídeos podem ocorrer na atmosfera na forma gasosa ou particulada (associados ao aerossol atmosférico). Em geral, a forma particulada é a que representa maior risco radiológico, uma vez que essas partículas interagem com a biosfera, através de processos de transporte e deposição atmosférica.
          </p>
            A exposição do homem à radioatividade pode afetar a sua saúde, nomeadamente através de alterações genéticas e aparecimento de diversos tipos de neoplasias (leucemia, cancros do pulmão, pele e estômago, entre outros). A exposição pode ser direta (nomeadamente por exposição do ser humano à fonte de radiação) ou por via indireta devido à introdução acidental daquelas substâncias no ambiente (ar, água, solo, alimentos).
          <p>    
            Em Portugal, a vigilância radiológica do ambiente é da competência da Agência Portuguesa do Ambiente (APA) e é realizada através de programas de monitorização elaborados para avaliar a presença de radionuclídeos artificiais e naturais em compartimentos ambientais (atmosférico, aquático e terrestre), que constituem vias diretas de contaminação para o Homem. 
          </p>    
            Portugal mantém operacional, desde 1989, uma <b style={{color: "#EB8513"}}>Rede de Alerta de Radioatividade no Ambiente (RADNET)</b> em funcionamento contínuo e capaz de detetar situações de aumento anormal de radioatividade no ambiente. Nos últimos anos foram substituídas as estações mais antigas da RADNET por versões mais recentes com capacidade de, para além da medição dos débitos de dose de radiação gama, identificar também os radionuclídeos presentes no ambiente, permitindo discernir melhor a potencial origem de qualquer aumento não expectável da radioatividade e aumentando a sensibilidade da rede.
            <p>        
            Esta rede, medindo em contínuo a radiação gama no ar, em aerossóis e na água dos rios internacionais (Tejo, Douro e Guadiana), integra várias estações de medição distribuídas pelo território continental e regiões autónomas, com o pressuposto de garantir uma boa cobertura da zona da fronteira com Espanha, dos grandes centros populacionais de Portugal e de locais relevantes para o trânsito de matérias radioativas. Conta atualmente com 23 estações para medição da radiação no ambiente.
            </p>
            <p>       
            Em caso de necessidade, esta rede pode ser complementada com uma estação instalada num veículo e cinco estações portáteis, que podem ser instaladas temporariamente em qualquer local do território, todas elas com capacidade para medição dos débitos de dose de radiação gama.
            </p>
            <p>      
            A rede conta também com três estações para a monitorização de aerossóis e iodo radioativos instaladas em Vila Real, Abrantes e Évora, permitindo a expansão e diversificação desta rede. Logo que se encontre concluída a fase de testes, os valores destas novas estações serão disponibilizados ao público tal como já acontece para as restantes estações.
            </p>
            <p>     
            Encontram-se, ainda, em fase de instalação, duas novas estações de monitorização da radioatividade no ar e uma outra para monitorização da radioatividade na água.
            </p>
            <p>      
            A rede mede em contínuo a radiação gama no ambiente e na água, acionando alarmes quando os níveis de radiação medidos são superiores a limiares predefinidos. Nesses casos, o alarme recebido na unidade central acionará os sistemas automáticos, sonoros e visuais, instalados na APA, a quem compete a gestão da RADNET.
          </p>
        </Row>   
        <Row style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          <img src={Mapa} alt="Image" style={{width: "80%", overflow: 'hidden'}}/>
        </Row>
      </Container>
    </>
  )
}

export default InfoComponent