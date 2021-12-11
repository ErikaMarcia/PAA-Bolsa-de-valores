import { default as readCsv } from "./service/readCsv.js";

const data = readCsv();

function retornoEfetivoDeUmAtivo(ativo) {
  let array = montarArrayAtivo(ativo);

  let precoTotal = parseFloat(array[array.length - 1]);
  let precoInicial = parseFloat(array[0]);
  let somaDividendo = parseFloat(somarDividendo(ativo));
  let valorFinal = (precoTotal + somaDividendo - precoInicial) / precoInicial;

  return valorFinal.toFixed(4) * 100;
}

function retornoEsperadoDeUmAtivo(ativo) {
  let media = 0;
  let soma = 0;
  let array = montarArrayAtivo(ativo);
  for (let i = 0; i < array.length; i++) {
    soma += array[i];
  }

  media = soma / array.length;

  return media.toFixed(2);
}

function riscoAtivo(precos) {
  let total = 0;
  for (let i = 0; i < precos.length; i++) {
    total += precos[i];
  }
  return total / precos.length;
}

function desvioPadrao(ativo) {
  let precos = montarArrayAtivo(ativo);
  let risco = riscoAtivo(precos);
  let variacao = 0;

  for (let i = 0; i < precos.length; i++) {
    variacao += (precos[i] - risco) ^ 2;
  }
  return Math.sqrt(variacao / precos.length);
}

function teste(ativo) {
  let precos = montarArrayAtivo(ativo);
  let mediaPrecos = retornoEsperadoDeUmAtivo(ativo);
  let desvio = [];
  for (let i = 0; i < precos.length; i++) {
    desvio.push(precos[i] - mediaPrecos);
  }

  let variancia = 0;

  for (let i = 0; i < desvio.length; i++) {
    variancia += desvio[i] ^ 2;
  }

  variancia = variancia / mediaPrecos;

  let desvioPadrao = Math.sqrt(variancia);

  console.log(desvioPadrao);
}

function riscoNormalizado(ativo) {
  return desvioPadrao(ativo) / retornoEsperadoDeUmAtivo(ativo);
}

function somarDividendo(nomeAtivo) {
  let soma = 0;
  for (var i = 0; i < data.length; i++) {
    if (data[i].ativo == nomeAtivo) {
      soma += parseFloat(data[i].dividendo);
    }
  }
  return soma.toFixed(2);
}

function montarArrayAtivo(nomeAtivo) {
  var array = [];
  for (var i = 0; i < data.length; i++) {
    if (data[i].ativo == nomeAtivo) {
      array.push(parseFloat(data[i].preco));
    }
  }
  return array;
}
