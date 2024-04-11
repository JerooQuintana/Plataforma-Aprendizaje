document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
  
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
  
      const dni = document.getElementById('dni').value;
      const password = document.getElementById('password').value;
      const perfil = document.getElementById('perfil').value;
  
      // Asegúrate de que este endpoint coincida con la configuración de tu servidor
      // y que el servidor esté corriendo.
      let endpoint = '';
      switch (perfil) {
        case 'estudiantes':
          endpoint = '/api/estudiantes/login';
          break;
        case 'tutor':
          // endpoint = '...'; // Define el endpoint para tutores
          break;
        case 'profesor':
          // endpoint = '...'; // Define el endpoint para profesores
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
        body: JSON.stringify({ DNI: dni, password }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Problemas al intentar el inicio de sesión');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        // Redirigir al usuario a la página correspondiente
        if(data.message === 'Inicio de sesión exitoso') {
          window.location.href = 'usuarioEstudiantes.html'; // Asegúrate de que esta ruta sea correcta
        } else {
          alert(data.message); // Mostrar mensaje de error
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert(error.message);
      });
    });
  });
  