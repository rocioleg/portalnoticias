import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getNoticiaById } from '../api/api';
import '../styles/Noticia.css';

const Noticia = () => {
    const { id_noticia } = useParams();
    const [noticia, setNoticia] = useState(null);

    useEffect(() => {
        loadNoticia();
    }, [id_noticia]);

    const loadNoticia = async () => {
        try {
            const data = await getNoticiaById(id_noticia);
            setNoticia(data);
        } catch (error) {
            console.error('Error al cargar la noticia:', error);
        }
    };

    return (
        <div className="noticia-body">
            {noticia ? (
                <>
                    <h1>{noticia.titulo}</h1>
                    <p>{noticia.contenido}</p>
                    <p><strong>Autor:</strong> {noticia.autor}</p>
                    <p><strong>Fecha:</strong> {noticia.fecha_publicacion}</p>
                    <p><strong>Categoría:</strong> {noticia.categoria}</p>
                </>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
};

export default Noticia;
