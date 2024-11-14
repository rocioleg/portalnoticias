import React, { useState, useEffect } from 'react';
import { getNoticias } from '../api/api';

const ListNoticias = () => {
    const [noticias, setNoticias] = useState([]);

    useEffect(() => {
        getNoticias()
            .then(setNoticias)
            .catch(console.error);
    }, []);

    return (
        <div>
            {noticias.map((noticia, index) => (
                <div key={index} className="noticia">
                    <h3>{noticia.titulo}</h3> {/* Suponiendo que la noticia tiene un título */}
                    <p>{noticia.contenido}</p> {/* Suponiendo que la noticia tiene una descripción */}
                    <small>{noticia.fecha_publicacion}</small> {/* Suponiendo que la noticia tiene una fecha */}
                </div>
            ))}
        </div>
    );
};

export default ListNoticias;
