import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contraseña: '1234'
  });

  const [errors, setErrors] = useState({
    nombre: '',
    correo: '',
    contraseña: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [usuarios, setUsuarios] = useState([]);

  // Cargar usuarios al iniciar
  useEffect(() => {
    cargarUsuarios();
  }, []);

  // Cargar lista de usuarios desde el backend
  const cargarUsuarios = async () => {
    try {
      const response = await fetch('http://localhost:3000/usuarios');
      const data = await response.json();
      setUsuarios(data.usuarios || []);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const regexNombre = /^[a-zA-ZÀ-ÿ\s]+$/;
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.]).+$/;

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre no puede estar vacío.';
    } else if (formData.nombre.length < 5) {
      newErrors.nombre = 'El nombre debe tener al menos 5 caracteres.';
    } else if (!regexNombre.test(formData.nombre)) {
      newErrors.nombre = 'El nombre solo debe contener letras y espacios.';
    }

    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo no puede estar vacío.';
    } else if (!regexCorreo.test(formData.correo)) {
      newErrors.correo = 'Ingresa un correo válido, por ejemplo: usuario@dominio.com.';
    }

    if (!formData.contraseña.trim()) {
      newErrors.contraseña = 'La contraseña no puede estar vacía.';
    } else if (formData.contraseña.length < 8) {
      newErrors.contraseña = 'La contraseña debe tener al menos 8 caracteres.';
    } else if (!regexPassword.test(formData.contraseña)) {
      newErrors.contraseña = 'Debe incluir mayúscula, número y símbolo especial.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:3000/usuarios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
          setMensaje('✅ ' + data.mensaje + ' Bienvenido al Aquelarre del Señor Oscuro.');
          
          setFormData({
            nombre: '',
            correo: '',
            contraseña: ''
          });
          
          cargarUsuarios();
        } else {
          setMensaje('❌ ' + data.error);
        }
      } catch (error) {
        console.error('Error:', error);
        setMensaje('❌ Error al conectar con el servidor.');
      }
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      gap: '30px', 
      maxWidth: '1200px', 
      margin: '50px auto',
      padding: '20px'
    }}>
      {/* COLUMNA IZQUIERDA - FORMULARIO */}
      <main className="container" style={{ flex: '1', maxWidth: '500px' }}>
        <h1>Registro al Aquelarre</h1>
        
        {mensaje && (
          <div style={{
            padding: '15px',
            marginBottom: '20px',
            borderRadius: '5px',
            backgroundColor: mensaje.includes('✅') ? '#d4edda' : '#f8d7da',
            color: mensaje.includes('✅') ? '#155724' : '#721c24',
            border: `1px solid ${mensaje.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`
          }}>
            {mensaje}
          </div>
        )}

        <form id="registroForm" onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ingresa tu nombre de mortal"
            className={errors.nombre ? 'error' : ''}
          />
          {errors.nombre && <span className="error-message">{errors.nombre}</span>}

          <label htmlFor="correo">Correo</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            placeholder="ejemplo@dominio.com"
            className={errors.correo ? 'error' : ''}
          />
          {errors.correo && <span className="error-message">{errors.correo}</span>}

          <label htmlFor="contraseña">Contraseña</label>
          <input
            type="password"
            id="contraseña"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            placeholder="Mínimo 8 caracteres"
            className={errors.contraseña ? 'error' : ''}
          />
          {errors.contraseña && <span className="error-message">{errors.contraseña}</span>}

          <button type="submit">Unirse al Aquelarre</button>
        </form>
      </main>

      {/* COLUMNA DERECHA - LISTA DE USUARIOS */}
      <div style={{ 
        flex: '1', 
        minWidth: '300px',
        maxHeight: '600px',
        overflowY: 'auto',
        backgroundColor: '#1a1a1a',
        padding: '20px',
        borderRadius: '10px',
        border: '2px solid #8B0000'
      }}>
        <h2 style={{ 
          color: '#ff6b6b', 
          marginTop: 0,
          textAlign: 'center',
          borderBottom: '2px solid #8B0000',
          paddingBottom: '10px'
        }}>
          🔥 Miembros del Aquelarre ({usuarios.length})
        </h2>
        
        {usuarios.length === 0 ? (
          <p style={{ 
            textAlign: 'center', 
            color: '#888',
            fontStyle: 'italic',
            marginTop: '40px'
          }}>
            Aún no hay miembros...<br/>Sé el primero en unirte.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {usuarios.map(usuario => (
              <div 
                key={usuario.id}
                style={{
                  border: '1px solid #8B0000',
                  padding: '15px',
                  borderRadius: '8px',
                  backgroundColor: '#2a2a2a',
                  color: '#fff',
                  transition: 'transform 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <p style={{ 
                  margin: '5px 0', 
                  fontWeight: 'bold', 
                  color: '#ff6b6b',
                  fontSize: '16px'
                }}>
                  👤 {usuario.nombre}
                </p>
                <p style={{ margin: '5px 0', fontSize: '14px', color: '#ccc' }}>
                  📧 {usuario.correo}
                </p>
                <p style={{ margin: '5px 0', fontSize: '12px', color: '#888' }}>
                  🕐 {new Date(usuario.fecha_registro).toLocaleDateString()} - {new Date(usuario.fecha_registro).toLocaleTimeString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
