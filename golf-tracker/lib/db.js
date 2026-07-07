import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'golf.db');

const globalForDb = globalThis;

const db = globalForDb.db || new Database(dbPath);

if (process.env.NODE_ENV !== 'production') globalForDb.db = db;

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON'); // SQLite has FK support off by default

const schema = fs.readFileSync(path.join(process.cwd(), 'lib', 'schema.sql'), 'utf-8');
db.exec(schema);

export default db;