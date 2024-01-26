const URL_BASE = "http://127.0.0.1:3001";


function cargarDatosUsuario() {
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let telefono = document.getElementById("telefono").value;
    let fechaNacimiento = document.getElementById("fechaNacimiento").value;

    
    let userDataDiv = document.getElementById("userData");
    userDataDiv.innerHTML = `
        <h2>Datos del Usuario:</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Apellido:</strong> ${apellido}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Fecha de Nacimiento:</strong> ${fechaNacimiento}</p>
    `;

    fetch(`${URL_BASE}/api/prueba/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nombre: nombre,
            apellido: apellido,
            numero: telefono,
            fecha: fechaNacimiento
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Usuario creado:', data);
    })
    .catch(error => {
        console.error('Error al crear usuario:', error);
    });
}


function cargarPDF() {
    let tituloPdf = document.getElementById("tituloPdf").value;
    let archivoPdfInput = document.getElementById("archivoPdf");
    let archivoPdf = archivoPdfInput.files[0];


    var pdfDataDiv = document.getElementById("pdfData");
    pdfDataDiv.innerHTML = `
        <h2>Datos del PDF:</h2>
        <p><strong>Título:</strong> ${tituloPdf}</p>
        <p><strong>Archivo PDF:</strong> ${archivoPdf.name}</p>
        <button onclick="verPDF()">Ver PDF</button>
        <a href="${URL.createObjectURL(archivoPdf)}" download="${archivoPdf.name}">
            Descargar PDF
        </a>
    `;

    const formData = new FormData()
    formData.append("titulo", tituloPdf)
    formData.append("file", archivoPdf)

fetch(`${URL_BASE}/api/prueba/pdf`, {
    method: 'POST',
    body: formData,
})
.then(response => response.json())
.then(data => {
    console.log('PDF creado:', data);
})
.catch(error => {
    console.error('Error al crear PDF:', error);
});


}

function verPDF() {
    alert("Implementar lógica para visualizar el PDF aquí.");
}


function cargarImagen() {
    let tituloImagen = document.getElementById("tituloImagen").value;
    let archivoImagenInput = document.getElementById("archivoImagen");
    let archivoImagen = archivoImagenInput.files[0];

    
    let imageDataDiv = document.getElementById("imageData");
    imageDataDiv.innerHTML = `
        <h2>Datos de la Imagen:</h2>
        <p><strong>Título:</strong> ${tituloImagen}</p>
        <p><strong>Imagen:</strong> ${archivoImagen.name}</p>
        <img src="${URL.createObjectURL(archivoImagen)}" alt="${tituloImagen}" width="200">
        <a href="${URL.createObjectURL(archivoImagen)}" download="${archivoImagen.name}">
            Descargar Imagen
        </a>
    `;

    const formData = new FormData()
    formData.append("titulo", tituloImagen)
    formData.append("file", archivoImagen)

    fetch(`${URL_BASE}/api/prueba/image`, {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log('Imagen creada:', data);
    })
    .catch(error => {
        console.error('Error al crear imagen:', error);
    });
}

const carousel = document.getElementById('carousel');
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    const itemWidth = 150 + 10;
    let currentIndex = 0;

    function startCarousel() {
        intervalId = setInterval(() => {
            moveCarousel(1);
        }, 2000);
    }

    startCarousel()

    function stopCarousel() {
        clearInterval(intervalId);
    }

    function moveCarousel() {
        currentIndex++;
        const translateValue = -currentIndex * itemWidth;
        carousel.style.transform = `translateX(${translateValue}px)`;

        if (currentIndex === totalItems - 1) {
            
            setTimeout(() => {
                currentIndex = 0;
                carousel.style.transition = "none";
                const resetTranslateValue = -currentIndex * itemWidth;
                carousel.style.transform = `translateX(${resetTranslateValue}px)`;
                setTimeout(() => {
                    carousel.style.transition = "transform 1s ease-in-out";
                }, 0);
            }, 1000); 
        }
    }

   

