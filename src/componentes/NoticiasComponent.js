import React, { useEffect, useState } from 'react';
import { getNoticias, createNoticia, updateNoticia, deleteNoticia } from '../api/api'; 

const NoticiasComponent = () => {
    const [noticias, setNoticias] = useState([]);
    const [formData, setFormData] = useState({ titulo: '', fecha_publicacion: '', contenido: '', autor: '', categoria: '' });
    const [editId, setEditId] = useState(null);

    // Obtener noticias al cargar el componente
    useEffect(() => {
        loadNoticias();
    }, []);

    // Función para cargar las noticias desde la API
    const loadNoticias = async () => {
        try {
            const data = await getNoticias();
            setNoticias(data);
        } catch (error) {
            console.error('Error al cargar las noticias:', error);
        }
    };

    // Crear una nueva noticia
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
            loadNoticias(); 
            setFormData({ titulo: '', fecha_publicacion: '', contenido: '', autor: '', categoria: '' }); // Limpiar formulario
        } catch (error) {
            console.error('Error al crear la noticia:', error);
        }
    };

    // Actualizar una noticia
    const handleUpdateNoticia = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await updateNoticia(editId, formData);
                loadNoticias(); 
                setEditId(null);
                setFormData({ titulo: '', fecha_publicacion: '', contenido: '', autor: '', categoria: '' }); // Limpiar formulario
            }
        } catch (error) {
            console.error('Error al actualizar la noticia:', error);
        }
    };

    // Eliminar una noticia
    const handleDeleteNoticia = async (id_noticia) => {
        try {
            await deleteNoticia(id_noticia);
            loadNoticias(); // Recargar las noticias después de eliminar
        } catch (error) {
            console.error('Error al eliminar la noticia:', error);
        }
    };

    // Rellenar el formulario para editar
    const handleEditClick = (noticia) => {
        setEditId(noticia.id_noticia);
        setFormData({
            titulo: noticia.titulo,
            fecha_publicacion: noticia.fecha_publicacion, 
            contenido: noticia.contenido,
            autor: noticia.autor,
            categoria: noticia.categoria
        });
    };

    return (
        <div>
            <h1>Noticias</h1>
            {/* Formulario para crear o actualizar una noticia */}
            <form onSubmit={editId ? handleUpdateNoticia : handleCreateNoticia}>
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
                    value={formData.fecha}
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
                <button type="submit">{editId ? 'Actualizar Noticia' : 'Crear Noticia'}</button>
            </form>

            {/* Lista de noticias */}
            <ul>
                {noticias.map((noticia) => (
                    <li key={noticia.id_noticia}>
                        <h2>{noticia.titulo}</h2>
                        <p>{noticia.contenido}</p>
                        <p><strong>Autor:</strong> {noticia.autor}</p>
                        <p><strong>Fecha:</strong> {noticia.fecha_publicacion}</p>
                        <button onClick={() => handleEditClick(noticia)}>Editar</button>
                        <button onClick={() => handleDeleteNoticia(noticia.id_noticia)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NoticiasComponent;

