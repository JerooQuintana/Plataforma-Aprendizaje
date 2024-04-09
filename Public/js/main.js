document.addEventListener('DOMContentLoaded', (event) => {
    const formulario = document.getElementById('formularioRegistro');

    formulario.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir el envío tradicional del formulario

        const formData = new FormData(formulario);
        const data = Object.fromEntries(formData.entries());
        
        let endpoint = '';
        switch (data.perfil) {
            case 'alumno':
                endpoint = 'http://localhost:3000/api/estudiantes';
                break;
            case 'tutor':
                endpoint = 'http://localhost:3000/api/padres';
                break;
            case 'profesor':
                endpoint = 'http://localhost:3000/api/profesores';
                break;
            default:
                console.error('Perfil no válido');
                return;
        }

        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                // Manejar las respuestas no exitosas, incluyendo el lanzamiento de un error para entrar en el catch
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                return response.json(); // Solo intenta convertir a JSON si la respuesta fue exitosa
            }
        })
        .then(data => {
            console.log('Success:', data);
            // Aquí puedes redirigir al usuario o mostrar algún mensaje de éxito
        })
        .catch((error) => {
            console.error('Error:', error);
            // Aquí puedes manejar errores, por ejemplo, mostrar un mensaje de error en la interfaz
        });
    });
});
