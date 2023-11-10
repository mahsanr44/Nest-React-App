import mysql from "mysql2/promise";

export async function query({ query, values }: { query: string; values: any[] }) {
  const host = process.env.MYSQL_HOST || 'localhost';
  const port = process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3306;
  const database = process.env.MYSQL_DATABASE || 'crud';
  const user = process.env.MYSQL_USER || 'root';
  const password = process.env.MYSQL_PASSWORD || '';

  const dbconnection = await mysql.createConnection({
    host,
    port,
    database,
    user,
    password,
  });

  try {
    const [results] = await dbconnection.execute(query, values);
    dbconnection.end();
    return results;
  } catch (error) {
    throw new Error("error");
  }
}
