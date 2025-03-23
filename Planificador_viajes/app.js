// app.js

// Importar las funciones del módulo viajes.js
import { registrarDestino } from './viajes.js';

// Iniciar la aplicación (usando función de flecha)
const iniciarApp = () => {
    const viajeForm = document.getElementById('viajeForm');
    const itinerarioList = document.getElementById('itinerarioList');

    // Función para mostrar el itinerario en la interfaz
    const mostrarItinerarioUI = () => {
        itinerarioList.innerHTML = ''; // Limpiar la lista antes de mostrar

        // Obtener los viajes registrados (simulando un "getter" desde el módulo viajes.js)
        const destinos = JSON.parse(localStorage.getItem('destinos')) || [];

        destinos.forEach(viaje => {
            const viajeItem = document.createElement('div');
            viajeItem.className = 'viaje-item';
            viajeItem.innerHTML = `
                <p><strong>Destino:</strong> ${viaje.destino}</p>
                <p><strong>Fecha:</strong> ${viaje.fecha}</p>
                <p><strong>Transporte:</strong> ${viaje.transporte}</p>
                <p><strong>Personas:</strong> ${viaje.personas}</p>
                <p><strong>Costo:</strong> $${viaje.costo.toFixed(2)}</p>
            `;
            itinerarioList.appendChild(viajeItem);
        });
    };

    // Manejar el envío del formulario
    viajeForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const destino = document.getElementById('destino').value;
        const fecha = document.getElementById('fecha').value;
        const transporte = document.getElementById('transporte').value;
        const personas = parseInt(document.getElementById('personas').value, 10);

        // Registrar el destino
        registrarDestino(destino, fecha, transporte, personas);

        // Mostrar el itinerario actualizado
        mostrarItinerarioUI();

        // Limpiar el formulario después de registrar
        viajeForm.reset();
    });

    // Cargar los viajes almacenados al iniciar la aplicación
    mostrarItinerarioUI();
};

// Ejecutar la aplicación
iniciarApp();