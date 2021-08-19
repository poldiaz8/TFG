const formulario = document.querySelector('#agregar-modelo');
formulario.addEventListener('submit', async e => {
    e.preventDefault();

    const codigo = document.querySelector('#codigo').value;
    const url = document.querySelector('#url').value;

    console.log(e.target);
    const respuesta = await fetch(e.target.action, {
        method: e.target.method,
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({codigo})
    });

    const resultado = await respuesta.json();

    //ELIMINAMOS MENSAHES ANTERIORE
    const alertas = document.querySelector('.mensaje-url');
    if (alertas){
    document.querySelector('.mensaje-url').remove();
    }

    //verificar si todo esta bien 
    if(resultado.codigo === 201){
        //construimos mensaje de todo bien
        const mensaje = document.createElement('div');
        mensaje.classList.add('mensaje-url');
        mensaje.innerHTML= '<p> Se ha insertado correctamente el modelo </p>';

        const contenedor = document.querySelector('main');
        contenedor.appendChild(mensaje);
    }else {
        //construir error
        const mensaje = document.createElement('div');
        mensaje.classList.add('mensaje-url','error');
        mensaje.innerHTML = '<p>${resultado.error}</p>';

        const contenedor = document.querySelector('main');
        contenedor.appendChild(mensaje);
    }

});

//si hay un error 404

const urlParams = new URLSearchParams(window.location.search); 

if (urlParams.has('error')){
    //construir template
    const mensaje = document.createElement('div');
    mensaje.classList.add('mensaje-url','error');
    mensaje.innerHTML = '<p>CODIGO NO ASOCIADO A NINGUN MODELO</p>';

    const contenedor = document.querySelector('main');
    contenedor.appendChild(mensaje);
}