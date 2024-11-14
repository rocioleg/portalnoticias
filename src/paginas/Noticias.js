import React, { useState, useEffect } from 'react';
import { getNoticias, updateNoticia, deleteNoticia } from '../api/api';
import '../styles/Noticias.css';

const Noticias = () => {
    const [noticias, setNoticias] = useState([]);
    const [formData, setFormData] = useState({ titulo: '', fecha_publicacion: '', contenido: '', autor: '', categoria: '' });
    const [editId, setEditId] = useState(null);
    const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
    const [modalMessage, setModalMessage] = useState(''); // Estado para el mensaje del modal

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

    const handleUpdateNoticia = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                const updated = await updateNoticia(editId, formData);
                if (updated) {
                    loadNoticias();
                    setEditId(null);
                    setFormData({ titulo: '', fecha_publicacion: '', contenido: '', autor: '', categoria: '' });
                    setModalMessage('Noticia actualizada con éxito'); // Establecer el mensaje
                } else {
                    setModalMessage('No se pudo actualizar la noticia: noticia no encontrada');
                }
                setShowModal(true); // Mostrar el modal
            }
        } catch (error) {
            console.error('Error al actualizar la noticia:', error);
            setModalMessage('Error al actualizar la noticia');
            setShowModal(true); // Mostrar el modal
        }
    };

    const handleEditClick = (noticia) => {
        setEditId(noticia.id_noticia);
        setFormData({
            titulo: noticia.titulo,
            fecha_publicacion: noticia.fecha_publicacion,
            contenido: noticia.contenido,
            autor: noticia.autor,
            categoria: noticia.categoria,
        });
    };

    const handleDeleteNoticia = async (id_noticia) => {
        try {
            await deleteNoticia(id_noticia);
            loadNoticias();
            setModalMessage('Noticia eliminada con éxito'); // Establecer el mensaje
            setShowModal(true); // Mostrar el modal
        } catch (error) {
            console.error('Error al eliminar la noticia:', error);
            setModalMessage('Error al eliminar la noticia');
            setShowModal(true); // Mostrar el modal
        }
    };

    const handleCloseModal = () => {
        setShowModal(false); // Cerrar el modal
    };

    return (
        <div className="noticias-container">
            <div className="noticias-list">
                <h2 style={{ fontWeight: 'bold' }}>Lista de Noticias</h2>
                <ul>
                    {noticias.map((noticia) => (
                        <li key={noticia.id_noticia}>
                            <h3>{noticia.titulo}</h3>
                            <div className="button-group">
                                <button className="updateBtn" onClick={() => handleEditClick(noticia)}>Editar</button>
                                <button className="delete-btn" onClick={() => handleDeleteNoticia(noticia.id_noticia)}>Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="noticias-form">
                <h2 style={{ fontWeight: 'bold' }}>Editar Noticia</h2>
                <form onSubmit={handleUpdateNoticia}>
                    <input
                        type="text"
                        placeholder="Título"
                        value={formData.titulo}
                        onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                        required
                    />
                    <input
                        type="date"
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
                    <button type="submit">Actualizar Noticia</button>
                </form>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-btn" onClick={handleCloseModal}>&times;</span>
                        <p>{modalMessage}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Noticias;
