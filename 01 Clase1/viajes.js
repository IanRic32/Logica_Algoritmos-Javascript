// viajes.js

// Array para guardar los destinos (usando const ya que no se reasignará)
const destinos = [];

// Función para registrar un destino de viaje (usando función de flecha)
const registrarDestino = (destino, fecha, transporte) => {
    // Crear un objeto con los datos del destino
    const nuevoViaje = {
        destino,
        fecha,
        transporte,
        costo: calcularCosto(destino, transporte)
    };

    destinos.push(nuevoViaje);
};

// Función para calcular el costo del viaje (usando función de flecha)
const calcularCosto = (destino, transporte) => {
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
        default:
            costoBase = 0;
    }

    // Costo adicional por tipo de transporte
    if (transporte === "Avión") {
        costoBase += 200;
    } else if (transporte === "Tren") {
        costoBase += 100;
    }

    return costoBase;
};

// Función para mostrar el itinerario de los viajes registrados (usando función de flecha)
const mostrarItinerario = () => {
    destinos.forEach(viaje => {
        console.log("Destino: " + viaje.destino);
        console.log("Fecha: " + viaje.fecha);
        console.log("Transporte: " + viaje.transporte);
        console.log("Costo: $" + viaje.costo);
        console.log("---------------------------");
    });
};

// Exportar las funciones para usarlas en otros módulos
export { registrarDestino, mostrarItinerario };