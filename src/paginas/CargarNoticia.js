import React, { useState } from 'react';
import { createNoticia } from '../api/api';
import '../styles/CargarNoticia.css'; // Importamos el archivo CSS

const CargarNoticia = () => {
    const [formData, setFormData] = useState({ titulo: '', fecha_publicacion: '', contenido: '', autor: '', categoria: '' });
    const [showModal, setShowModal] = useState(false);

    const handleCreateNoticia = async (e) => {
        e.preventDefault();
        try {
            await createNoticia({
                titulo: formData.titulo,
                fecha_publicacion: formData.fecha_publicacion,
                contenido: formData.contenido,
                autor: formData.autor,
                categoria: formData.categoria
            });
            setFormData({ titulo: '', fecha_publicacion: '', contenido: '', autor: '', categoria: '' }); // Limpiar formulario
            setShowModal(true);
        } catch (error) {
            console.error('Error al crear la noticia:', error);
        }
    };

    const closeModal = () => setShowModal(false);

    return (
        <div className="cargar-noticia-container">
            <h1 style={{fontWeight: 'bold'}}>Cargar Noticia</h1>
            <form onSubmit={handleCreateNoticia} className="noticia-form">
                <input
                    type="text"
                    placeholder="Título"
                    value={formData.titulo}
                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                    required
                />
                <input
                    type="date"
                    placeholder="Fecha"
                    value={formData.fecha_publicacion}
                    onChange={(e) => setFormData({ ...formData, fecha_publicacion: e.target.value })}
                    required
                />
                <textarea
                    placeholder="Contenido"
                    value={formData.contenido}
                    onChange={(e) => setFormData({ ...formData, contenido: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Autor"
                    value={formData.autor}
                    onChange={(e) => setFormData({ ...formData, autor: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Categoría"
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                    required
                />
                <button type="submit" className="btn-crear">Crear Noticia</button>
            </form>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content container">
                        <h2>¡Noticia creada con éxito!</h2>
                        <button onClick={closeModal} className="btn-cerrar">Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CargarNoticia;
