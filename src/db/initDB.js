import { PGlite } from '@electric-sql/pglite';

const initDB = async () => {
  try {
    const db = new PGlite("idb://patients");
    await db.query(`
      CREATE TABLE IF NOT EXISTS patients (
        id SERIAL PRIMARY KEY,
        name TEXT,
        age INTEGER,
        gender TEXT
      );
    `);

    return db;
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
};

export default initDB;