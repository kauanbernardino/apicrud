import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login() {
  const [inputUsuario, setInputUsuario] = useState('');
  const [inputSenha, setInputSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const fazerLogin = async (e) => {
    e.preventDefault();

    const dadosLogin = {
      username: inputUsuario,
      password: inputSenha
    };

    try {
      // Endereço exato do seu Back-End
      const url = 'https://api-escola-hroh.onrender.com/';
      const response = await axios.post(url, dadosLogin);
      
      // Se deu certo, salva o token e entra
      localStorage.setItem('token', response.data.token);
      window.location.href = '/alunos'; 
      
    } catch (error) {
      console.log(error);
      setMensagem('Usuário ou senha incorretos!');
    }
  }

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '100px' }}>
      <div className="card shadow">
        <div className="card-body">
          <h3 className="text-center mb-4">Acesso ao Sistema</h3>
          <form onSubmit={fazerLogin}>
            <div className="form-group mb-3">
              <label>Usuário</label>
              <input 
                type="text" 
                className="form-control" 
                value={inputUsuario}
                onChange={(e) => setInputUsuario(e.target.value)}
                placeholder="Ex: admin"
              />
            </div>
            <div className="form-group mb-3">
              <label>Senha</label>
              <input 
                type="password" 
                className="form-control" 
                value={inputSenha}
                onChange={(e) => setInputSenha(e.target.value)}
                placeholder="Ex: 123"
              />
            </div>
            
            {mensagem && <div className="alert alert-danger">{mensagem}</div>}

            <button type="submit" className="btn btn-primary w-100">Entrar</button>

            <br /><br />
            
            {/* BOTÃO NOVO AQUI */}
            <Link to="/register" className="btn btn-outline-success w-100">
              Não tem conta? Crie uma agora
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;