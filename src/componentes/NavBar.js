import React, { useState } from 'react';
import Inicio from '../paginas/Inicio';
import Noticias from '../paginas/Noticias';
import CargarNoticia from '../paginas/CargarNoticia';
import '../styles/NavBar.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Noticia from '../paginas/Noticia';

const NavBar = () => {
    const [searchTerm, setSearchTerm] = useState(''); // Estado global del término de búsqueda

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value); // Actualiza el término de búsqueda
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className='container'>
            <Router>
                <div>
                    <nav className="navbar navbar-expand-sm navbar-light barra">
                        <div className="container">
                            <img src="/recursos/logo.png" alt="" className="img" />
                            <div className="collapse navbar-collapse" id="collapsibleNavId">
                                <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link active" to="/" aria-current="page">Inicio</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/Noticias">Editar Noticias</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/CargarNoticia">Cargar Noticia</Link>
                                    </li>
                                </ul>
                                <form className="d-flex my-2 my-lg-0" onSubmit={handleSearchSubmit}>
                                    <input
                                        className="form-control me-sm-2 form1"
                                        type="text"
                                        placeholder="Search"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                    />
                                    <button className="btn btn-outline-success my-2 my-sm-0 btnSearch" type="submit">
                                        Search
                                    </button>
                                </form>
                            </div>
                        </div>
                    </nav>

                    {/* Rutas de la aplicación */}
                    <Routes>
                        <Route path="/" element={<Inicio searchTerm={searchTerm} />} />
                        <Route path="/Noticias" element={<Noticias />} />
                        <Route path="/CargarNoticia" element={<CargarNoticia />} />
                        <Route path="/noticia/:id_noticia" element={<Noticia />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
};

export default NavBar;
