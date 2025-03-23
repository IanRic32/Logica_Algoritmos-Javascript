class ListaDeCompras {
    constructor() {
        this.lista = this.cargarListaDesdeLocalStorage();
        this.mostrarLista();
    }

    cargarListaDesdeLocalStorage() {
        const listaGuardada = localStorage.getItem('listaCompras');
        return listaGuardada ? JSON.parse(listaGuardada) : [];
    }

    guardarListaEnLocalStorage() {
        localStorage.setItem('listaCompras', JSON.stringify(this.lista));
    }

    agregarProducto(producto) {
        if (!this.lista.includes(producto)) {
            this.lista.push(producto);
            this.guardarListaEnLocalStorage();
            this.mostrarLista();
        } else {
            alert(`${producto} ya está en la lista de compras.`);
        }
    }

    eliminarProducto(producto) {
        const index = this.lista.indexOf(producto);
        if (index !== -1) {
            // Aplicar animación al ítem
            const listaCompras = document.getElementById("listaCompras");
            const itemAEliminar = listaCompras.children[index];
            itemAEliminar.classList.add("eliminando");

            // Esperar a que termine la animación antes de eliminar el ítem
            itemAEliminar.addEventListener("animationend", () => {
                this.lista.splice(index, 1);
                this.guardarListaEnLocalStorage();
                this.mostrarLista();
                this.mostrarMensajeEliminado(producto);
            }, { once: true });
        }
    }

    mostrarLista() {
        const listaCompras = document.getElementById("listaCompras");
        listaCompras.innerHTML = ""; // Limpiar la lista antes de mostrar

        this.lista.forEach((producto) => {
            const li = document.createElement("li");
            li.textContent = producto;

            const eliminarBtn = document.createElement("button");
            eliminarBtn.textContent = "Eliminar";
            eliminarBtn.classList.add("eliminarBtn");
            eliminarBtn.addEventListener("click", () => {
                this.eliminarProducto(producto);
            });

            li.appendChild(eliminarBtn);
            listaCompras.appendChild(li);
        });
    }

    mostrarMensajeEliminado(producto) {
        // Crear el mensaje
        const mensaje = document.createElement("div");
        mensaje.textContent = `El ${producto} se eliminó de la lista de compras.`;
        mensaje.classList.add("mensaje-eliminado");

        // Agregar el mensaje al cuerpo del documento
        document.body.appendChild(mensaje);

        // Eliminar el mensaje después de 3 segundos
        setTimeout(() => {
            mensaje.remove();
        }, 3000);
    }
}

// Instancia de la lista de compras
const miLista = new ListaDeCompras();

// Evento para agregar un producto
document.getElementById("agregarBtn").addEventListener("click", () => {
    const itemInput = document.getElementById("itemInput");
    const producto = itemInput.value.trim();

    if (producto !== "") {
        miLista.agregarProducto(producto);
        itemInput.value = ""; // Limpiar el campo de entrada
    } else {
        alert("Por favor, ingresa un artículo válido.");
    }
});