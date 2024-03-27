import { consultarApi, obtenerUser, edit } from "./api.js";
//Variables
const tbody = document.querySelector('.table tbody');
const modalBody = document.querySelector('modal-body');
const form = document.querySelector('#form');

//Eventos
document.addEventListener('DOMContentLoaded', () => {
    leerApi();
})


async function leerApi() {
    const users = await consultarApi();
    users.forEach(user => {
        const {id, img, nickname, nombre, valor} = user;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="id">${id}</td>
            <td class="img">${img}</td>
            <td class="nickname">${nickname}</td>
            <td class="nombre">${nombre}</td>
            <td class="valor">${valor}</td>
            <td>
                <div class="btn-group" role="group" aria-label="Basic mixed styles example"> 
                    <button type="button" class="btn btn-success view" data-bs-toggle="modal" data-bs-target="#exampleModal" id="${id}">Ver</button> 
                    <button type="button" class="btn btn-warning edit" data-bs-toggle="modal" data-bs-target="#exampleModal" id="${id}"">Editar</button>
                    <button type="button" class="btn btn-danger delete" data-bs-toggle="modal" data-bs-target="#exampleModal" id="${id}"">Eliminar</button>
                </div
            ></td>
        `
        
        tbody.appendChild(tr);
    });
    document.querySelectorAll('.view').forEach(view => {
        view.addEventListener('click', visualizarUser)
    })
    document.querySelectorAll('.edit').forEach(view => {
        view.addEventListener('click', visualizarUser)
    })

}


async function visualizarUser(e) {
    const id = +e.target.id;
    const user = await obtenerUser(id);
    const {img, nickname, nombre, valor} = user;

    const inputImg = form.querySelector('.img');
    const inputNickname = form.querySelector('.nickname');
    const inputNombre = form.querySelector('.nombre');
    const inputValor = form.querySelector('.valor');
    const btn = document.querySelector('.modal-content .btn-primary')

    //Se rellena el formulario
    inputImg.value = img;
    inputNickname.value = nickname;
    inputNombre.value = nombre;
    inputValor.value = valor;

    //Se bloquea los inputs en caso de ser necesario
    if(e.target.classList.contains('view')) {
        btn.style.display = 'none'; //Se elimina el botón de guardar
        inputImg.disabled = true;
        inputNickname.disabled = true;
        inputNombre.disabled = true;
        inputValor.disabled = true;
        return;
    } 
    
    //!OPTIMIZAR¡
    btn.style.display = 'inline-block';
    inputImg.disabled = false;
    inputNickname.disabled = false;
    inputNombre.disabled = false;
    inputValor.disabled = false;

    validarUser(user);

}

function validarUser(user) {
    
}

