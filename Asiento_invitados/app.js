document.addEventListener('DOMContentLoaded', function() {
    const findPairsBtn = document.getElementById('find-pairs');
    const guestListInput = document.getElementById('guest-list');
    const fileInput = document.getElementById('file-input');
    const resultDiv = document.getElementById('result');
    const processDiv = document.getElementById('process');
    const allPairsDiv = document.getElementById('all-pairs');
    const tablesAssignmentDiv = document.getElementById('tables-assignment');
    
    // Manejar búsqueda desde input manual
    findPairsBtn.addEventListener('click', function() {
        processGuestList(guestListInput.value.trim());
    });
    
    // Manejar carga de archivo
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            
            // Tomar la primera hoja
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet);
            
            // Verificar que tenga columna "Invitado"
            if (jsonData.length > 0 && !('Invitado' in jsonData[0])) {
                resultDiv.innerHTML = '<p class="no-pair">Error: El archivo debe tener una columna con encabezado "Invitado"</p>';
                return;
            }
            
            // Extraer lista de invitados
            const guests = jsonData.map(row => row.Invitado.trim()).filter(name => name.length > 0);
            
            // Mostrar info del archivo
            resultDiv.innerHTML = `
                <p>Archivo cargado: <strong>${file.name}</strong></p>
                <p>Total invitados: <strong>${guests.length}</strong></p>
            `;
            
            // Procesar lista
            processGuestList(guests.join(', '));
        };
        
        reader.readAsArrayBuffer(file);
    });
    
    function processGuestList(guestInput) {
        // Limpiar resultados anteriores
        processDiv.innerHTML = '';
        allPairsDiv.innerHTML = '';
        tablesAssignmentDiv.innerHTML = '';
        
        // Obtener y procesar la lista de invitados
        const guests = guestInput.split(',').map(name => name.trim()).filter(name => name.length > 0);
        
        if (guests.length < 2) {
            resultDiv.innerHTML += '<p class="no-pair">Error: Se necesitan al menos 2 invitados</p>';
            return;
        }
        
        // Ordenar alfabéticamente
        const sortedGuests = [...guests].sort((a, b) => a.localeCompare(b));
        
        // Mostrar lista ordenada en el proceso
        processDiv.innerHTML += `<div class="step">Lista ordenada: [${sortedGuests.join(', ')}]</div>`;
        
        // Encontrar todas las parejas
        const allPairs = encontrarTodasLasParejas(sortedGuests);
        
        // Mostrar resultados
        if (allPairs.length > 0) {
            resultDiv.innerHTML += `
                <p class="pair-found">Total parejas encontradas: <strong>${allPairs.length}</strong></p>
                <p>Total invitados con pareja: <strong>${allPairs.length * 2}</strong></p>
            `;
            
            // Organizar mesas
            const mesas = organizarMesas(allPairs);
            
            // Mostrar asignación de mesas
            mostrarAsignacionMesas(mesas);
            
            // Mostrar resumen
            mostrarResumen(mesas);
        } else {
            resultDiv.innerHTML += '<p class="no-pair">No se encontraron parejas de invitados con la misma letra inicial.</p>';
        }
    }
    
    function encontrarTodasLasParejas(arr) {
        let inicio = 0;
        let siguiente = 1;
        const pairs = [];
        
        while (siguiente < arr.length) {
            const firstLetter1 = arr[inicio][0].toUpperCase();
            const firstLetter2 = arr[siguiente][0].toUpperCase();
            
            if (firstLetter1 === firstLetter2) {
                pairs.push([arr[inicio], arr[siguiente]]);
            }
            
            // Avanzar punteros
            inicio++;
            siguiente++;
        }
        
        return pairs;
    }
    
    function organizarMesas(pairs) {
        // Agrupar parejas por letra inicial
        const gruposPorLetra = {};
        pairs.forEach(pair => {
            const letra = pair[0][0].toUpperCase();
            if (!gruposPorLetra[letra]) {
                gruposPorLetra[letra] = [];
            }
            gruposPorLetra[letra].push(pair);
        });
        
        // Ordenar letras alfabéticamente
        const letrasOrdenadas = Object.keys(gruposPorLetra).sort();
        
        // Asignar a mesas
        const mesas = [];
        let mesaActual = 1;
        mesas[mesaActual] = { letras: [], parejas: [], espacios: 5 };
        
        for (const letra of letrasOrdenadas) {
            const parejasLetra = gruposPorLetra[letra];
            let parejasPorAsignar = parejasLetra.length;
            let asignadas = 0;
            
            while (asignadas < parejasLetra.length) {
                const espacioDisponible = mesas[mesaActual].espacios;
                const puedeTomar = Math.min(espacioDisponible, parejasPorAsignar);
                
                if (puedeTomar > 0) {
                    // Agregar a la mesa actual
                    mesas[mesaActual].letras.push(letra);
                    mesas[mesaActual].parejas.push(...parejasLetra.slice(asignadas, asignadas + puedeTomar));
                    mesas[mesaActual].espacios -= puedeTomar;
                    asignadas += puedeTomar;
                    parejasPorAsignar -= puedeTomar;
                }
                
                // Si la mesa está llena o no puede tomar más, pasar a la siguiente
                if (mesas[mesaActual].espacios === 0 || parejasPorAsignar > 0) {
                    mesaActual++;
                    if (!mesas[mesaActual]) {
                        mesas[mesaActual] = { letras: [], parejas: [], espacios: 5 };
                    }
                }
                
                // Limitar a 26 mesas
                if (mesaActual > 26) break;
            }
            
            if (mesaActual > 26) break;
        }
        
        // Filtrar mesas no vacías
        return mesas.filter((mesa, index) => index > 0 && mesa.parejas.length > 0);
    }
    
    function mostrarAsignacionMesas(mesas) {
        tablesAssignmentDiv.innerHTML = '<h2>Asignación de Mesas:</h2>';
        
        mesas.forEach((mesa, index) => {
            const mesaNumero = index + 1;
            let letrasUnicas = [...new Set(mesa.letras)].join(', ');
            
            let guestsHTML = '';
            mesa.parejas.forEach(pair => {
                guestsHTML += `
                    <div class="guest-item">
                        <span class="letter-tag">${pair[0][0].toUpperCase()}</span>
                        ${pair[0]} y ${pair[1]}
                    </div>
                `;
            });
            
            tablesAssignmentDiv.innerHTML += `
                <div class="table-card">
                    <h3 class="table-title">Mesa ${mesaNumero} (Letras: ${letrasUnicas})</h3>
                    <div class="table-guests">${guestsHTML}</div>
                    <p class="capacity-info">
                        Parejas: ${mesa.parejas.length} | 
                        Asientos ocupados: ${mesa.parejas.length * 2}/10 | 
                        Espacios para parejas: ${5 - mesa.parejas.length}
                    </p>
                </div>
            `;
        });
    }
    
    function mostrarResumen(mesas) {
        let resumenHTML = `
            <div class="summary-section">
                <h3>Resumen General</h3>
                <p>Total mesas utilizadas: <strong>${mesas.length}</strong></p>
                <p>Total parejas asignadas: <strong>${mesas.reduce((sum, mesa) => sum + mesa.parejas.length, 0)}</strong></p>
        `;
        
        // Calcular distribución por letra
        const letrasMap = {};
        mesas.forEach(mesa => {
            mesa.letras.forEach(letra => {
                letrasMap[letra] = (letrasMap[letra] || 0) + 1;
            });
        });
        
        if (Object.keys(letrasMap).length > 0) {
            resumenHTML += `<p>Distribución por letra inicial:</p><ul>`;
            
            Object.entries(letrasMap).sort().forEach(([letra, count]) => {
                resumenHTML += `<li>Letra ${letra}: ${count} mesa(s)</li>`;
            });
            
            resumenHTML += `</ul>`;
        }
        
        resumenHTML += `</div>`;
        tablesAssignmentDiv.innerHTML += resumenHTML;
    }
});