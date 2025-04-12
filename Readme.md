# Bienvenido

---
# Clase 1 (Planificador de Viajes)
Este proyecto es una aplicación web que permite a los usuarios planificar y registrar viajes, mostrando un itinerario con los detalles de cada viaje, incluyendo destino, fecha, transporte, número de personas y costo calculado.


# Descripcion

app.js 
* Propósito: Gestiona la lógica principal de la aplicación y la interacción con la interfaz de usuario.

**Funcionalidades:**

* iniciarApp: Función principal que inicializa la aplicación.

* Obtiene referencias al formulario (viajeForm) y al contenedor del itinerario (itinerarioList).

* Define la función mostrarItinerarioUI para renderizar los viajes almacenados en localStorage.

* Maneja el evento submit del formulario para registrar nuevos viajes usando la función registrarDestino del módulo viajes.js.

* Limpia el formulario después de registrar un viaje y actualiza la lista de itinerarios.

* mostrarItinerarioUI: Muestra los viajes registrados en el DOM, creando elementos HTML dinámicamente para cada destino.

* viajes.js
    * Propósito: Contiene la lógica para registrar destinos y calcular costos.

**Funcionalidades:**

* destinos: 
    * Array que almacena los viajes registrados, recuperados desde localStorage o inicializado como vacío.

* registrarDestino:
    * Crea un objeto con los datos del viaje (destino, fecha, transporte, personas y costo calculado).

* Guarda el nuevo viaje en el array destinos y actualiza localStorage.

* calcularCosto:

    * Calcula el costo base según el destino (París, Londres, Nueva York, Tokio).

    * Añade un costo adicional según el transporte (Avión, Tren, Autobús).

    * Aplica un descuento del 10% por cada persona adicional (más de 1).

## Ejecución
![Ejecucion ](/Imagenes/viajes1.png)

# Clase 2 (Gestión de lista de compras)

#### Clase Principal: `ListaDeCompras`

##### Funcionalidad Central
- **Persistencia de Datos**: Implementa un sistema CRUD completo con `localStorage` para mantener la lista de compras entre sesiones.
- **Gestión de Estado**: Mantiene y actualiza el estado interno de la lista de productos.

#### Métodos Clave

1. **Inicialización**:
   - Constructor auto-ejecutable que carga datos existentes al instanciarse
   - Integración inmediata con el DOM al iniciar

2. **Manejo de Storage**:
   - **Carga**: Recupera datos serializados de localStorage
   - **Guardado**: Persiste el estado actual de la lista automáticamente

3. **Operaciones CRUD**:
   - **Create**: Validación de duplicados antes de añadir
   - **Delete**: Eliminación con animación y confirmación visual
   - **Read**: Renderizado automático en el DOM

4. **Interfaz de Usuario**:
   - Sistema de notificaciones temporales para acciones
   - Actualización en tiempo real de la lista visible
   - Manejo de eventos delegados para elementos dinámicos

#### Flujo de Trabajo
1. **Agregar Productos**:
   - Validación de entrada → Almacenamiento → Actualización UI
   - Feedback visual inmediato

2. **Eliminar Productos**:
   - Animación de salida → Eliminación lógica → Persistencia → Notificación

3. **Sincronización**:
   - Estado interno ↔ localStorage ↔ DOM
   - Actualización coherente en todos los niveles

## Ejecución
![Ejecucion ](/Imagenes/gestion1.png)
 
![Ejecucion](/Imagenes/gestion2.png)

![Ejecucion](/Imagenes/gestion3.png)

![Ejecucion](/Imagenes/gestion4.png)

![Ejecucion](/Imagenes/gestion5.png)

# Clase 3 (Filtro de articulos)
En este proyecto se muestran filtro de selección de los articulos disponibles en nuestra tienda.
## 🛍️ Base de Datos de Productos
- Contiene 12 productos con:
  - Nombre
  - Precio
  - Categoría (Electrónicos, Libros, Ropa, Hogar)

