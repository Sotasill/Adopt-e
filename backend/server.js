const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const path = require('path');
require("dotenv").config();

const app = express();

// Настройка CORS до всех остальных middleware
app.use(cors({
  origin: 'http://localhost:5174', // Точный порт вашего фронтенда
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Остальные middleware
app.use(express.json());
app.use(helmet());

// Статические файлы
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Импорт маршрутов
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

// Использование маршрутов
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Тестовый маршрут
app.get('/test', (req, res) => {
  res.json({ message: 'API работает!' });
});

// Подключение к базе данных
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
    console.log('Database URL:', process.env.MONGODB_URI);
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Добавьте обработчик ошибок mongoose
mongoose.connection.on('error', err => {
  console.error('MongoDB error:', err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
}).on('error', (err) => {
  console.error('Ошибка запуска сервера:', err);
});
