const express = require("express");
const { insertar, consultar, editar, eliminar } = require("./db.js");

const app = express();

app.use(express.static("static"));

app.post("/cancion", async (req, res) => {
  let body = "";
  req.on("data", (data) => {
    body += data;
  });

  req.on("end", async () => {
    const datos = Object.values(JSON.parse(body));
    const algo = await insertar(datos[0], datos[1], datos[2]);
    res.status(201).json(algo);
  });
});

app.get("/canciones", async (req, res) => {
  const repertorio = await consultar();
  res.send(JSON.stringify(repertorio));
});

app.put("/cancion", async (req, res) => {
  let body = "";
  req.on("data", (data) => {
    body += data;
  });

  req.on("end", async () => {
    const datos = Object.values(JSON.parse(body));
    const algo = await editar(Number(datos[0]), datos[1], datos[2], datos[3]);
    res.status(201).json(algo);
  });
});

app.delete("/cancion", async (req, res) => {
  await eliminar(req.query.id);
  res.send("Eliminado");
});

app.listen(3000, () => {
  console.log("servidor ejecutando en puerto 3000");
});