## 🎚️ Sistema de Filtrado
### Filtros Disponibles:
1. **Precio máximo**: Slider/input numérico
2. **Categoría**: Dropdown con opciones
3. **Búsqueda por texto**: Búsqueda por nombre
4. **Ordenamiento**:
   - Nombre (A-Z/Z-A)
   - Precio (ascendente/descendente)

## 🔧 Funcionalidades Principales
### `aplicarFiltros()`
- Combina múltiples filtros en una sola operación
- Lógica de filtrado:
  - Rango de precios
  - Coincidencia de categoría
  - Búsqueda textual en nombres
- Ordenamiento multidimensional

### `mostrarProductos()`
- Renderizado dinámico de tarjetas de productos
- Diseño responsive con:
  - Nombre destacado
  - Categoría como badge
  - Precio formateado
- Contador de resultados visible

### `mostrarEstadisticas()`
- Cálculo en tiempo real de:
  - Precio total del conjunto filtrado
  - Precio promedio
  - Producto más caro/barato
- Uso intensivo de `reduce()` para operaciones

### `resetearFiltros()`
- Limpieza completa de formulario
- Restauración al estado inicial
- Recarga del catálogo completo

## 🖥️ Interfaz de Usuario
- **Sección de controles**:
  - Formulario unificado de filtros
  - Botones de acción primaria/secundaria
- **Área de resultados**:
  - Grid de productos
  - Contador prominente
  - Panel de estadísticas detallado

## 🔄 Flujo de Trabajo
1. Inicialización con catálogo completo
2. Aplicación de filtros combinables
3. Re-renderizado automático al cambiar parámetros
4. Feedback visual inmediato:
   - Conteo de productos
   - Estadísticas actualizadas

## 📊 Características Avanzadas
- Persistencia de filtros durante sesión
- Manejo de estados vacíos (0 resultados)
- Formateo profesional de precios
- Optimización de renderizado (innerHTML vs DOM)

## 🛠️ Tecnologías Utilizadas
- Vanilla JavaScript (ES6+)
- Programación funcional (filter, sort, reduce)
- Manipulación eficiente del DOM
- Semántica HTML accesible

## Ejecución
![Ejecucion ](/Imagenes/filtro1.png)
 
![Ejecucion](/Imagenes/filtro2.png)

# Clase 4 (Asiento para invitados)


En este proyecto se muestra el ordanamiento de los invitados por mesas y sus unioneso asignaciones de las mesas

## 🎯 Funcionalidad Principal
Sistema completo para gestión de invitados que:
- Detecta parejas por inicial de nombre
- Asigna mesas inteligentemente
- Soporta entrada manual y desde Excel
- Genera reportes detallados

## 🔧 Componentes Principales

### 1. Módulo de Entrada de Datos
- **Input manual**: Campo de texto con validación
- **Carga de archivos**: Soporte para Excel (.xlsx)
- **Preprocesamiento**: Normalización y limpieza de datos

### 2. Núcleo de Procesamiento
- **Algoritmo de emparejamiento**:
  - Técnica de ventana deslizante
  - Comparación por iniciales
  - Optimizado para O(n)

- **Sistema de asignación de mesas**:
  - Lógica de agrupamiento por letra
  - Capacidad dinámica (máx. 5 parejas/mesa)
  - Límite de 26 mesas (A-Z)
  - Distribución balanceada

### 3. Generador de Reportes
- **Visualización por mesa**:
  - Tarjetas interactivas
  - Detalle de ocupación
  - Indicadores de capacidad

- **Estadísticas consolidadas**:
  - Totales y distribuciones
  - Eficiencia de asignación
  - Métricas clave

## 🛠️ Tecnologías Integradas
- **Frontend**: Vanilla JS + DOM API
- **Procesamiento de datos**: SheetJS (xlsx)
- **Algoritmos**: Optimización para asignación de recursos

## ✅ Manejo de Errores
- Validación de formato de entrada
- Control de límites (mínimo invitados, máx. mesas)
- Feedback claro al usuario

## 📊 Salidas Generadas
1. Listado de parejas detectadas
2. Asignación visual de mesas
3. Reporte estadístico completo
4. Indicadores de eficiencia

