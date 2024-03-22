URL = 'https://api-9bd93-default-rtdb.firebaseio.com/api/users.json';

const consultarApi = async () => {
    const result = await fetch(URL);
    const response = await result.json();
    return response
}

const edit = async (usuario) => {
    try {
        fetch(url, {
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

export {edit, consultarApi};