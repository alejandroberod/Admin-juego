import { consultarApi, obtenerUser, editUser, deleteUser } from "./api.js";
//Variables
const listadoClientes = document.querySelector('#listado-clientes');
const form = document.querySelector('#form');
const inputImg = form.querySelector('.img');
const inputNickname = form.querySelector('.nickname');
const inputNombre = form.querySelector('.nombre');
const inputValor = form.querySelector('.valor');
const inputId = form.querySelector('.id');
const btn = document.querySelector('.modal-content .btn-primary');


//Eventos
document.addEventListener('DOMContentLoaded', () => {
    leerApi();
})
btn.addEventListener('click', validarUser);


async function leerApi() {
    const usersWithNull = await consultarApi();
    const users = usersWithNull.filter(user => user != null);
    users.forEach(user => {
        const {id, img, nickname, nombre, valor} = user;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td data-label="#" class="id">${id}</td>
            <td data-label="Img" class="img">${img}</td>
            <td data-label="Nickname" class="nickname">${nickname}</td>
            <td data-label="Nombre" class="nombre">${nombre}</td>
            <td data-label="Valor" class="valor">${valor}</td>
            <td data-label="Acciones" class="acciones">
                <div class="btn-group" role="group" aria-label="Basic mixed styles example"> 
                    <a href="#" class="view" data-bs-toggle="modal" data-bs-target="#exampleModal" id="${id}"">Ver</a>
                    <a href="#" class="editar" data-bs-toggle="modal" data-bs-target="#exampleModal" id="${id}"">Editar</a>
                    <a href="#" class="eliminar">Eliminar</a>
                </div
            ></td>
        `
        
        listadoClientes.appendChild(tr);
    });
    document.querySelectorAll('.view').forEach(view => {
        view.addEventListener('click', visualizarUser)
    })
    document.querySelectorAll('.editar').forEach(edit => {
        edit.addEventListener('click', visualizarUser)
    })
    document.querySelectorAll('.eliminar').forEach(delt => {
        delt.addEventListener('click', deltUser)
    })

}


async function visualizarUser(e) {
    const id = +e.target.id;
    const user = await obtenerUser(id);
    const {img, nickname, nombre, valor} = user;

    //Se rellena el formulario
    inputImg.value = img;
    inputNickname.value = nickname;
    inputNombre.value = nombre;
    inputValor.value = valor;
    inputId.value = id;
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

}

function validarUser() {
    const infoUser = {
        id: +inputId.value,
        img: inputImg.value,
        nickname: inputNickname.value,
        nombre: inputNombre.value,
        valor: +inputValor.value
    }

    const bool = Object.values(infoUser).every(valor => valor != '');

    if(bool) {
        imprimirAlerta('Modificado correctamente');
        editUser(infoUser)
    } else {
        imprimirAlerta('Debe llenar todos los campos', 'error')
    }

}

function imprimirAlerta(mensaje, tipo) {

    const alert = document.querySelector('.alert');

    if(!alert) {
        const modal = document.querySelector('.modal-content');
        const divAlerta = document.createElement('div');
        const alerta = document.createElement('p');
    
        tipo == 'error' ? alerta.classList.add('alert', 'alert-danger') : alerta.classList.add('alert', 'alert-success');
        alerta.textContent = mensaje;
        divAlerta.appendChild(alerta);
        modal.appendChild(divAlerta);
        
        setTimeout(() => {
            divAlerta.remove()
        }, 2000);

    }

}

function deltUser(e) {
    const id = +e.target.id;
    const confirmacion = confirm('¿Deseas eliminar este registro?')
    confirmacion ? deleteUser(id) : null
}