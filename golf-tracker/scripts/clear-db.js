import db from "../lib/db.js";

db.exec("DELETE FROM rounds");
db.exec("DELETE FROM holes");

//Reset auto-increment
db.exec("DELETE FROM sqlite_sequence WHERE name IN ('rounds', 'holes')");

console.log("Database cleared");