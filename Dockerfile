FROM node:18

WORKDIR /app

# Instalar dependências
COPY package*.json ./
RUN npm install --production && npm cache clean --force

# Copiar o código-fonte
COPY . .

# Construir o projeto (se necessário)
RUN npm run build

# Criar o banco de dados automaticamente
RUN npm run create-db

# Alimentar o banco de dados (usando o script que você criou)
RUN npm run seed-db

# Comando para iniciar a aplicação
CMD ["npm", "start"]
