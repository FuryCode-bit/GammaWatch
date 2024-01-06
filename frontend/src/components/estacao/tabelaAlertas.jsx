import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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


export default function TabelaAlertas({alertasLista}) {

    const [filteredObjects, setFilteredObjects] = useState([]);

    useEffect(() => {
      if (alertasLista && alertasLista.length > 0) {
        const filteredList = [alertasLista[0]]; // Add the first element since there's no previous to compare
  
        for (let i = 1; i < alertasLista.length; i++) {
          if (alertasLista[i].valor >= alertasLista[i - 1].valor) {
            filteredList.push(alertasLista[i]);
          }
        }
  
        setFilteredObjects(filteredList);
      }
    }, [alertasLista]);

  return (
    <TableContainer component={Paper} style={{ backgroundColor: 'lightgray' }}>
      <Table sx={{ Width: 650, maxHeight: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Valor medido</TableCell>
            <TableCell align="center">Hora</TableCell>
            <TableCell align="center">Dia</TableCell>
            <TableCell align="center">Classificação</TableCell>
            <TableCell align="center">Acções Tomadas</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredObjects.map((row) => (
            <TableRow key={row.hora} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row" align="center">
                {row.valor}
              </TableCell>
              <TableCell align="center">{row.dia}</TableCell>
              <TableCell align="center">{row.hora}</TableCell>
              <TableCell align="center">{row.IDNR - 1}</TableCell>
              <TableCell align="center">{row.descricao_accao_list}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}