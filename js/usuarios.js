
// Obtener los usuarios guardados
function obtenerUsuarios() {
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));

    if (usuarios === null) {
        usuarios = [];
    }

    return usuarios;
}

// Guardar usuarios
function guardarUsuarios(usuarios) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Enviar al usuario según su rol
function redirigirRol(rol) {
    if (rol === "cliente") {
        window.location.href = "cliente.html";
    } 
    else if (rol === "administrador") {
        window.location.href = "admin.html";
    }
}

// Crear una cuenta de administrador de prueba
let usuarios = obtenerUsuarios();

let administrador = usuarios.find(function(usuario) {
    return usuario.rol === "administrador";
});

if (!administrador) {
    usuarios.push({
        nombre: "Administrador",
        correo: "admin@tuercamaestra.com",
        telefono: "4770000000",
        contrasena: "Admin123",
        rol: "administrador"
    });

    guardarUsuarios(usuarios);

}

 // Comprobar si el usuario tiene permiso para entrar
function verificarRol(rolNecesario) {

    let usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

    // Comprobar si hay una sesión iniciada
    if (usuario === null) {
        window.location.href = "inicioSesion.html";
        return;
    }

    // Comprobar si tiene el rol correcto
    if (usuario.rol !== rolNecesario) {
        alert("No tienes permiso para entrar aquí.");

        // Mandarlo a su página correspondiente
        redirigirRol(usuario.rol);
    }
}

// Cerrar sesión
function cerrarSesion() {
    localStorage.removeItem("usuarioActivo");

    window.location.href = "inicioSesion.html";
}
