document.addEventListener('DOMContentLoaded', (event) => {
    const formulario = document.getElementById('formularioRegistro');

    formulario.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir el envío tradicional del formulario

        const formData = new FormData(formulario);
        const data = Object.fromEntries(formData.entries());
        // Determinar el endpoint basado en el perfil seleccionado
        let endpoint = '';
        switch (data.perfil) {
            case 'alumno':
                endpoint = '/api/estudiantes';
                break;
            case 'tutor':
                // Asumiendo que tutor y padre son equivalentes
                endpoint = '/api/padres';
                break;
            case 'profesor':
                endpoint = '/api/profesores';
                break;
            default:
                console.error('Perfil no válido');
                return;
        }

        // Enviar la solicitud al servidor
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Aquí puedes redirigir al usuario o mostrar algún mensaje de éxito
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});
