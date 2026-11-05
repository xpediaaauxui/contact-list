//  DATOS INICIALES 
let contactos = [
    { id: 1, nombre: 'Ana', telefono: '11-2345-6789', email: 'ana@mail.com', categoria: 'Familia', favorito: false },
    { id: 2, nombre: 'Bruno', telefono: '11-3456-7890', email: 'bruno@mail.com', categoria: 'Amigos', favorito: true },
    { id: 3, nombre: 'Carla', telefono: '11-4567-8901', email: 'carla@mail.com', categoria: 'Trabajo', favorito: false },
    { id: 4, nombre: 'Diego', telefono: '11-5678-9012', email: 'diego@mail.com', categoria: 'Estudio', favorito: false },
    { id: 5, nombre: 'Eva', telefono: '11-6789-0123', email: 'eva@mail.com', categoria: 'Amigos', favorito: false },
    { id: 6, nombre: 'Federico', telefono: '11-7890-1234', email: 'fede@mail.com', categoria: 'Trabajo', favorito: false },
    { id: 7, nombre: 'Gabriela', telefono: '11-8901-2345', email: 'gabi@mail.com', categoria: 'Familia', favorito: true },
    { id: 8, nombre: 'Hernán', telefono: '11-9012-3456', email: 'hernan@mail.com', categoria: 'Estudio', favorito: false },
    { id: 9, nombre: 'Julieta', telefono: '11-0123-4567', email: 'julieta@mail.com', categoria: 'Amigos', favorito: false },
    { id: 10, nombre: 'Kevin', telefono: '11-1234-5678', email: 'kevin@mail.com', categoria: 'Trabajo', favorito: false },
    { id: 10, nombre: 'luciano', telefono: '11-36005453', email: 'algo@mail.com', categoria: 'Trabajo', favorito: true },
];
const categorias = ['Familia', 'Amigos', 'Trabajo', 'Estudio'];

//  ELEMENTOS DE LA PÁGINA 
const inputBuscar = document.querySelector('#buscador');
const selectFiltro = document.querySelector('#filtro-categoria');
const formulario = document.querySelector('form');
const inputId = document.querySelector('#contacto-id');
const inputNombre = document.querySelector('#nombre');
const inputTelefono = document.querySelector('#telefono');
const inputEmail = document.querySelector('#email');
const selectCategoria = document.querySelector('#categoria');
const pMensaje = document.querySelector('#mensaje-error');
const tituloForm = document.querySelector('#titulo-form');
const botonGuardar = document.querySelector('#boton-guardar');
const botonCancelar = document.querySelector('#boton-cancelar');
const contenedor = document.querySelector('#lista-contactos');
const pSinResultados = document.querySelector('#sin-resultados');
const contador = document.querySelector('#contador');

/*     Función 1: Muestra contactos    */
function mostrarContactos(lista) {
    contenedor.innerHTML = "";  // Limpiamos el contenedor

    if (lista.length === 0) {
        pSinResultados.classList.remove('oculto');
    } else {
        pSinResultados.classList.add('oculto');
    }

    let i = 0;
    while (i < lista.length) {
        const c = lista[i];

        const tarjeta = document.createElement('article');
        tarjeta.classList.add('tarjeta');
        if (c.favorito) {
            tarjeta.classList.add('favorito');
        }

        // Avatar con la inicial; su color depende de la categoría
        const avatar = document.createElement('div');
        avatar.classList.add('avatar', c.categoria.toLowerCase());
        avatar.textContent = c.nombre.charAt(0);

        // Datos del contacto
        const info = document.createElement('div');
        info.classList.add('info');

        const h3 = document.createElement('h3');
        h3.textContent = c.nombre;

        const pTelefono = document.createElement('p');
        pTelefono.textContent = 'Tel: ' + c.telefono;

        const pEmail = document.createElement('p');
        pEmail.textContent = 'Email: ' + c.email;

        const pCategoria = document.createElement('p');
        pCategoria.textContent = 'Categoría: ' + c.categoria;

        info.appendChild(h3);
        info.appendChild(pTelefono);
        info.appendChild(pEmail);
        info.appendChild(pCategoria);

        // Botones de acción
        const acciones = document.createElement('div');
        acciones.classList.add('acciones');

        const btnFavorito = document.createElement('button');
        btnFavorito.textContent = c.favorito ? 'Quitar favorito' : 'Favorito';
        btnFavorito.addEventListener('click', () => {
            alternarFavorito(c.id);
        });

        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.addEventListener('click', () => {
            editarContacto(c.id);
        });

        const btnBorrar = document.createElement('button');
        btnBorrar.textContent = 'Borrar';
        btnBorrar.classList.add('boton-peligro');
        btnBorrar.addEventListener('click', () => {
            eliminarContacto(c.id);
        });

        acciones.appendChild(btnFavorito);
        acciones.appendChild(btnEditar);
        acciones.appendChild(btnBorrar);

        tarjeta.appendChild(avatar);
        tarjeta.appendChild(info);
        tarjeta.appendChild(acciones);

        contenedor.appendChild(tarjeta);
        i++;
    }
}

