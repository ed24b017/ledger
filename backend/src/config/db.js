import Database from "better-sqlite3";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const path_to_db = path.join(__dirname, "../data/ledger.db");
const path_to_schema = path.resolve("backend/data/schema.sql");

const db = new Database(path_to_db);

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

const schema = fs.readFileSync(path_to_schema, "utf-8");

export default db;
