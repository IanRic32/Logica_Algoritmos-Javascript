// viajes.js

// Array para guardar los destinos (usando const ya que no se reasignará)
const destinos = [];

// Función para registrar un destino de viaje (usando función de flecha)
const registrarDestino = (destino, fecha, transporte, personas = 1) => {
    // Crear un objeto con los datos del destino
    const nuevoViaje = {
        destino,
        fecha,
        transporte,
        personas,
        costo: calcularCosto(destino, transporte, personas)
    };

    destinos.push(nuevoViaje);
};

// Función para calcular el costo del viaje (usando función de flecha)
const calcularCosto = (destino, transporte, personas = 1) => {
    let costoBase = 0;

    // Costo base por destino
    switch (destino) {
        case "Paris":
            costoBase = 500;
            break;
        case "Londres":
            costoBase = 400;
            break;
        case "New York":
            costoBase = 600;
            break;
        case "Tokio":
            costoBase = 700;
            break;
        default:
            costoBase = 0;
    }

    // Costo adicional por tipo de transporte
    if (transporte === "Avión") {
        costoBase += 200;
    } else if (transporte === "Tren") {
        costoBase += 100;
    } else if (transporte === "Autobús") {
        costoBase += 50;
    }

    // Descuento por grupo (10% de descuento por persona adicional)
    if (personas > 1) {
        costoBase *= 1 - (0.1 * (personas - 1));
    }

    return costoBase;
};

// Función para mostrar el itinerario de los viajes registrados (usando función de flecha)
const mostrarItinerario = () => {
    destinos.forEach(viaje => {
        console.log("Destino: " + viaje.destino);
        console.log("Fecha: " + viaje.fecha);
        console.log("Transporte: " + viaje.transporte);
        console.log("Personas: " + viaje.personas);
        console.log("Costo: $" + viaje.costo.toFixed(2)); // Mostrar el costo con 2 decimales
        console.log("---------------------------");
    });
};

// Exportar las funciones para usarlas en otros módulos
export { registrarDestino, mostrarItinerario };