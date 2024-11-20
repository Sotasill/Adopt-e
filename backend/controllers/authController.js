const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Проверка существования пользователя
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь уже существует' });
    }

    // Создание нового пользователя
    const user = new User({ username, email, password });
    await user.save();

    // Создание токена
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({ token });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Ошибка при регистрации' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);

    // Поиск пользователя
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('User not found in database');
      return res.status(401).json({ 
        message: 'Неверные учетные данные',
        debug: 'User not found' 
      });
    }

    console.log('Found user:', { 
      email: user.email, 
      hashedPassword: user.password.substring(0, 10) + '...' 
    });

    // Проверка пароля
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match result:', isMatch);

    if (!isMatch) {
      return res.status(401).json({ 
        message: 'Неверные учетные данные',
        debug: 'Password mismatch' 
      });
    }

    // Если всё хорошо, создаем токен
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );

    res.json({ token, debug: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Ошибка при входе',
      debug: error.message 
    });
  }
};
