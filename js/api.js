URL = 'https://api-9bd93-default-rtdb.firebaseio.com/api/users';

const consultarApi = async () => {
    const result = await fetch(`${URL}.json`);
    const response = await result.json();
    return response
}

const editUser = async (usuario) => {
    try {
        const id = usuario.id-1;
        await fetch(`${URL}/${id}.json`, {
            method: 'PUT',
            body: JSON.stringify(usuario),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        console.log(error);
    }
}

const obtenerUser = async (id) => {
    try {
        const idModified = id-1; 
        const result = await fetch(`${URL}/${idModified}.json`)     ;
        const response = await result.json();
        return response;
    } catch (error) {
        console.log(error)
    }
}

const deleteUser = async (id) => {
    try {
        const idModified = id-1;
        await fetch(`${URL}/${idModified}.json`, {
            method: 'DELETE'
        })
    } catch (error) {
        console.log(error)
    }
}

export {editUser, consultarApi, obtenerUser, deleteUser};