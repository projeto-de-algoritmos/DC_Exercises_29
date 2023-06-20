function reversePairs(nums: number[]): number {
    let contagem = 0; // Contador de pares invertidos
  
    mergeSort(nums, 0, nums.length - 1); // Aplica o merge sort no array original
  
    return contagem;
  
    function mergeSort(nums: number[], esquerda: number, direita: number): void {
      if (esquerda >= direita) {
        return; // Condição de parada: subarray com tamanho 1 ou menor
      }
  
      const meio = Math.floor((esquerda + direita) / 2);
  
      mergeSort(nums, esquerda, meio); // Ordena a metade esquerda do subarray
      mergeSort(nums, meio + 1, direita); // Ordena a metade direita do subarray
  
      merge(nums, esquerda, meio, direita); // Combina as duas metades ordenadas
    }
  
    function merge(nums: number[], esquerda: number, meio: number, direita: number): void {
      const temp: number[] = []; // Array temporário para armazenar a combinação ordenada
      let i = esquerda; // Ponteiro para a metade esquerda do subarray
      let j = meio + 1; // Ponteiro para a metade direita do subarray
  
      // Compara os elementos das duas metades e conta os pares invertidos
      while (i <= meio && j <= direita) {
        if (nums[i] <= 2 * nums[j]) {
          i++;
        } else {
          contagem += meio - i + 1;
          j++;
        }
      }
  
      i = esquerda;
      j = meio + 1;
      let k = 0;
  
      // Combina as duas metades ordenadas no array temporário
      while (i <= meio && j <= direita) {
        if (nums[i] <= nums[j]) {
          temp[k++] = nums[i++];
        } else {
          temp[k++] = nums[j++];
        }
      }
  
      // Copia os elementos restantes da metade esquerda, se houver
      while (i <= meio) {
        temp[k++] = nums[i++];
      }
  
      // Copia os elementos restantes da metade direita, se houver
      while (j <= direita) {
        temp[k++] = nums[j++];
      }
  
      // Copia os elementos ordenados do array temporário de volta para o array original
      for (let p = 0; p < temp.length; p++) {
        nums[esquerda + p] = temp[p];
      }
    }
  }
  