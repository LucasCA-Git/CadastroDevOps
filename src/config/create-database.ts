import mysql from 'mysql2/promise';
import { AppDataSource } from './database';

async function createDatabaseIfNotExists() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
  });

  const databaseName = process.env.DB_NAME || 'devops_project';

  try {
    const [rows] = await connection.query('SHOW DATABASES LIKE ?', [databaseName]) as [mysql.RowDataPacket[], mysql.FieldPacket[]];
    
    if (rows.length === 0) {
      await connection.query('CREATE DATABASE ??', [databaseName]);
      console.log(`Database '${databaseName}' criada com sucesso.`);
    } else {
      console.log(`Database '${databaseName}' ja existe.`);
    }
  } catch (error) {
    console.error('Erro criando a database:', error);
} finally {
    await connection.end();
  }
}

async function initializeDataSource() {
  await AppDataSource.initialize();
  console.log('DataSource initialized successfully.');
}

async function setup() {
  await createDatabaseIfNotExists();
  await initializeDataSource();
}
setup().catch(error => console.error('Setup failed:', error));