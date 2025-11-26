import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Register() {
  const [inputUsuario, setInputUsuario] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputSenha, setInputSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [sucesso, setSucesso] = useState(false);

  const fazerRegistro = async (e) => {
    e.preventDefault();

    const dadosRegistro = {
      username: inputUsuario,
      email: inputEmail,
      password: inputSenha
    };

    try {
      const url = "https://api-escola-hroh.onrender.com/api/Auth/registrar";
      await axios.post(url, dadosRegistro);
      
      setSucesso(true);
      setMensagem('Usuário criado com sucesso! Redirecionando...');
      
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
      
    } catch (error) {
      console.log(error);
      setMensagem('Erro ao criar usuário. Tente outro nome.');
      setSucesso(false);
    }
  }

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '100px' }}>
      <div className="card shadow">
        <div className="card-body">
          <h3 className="text-center mb-4">Criar Nova Conta</h3>
          <form onSubmit={fazerRegistro}>
            <div className="form-group mb-3">
              <label>Usuário</label>
              <input type="text" className="form-control" value={inputUsuario} onChange={(e) => setInputUsuario(e.target.value)} required />
            </div>
            
            <div className="form-group mb-3">
              <label>Email</label>
              <input type="email" className="form-control" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} required />
            </div>

            <div className="form-group mb-3">
              <label>Senha</label>
              <input type="password" className="form-control" value={inputSenha} onChange={(e) => setInputSenha(e.target.value)} required />
            </div>
            
            {mensagem && (
              <div className={`alert ${sucesso ? 'alert-success' : 'alert-danger'}`}>
                {mensagem}
              </div>
            )}

            <button type="submit" className="btn btn-success w-100">Registrar</button>
            <br/><br/>
            <Link to="/" className="btn btn-outline-secondary w-100">Voltar para Login</Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;