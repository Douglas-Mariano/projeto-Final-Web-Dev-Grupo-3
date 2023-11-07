import React, { useEffect, useContext, useState } from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CardPedidos from "../../components/CardPedidos";
import { LojaContext } from "../../context/LojaContext";
import { useNavigate } from "react-router-dom";
import Fundo from '../../assets/Fundo.png'
import CustomAlertError from '../../components/CustomAlertError'

const HistoricoPedidos = () => {
  const { pedidos, usuarioLogado, setPedidos } = useContext(LojaContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!usuarioLogado.nome){
    //  alert('Faça o login para ver seus pedidos feitos!')
    CustomAlertError('Faça o login', 'para ver seus pedidos!')
      navigate('/')
    }
  }, []);
  

  return (
    <Container style={{backgroundImage: `url(${Fundo})`}} fluid className="p-0 vh-100 d-flex flex-column bg-light">
      <Container>
        <h3  style={{display:'flex', justifyContent:'center', margin:'10px'}} >Histórico de Pedidos</h3>
        <div style={{ display: "flex", maxWidth: "1440px", flexWrap: "wrap" }}>
          {pedidos.map((pedido) => (
            <CardPedidos pedido={pedido} />
          ))}
        </div>
      </Container>
    </Container>
  );
};

export default HistoricoPedidos;
