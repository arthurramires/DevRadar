//manipulando rotas
//const = variável que não é alterada
//importando biblioteca express
const express = require('express');
//importando biblioteca mongoose para conexao com banco de dados
const mongoose = require('mongoose');
//importando minhas rotas
const routes = require('./routes');
const http = require('http');
const { setupWebsocket } = require('./websocket');
const cors = require('cors');
const app = express();
const server = http.Server(app);

setupWebsocket(server);
mongoose.connect('mongodb+srv://arthurramires:20203030arT@cluster0-5m9ah.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
app.use(cors());
app.use(express.json());
app.use(routes);
/*
Métodos HTTP:
    - get utilizado para obter uma resposta
    - post para criar uma informaçãp
    - put para editar uma informação
    - delete
*/

/* 
Parâmetros do express:
    - Query Params: request.query (Filtros, ordenação, paginação)
    - Route Params: request.params (Identificar um recurso na alteração ou remoção)
    - Body: request.body (Dados para criação ou alteração de um registro)


*/ 
//MongoDB (Não-Relacional)



server.listen(3333);// definindo a porta do nosso servidor