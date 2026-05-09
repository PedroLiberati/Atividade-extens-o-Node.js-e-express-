const express = require('express');
const app = express();

// configura o EJS como motor de view
app.set('view engine', 'ejs');

// middleware pra ler dados do formulário
app.use(express.urlencoded({ extended: true }));

let feedbacks = [];

// ROTA: Página Inicial
app.get('/', (req, res) => {
    res.render('index'); // Renderiza views/index.ejs
});

// ROTA: Cadastro
app.post('/feedbacks/enviar', (req, res) => {
    const { nome, comentario } = req.body;
    feedbacks.push({ id: Date.now(), nome, comentario });
    res.redirect('/feedbacks/lista');
});

// ROTA: Listagem
app.get('/feedbacks/lista', (req, res) => {
    res.render('lista', { feedbacks: feedbacks }); // Passa o array para o HTML
});

// ROTA: Remoção
app.post('/feedbacks/remover', (req, res) => {
    const id = parseInt(req.body.id);
    feedbacks = feedbacks.filter(f => f.id !== id);
    res.redirect('/feedbacks/lista');
});

app.listen(3000, () => console.log("Servidor em http://localhost:3000"));
