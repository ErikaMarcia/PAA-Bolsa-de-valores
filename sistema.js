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

function montarArrayRiscos() {
  //Buscando os riscos de cada ativo
  return [
    {
      ativo: "alzr",
      risco: riscoAtivo(montarArrayAtivo("alzr")),
      porcentagem: Math.random() * (10 - 0) + 0,
    },
    {
      ativo: "bpff",
      risco: riscoAtivo(montarArrayAtivo("bpff")),
      porcentagem: Math.random() * (10 - 0) + 0,
    },
    {
      ativo: "brcr",
      risco: riscoAtivo(montarArrayAtivo("brcr")),
      porcentagem: Math.random() * (10 - 0) + 0,
    },
    {
      ativo: "hgbs",
      risco: riscoAtivo(montarArrayAtivo("hgbs")),
      porcentagem: Math.random() * (10 - 0) + 0,
    },
    {
      ativo: "hglg",
      risco: riscoAtivo(montarArrayAtivo("hglg")),
      porcentagem: Math.random() * (10 - 0) + 0,
    },
    {
      ativo: "hgre",
      risco: riscoAtivo(montarArrayAtivo("hgre")),
      porcentagem: Math.random() * (10 - 0) + 0,
    },
    {
      ativo: "jsre",
      risco: riscoAtivo(montarArrayAtivo("jsre")),
      porcentagem: Math.random() * (10 - 0) + 0,
    },
    {
      ativo: "kncr",
      risco: riscoAtivo(montarArrayAtivo("kncr")),
      porcentagem: Math.random() * (10 - 0) + 0,
    },
    {
      ativo: "knip",
      risco: riscoAtivo(montarArrayAtivo("knip")),
      porcentagem: Math.random() * (10 - 0) + 0,
    },
    {
      ativo: "xpml",
      risco: riscoAtivo(montarArrayAtivo("xpml")),
      porcentagem: Math.random() * (10 - 0) + 0,
    },
  ];
}

function montarPortifolio() {
  let riscos = montarArrayRiscos();
  let capacidade = 15;
  let melhor_risco = 0,
    melhor_peso = 0;
  let num_items = riscos.length;
  let num_solucoes = 1024 * 1024 * 32 * 4;
  let solucao = 0;

  for (let i = 0; i < num_solucoes; i++) {
    let valor_mochila = 0,
      peso_mochila = 0;

    // Verificar a solucao.
    for (let j = 0; j < num_items; j++) {
      if (i & (1 << j)) {
        valor_mochila += riscos[j].risco;
        peso_mochila += riscos[j].porcentagem;
      }
    }

    if (peso_mochila <= capacidade) {
      if (valor_mochila > melhor_risco) {
        solucao = i;
        melhor_peso = peso_mochila;
        melhor_risco = valor_mochila;
      }
    }
  }

  console.log("peso da mochila: ", melhor_peso.toFixed(2));
  console.log("risco da mochila: ", (melhor_risco / 100).toFixed(2), "%");
}

montarPortifolio();
// //definindo capacidade maxima do portifolio
// const capacidade = 10;
// //definindo variaveis
// let contadorPortifolio = 0;
// let ativos = [];
// let max;
// let valorPortifolio;

// //funcao para remover item do portifolio para fazer proxima verificacao
// var removeByAttr = function (arr, attr, value) {
//   var i = arr.length;
//   while (i--) {
//     if (
//       arr[i] &&
//       arr[i].hasOwnProperty(attr) &&
//       arguments.length > 2 &&
//       arr[i][attr] === value
//     ) {
//       arr.splice(i, 1);
//     }
//   }
// };
// do {
//   //encontra o item com maior valor
//   max = riscos.reduce(function (anterior, atual) {
//     return anterior.risco > atual.risco ? anterior : atual;
//   });
//   //se ainda tiver espaco na mochila ele inclui o elemento com peso maximo
//   if (max.peso + contadorPortifolio <= capacidade) {
//     ativos.push(max);
//     contadorPortifolio += max.peso; //ele aumenta o valor do contador da mochila
//     valorPortifolio += max.risco; //ele aumenta o valor da mochila
//     removeByAttr(riscos, "id", max.id); //remove o item com maior valor da relacao inicial de itens
//   } else {
//     //caso o item com peso maximo nao couber na mochila ele apenas remove esse item da relacao inicial para a proxima verificacao
//     removeByAttr(riscos, "id", max.id);
//   }
// } while (capacidade > contadorPortifolio && riscos.length > 0); //roda o loop ate que a capacidade esgote ou ate que a relacao inicial de itens esteja vazia

// console.log(ativos);
// console.log(valorPortifolio);
