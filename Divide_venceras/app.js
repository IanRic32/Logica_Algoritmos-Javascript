document.addEventListener('DOMContentLoaded', function() {
    const arrayInput = document.getElementById('array-input');
    const findMaxBtn = document.getElementById('find-max');
    const resultDiv = document.getElementById('result');
    const stepsDiv = document.getElementById('steps');
    
    findMaxBtn.addEventListener('click', function() {
        // Limpiar resultados anteriores
        stepsDiv.textContent = '';
        
        // Obtener y procesar el arreglo de entrada
        const inputText = arrayInput.value;
        const arr = inputText.split(',').map(item => parseInt(item.trim()));
        
        // Verificar que todos los elementos sean números válidos
        if (arr.some(isNaN)) {
            resultDiv.textContent = 'Error: Ingresa solo números separados por comas';
            resultDiv.style.color = '#e74c3c';
            return;
        }
        
        // Mostrar el arreglo original
        stepsDiv.textContent += `Arreglo original: [${arr.join(', ')}]\n\n`;
        
        // Encontrar el máximo usando Divide y Vencerás
        const max = findMax(arr);
        
        // Mostrar el resultado
        resultDiv.textContent = `El número máximo es: ${max}`;
        resultDiv.style.color = '#27ae60';
    });
    
    // Función principal que implementa Divide y Vencerás
    function findMax(arr, depth = 0) {
        // Caso base: arreglo con un solo elemento
        if (arr.length === 1) {
            stepsDiv.textContent += `${'  '.repeat(depth)}Caso base: [${arr[0]}] → máximo = ${arr[0]}\n`;
            return arr[0];
        }
        
        // Dividir el arreglo en dos mitades
        const mid = Math.floor(arr.length / 2);
        const left = arr.slice(0, mid);
        const right = arr.slice(mid);
        
        stepsDiv.textContent += `${'  '.repeat(depth)}Dividiendo: [${arr.join(', ')}] en [${left.join(', ')}] y [${right.join(', ')}]\n`;
        
        // Llamadas recursivas para cada mitad
        const leftMax = findMax(left, depth + 1);
        const rightMax = findMax(right, depth + 1);
        
        // Combinar resultados
        const currentMax = Math.max(leftMax, rightMax);
        
        stepsDiv.textContent += `${'  '.repeat(depth)}Combinando: máximo de ${leftMax} (izquierda) y ${rightMax} (derecha) → ${currentMax}\n`;
        
        return currentMax;
    }
});