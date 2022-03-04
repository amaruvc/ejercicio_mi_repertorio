//import pg from 'pg'
const { Pool } = require("pg");

// creamos nuestro pool de conexiones
const pool = new Pool({
  user: "postgres",
  host: "127.0.0.1",
  database: "repertorio",
  password: "",
  max: 20,
  min: 2,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

async function insertar(cancion, artista, tono) {
  const client = await pool.connect();
  // ejemplo de consulta con 2 parámetros
  const res = await client.query(
    "insert into repertorio (cancion, artista, tono) values ($1, $2, $3) returning *",
    [cancion, artista, tono]
  );
  client.release();
}

async function consultar() {
  const client = await pool.connect();
  const res = await client.query("select * from repertorio");
  client.release();
  return res.rows;
}

async function editar(id, cancion, artista, tono) {
  const client = await pool.connect();
  // ejemplo de consulta pasándole como parámetro 1 objeto
  const res = await client.query({
    text: "update repertorio set cancion=$2, artista=$3, tono=$4 where id=$1",
    values: [id, cancion, artista, tono],
  });

  client.release();
  return res.rows;
}

async function eliminar(nombre) {
  const client = await pool.connect();
  const res = await client.query("delete from repertorio where id=$1", [
    nombre,
  ]);
  client.release();
  return res.rows;
}

module.exports = { insertar, consultar, editar, eliminar };
