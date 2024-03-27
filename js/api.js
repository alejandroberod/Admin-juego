URL = 'https://api-9bd93-default-rtdb.firebaseio.com/api/users';

const consultarApi = async () => {
    const result = await fetch(`${URL}.json`);
    const response = await result.json();
    return response
}

const edit = async (usuario) => {
    try {
        fetch(`${URL}.json`, {
            method: 'POST',
            body: JSON.stringify(usuario),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          console.log(usuario);
    } catch (error) {
        console.log(error);
    }
}

const obtenerUser = async (id) => {
    try {
        const result = await fetch(`${URL}/${id}.json`)     ;
        const response = await result.json();
        return response;
    } catch (error) {
        console.log(error)
    }
}

export {edit, consultarApi, obtenerUser};