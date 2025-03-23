// viajes.js

// Array para guardar los destinos (usando const ya que no se reasignará)
let destinos = JSON.parse(localStorage.getItem('destinos')) || [];

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

    // Guardar en localStorage
    localStorage.setItem('destinos', JSON.stringify(destinos));
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

// Exportar las funciones para usarlas en otros módulos
export { registrarDestino };