![Ejecucion ](/Imagenes/invitados1.png)
 
![Ejecucion](/Imagenes/invitados2.png)

![Ejecucion](/Imagenes/invitados3.png)


# Clase 5 (La palabra más larga)
En este proyecto buscamos la palabra más larga de una lista o tupla de palabras

## 🎯 Funcionalidad Principal
Aplicación interactiva que:
- Encuentra la palabra más larga en un texto
- Visualiza el proceso de búsqueda paso a paso
- Compara palabras con animaciones
- Muestra estadísticas en tiempo real

## 🖥️ Componentes de Interfaz
- **Área de entrada**: Campo de texto para ingresar contenido
- **Botón de acción**: Dispara el proceso de análisis
- **Contenedor visual**: Muestra todas las palabras como elementos individuales
- **Panel de estado**: Informa el progreso del análisis
- **Resultado final**: Destaca la palabra más larga encontrada

## 🔍 Algoritmo de Búsqueda
### Versión Visualizada (`findLongestWordWithVisualization`)
1. **Preprocesamiento**:
   - Divide el texto en palabras válidas
   - Filtra cadenas vacías
   - Crea elementos visuales para cada palabra

2. **Proceso Iterativo**:
   - Recorre palabras con delay animado
   - Resalta palabra actual (estilo temporal)
   - Compara longitud con el máximo actual
   - Actualiza el máximo cuando corresponde
   - Proporciona feedback en cada paso

3. **Visualización**:
   - Estilos CSS dinámicos para:
     - Palabra actual (resaltado temporal)
     - Palabra más larga (resaltado permanente)
   - Temporizadores para mejor experiencia UX

### Versión Simplificada (`findLongestWord`)
- Algoritmo base sin visualización
- Lógica de comparación directa
- Retorno del resultado final

## ⏱️ Temporización y Animación
- Función `sleep()` para pausas controladas
- Delay de 1 segundo entre operaciones
- Transiciones visuales suaves
- Feedback textual durante el proceso

## 📊 Salida de Resultados
1. **Durante el proceso**:
   - Contador de progreso (x/y palabras)
   - Longitud de palabra actual
   - Comparación con máximo actual

2. **Resultado final**:
   - Palabra más larga destacada
   - Longitud en caracteres
   - Mensaje explicativo claro

## 🛠️ Tecnologías Utilizadas
- Vanilla JavaScript (ES6+)
- Manipulación dinámica del DOM
- Promesas para control de tiempo
- CSS para efectos visuales
- Enfoque mobile-first


![Ejecucion ](/Imagenes/palabra1.png)
 
![Ejecucion](/Imagenes/palabra2.png)


# Clase 6 (Lista de regalos)

En este proyecto se realiza la recursion para recorrer una lista de regalos y mostrarnos la posición del regalo a buscar en la lista de regalos.

## 🎁 Funcionalidad Principal
Aplicación web que permite:
- Crear listas personalizadas de regalos
- Buscar regalos específicos en la lista
- Visualizar la posición de los regalos encontrados
- Mostrar feedback claro cuando no se encuentra un regalo

## 🏗️ Estructura de Clases

### Clase `GiftFinder`
- **Constructor**: Recibe un array de regalos
- **Método público `find`**: Inicia la búsqueda
- **Método protegido `_findRecursive`**:
  - Implementa búsqueda recursiva
  - Casos base:
    - Fin de lista (regalo no encontrado)
    - Regalo encontrado (devuelve posición)
  - Llamada recursiva incrementando el índice

## 💻 Interfaz de Usuario
- **Área de entrada**:
  - Campo para lista de regalos (separados por espacios)
  - Campo para regalo a buscar
  - Botón de búsqueda (también funciona con Enter)
- **Visualización**:
  - Tags de regalos con sus posiciones
  - Área de resultados con mensajes colorizados
- **Estados**:
  - Éxito (verde): Regalo encontrado
  - Error (rojo): Regalo no encontrado o inputs vacíos

