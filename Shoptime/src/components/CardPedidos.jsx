import { useContext, useEffect, useState } from 'react';
import { Button, Card, Container, Modal, Table } from 'react-bootstrap';
import { LojaContext } from '../context/LojaContext';

const CardPedidos = ({pedido}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {produtos} = useContext(LojaContext)

    useEffect(() => {
      console.log(pedido)

    },[])

    

  return(
    <div>
    <Card key={pedido.id} className="mb-3" style={{ width: '50%', minWidth: '300px' }}>
        <Card.Body>
        <Card.Title>Data: </Card.Title>
        <Card.Text>Número do Pedido: {pedido.id}</Card.Text>
        <Card.Text>Valor Total: R$ {pedido.valorTotal.toFixed(2)}</Card.Text>
        <Button variant="primary" style={{backgroundColor: 'purple'}} onClick={handleShow}>Ver mais</Button>
    </Card.Body>
    </Card>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Produtos do pedido de número: {pedido.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <div style={{minHeight:'100vh', display: 'flex',
        flexDirection: 'column'}}>
      <Container style={{ padding:"2rem"}} className="d-flex justify-content-center align-items-center flex-grow-1">
        <Card className="w-75 p-3" style={{ backgroundColor: 'white', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
        <h3 className="font-weight-bold mb-4">PEDIDO</h3>
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h5 className="font-weight-bold">Nome do Usuário</h5>
          </div>
          <Table striped bordered hover style={{ color: 'black' }}>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Valor Unitário</th>
              </tr>
            </thead>
            <tbody>
            {pedido.itens.map((item, index) => {
              const produto = produtos.find((prod) => prod.id == item.idProduto)
              return(
              <tr key={index + 1}>
                <td>{produto.nome}</td>
                <td>{item.quantidade}</td>
                <td>R$ {produto.preco}</td>
              </tr> 
              )})}

            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4" className="text-end font-weight-bold">Valor Total</td>
                <td className="font-weight-bold">R$ {pedido.valorTotal.toFixed(2)}</td>
              </tr>
            </tfoot>
          </Table>
        </Card>
      </Container>
    </div>
            
        </Modal.Body>

        <Modal.Footer>
            <p><b>Valor total:</b> R${pedido.valorTotal.toFixed(2)}</p>
        </Modal.Footer>
    </Modal>
  </div>
  )
}
export default CardPedidos
