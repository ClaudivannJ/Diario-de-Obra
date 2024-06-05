const User = require('../models/userModel');
const path = require('path');

exports.showLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/pages', 'login.html'));
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    User.findByEmailAndPassword(email, password, (err, user) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send("Erro no servidor.");
        }
        if (user) {
            req.session.user = user;
            res.status(200).json({redirect:'/admin'});
        } else {
            res.status(401).json({message: 'Credenciais inválidas.'});
        }
    });
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};