## 🔄 Flujo de Trabajo
1. Usuario ingresa lista de regalos
2. La lista se visualiza inmediatamente como tags numerados
3. Usuario escribe regalo a buscar
4. Al buscar:
   - Valida inputs
   - Ejecuta búsqueda recursiva
   - Muestra resultado con estilo contextual

## ⚙️ Funciones Principales
- `updateGiftList()`:
  - Actualiza visualización de tags al modificar la lista
  - Maneja lista vacía
- `searchGift()`:
  - Valida inputs
  - Instancia GiftFinder
  - Procesa resultado
- `showResult()`:
  - Muestra mensajes con estilos según tipo
  - Soporta múltiples clases CSS

## 🎨 Experiencia de Usuario
- Feedback visual inmediato al:
  - Modificar lista de regalos
  - Realizar búsquedas
- Mensajes descriptivos para:
  - Éxito en búsqueda
  - Errores (inputs vacíos, no encontrado)
- Diseño minimalista y funcional

## 📱 Características Técnicas
- Búsqueda recursiva pura
- Manipulación dinámica del DOM
- Event listeners para:
  - Cambios en input
  - Clicks
  - Tecla Enter
- Estilización condicional con clases CSS
- Métodos públicos/protegidos bien definidos


![Ejecucion ](/Imagenes/regalos1.png)
 
![Ejecucion](/Imagenes/regalos2.png)


# Clase 7 (Máximo de un arreglo)

![Ejecucion ](/Imagenes/gestion1.png)
 
![Ejecucion](/Imagenes/gestion2.png)

![Ejecucion](/Imagenes/gestion3.png)

![Ejecucion](/Imagenes/gestion4.png)

![Ejecucion](/Imagenes/gestion5.png)


# Clase 8 (Gestor de notas personales)

# Sistema de Gestión de Notas en Node.js

## 📄 Características Principales
- **Gestión CRUD** completo para notas personales
- **Persistencia en JSON** con formato legible
- **Operaciones síncronas** para simplificar el flujo
- **Feedback claro** en consola para cada acción

## 🛠️ Componentes Clave

### 🔍 Módulos Utilizados
- `fs` para operaciones de archivos
- `path` para manejo de rutas
- `console` para mostrar resultados

### 📂 Estructura de Datos
- Archivo `notas.json` como base de datos
- Cada nota contiene:
  - Título (identificador único)
  - Contenido (texto libre)

## ⚙️ Funcionalidades

### ➕ Agregar Notas
- Añade nuevas entradas al array
- Mantiene formato indentado (2 espacios)
- Maneja creación inicial del archivo

### 📜 Listar Notas
- Muestra enumeración clara
- Formatea título y contenido separadamente
- Detecta archivo vacío/inexistente

### ❌ Eliminar Notas
- Búsqueda por título exacto
- Filtrado inmutables del array
- Confirmación de operación

## 💻 Interfaz
- **Consola como interfaz principal**
- Mensajes descriptivos para:
  - Éxito en operaciones
  - Errores comunes
  - Estados vacíos

## ⚠️ Limitaciones Actuales
- Operaciones bloqueantes (sync)
- Sin validación de datos de entrada
- Búsqueda solo por título exacto
- Sin paginación para listas largas

## 🔄 Flujo de Trabajo
1. Verificar existencia de archivo
2. Cargar datos existentes (o inicializar)
3. Aplicar operación (add/read/delete)
4. Persistir cambios (si aplica)
5. Mostrar resultados

## 🚀 Posibles Mejoras
1. Versión asíncrona con promesas/async-await
2. Sistema de categorización
3. Búsqueda por contenido
4. Histórico de modificaciones
5. Exportación a otros formatos

> **Nota**: Ejemplo práctico para aprender operaciones básicas de archivos en Node.js

![Ejecucion ](/Imagenes/notas.png)


---
# Licencia 
Este proyecto está licenciado bajo la Licencia MIT. Para más detalles, consulta el archivo LICENSE.

# Requisitos Previos
* Node.js (para ejecutar archivos JavaScript en un entorno de servidor)
---
# Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para discutir cualquier cambio que desees realizar.