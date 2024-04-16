document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const perfil = document.getElementById('perfil').value;
  const dni = document.getElementById('dni').value;
  const password = document.getElementById('password').value;

  let endpoint = '';
  switch(perfil) {
    case 'estudiantes':
      endpoint = '/api/estudiantes/login';
      break;
    case 'tutor':
      endpoint = '/api/padres/login';  // Asumiendo que tienes una ruta específica para padres
      break;
    case 'profesor':
      endpoint = '/api/profesores/login';  // Asumiendo que tienes una ruta específica para profesores
      break;
    default:
      alert('Por favor, selecciona un perfil válido.');
      return;
  }

  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ DNI: dni, password: password })
  })
  .then(response => response.json())
  .then(data => {
    if (data.token && data.usuario) { // Añade una comprobación aquí para asegurar que data.usuario existe
      sessionStorage.setItem('token', data.token);
      switch(data.usuario.perfil) { 
        case 'padre':
          window.location.href = '/HTML/usuarioPadres.html';
          break;
        case 'estudiante':
          window.location.href = '/HTML/usuarioEstudiantes.html';
          break;
        case 'profesor':
          window.location.href = '/HTML/usuarioProfesores.html';
          break;
        default:
          alert('Perfil no reconocido o no autorizado.');
          break;
      }
    } else {
      alert('Error en el inicio de sesión: ' + (data.msg || 'Información de usuario no disponible.'));
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Error en el inicio de sesión: Verifica tu conexión y tus datos.');
  });

});
