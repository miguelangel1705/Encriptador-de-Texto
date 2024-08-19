//No permite caracteres especiales ni mayusculas, también bloquea el área de salida
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('areaTextoModificado').disabled = true;
    const entradaUsuario = document.getElementById('entradaUsuario');
    entradaUsuario.addEventListener('input', function() {
        this.value = this.value.replace(/[^a-zñ\s]/g, '');
    });
});

// Función para reemplazar letras en un texto
function reemplazar(textoUsuario) {
    const reemplazos = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };

    for (const [letra, reemplazo] of Object.entries(reemplazos)) {
        
        const regex = new RegExp(letra, 'g');
        textoUsuario = textoUsuario.replace(regex, reemplazo);
    }
    return textoUsuario;
}

//Función para encriptar el texto ingresado, adicional también verifica si no se ha ingresado texto y se da click en el botón encriptar arrojando un mensaje de error
function encriptar(){
    const textoInicial = document.getElementById('entradaUsuario').value;

     if (!textoInicial) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El campo de texto está vacío",
        });
        return;
    }

    const textoModificado = reemplazar(textoInicial);
    document.getElementById('areaTextoModificado').value = textoModificado;
    document.getElementById('areaTextoModificado').disabled = false;
    eliminarImagenFondo();
}    

function desencriptarTexto(textoEncriptado) {
    const reemplazos = {
        'enter': 'e',
        'imes': 'i',
        'ai': 'a',
        'ober': 'o',
        'ufat': 'u'
    };

    for (const [reemplazo, letra] of Object.entries(reemplazos)) {
        const regex = new RegExp(reemplazo, 'g');
        textoEncriptado = textoEncriptado.replace(regex, letra);
    }

    return textoEncriptado;
}

//Función para dencriptar el texto ingresado, adicional también verifica si no se ha ingresado texto y se da click en el botón desencriptar arrojando un mensaje de error
function desencriptar() {
    const textoModificado = document.getElementById('entradaUsuario').value;

    if (!textoModificado) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El campo de texto está vacío",
        });
        return;
    }
    
    const textoDesencriptado = desencriptarTexto(textoModificado);
    document.getElementById('areaTextoModificado').value = textoDesencriptado;
    document.getElementById('areaTextoModificado').disabled = false;
    eliminarImagenFondo();


}

function limpiarAreasTexto() {
    document.getElementById('entradaUsuario').value = '';
    document.getElementById('areaTextoModificado').value = '';
    document.getElementById('areaTextoModificado').disabled = true;
    restaurarImagenFondo();
}   

//elimina la imagen de fondo del área de salida
function eliminarImagenFondo() {
    document.querySelector('.textarea-salida').classList.add('textarea-salida-sin-fondo');
}

//restaura la imagen de fondo del área de salida
function restaurarImagenFondo() {
    document.querySelector('.textarea-salida').classList.remove('textarea-salida-sin-fondo');
}

//copia el texto del área de salida
function copiarTexto() {
    const textoModificado = document.getElementById('areaTextoModificado');
    textoModificado.select();
    document.execCommand('copy');
    mostrarNotificacion('Texto copiado al portapapeles.');
}

//muestra una notificación en el momento que se da click en el boton copiar
function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion';
    notificacion.innerText = mensaje;
    document.body.appendChild(notificacion);
    
    notificacion.style.display = 'block';
    
    setTimeout(() => {
        notificacion.style.display = 'none';
        document.body.removeChild(notificacion);
    }, 3000); 
}



