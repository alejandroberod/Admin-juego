import { consultarApi, edit } from "./api.js";
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

}


function visualizarUser(e) {
    const info = e.target.parentElement.parentElement.parentElement;
    
    form.querySelector('.img').value = info.querySelector('.img').textContent;
    form.querySelector('.nickname').value = info.querySelector('.nickname').textContent;
    form.querySelector('.nombre').value = info.querySelector('.nombre').textContent;
    form.querySelector('.valor').value = info.querySelector('.valor').textContent;

}

function editUser(user) {
    console.log('edit')
}

function deleteUser(user) {
    console.log('delete')
}