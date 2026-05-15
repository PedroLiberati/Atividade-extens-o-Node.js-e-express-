const express = require('express');
const app = express();

// Configuração do EJS
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));

// Array em memória
let feedbacks = [];

// Página Inicial
app.get('/', (req, res) => {
    res.render('index');
});

// Envio de Feedback
app.post('/feedbacks/enviar', (req, res) => {
    const { nome, comentario } = req.body;

    // Validação simples
    if (!nome || !comentario) {
        return res.send("Nome e comentário são obrigatórios.");
    }

    feedbacks.push({
        id: Date.now(),
        nome,
        comentario
    });

    res.redirect('/feedbacks/lista');
});

// Lista de Feedbacks
app.get('/feedbacks/lista', (req, res) => {
    res.render('lista', { feedbacks });
});

// Remover Feedback
app.post('/feedbacks/remover', (req, res) => {
    const id = parseInt(req.body.id);

    feedbacks = feedbacks.filter(f => f.id !== id);

    res.redirect('/feedbacks/lista');
});

// Servidor
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