/*     Función 2: Agrega o edita un contacto    */
formulario.addEventListener('submit', (evento) => {
    evento.preventDefault(); // Evito la recarga del formulario

    const nombre = inputNombre.value.trim();
    const telefono = inputTelefono.value.trim();
    const email = inputEmail.value.trim();

    // Validamos datos obligatorios
    if (nombre === "" || telefono === "") {
        pMensaje.textContent = 'Nombre y teléfono son obligatorios.';
        return;
    }

    // Si se escribió un email, debe tener "@"
    if (email !== "" && !email.includes('@')) {
        pMensaje.textContent = 'El email no es válido.';
        return;
    }

    if (inputId.value === "") {
        // Contacto nuevo
        const categoria = selectCategoria.value;
        contactos.push({ id: Date.now(), nombre, telefono, email, categoria, favorito: false });
    } else {
        // Edición de un contacto existente
        const contacto = buscarPorId(Number(inputId.value));
        contacto.nombre = nombre;
        contacto.telefono = telefono;
        contacto.email = email;
        contacto.categoria = selectCategoria.value;
    }

    guardarContactos();
    limpiarFormulario();
    aplicarFiltros();
});

/*     Función 3: Elimina un contacto    */
function eliminarContacto(id) {
    if (!confirm('¿Eliminar este contacto?')) {
        return;
    }

    contactos = contactos.filter(c => c.id !== id);

    // Solo se limpia el formulario si justo se estaba editando ese contacto
    if (inputId.value === String(id)) {
        limpiarFormulario();
    }

    guardarContactos();
    aplicarFiltros();
}

/*     Función 4: Carga un contacto en el formulario para editarlo    */
function editarContacto(id) {
    const contacto = buscarPorId(id);

    inputId.value = contacto.id;
    inputNombre.value = contacto.nombre;
    inputTelefono.value = contacto.telefono;
    inputEmail.value = contacto.email;
    selectCategoria.value = contacto.categoria;

    tituloForm.textContent = 'Editar contacto';
    botonGuardar.textContent = 'Actualizar';
}

/*     Función 5: Marca o desmarca favorito    */
function alternarFavorito(id) {
    const contacto = buscarPorId(id);
    contacto.favorito = !contacto.favorito;

    guardarContactos();
    aplicarFiltros();
}

/*     Función 6: Busca y filtra    */
function aplicarFiltros() {
    const texto = inputBuscar.value.toLowerCase();
    const filtro = selectFiltro.value;

    const nuevoArray = contactos.filter(c => {
        const coincideNombre = c.nombre.toLowerCase().includes(texto);
        let coincideFiltro = true;

        if (filtro === 'favoritos') {
            coincideFiltro = c.favorito === true;
        } else if (filtro !== 'todas') {
            coincideFiltro = c.categoria === filtro;
        }

        return coincideNombre && coincideFiltro;
    });

    mostrarContactos(nuevoArray);

    // Muestra cuántos contactos cumplen el filtro del total
    contador.textContent = 'Mostrando ' + nuevoArray.length + ' de ' + contactos.length + ' contactos';
}

inputBuscar.addEventListener('input', aplicarFiltros);
selectFiltro.addEventListener('change', aplicarFiltros);

/*     Función 7: Carga las categorías en los selects    */
function cargarCategorias() {
    let i = 0;
    while (i < categorias.length) {
        const op = document.createElement('option');
        op.textContent = categorias[i];
        op.setAttribute('value', categorias[i]);

        selectCategoria.appendChild(op);
        selectFiltro.appendChild(op.cloneNode(true));
        i++;
    }
}

/*     Función 8: Guarda y carga datos con localStorage    */
function guardarContactos() {
    localStorage.setItem('contactos', JSON.stringify(contactos));
}

function cargarDesdeStorage() {
    const guardados = localStorage.getItem('contactos');

    if (guardados) {
        contactos = JSON.parse(guardados);
    }
}

/*     Funciones auxiliares    */
function buscarPorId(id) {
    return contactos.find(c => c.id === id);
}

function limpiarFormulario() {
    formulario.reset();
    inputId.value = "";
    pMensaje.textContent = "";
    tituloForm.textContent = 'Agregar contacto';
    botonGuardar.textContent = 'Guardar';
}

botonCancelar.addEventListener('click', limpiarFormulario);

// Invocamos las funciones al iniciar
cargarDesdeStorage();
cargarCategorias();
aplicarFiltros();
