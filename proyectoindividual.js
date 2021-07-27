const titulo=document.getElementById('titulo');
const contenido=document.getElementById('contenido');
const categoria=document.getElementById('categoria');
const agregarNota=document.getElementById('form-agregar');
const editarTitulo=document.getElementById('editarTitulo');
const editarContenido=document.getElementById('editarContenido');
const editarCategoria=document.getElementById('editarCategoria');
const editarNota=document.getElementById('formularioEditar')
const tabla=document.getElementById('tabla');
const json = localStorage.getItem('notas');
let notas = JSON.parse(json) || [];
let notaId = '';

function generarID() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

agregarNota.onsubmit = function (e) {
    e.preventDefault();
    console.log('entro')
    const nota = {
        id: generarID(),
        titulo: titulo.value,
        contenido: contenido.value,
        categoria: categoria.value,
    };
    notas.push(nota);
    const json = JSON.stringify(notas);
    localStorage.setItem('notas', json); 
    mostrarNotas();
    console.log("Se registró exitosamente un usuario. 👨‍💻");
    agregarNota.reset(); 
};

function mostrarNotas() {
    let filas = [];
    for (let i = 0; i < notas.length; i++) {
        const nota = notas[i];
        const tr = `
            <tr>
                <td>${nota.titulo}</td>
                <td>${nota.contenido}</td>
                <td>${nota.categoria}</td>
                <td>
                    <button onclick="mostrarDetalle('${nota.id}')" type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#modalDetalle">Ver Nota</button>
                    <button onclick="cargarModalEditar('${nota.id}')" type="button" class="btn btn-success btn-sm" data-bs-toggle="modal"
                    data-bs-target="#modalEditar">Editar</button>
                    <button onclick="eliminarNota('${nota.id}')" class="btn btn-danger btn-sm">Eliminar</button>
                </td>
            </tr>
        `;
        filas.push(tr);
    }
    tabla.innerHTML = filas.join('');
}

mostrarNotas();

function eliminarNota(id) {


    let notasFiltradas = [];
    for (let i = 0; i < notas.length; i++) {
        const nota = notas[i];
        const coincideId = nota.id === id;
        if (!coincideId) {
            notasFiltradas.push(nota);
        }
    }
    const json = JSON.stringify(notasFiltradas);
    localStorage.setItem('notas', json);
    notas = notasFiltradas;
    console.log("Se eliminó exitosamente un usuario. 👨‍💻");
    mostrarNotas();
}

function mostrarDetalle(id) {
    const notaEncontrada = notas.find((nota) => nota.id === id);
    const detalleDiv = document.getElementById('detalleNota');
    const detallesNota = `
        <p>Invocador: ${notaEncontrada.titulo}</p>
        <p>Contenido: ${notaEncontrada.contenido}</p>
        <p>Categoria: ${notaEncontrada.categoria}</p>
    `;
    detalleDiv.innerHTML = detallesNota;
}

function cargarModalEditar(id) {
    const notaEncontrada = notas.find((nota) => nota.id === id);
    editarTitulo.value = notaEncontrada.titulo;
    editarContenido.value = notaEncontrada.contenido;
    notaId = notaEncontrada.id;
}

editarNota.onsubmit = function editarNota(e) {
    e.preventDefault();

    const notasModificada = notas.map((nota) => {

        if (nota.id === notaId) {
            
            const notaModificada = {
                ...nota,
                titulo: editarTitulo.value,
                contenido: editarContenido.value,
            };
            return notaModificada;
        } else {
            return nota;
        }
    });

    const json = JSON.stringify(notasModificada);
    localStorage.setItem('notas', json);
    notas = notasModificada;
    console.log("Se modificó exitosamente un usuario. 👨‍💻");
    mostrarNotas();

    const modalDiv = document.getElementById('modalEditar');
    const modalBootstrap = bootstrap.Modal.getInstance(modalDiv);
    modalBootstrap.hide();
};

var numbers = [1, 4, 9];
