function findKthLargest(nums: number[], k: number): number {
  const n = nums.length;
  const indiceAlvo = n - k; // Índice do elemento desejado

  return quickSelect(nums, 0, n - 1, indiceAlvo);
}

function quickSelect(nums: number[], esquerda: number, direita: number, indiceAlvo: number): number {
  if (esquerda === direita) {
    return nums[esquerda];
  }

  // Seleciona um elemento como pivo usando a mediana das medianas
  const indicePivo = medianaDasMedianas(nums, esquerda, direita);

  // Realiza a particao com base no pivo selecionado
  const indiceParticao = particionar(nums, esquerda, direita, indicePivo);

  // Verifica em qual parte do array está o elemento desejado
  if (indiceAlvo === indiceParticao) {
    return nums[indiceParticao];
  } else if (indiceAlvo < indiceParticao) {
    // Se o elemento desejado está à esquerda da partição, faz a chamada recursiva na parte esquerda
    return quickSelect(nums, esquerda, indiceParticao - 1, indiceAlvo);
  } else {
    // Se o elemento desejado está à direita da partição, faz a chamada recursiva na parte direita
    return quickSelect(nums, indiceParticao + 1, direita, indiceAlvo);
  }
}

function medianaDasMedianas(nums: number[], esquerda: number, direita: number): number {
  const n = direita - esquerda + 1;
  const numMedianas = Math.floor(n / 5);

  if (n <= 5) {
    // Se o tamanho do subarray é pequeno, simplesmente particiona e retorna o índice central
    return particionar5(nums, esquerda, direita);
  }

  // Calcula as medianas dos grupos de 5 elementos e as move para o início do array
  for (let i = 0; i < numMedianas; i++) {
    const subEsquerda = esquerda + i * 5;
    const subDireita = subEsquerda + 4;
    const mediana5 = particionar5(nums, subEsquerda, subDireita);
    trocar(nums, mediana5, esquerda + i);
  }

  // Encontra a mediana das medianas recursivamente
  const meio = Math.floor((numMedianas + 1) / 2);
  return quickSelect(nums, esquerda, esquerda + numMedianas - 1, meio);
}

function particionar5(nums: number[], esquerda: number, direita: number): number {
  // Ordena o subarray com até 5 elementos usando insertion sort
  for (let i = esquerda + 1; i <= direita; i++) {
    let j = i;
    while (j > esquerda && nums[j - 1] > nums[j]) {
      trocar(nums, j, j - 1);
      j--;
    }
  }

  return Math.floor((esquerda + direita) / 2); // Retorna o índice da mediana
}

function particionar(nums: number[], esquerda: number, direita: number, indicePivo: number): number {
  const valorPivo = nums[indicePivo];
  trocar(nums, indicePivo, direita);

  let indiceParticao = esquerda;

  // Realiza a partição colocando elementos menores à esquerda do pivô
  for (let i = esquerda; i < direita; i++) {
    if (nums[i] < valorPivo) {
      trocar(nums, i, indiceParticao);
      indiceParticao++;
    }
  }

  // Coloca o pivô em sua posição correta
  trocar(nums, indiceParticao, direita);
  return indiceParticao;
}

function trocar(nums: number[], i: number, j: number): void {
  const temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}
