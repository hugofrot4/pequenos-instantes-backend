const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3001;
const DB_FILE = 'database.db';

app.use(cors());

const db = new sqlite3.Database(DB_FILE, (err) => {
    if (err) {
        console.log('Erro ao abrir o banco de dados:', err.message);
    } else {
        console.log('Conectado ao bando de dados SQLite.');

        db.run(`CREATE TABLE IF NOT EXISTS photos(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT,
            image_path TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) {
                console.error('Erro ao criar tabela:', err.message);
            } else {
                console.log('Tablea "Photos" pronta.')
            }
        });
    }
});

app.get('/', (req, res) => {
    res.send('Servidor funcionando!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});