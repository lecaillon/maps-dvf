import { HOME, PORT, DVF_YEARS, DB_APP_PATH, DB_DVF_PATH } from "./config/appsettings";
import cors from "cors";
import { parse } from "csv-parse";
import express from "express";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import sqlite3 from "sqlite3";
import type { Commune } from "shared/models/commune";
import type { Sale } from "shared/models/sale";
import type { SearchSaleQuery } from "shared/models/searchSaleQuery";

const app = express();
let dbApp = {} as sqlite3.Database;
let dbDvf = {} as sqlite3.Database;

bootstrap();

app.get("/", (req, res) => res.send("🏠"));

app.post<{}, Sale[], SearchSaleQuery, {}>("/sales", async (req, res) => {
  await importDvf(req.body.commune);
  dbDvf.all(
    "SELECT * FROM sale WHERE code_commune = ? AND code_type_local = 1 AND valeur_fonciere BETWEEN ? AND ?",
    [req.body.commune.code, req.body.budgetRange[0], req.body.budgetRange[1]],
    (_, rows) => {
      res.json(rows);
    }
  );
});

app.get<{}, {}, Commune[], { nom: string }>("/communes", (req, res) => {
  dbApp.all("SELECT code, nom, lat, lng FROM commune WHERE nom LIKE ? LIMIT 10", [req.query.nom + "%"], (_, rows) => {
    res.json(rows);
  });
});

app.listen(PORT, () => console.log(`listening on port ${PORT}...`));

function bootstrap() {
  app.use(cors());
  app.use(express.json());

  dbApp = new sqlite3.Database(DB_APP_PATH);

  if (!fs.existsSync(HOME)) {
    fs.mkdirSync(HOME);
  }

  if (!fs.existsSync(DB_DVF_PATH)) {
    dbDvf = new sqlite3.Database(DB_DVF_PATH);
    dbDvf.exec(`
    CREATE TABLE sale
    (
        id_mutation TEXT,
        date_mutation TEXT,
        valeur_fonciere INTEGER,
        adresse_numero INTEGER,
        adresse_nom_voie TEXT,
        code_postal INTEGER,
        code_commune INTEGER,
        nom_commune TEXT,
        code_type_local INTEGER,
        surface_reelle_bati INTEGER,
        nombre_pieces_principales INTEGER,
        surface_terrain INTEGER,
        longitude REAL,
        latitude REAL
    );

    CREATE INDEX idx_sale_code_commune ON sale (code_commune); 
    `);
  } else {
    dbDvf = new sqlite3.Database(DB_DVF_PATH);
  }
}

async function importDvf(commune: Commune) {
  for (const year of DVF_YEARS) {
    const csv = path.join(HOME, `${commune.code}-${year}.csv`);
    if (!fs.existsSync(csv)) {
      const url = `https://files.data.gouv.fr/geo-dvf/latest/csv/${year}/communes/${commune.code.toString().substring(0, 2)}/${commune.code}.csv`;
      console.log(`downloadDvf: ${url}`);
      await downloadDvf(url, csv);
      console.log(`insertCsv: ${csv}`);
      await insertCsv(csv);
    }
  }
}

async function downloadDvf(url: string, path: string) {
  const res = await fetch(url);
  const fileStream = fs.createWriteStream(path);
  return new Promise((resolve, reject) => {
    res.body.pipe(fileStream);
    res.body.on("error", reject);
    fileStream.on("finish", resolve);
  });
}

async function insertCsv(csv: string) {
  return new Promise((resolve) => {
    dbDvf.serialize(function () {
      dbDvf.run("begin transaction");
      fs.createReadStream(csv)
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", function (row) {
          if (row[3] == "Vente" && (row[30] == "Maison" || row[30] == "Appartement")) {
            dbDvf.run(`INSERT INTO sale VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
              row[0],
              row[1],
              row[4],
              row[5],
              row[7],
              row[9],
              row[10],
              row[11],
              row[29],
              row[31],
              row[32],
              row[37],
              row[38],
              row[39],
            ]);
          }
        })
        .on("finish", (_) => {
          dbDvf.run("commit");
          resolve(_);
        });
    });
  });
}
