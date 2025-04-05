document.addEventListener('DOMContentLoaded', function() {
    const inputText = document.getElementById('inputText');
    const findButton = document.getElementById('findButton');
    const wordsContainer = document.getElementById('wordsContainer');
    const currentStatus = document.getElementById('currentStatus');
    const longestWordResult = document.getElementById('longestWordResult');
    
    findButton.addEventListener('click', async function() {
        const text = inputText.value;
        wordsContainer.innerHTML = '';
        currentStatus.textContent = '';
        longestWordResult.textContent = '';
        
        await findLongestWordWithVisualization(text);
    });
    
    async function findLongestWordWithVisualization(text) {
        // Dividir el texto en palabras
        const words = text.split(/\s+/).filter(word => word.length > 0);
        
        if (words.length === 0) {
            longestWordResult.textContent = "No se encontraron palabras";
            return;
        }
        
        let longestWord = '';
        
        // Mostrar todas las palabras en el contenedor
        words.forEach(word => {
            const wordElement = document.createElement('div');
            wordElement.className = 'word-box';
            wordElement.textContent = word;
            wordElement.dataset.length = word.length;
            wordsContainer.appendChild(wordElement);
        });
        
        const wordElements = document.querySelectorAll('.word-box');
        
        // Recorrer cada palabra con animación
        for (let i = 0; i < words.length; i++) {
            const currentWord = words[i];
            const currentWordElement = wordElements[i];
            
            // Resaltar la palabra actual
            currentWordElement.classList.add('current');
            
            // Mostrar información del paso actual
            currentStatus.textContent = `Procesando palabra ${i+1}/${words.length}: "${currentWord}" (${currentWord.length} letras)`;
            
            // Esperar para la animación
            await sleep(1000);
            
            // Comparar con la palabra más larga
            if (currentWord.length > longestWord.length) {
                // Quitar el resaltado de la palabra más larga anterior
                document.querySelectorAll('.word-box.longest').forEach(el => {
                    el.classList.remove('longest');
                });
                
                longestWord = currentWord;
                currentWordElement.classList.add('longest');
                
                currentStatus.textContent += ` → Nueva palabra más larga!`;
            } else {
                currentStatus.textContent += ` → La más larga sigue siendo "${longestWord}"`;
            }
            
            // Esperar antes de pasar a la siguiente palabra
            await sleep(1000);
            
            // Quitar el resaltado de la palabra actual
            currentWordElement.classList.remove('current');
        }
        
        // Mostrar el resultado final
        longestWordResult.textContent = `La palabra más larga es: "${longestWord}" (${longestWord.length} letras)`;
    }
    
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // Función original del algoritmo (sin visualización)
    function findLongestWord(text) {
        const words = text.split(/\s+/).filter(word => word.length > 0);
        let longestWord = '';
        
        for (const word of words) {
            if (word.length > longestWord.length) {
                longestWord = word;
            }
        }
        
        return longestWord;
    }
});