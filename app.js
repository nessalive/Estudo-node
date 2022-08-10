const { request, response } = require("express");
const express = require("express");
const { randomUUID } = require("crypto");
const fs = require("fs");

const app = express();
app.use(express.json());
let roupas = [];
fs.readFile("roupas.json", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    roupas = JSON.parse(data);
  }
});

/**
 * app.get("/routa01", (request, response)=>{
return response.json({
    massage: "acessou o  aaaaaaa"
});

});
 */

app.post("/roupas", (request, response) => {
  const { name, cor } = request.body;
  const roupa = {
    name,
    cor,
    id: randomUUID(),
  };
  roupas.push(roupa);
  roupasFiles();

  return response.json(roupa);
});

app.get("/roupas", (request, response) => {
  return response.json(roupas);
});

app.get("/roupas/:id", (request, response) => {
  const { id } = request.params;
  const roupa = roupas.find((roupa) => roupa.id === id);
  return response.json(roupa);
});

app.put("/roupas/:id", (request, response) => {
  const { id } = request.params;
  const { name, cor } = request.body;
  const roupaIndex = roupas.findIndex((roupa) => roupa.id === id);
  roupas[roupaIndex] = {
    ...roupas[roupaIndex],
    name,
    cor,
  };
  roupasFiles();
  return response.json({ message: "Alterado com sucesso" });
});

app.delete("/roupas/:id", (request, response) => {
  const { id } = request.params;
  const roupaIndex = roupas.findIndex((roupa) => roupa.id === id);
  roupas.splice(roupaIndex, 1);
  roupasFiles();
  return response.json({ message: "você apagou com sucesso" });
});

function roupasFiles() {
  fs.writeFile("roupas.json", JSON.stringify(roupas), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("produto inserido");
    }
  });
}

app.listen(4002, () => console.log("server"));
