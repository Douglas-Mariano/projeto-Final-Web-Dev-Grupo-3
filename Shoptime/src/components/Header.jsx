import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Form, Navbar, Row } from "react-bootstrap";
import { LojaContext } from "../context/LojaContext";
import { api } from "../api/api";
import { FaMagnifyingGlass } from 'react-icons/fa6'
import Logo from '../assets/Logo.png'
import {IoPersonCircleOutline} from 'react-icons/io5'
import Cart from '../assets/Cart.png'

const Header = () => {
  const [filtroNome, setFiltroNome] = useState("");
  const [textoPesquisa, setTextoPesquisa] = useState("")

  const { setProdutos, setProdutosExibidos, produtos } = useContext(LojaContext);
  const navigate = useNavigate()

  const getProdutos = async () => {  
    const response = await api.get("/produtos");
    setProdutos(response.data);
    setProdutosExibidos((produtos.filter((prod) => prod.quantidade > 0 )))
    setTextoPesquisa('')
  };

  useEffect(() => {
    getProdutos();
    setTextoPesquisa('')
  }, []);

  const handleChangeFiltro = (e) => {
    setFiltroNome(e.target.value);
  };

  const handleChangeTexto = () => {
    setTextoPesquisa(`mostrando resultados para: ${filtroNome}`);
  };

  //tentativa de pesquisa a partir de qualquer rota
  const handleNavigateFiltro = async (e) => {
    e.preventDefault()
    navigate('/home')
    await handleFiltrar(e)
  }

  const handleFiltrar = async (e) => {
    e.preventDefault();
    const produtosFiltrados = await api.get('/produtos', {
      params: {nome_like: filtroNome}
    })
    handleChangeTexto()
    setProdutosExibidos(produtosFiltrados.data);
  };

  const handleLimparPesquisa = async (e) => {
    e.preventDefault()
    setFiltroNome('');
    setTextoPesquisa('');
    await getProdutos();
  }


  return (
    <>
      <Navbar style={{backgroundColor: 'SlateBlue', maxHeight:'80px'}} variant="dark" className="justify-content-between">
        <Form inline>
          <div style={{display:'flex'}}>
          <Link style={{ marginRight: "20px" }} to={"/home"}>
            <img style={{maxHeight:'50px'}} src={Logo} />
          </Link>
          </div>
        </Form>
        
        <Form inline>
          <Row>
            <Col xs='auto'>
              <Link to={"/"}>
                <Navbar.Brand href="#home"><IoPersonCircleOutline style={{marginTop:'20px'}} size={43}/></Navbar.Brand>
              </Link>
            </Col>
            <Col xs="auto">
              <Form.Control  style={{marginTop:'24px'}}
                type="text"
                placeholder="Search"
                className=" mr-sm-2"
                value={filtroNome}
                onChange={handleChangeFiltro}
              />
            </Col>
            <Col xs="auto">
              <Button style={{marginTop:'29px', backgroundColor:'chocolate'}} type="submit" onClick={handleNavigateFiltro}>
                <FaMagnifyingGlass/>
              </Button>
            </Col>
            <Col xs="auto">
              <Button style={{marginTop:'24px', backgroundColor:'orangered', opacity:'0.9'}} type="submit" onClick={handleLimparPesquisa}>
                Limpar Pesquisa
              </Button>
              </Col>
              <Col xs='auto'>
              <Button style={{marginTop:'24px', marginLeft:'10px', backgroundColor:'BlanchedAlmond', color:'slateblue', fontWeight:'bold'}} onClick={() => {
                navigate('/historico')
              }}>
                Meus Pedidos
              </Button>
              </Col>
              <Col xs='auto' style={{marginTop:'15px'}}>
              <Link to={'/carrinho'}><img style={{maxHeight:'50px'}} src={Cart} /></Link>
              </Col>
          </Row>
        </Form>
      </Navbar>
      <p style={{fontSize:'1.3rem' ,textAlign:'center', marginTop:'0', marginBottom:'0px', fontWeight:''}}><em>{textoPesquisa}</em></p>
    </>
  );
};
export default Header;
