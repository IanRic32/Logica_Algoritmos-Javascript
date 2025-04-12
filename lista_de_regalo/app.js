// class GiftFinder {
//     constructor(giftsList) {// Constructor que recibe una lista de regalos
//         this.gifts = giftsList;
//     }
  
//     // Método público para iniciar la búsqueda
//     find(giftName) {
//       return this._findRecursive(giftName);
//     }
  
//     //creamos el metodo protegido
//     _findRecursive(giftName, index = 0) {
//       // Caso base 1: Fin de la lista
//     if (index === this.gifts.length) {
//         return `Ya termino la lista de ragalos y el regalo:"${giftName}" no se encuentra en la lista.`;
//     }
//       // Caso base 2: Regalo encontrado
//     if (this.gifts[index] === giftName) {
//         return `El regalo: ${giftName} está en la posición ${index}.`;
//     }
//       // Llamada recursiva
//       return this._findRecursive(giftName, index + 1);
//     }
// }
// const giftList = ["Muñeca", "Carro de juguete", "Rompecabezas", "Lego", "Pelota"];
// const finder = new GiftFinder(giftList);
// console.log(finder.find("Lego"));
// console.log(finder.find("Camión"));
// console.log(finder.find("Muñeca"));
// console.log(finder.find("Pelota"));




class GiftFinder {
  constructor(giftsList) {
      this.gifts = giftsList;
  }
  
  find(giftName) {
      return this._findRecursive(giftName);
  }
  
  _findRecursive(giftName, index = 0) {
      if (index === this.gifts.length) {
          return `Ya terminó la lista de regalos y el regalo: "${giftName}" no se encuentra en la lista.`;
      }
      if (this.gifts[index] === giftName) {
          return `El regalo: ${giftName} está en la posición ${index}.`;
      }
      return this._findRecursive(giftName, index + 1);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const giftsInput = document.getElementById('giftsInput');
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const resultDiv = document.getElementById('result');
  const giftTagsDiv = document.getElementById('giftTags');
  
  // Mostrar la lista inicial de regalos
  updateGiftList();
  
  // Actualizar la lista visual cuando cambia el input
  giftsInput.addEventListener('input', updateGiftList);
  
  // Manejar la búsqueda
  searchButton.addEventListener('click', searchGift);
  searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
          searchGift();
      }
  });
  
  function updateGiftList() {
      const gifts = giftsInput.value.split(' ').filter(gift => gift.trim() !== '');
      giftTagsDiv.innerHTML = '';
      
      if (gifts.length === 0) {
          giftTagsDiv.innerHTML = '<span style="color: #777;">No hay regalos en la lista</span>';
          return;
      }
      
      gifts.forEach((gift, index) => {
          const tag = document.createElement('span');
          tag.className = 'gift-tag';
          tag.textContent = `${index}: ${gift}`;
          giftTagsDiv.appendChild(tag);
      });
  }
  
  function searchGift() {
      const gifts = giftsInput.value.split(' ').filter(gift => gift.trim() !== '');
      const giftToFind = searchInput.value.trim();   
      if (gifts.length === 0) {
          showResult('Por favor ingresa una lista de regalos primero.', 'error');
          return;
      }
      
      if (!giftToFind) {
          showResult('Por favor ingresa un regalo para buscar.', 'error');
          return;
      }
      
      const finder = new GiftFinder(gifts);
      const result = finder.find(giftToFind);
      
      if (result.includes('no se encuentra')) {
          showResult(result, 'error');
      } else {
          showResult(result, 'success');
      }
  }
  
  function showResult(message, type) {
      resultDiv.textContent = message;
      resultDiv.className = 'result';
      resultDiv.classList.add(type);
      resultDiv.style.display = 'block';
  }
});