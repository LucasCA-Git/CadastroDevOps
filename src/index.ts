import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { AppDataSource } from './config/database'; // Certifique-se de que este caminho esteja correto
import userRoutes from './routes/userRoutes'; // Importar o novo arquivo de rotas de usuário
import swaggerDocument from '../swagger/swagger.json'; // Ajuste o caminho conforme necessário

const app = express();

// Configuração do CORS
app.use(cors({
  origin: '*', // Permite todas as origens. Ajuste conforme necessário.
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Rotas
app.use('/api', userRoutes); // Usar o novo arquivo de rotas de usuário

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Inicialização do banco de dados
AppDataSource.initialize()
  .then(() => {
    console.log('Banco de dados conectado');
    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  })
  .catch((error: any) => {
    console.error('Erro ao conectar ao banco de dados', error);
  });
