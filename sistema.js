import { default as readCsv } from "./service/readCsv.js";

const data = readCsv();

function retornoEfetivoDeUmAtivo(ativo) {
  const precoTotal = data[data.length - 2].preco;

  const precoInicial = data[1].preco;

  if (ativo == "alzr") {
    let valorFinal = 0;

    valorFinal = (precoTotal + 17.14 - precoInicial) / precoInicial;

    console.log(valorFinal);
  }
}

function retornoEsperadoDeUmAtivo(ativo) {
  if (ativo == "alzr") {
    let media = 0;

    media =
      (100.9 +
        101.91 +
        103.5 +
        101.5 +
        96.6 +
        93.2 +
        94 +
        92.77 +
        89.81 +
        91.74 +
        94.9 +
        97.8 +
        98 +
        98.1 +
        97.54 +
        96.99 +
        103.3 +
        104.21 +
        104.37 +
        105.9 +
        105.81 +
        111.78 +
        119.98 +
        144.65 +
        127.5 +
        122.9 +
        100.85 +
        108.27 +
        116.5) /
      29;

    console.log(`A média do ativo ${ativo} é ${media.toFixed(2)}`);
  }
}

function riscoAtivo(array) {
  let total = 0;
  for (const a in array) {
    total += a;
  }
  return total / array.length;
}

function desvioPadrao() {
  let array = montarArrayAtivo("alzr");
  let risco = riscoAtivo(array);

  let variacao = 0;

  for (const a in array) {
    variacao += (a - risco) ^ 2;
  }
  console.log(variacao / array.length);
  return variacao / array.length;
}

function montarArrayAtivo(nomeAtivo) {
  var array = [];
  for (var i = 0; i < data.length; i++) {
    if (data[i].ativo == nomeAtivo) {
      array.push(data[i].preco);
    }
  }
  return array;
}

desvioPadrao();
