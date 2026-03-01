import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// データベース接続の初期化
let db;
(async () => {
    db = await open({
        filename: path.join(__dirname, 'data', 'database.sqlite'),
        driver: sqlite3.Database
    });

    // テーブルの作成
    await db.exec(`
        CREATE TABLE IF NOT EXISTS blogs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            date TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            blog_id INTEGER NOT NULL,
            author TEXT NOT NULL,
            text TEXT NOT NULL,
            date TEXT NOT NULL,
            FOREIGN KEY (blog_id) REFERENCES blogs (id)
        );
    `);

    // サンプルデータの挿入（空の場合のみ）
    const count = await db.get('SELECT COUNT(*) as count FROM blogs');
    if (count.count === 0) {
        await db.run('INSERT INTO blogs (title, content, date) VALUES (?, ?, ?)', 
            'ReactとExpressでブログを作る方法', 
            'この記事では、ReactとNode.jsを使用したモダンなフルスタック開発について解説します...', 
            new Date().toISOString()
        );
        await db.run('INSERT INTO blogs (title, content, date) VALUES (?, ?, ?)', 
            'ポートフォリオサイトのベストプラクティス', 
            '魅力的なポートフォリオを作るためのデザインと技術の選定について...', 
            new Date().toISOString()
        );
    }

    console.log('Database initialized');
})();

// API エンドポイント

// 記事一覧取得
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await db.all('SELECT * FROM blogs ORDER BY date DESC');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 特定の記事取得（コメント付き）
app.get('/api/posts/:id', async (req, res) => {
    try {
        const post = await db.get('SELECT * FROM blogs WHERE id = ?', req.params.id);
        if (!post) return res.status(404).json({ error: 'Post not found' });
        
        const comments = await db.all('SELECT * FROM comments WHERE blog_id = ? ORDER BY date ASC', req.params.id);
        res.json({ ...post, comments });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// コメント取得
app.get('/api/posts/:id/comments', async (req, res) => {
    try {
        const comments = await db.all('SELECT * FROM comments WHERE blog_id = ? ORDER BY date ASC', req.params.id);
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// コメント投稿
app.post('/api/posts/:id/comments', async (req, res) => {
    const { author, text } = req.body;
    const blog_id = req.params.id;
    const date = new Date().toISOString();

    try {
        await db.run('INSERT INTO comments (blog_id, author, text, date) VALUES (?, ?, ?, ?)', 
            [blog_id, author, text, date]
        );
        res.status(201).json({ message: 'Comment added' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
