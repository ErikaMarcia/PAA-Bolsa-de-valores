import { default as readCsv } from "./service/readCsv.js";
import readline from 'readline'

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
  return (Math.sqrt(variacao / precos.length)).toFixed(2);
}

function riscoNormalizado(ativo) {
  try {
    return (desvioPadrao(ativo) / retornoEsperadoDeUmAtivo(ativo)).toFixed(5);
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
  let riscos = melhorPeso();
  let capacidade = 15;
  let melhor_risco = 0,
    melhor_peso = 0;
  let num_items = riscos.length;
  let num_solucoes = 1024 * 1024 * 32 * 4;
  let solucao = 0;

  try {

    for (let i = 0; i < num_solucoes; i++) {
      let valor_portifolio = 0,
        peso_portfolio = 0;

      // Verificar a solucao.
      for (let j = 0; j < num_items; j++) {
        if (i & (1 << j)) {
          valor_portifolio += riscos[j].risco;
          peso_portfolio += riscos[j].porcentagem;
        }
      }

      if (peso_portfolio <= capacidade) {
        if (valor_portifolio > melhor_risco) {
          solucao = i;
          melhor_peso = peso_portfolio;
          melhor_risco = valor_portifolio;
        }
      }
    }
  } catch (error) {
    console.error(`O error que ocorreu foi: ${error}`)
  }

  console.log("Peso do portifolio: ", melhor_peso.toFixed(2));
  console.log("Risco do portifolio: ", (melhor_risco / 100).toFixed(2), "%");
}

function melhorPeso() {
  let riscos = montarArrayRiscos();
  let riscosRetorno = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let porcentagem = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let qtde;
  let peso = 10;
  let contador = 0;

  let soma = 0;
  let anterior = 0;
  let intermediario = 0;
  try {
    while (peso != 0) {
      qtde = peso / porcentagem[contador];
      if (qtde != 0) {
        riscosRetorno[contador] = porcentagem[contador];
        peso--;
      }
      for (let i = 0; i < riscosRetorno.length; i++) {
        soma += riscosRetorno[i];
      }
      if (soma >= 10) {
        peso = 0;
      } else {
        soma = 0;
      }
      if (peso == 10) {
        for (let i = 0; i < 10; i++) {
          intermediario += riscos[i].risco * riscosRetorno[i];
        }
        if (anterior == 0) {
          anterior = intermediario;
        }
        if (anterior > intermediario) {
          anterior = intermediario;
        }
      }

      contador++;
    }
    for (let i = 0; i < 10; i++) {
      riscos[i].porcentagem = riscosRetorno[i];
    }
  } catch (error) {
    console.error(`O error que ocorreu foi: ${error}`)
  }
  return riscos;
}

function menu() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log("### Hey bem-vindo ao programa da bolsa de valores ###")

  try {
    rl.question("Qual o seu nome? ", function (nome) {
      rl.question("Digite qual ativo você deseja saber as suas informações? ", function (nomeAtivo) {
        console.log(`Hey ${nome}, o ativo ${nomeAtivo}, que buscou possui estas informações:
      \n Todos os dividendos ${somarDividendo(nomeAtivo)}
       \n O retorno efetivo do seu ativo é de ${retornoEfetivoDeUmAtivo(nomeAtivo)}
        \n O retorno esperado desse ativo é de ${retornoEsperadoDeUmAtivo(nomeAtivo)}
         \n O risco do seu ativo é ${riscoAtivo(montarArrayAtivo(nomeAtivo))}
          \n O desvio padrão do seu ativo é ${desvioPadrao(nomeAtivo)}
           \n O risco normalizado do seu ativo é ${riscoNormalizado(nomeAtivo)} \n`);
           console.log('O seu portifólio é \n ')
            console.log(montarPortifolio(), melhorPeso())
        rl.close();
      });
    });

    rl.on("close", function () {
      console.log('\nBYE BYE  !!!');
      process.exit(0);
    });

  } catch (error) {
    console.error(`O error que ocorreu foi: ${error}`)
  }
}

menu()

