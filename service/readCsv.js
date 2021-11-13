import { createRequire } from "module";
const require = createRequire(import.meta.url);

export default function readCsv() {
  const fs = require("fs");
  const data = fs.readFileSync("./data/data2.csv");
  const dataArray = [];
  const dataString = String(data).split("\n");
  const dataObject = [];
  for (const iterator of dataString) {
    dataArray.push(iterator.split(","));
  }

  for (const iterator of dataArray) {
    dataObject.push({
      ativo: iterator[0],
      data: iterator[1],
      preco: iterator[2],
      valor: iterator[3],
      dividendo: iterator[4],
    });
  }

  return dataObject;
}
