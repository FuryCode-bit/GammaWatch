import React, { useEffect, useState } from 'react'
import api from '../../api/api';
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

export default function TabelaSensores({ estacao, sensoresLista, navigateSensor, setSensorID }) {

  const funnyFun = (IDE, IDS) => {
    setSensorID(IDS)
    navigateSensor(IDE, IDS)
  }

  if (!sensoresLista || sensoresLista.length === 0) {
    return <div>A carregar dados...</div>; // Or handle the loading state appropriately
  }

  return (
    <TableContainer component={Paper} style={{ backgroundColor: 'lightgray' }}>
      <Table sx={{ Width: 650, maxHeight: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Modelo</TableCell>
            <TableCell align="center">Frequencia Leitura</TableCell>
            <TableCell align="center">Sensibilidade</TableCell>
            <TableCell align="center">Gama</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sensoresLista.map((row) => (
            <TableRow key={row.IDS} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row" align="center">
                {row.modelo}
              </TableCell>
              <TableCell align="center">{row.frequencia}</TableCell>
              <TableCell align="center">{`[${row.min_sensibilidade}, ${row.max_sensibilidade}]`}</TableCell>
              <TableCell align="center">{`[${row.min_gama_radiacao}, ${row.max_gama_radiacao}]`}</TableCell>
              <TableCell align="center">
                <Button style={{ width: "120px", height: "40px", textAlign: "center" }} onClick={() => funnyFun(row.IDE, row.IDS)}>
                  Detalhes📎
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}