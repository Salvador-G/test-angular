const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        //hasear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword});
        await user.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
});

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
        const token = jwt.sign({ userId: user._id }, 'tu_secreto', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) { 
        console.error(error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
});

router.get('/tasks', authenticateToken, async (req, res) => {
    try {
      const tasks = await Task.find({ userId: req.user.userId });
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener tareas' });
    }
  });
  
router.get('/me', autenticarUsuario, (req, res) => {
    const userId = req.userId;
    
    // Buscar al usuario en la base de datos por su ID
    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            // Enviar los datos del usuario como respuesta
            res.json(user);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Error en el servidor' });
        });
});

function autenticarUsuario(req, res, next) {
    const token = req.headers.authorization.split(' ')[1]; // Suponiendo que el token esté en el formato "Bearer <token>"

    // Verificar si se proporcionó un token
    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    // Verificar el token
    jwt.verify(token, 'tu_secreto', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido' });
        }
        // Guardar el ID del usuario decodificado en el objeto de solicitud para su uso posterior
        req.userId = decoded.userId;
        next();
    });
}

module.exports = router;
