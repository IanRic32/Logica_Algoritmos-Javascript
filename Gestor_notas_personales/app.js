/**
 * El manejo de archivos con Node.js es una habilidad clave para cualquier desarrollador backend. Entender cómo leer, escribir y gestionar archivos te permitirá crear aplicaciones robustas y útiles. Aunque al principio puede parecer complicado, con práctica y experimentación se vuelve una herramienta indispensable.
 */


const fs = require('fs');
// Ruta del archivo de notas
const filePath = './notas.json';

function agregarNota(titulo, contenido) {
  let notas = [];
  if (fs.existsSync(filePath)) {//Aqui trabaja de forma sincrona y no la asincrona
    // Leer las notas existentes antes de agregar la nueva
    const data = fs.readFileSync(filePath, 'utf8');
    notas = JSON.parse(data);
  }

  const nuevaNota = { titulo, contenido };
  notas.push(nuevaNota);

  // Sobrescribir el archivo con las notas actualizadas
  fs.writeFileSync(filePath, JSON.stringify(notas, null, 2));
  console.log('Nota agregada con éxito.');
}

/**
 * Lista todas las notas guardadas.
 */
function listarNotas() {
  if (fs.existsSync(filePath)) {
    // Leer y parsear el contenido del archivo
    const data = fs.readFileSync(filePath, 'utf8');
    const notas = JSON.parse(data);
    
    console.log('\nNotas guardadas:');
    notas.forEach((nota, index) => {
      console.log(`\nNota ${index + 1}:`);
      console.log(`Título: ${nota.titulo}`);
      console.log(`Contenido: ${nota.contenido}`);
    });
    console.log(''); // Espacio al final
  } else {
    console.log('No hay notas guardadas.');
  }
}

/**
 * Elimina una nota por su título.
 * @param {string} titulo - El título de la nota a eliminar.
 */
function eliminarNota(titulo) {
  if (fs.existsSync(filePath)) {
    // Leer todas las notas
    const data = fs.readFileSync(filePath, 'utf8');
    let notas = JSON.parse(data);

    // Filtrar las notas y eliminar la que coincida con el título
    const notasRestantes = notas.filter((nota) => nota.titulo !== titulo);

    if (notas.length === notasRestantes.length) {
      console.log(`No se encontró ninguna nota con título "${titulo}".`);
      return;
    }

    // Sobrescribir el archivo con las notas actualizadas
    fs.writeFileSync(filePath, JSON.stringify(notasRestantes, null, 2));
    console.log(`Nota con título "${titulo}" eliminada.`);
  } else {
    console.log('No hay notas para eliminar.');
  }
}

// Ejecución de ejemplo
agregarNota('Compras', 'Comprar leche y pan.');
agregarNota('Trabajo', 'Terminar reporte semanal.');
listarNotas();
eliminarNota('Compras');
listarNotas();