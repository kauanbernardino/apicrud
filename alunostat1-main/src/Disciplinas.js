import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import logoCadastro from './assets/cadastro.png';

function Disciplinas() {
  
  const baseUrl = "https://api-escola-hroh.onrender.com/api/Disciplinas";

  const [data, setData] = useState([]);
  const [modalIncluir, setModalIncluir] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);

  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState({
    id: '',
    descricao: '' 
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setDisciplinaSelecionada({
      ...disciplinaSelecionada,
      [name]: value
    });
  }

  const abrirFecharModalIncluir = () => setModalIncluir(!modalIncluir);
  const abrirFecharModalEditar = () => setModalEditar(!modalEditar);
  const abrirFecharModalExcluir = () => setModalExcluir(!modalExcluir);

  const selecionarDisciplina = (disciplina, caso) => {
    setDisciplinaSelecionada(disciplina);
    (caso === "Editar") ? abrirFecharModalEditar() : abrirFecharModalExcluir();
  }

  const pedidoGet = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      }).catch(error => console.log(error));
  }

  const pedidoPost = async () => {
    delete disciplinaSelecionada.id;
    await axios.post(baseUrl, disciplinaSelecionada)
      .then(response => {
        setData(data.concat(response.data));
        abrirFecharModalIncluir();
      }).catch(error => console.log(error));
  }

  const pedidoPut = async () => {
    await axios.put(baseUrl + "/" + disciplinaSelecionada.id, disciplinaSelecionada)
      .then(response => {
        var dadosAuxiliar = data;
        dadosAuxiliar.map(elemento => {
          if (elemento.id === disciplinaSelecionada.id) {
            // CORRIGIDO AQUI: Atualiza descricao, não nome
            elemento.descricao = disciplinaSelecionada.descricao;
          }
        });
        abrirFecharModalEditar();
        pedidoGet();
      }).catch(error => console.log(error));
  }

  const pedidoDelete = async () => {
    await axios.delete(baseUrl + "/" + disciplinaSelecionada.id)
      .then(response => {
        setData(data.filter(elemento => elemento.id !== disciplinaSelecionada.id));
        abrirFecharModalExcluir();
      }).catch(error => console.log(error));
  }

  useEffect(() => {
    pedidoGet();
  }, [])

  return (
    <div className="container">
      <br />
      <h3>Cadastro de Disciplinas</h3>
      <header>
        <img src={logoCadastro} alt="Cadastro" style={{ maxHeight: "50px", marginRight: "10px" }} />
        <button className="btn btn-success" onClick={() => abrirFecharModalIncluir()}>Incluir Nova Disciplina</button>
      </header>
      <br />
      
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Descrição</th>
            <th>Operação</th>
          </tr>
        </thead>
        <tbody>
          {data.map(disciplina => (
            <tr key={disciplina.id}>
              <td>{disciplina.id}</td>
              
              {/* --- CORREÇÃO 1: AQUI MOSTRAVA NOME, AGORA MOSTRA DESCRICAO --- */}
              <td>{disciplina.descricao}</td> 
              
              <td>
                <button className="btn btn-primary" onClick={() => selecionarDisciplina(disciplina, "Editar")}>Editar</button> {"  "}
                <button className="btn btn-danger" onClick={() => selecionarDisciplina(disciplina, "Excluir")}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* --- MODAL INCLUIR --- */}
      <Modal isOpen={modalIncluir}>
        <ModalHeader>Incluir Disciplina</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Descrição: </label>
            
            {/* --- CORREÇÃO 2: O NAME TEM QUE SER DESCRICAO PARA O HANDLECHANGE FUNCIONAR --- */}
            <input type="text" className="form-control" name="descricao" onChange={handleChange} />
            
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => pedidoPost()}>Incluir</button>{"   "}
          <button className="btn btn-danger" onClick={() => abrirFecharModalIncluir()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      {/* --- MODAL EDITAR --- */}
      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Disciplina</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID: </label>
            <input type="text" className="form-control" readOnly value={disciplinaSelecionada && disciplinaSelecionada.id} />
            <br />
            <label>Descrição: </label>
            
            {/* --- CORREÇÃO 3: NAME E VALUE CORRIGIDOS --- */}
            <input type="text" className="form-control" name="descricao" onChange={handleChange} value={disciplinaSelecionada && disciplinaSelecionada.descricao} />
            
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => pedidoPut()}>Salvar</button>{"   "}
          <button className="btn btn-danger" onClick={() => abrirFecharModalEditar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalExcluir}>
        <ModalBody>
          Confirma a exclusão da disciplina: {disciplinaSelecionada && disciplinaSelecionada.descricao} ?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => pedidoDelete()}>Sim</button>
          <button className="btn btn-secondary" onClick={() => abrirFecharModalExcluir()}>Não</button>
        </ModalFooter>
      </Modal>

    </div>
  );
}

export default Disciplinas;