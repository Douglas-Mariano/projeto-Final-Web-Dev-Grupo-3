import { useContext } from "react";
import { api } from "../../api/api";
import CardProdutos from "../../components/CardProdutos";
import { Container, Row } from "react-bootstrap";
import { LojaContext } from "../../context/LojaContext";
import FundoSem from '../../assets/FundoSem.png'

const Listagem = () => {

  const {produtos, setProdutos} = useContext(LojaContext)

  const getProdutos = async () => {
      const response = await api.get('/produtos')
      setProdutos(response.data)
  }

  return (

      <div style={{backgroundImage: `url(${FundoSem})`, minHeight:'100vh', display: 'flex',
        flexDirection: 'column'}}>
        <Container className="d-flex justify-content-between flex-wrap" >
          {produtos.map(
              ({  id, nome, preco, quantidade, descricao, favoritos, imgurl}) => (
                <Row key={id} xs={id} md={3} className="g-4">
                  <CardProdutos
                      
                      nome={nome}
                      descricao={descricao}
                      id={id}
                      getProdutos={getProdutos}
                      favoritos={favoritos}
                      quantidade={quantidade}
                      preco={preco}
                      imgurl={imgurl}                
                  />
                </Row>
              )
          )}
        </Container>   
      </div>
  )
}
export default Listagem