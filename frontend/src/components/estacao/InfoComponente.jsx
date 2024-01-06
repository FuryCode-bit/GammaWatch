import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap'; // Importe os componentes necessários aqui

const InfoComponent = ({ estacao }) => {

  const getTipoEstacao = (tipo) => {
      if (tipo == 1) {
        return "Permanente"
      } else if (tipo == 2) {
        return "Permanente-submersa"
      } else if (tipo == 3) {
        return "Móvel"
      } else if (tipo == 4) {
        return "Móvel-submersa"
    };
  }

  const [data, setData] = useState({
    localizacao: '',
    latitude: '',
    longitude: '',
    codigoPostal: '',
    dataInstalacao: '',
    tipo: '',
  });

  useEffect(() => {
    setData({
      localizacao: estacao.localizacao || '',
      latitude: estacao.latitude || '',
      longitude: estacao.longitude || '',
      "codigo Postal": estacao.codigoPostal || '',
      "Data Instalaçao": estacao.data_instalacao || '',
      tipo: getTipoEstacao(estacao.tipo) || '',
    });
  }, [estacao]);

  return (
    <>
      <h3>Informações sobre a Estação</h3>
      {Object.entries(data).map(([key, value]) => (
        <Row key={key} style={{ display: 'flex' }}>
          <Col md="5" lg="5">
            <h5>{`${key.charAt(0).toUpperCase()}${key.slice(1)}: `}</h5>
          </Col>
          <Col md="7" lg="7" style={{ textAlign: 'left' }}>
            <p>{value}</p>
          </Col>
        </Row>
      ))}
    </>
  );
};

export default InfoComponent;