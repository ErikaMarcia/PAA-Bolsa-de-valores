import { default as readCsv } from "./service/readCsv.js";

const data = readCsv();

function retornoEfetivoDeUmAtivo(ativo) {

  try {
    let array = montarArrayAtivo(ativo);

    let precoTotal = parseFloat(array[array.length - 1]);
    let precoInicial = parseFloat(array[0]);
    let somaDividendo = parseFloat(somarDividendo(ativo));
    let valorFinal = (precoTotal + somaDividendo - precoInicial) / precoInicial;

    return valorFinal.toFixed(4) * 100;
  } catch (error) {
    console.error(`O error que ocorreu foi: ${error}`)
  }
}

function retornoEsperadoDeUmAtivo(ativo) {
  let media = 0;
  let soma = 0;
  let array = montarArrayAtivo(ativo);
  try {
    for (let i = 0; i < array.length; i++) {
      soma += array[i];
    }

    media = soma / array.length;
  } catch (error) {
    console.error(`O error que ocorreu foi: ${error}`)
  }

  return media.toFixed(2);
}

function riscoAtivo(precos) {
  let total = 0;
  try {
    for (let i = 0; i < precos.length; i++) {
      total += precos[i];
    }
  } catch (error) {
    console.error(`O error que ocorreu foi: ${error}`)
  }
  return total / precos.length;
}

function desvioPadrao(ativo) {
  let precos = montarArrayAtivo(ativo);
  let risco = riscoAtivo(precos);
  let variacao = 0;

  try {
    for (let i = 0; i < precos.length; i++) {
      variacao += (precos[i] - risco) ^ 2;
    }
  } catch (error) {
    console.error(`O error que ocorreu foi: ${error}`)
  }
  return Math.sqrt(variacao / precos.length);
}

function riscoNormalizado(ativo) {
  try {
    return desvioPadrao(ativo) / retornoEsperadoDeUmAtivo(ativo);
  } catch (error) {
    console.error(`O error que ocorreu foi: ${error}`)
  }
}

function somarDividendo(nomeAtivo) {
  let soma = 0;
  try {
    for (var i = 0; i < data.length; i++) {
      if (data[i].ativo == nomeAtivo) {
        soma += parseFloat(data[i].dividendo);
      }
    }
  } catch (error) {
    console.error(`O error que ocorreu foi: ${error}`)
  }
  return soma.toFixed(2);
}

function montarArrayAtivo(nomeAtivo) {
  var array = [];
  try {
    for (var i = 0; i < data.length; i++) {
      if (data[i].ativo == nomeAtivo) {
        array.push(parseFloat(data[i].preco));
      }
    }
  } catch (error) {
    console.error(`O error que ocorreu foi: ${error}`)
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

  try {

    for (let i = 0; i < num_solucoes; i++) {
      let valor_portifolio = 0,
        peso_mochila = 0;

      // Verificar a solucao.
      for (let j = 0; j < num_items; j++) {
        if (i & (1 << j)) {
          valor_portifolio += riscos[j].risco;
          peso_mochila += riscos[j].porcentagem;
        }
      }

      if (peso_mochila <= capacidade) {
        if (valor_portifolio > melhor_risco) {
          solucao = i;
          melhor_peso = peso_mochila;
          melhor_risco = valor_portifolio;
        }
      }
    }
  } catch (error) {
    console.error(`O error que ocorreu foi: ${error}`)
  }

  console.log("peso do portifolio: ", melhor_peso.toFixed(2));
  console.log("risco do portifolio: ", (melhor_risco / 100).toFixed(2), "%");
}

//montarPortifolio();
console.log(retornoEfetivoDeUmAtivo('alzr'));
console.log(retornoEsperadoDeUmAtivo('alzr'));
console.log(desvioPadrao(10000))
console.log(riscoAtivo('alzr'))
console.log(somarDividendo('alzr'))
console.log(riscoNormalizado('alzr'))
console.log(montarArrayAtivo('alzr'))
montarPortifolio()
