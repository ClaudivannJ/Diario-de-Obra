const User = require('../models/userModel');
const path = require('path');
const bcrypt = require('bcrypt');

exports.redirectHome = (req, res) => {
    if (req.session.user) {
        res.redirect('/admin');
    } else {
        res.sendFile(path.join(__dirname, '../../public/pages', 'login.html'));
    }
};

exports.ShowLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/pages', 'login.html'));
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Campo email ou password incorretos.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch, password, user.password )
        if (!isMatch) {
            return res.status(401).json({ message: 'Campo email ou password incorretos.' });
        }

        req.session.user = user;
        res.status(200).json({ redirect: '/admin' });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).send("Erro no servidor.");
    }
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};
