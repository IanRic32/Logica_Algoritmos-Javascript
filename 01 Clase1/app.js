// app.js

// Importar las funciones del módulo viajes.js
import { registrarDestino, mostrarItinerario } from './viajes.js';

// Iniciar la aplicación (usando función de flecha)
const iniciarApp = () => {
    // Ejemplo de cómo registrar destinos con más personas
    registrarDestino("Paris", "2024-06-15", "Avión", 2); // 2 personas
    registrarDestino("Londres", "2024-07-01", "Tren", 4); // 4 personas
    registrarDestino("New York", "2024-08-10", "Autobús", 1); // 1 persona
    registrarDestino("Tokio", "2024-09-20", "Avión", 3); // 3 personas

    // Mostrar el itinerario de los viajes
    mostrarItinerario();
};

// Ejecutar la aplicación
iniciarApp();