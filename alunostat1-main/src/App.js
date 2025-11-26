import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Alunos from './Alunos';
import Disciplinas from './Disciplinas';
import Login from './Login';
import Register from './Register'; // <--- IMPORTANTE
import './App.css';

function App() {
  
  const Menu = () => {
    // Esconde o menu se estiver no Login OU no Registro
    const rotaAtual = window.location.pathname;
    if (rotaAtual === '/' || rotaAtual === '/register') return null;
    
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4" style={{padding: "10px"}}>
        <a className="navbar-brand" href="#">Minha Escola</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item"><Link className="nav-link" to="/alunos">Alunos</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/disciplinas">Disciplinas</Link></li>
          </ul>
          <button className="btn btn-outline-danger btn-sm" onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/';
          }}>Sair</button>
        </div>
      </nav>
    );
  }

  return (
    <BrowserRouter>
      <div className="container">
        <Menu />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} /> {/* NOVA ROTA */}
          <Route path="/alunos" element={<Alunos />} />
          <Route path="/disciplinas" element={<Disciplinas />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;