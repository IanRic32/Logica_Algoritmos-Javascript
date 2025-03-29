document.addEventListener('DOMContentLoaded', function() {
    const findPairsBtn = document.getElementById('find-pairs');
    const guestListInput = document.getElementById('guest-list');
    const resultDiv = document.getElementById('result');
    const processDiv = document.getElementById('process');
    
    findPairsBtn.addEventListener('click', function() {
        // Limpiar resultados anteriores
        resultDiv.innerHTML = '';
        processDiv.innerHTML = '';
        
        // Obtener y procesar la lista de invitados
        const guestInput = guestListInput.value.trim();
        const guests = guestInput.split(',').map(name => name.trim()).filter(name => name.length > 0);
        
        // Ordenar alfabéticamente (como en el problema original)
        const sortedGuests = [...guests].sort((a, b) => a.localeCompare(b));
        
        // Mostrar lista ordenada en el proceso
        processDiv.innerHTML += `<div class="step">Lista ordenada: [${sortedGuests.join(', ')}]</div>`;
        
        // Encontrar pareja usando el algoritmo de dos punteros
        const pair = encontrarPareja(sortedGuests);
        
        // Mostrar resultados
        if (pair) {
            resultDiv.innerHTML = `
                <p class="pair-found">Primera pareja encontrada: <strong>${pair[0]}</strong> y <strong>${pair[1]}</strong></p>
                <p>Ambos nombres comienzan con la letra <strong>"${pair[0][0]}"</strong></p>
            `;
        } else {
            resultDiv.innerHTML = '<p class="no-pair">No se encontraron parejas de invitados con la misma letra inicial.</p>';
        }
    });
});

function encontrarPareja(arr) {
    let inicio = 0;
    let siguiente = 1;
    const processDiv = document.getElementById('process');
    
    while (siguiente < arr.length) {
        const firstLetter1 = arr[inicio][0].toUpperCase();
        const firstLetter2 = arr[siguiente][0].toUpperCase();
        
        processDiv.innerHTML += `
            <div class="step">
                Comparando: ${arr[inicio]} (${firstLetter1}) y ${arr[siguiente]} (${firstLetter2})
            </div>
        `;
        
        if (firstLetter1 === firstLetter2) {
            processDiv.innerHTML += `
                <div class="step" style="background: #d4edda;">
                    ¡Coincidencia encontrada! ${arr[inicio]} y ${arr[siguiente]} comienzan con "${firstLetter1}"
                </div>
            `;
            return [arr[inicio], arr[siguiente]];
        }
        
        // Avanzar punteros
        inicio++;
        siguiente++;
    }
    
    processDiv.innerHTML += `
        <div class="step" style="background: #f8d7da;">
            Se recorrió toda la lista sin encontrar parejas con la misma letra inicial
        </div>
    `;
    
    return null;
}