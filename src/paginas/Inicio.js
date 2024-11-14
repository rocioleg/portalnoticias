import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  // Importar Link de react-router-dom
import { getNoticias } from '../api/api';
import '../styles/Inicio.css';

const Inicio = ({ searchTerm }) => {
    const [noticias, setNoticias] = useState([]);

    // Obtener noticias al cargar el componente
    useEffect(() => {
        loadNoticias();
    }, []);

    const loadNoticias = async () => {
        try {
            const data = await getNoticias();
            setNoticias(data);
        } catch (error) {
            console.error('Error al cargar las noticias:', error);
        }
    };

    // Filtrar noticias según el término de búsqueda
    const filteredNoticias = noticias.filter((noticia) =>
        noticia.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="i-body">
            <h1>Noticias</h1>
            <ul>
                {filteredNoticias.map((noticia) => (
                    <li key={noticia.id_noticia}>
                        <Link to={`/noticia/${noticia.id_noticia}`}>
                            <h2>{noticia.titulo}</h2>
                        </Link>
                        <p><strong>Autor:</strong> {noticia.autor}</p>
                        <p><strong>Fecha:</strong> {noticia.fecha_publicacion}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Inicio;
