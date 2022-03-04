const express = require("express");
const { insertar, consultar, editar, eliminar } = require("./db.js");

const app = express();

app.use(express.static("static"));

app.post("/cancion", async (req, res) => {
  let body = "";
  try {
    req.on("data", (data) => {
      body += data;
    });

    req.on("end", async () => {
      const datos = Object.values(JSON.parse(body));
      const algo = await insertar(datos[0], datos[1], datos[2]);
      res.status(201).json(algo);
    });
  } catch (error) {
    return res.status(404).json({ mensaje: "No se encontró el recurso" });
  }
});

app.get("/canciones", async (req, res) => {
  try {
    const repertorio = await consultar();
    res.send(JSON.stringify(repertorio));
  } catch (error) {
    return res.status(404).json({ mensaje: "No se encontró la página" });
  }
});

app.put("/cancion", async (req, res) => {
  let body = "";
  try {
    req.on("data", (data) => {
      body += data;
    });

    req.on("end", async () => {
      const datos = Object.values(JSON.parse(body));
      const algo = await editar(Number(datos[0]), datos[1], datos[2], datos[3]);
      res.status(201).json(algo);
    });
  } catch (error) {
    return res.status(404).json({ mensaje: "No se encontró la página" });
  }
});

app.delete("/cancion", async (req, res) => {
  try {
    await eliminar(req.query.id);
    res.send("Eliminado");
  } catch (error) {
    return res.status(404).json({ mensaje: "No se encontró la página" });
  }
});

app.listen(3000, () => {
  console.log("servidor ejecutando en puerto 3000");
});
