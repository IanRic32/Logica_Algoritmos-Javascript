// Base de datos de productos
const productos = [
    { nombre: "Laptop", precio: 1200, categoria: "Electrónicos" },
    { nombre: "Smartphone", precio: 599, categoria: "Electrónicos" },
    { nombre: "Auriculares", precio: 99, categoria: "Electrónicos" },
    { nombre: "Libro de JavaScript", precio: 25, categoria: "Libros" },
    { nombre: "Mouse inalámbrico", precio: 45, categoria: "Electrónicos" },
    { nombre: "Camiseta de algodón", precio: 30, categoria: "Ropa" },
    { nombre: "Taza de cerámica", precio: 15, categoria: "Hogar" },
    { nombre: "Tablet", precio: 250, categoria: "Electrónicos" },
    { nombre: "Teclado mecánico", precio: 89, categoria: "Electrónicos" },
    { nombre: "Libro de CSS", precio: 20, categoria: "Libros" },
    { nombre: "Pantalón jeans", precio: 49, categoria: "Ropa" },
    { nombre: "Juego de cubiertos", precio: 35, categoria: "Hogar" }
];

// Elementos del DOM
const precioMaxInput = document.getElementById('precio-max');
const categoriaSelect = document.getElementById('categoria');
const ordenSelect = document.getElementById('orden');
const busquedaInput = document.getElementById('busqueda');
const aplicarFiltrosBtn = document.getElementById('aplicar-filtros');
const resetFiltrosBtn = document.getElementById('reset-filtros');
const listaProductos = document.getElementById('lista-productos');
const contador = document.querySelector('.contador');
const estadisticasDiv = document.getElementById('estadisticas');

// Función para aplicar los filtros
function aplicarFiltros() {
    // Obtener valores de los filtros
    const precioMax = precioMaxInput.value ? Number(precioMaxInput.value) : Infinity;
    const categoria = categoriaSelect.value;
    const busqueda = busquedaInput.value.toLowerCase();
    const orden = ordenSelect.value;
    
    // Filtrar productos
    let productosFiltrados = productos.filter(producto => {
        return (
            producto.precio <= precioMax &&
            (categoria === "" || producto.categoria === categoria) &&
            producto.nombre.toLowerCase().includes(busqueda)
        );
    });
    
    // Ordenar productos
    productosFiltrados = productosFiltrados.sort((a, b) => {
        switch(orden) {
            case 'nombre-asc':
                return a.nombre.localeCompare(b.nombre);
            case 'nombre-desc':
                return b.nombre.localeCompare(a.nombre);
            case 'precio-asc':
                return a.precio - b.precio;
            case 'precio-desc':
                return b.precio - a.precio;
            default:
                return 0;
        }
    });
    
    // Mostrar resultados
    mostrarProductos(productosFiltrados);
    
    // Mostrar estadísticas
    mostrarEstadisticas(productosFiltrados);
}

// Función para mostrar productos en el HTML
function mostrarProductos(productos) {
    listaProductos.innerHTML = '';
    
    if (productos.length === 0) {
        listaProductos.innerHTML = '<p>No se encontraron productos con los filtros seleccionados.</p>';
        contador.textContent = '0';
        return;
    }
    
    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.className = 'producto';
        
        productoDiv.innerHTML = `
            <div class="producto-info">
                <h3>${producto.nombre}</h3>
                <span class="producto-categoria">${producto.categoria}</span>
            </div>
            <div class="producto-precio">
                $${producto.precio.toFixed(2)}
            </div>
        `;
        
        listaProductos.appendChild(productoDiv);
    });
    
    contador.textContent = productos.length;
}

// Función para mostrar estadísticas
function mostrarEstadisticas(productos) {
    if (productos.length === 0) {
        estadisticasDiv.innerHTML = '';
        return;
    }
    
    // Calcular estadísticas con reduce
    const totalPrecio = productos.reduce((sum, producto) => sum + producto.precio, 0);
    const precioPromedio = totalPrecio / productos.length;
    
    // Encontrar producto más caro y más barato
    const productoMasCaro = productos.reduce((max, producto) => 
        producto.precio > max.precio ? producto : max, productos[0]);
    
    const productoMasBarato = productos.reduce((min, producto) => 
        producto.precio < min.precio ? producto : min, productos[0]);
    
    estadisticasDiv.innerHTML = `
        <p><strong>Estadísticas:</strong></p>
        <p>Precio total: $${totalPrecio.toFixed(2)}</p>
        <p>Precio promedio: $${precioPromedio.toFixed(2)}</p>
        <p>Producto más caro: ${productoMasCaro.nombre} ($${productoMasCaro.precio.toFixed(2)})</p>
        <p>Producto más barato: ${productoMasBarato.nombre} ($${productoMasBarato.precio.toFixed(2)})</p>
    `;
}

// Función para resetear filtros
function resetearFiltros() {
    precioMaxInput.value = '';
    categoriaSelect.value = '';
    ordenSelect.value = 'nombre-asc';
    busquedaInput.value = '';
    
    // Mostrar todos los productos sin filtros
    mostrarProductos(productos);
    mostrarEstadisticas(productos);
}

// Event Listeners
aplicarFiltrosBtn.addEventListener('click', aplicarFiltros);
resetFiltrosBtn.addEventListener('click', resetearFiltros);

// Mostrar todos los productos al cargar la página
document.addEventListener('DOMContentLoaded', resetearFiltros);