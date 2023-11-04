
import { api } from "../api/api";
import { Link } from "react-router-dom";
import { Button, Card, Col } from "react-bootstrap";
import { LojaContext } from "../context/LojaContext";
import { useContext } from "react";


const CardProdutos = ({ id, nome, favoritos, imgurl, preco }) => {
  const {setProdutos} = useContext(LojaContext)
  
  const getProdutos = async () => {
    const response = await api.get(`/produtos`)
    setProdutos(response.data)
  }

  const handleLike = async () => {
    console.log(id)
    await api.patch(`/produtos/${id}`, { favoritos: favoritos + 1 })
    getProdutos()
  }

    return (
          <Col key={id}>
            <Card style={{ width: '20rem', margin:'2rem', height:'20rem' }}>
              <Card.Img style={{maxHeight:'10rem', maxWidth:'10rem'}} variant="top" src={imgurl} />
              <span style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                <Button variant="success">🛒</Button>

                <Button onClick={handleLike} variant="danger">❤️{favoritos}</Button>

                <Link to={`/produto/${id}`}><Button variant="primary">Ver mais</Button>
                </Link>
              </span>
              <Card.Body>
                <Card.Title>{nome}</Card.Title>
                <Card.Text>R$ {preco}</Card.Text>
              </Card.Body>
            </Card>
          </Col>

      )
}

export default CardProdutos