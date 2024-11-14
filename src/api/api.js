const apiUrl = 'http://localhost/portalnoticias/api/route.php';

// Obtener todas las noticias
export const getNoticias = async () => {
    const response = await fetch(`${apiUrl}?option=list_noticias`);
    const result = await response.json();
  
    if (result.status === 200) {
        return result.data; 
    } else {
        throw new Error('Error al cargar las noticias');
    }
};

// Crear una nueva noticia
export const createNoticia = async (noticia) => {
    const response = await fetch(`${apiUrl}?option=create_noticia`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(noticia)
    });
    const result = await response.json();

    if (result.status === 201) {
        return result.message;
    } else {
        throw new Error('Error al crear la noticia');
    }
};

// Actualizar una noticia existente
export const updateNoticia = async (id, noticia) => {
    const response = await fetch(`${apiUrl}?option=update_noticia`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...noticia })
    });
    const result = await response.json();

    if (result.status === 200) {
        return result.message;
    } else {
        throw new Error('Error al actualizar la noticia');
    }
};

// Eliminar una noticia
export const deleteNoticia = async (id) => {
    const response = await fetch(`${apiUrl}?option=delete_noticia`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id })
    });
    const result = await response.json();

    if (result.status === 200) {
        return result.message;
    } else {
        throw new Error('Error al eliminar la noticia');
    }
};

// Obtener una noticia por ID
export const getNoticiaById = async (id_noticia) => {
    const response = await fetch(`${apiUrl}?option=get_noticia&id_noticia=${id_noticia}`);
    const result = await response.json();

    if (result.status === 200) {
        return result.data;
    } else {
        throw new Error('Error al obtener la noticia');
    }
};
