const path = require('path');
const fs = require('fs');

exports.showAdminPage = (req, res) => {
    if (req.session.user) {
        const adminPath = path.join(__dirname, '../../public/pages', 'admin.html');
        fs.access(adminPath, fs.constants.F_OK, (err) => {
            if (err) {
                console.error('File not found:', adminPath);
                return res.status(404).send("Página não encontrada.");
            }
            res.sendFile(adminPath);
        });
    } else {
        res.redirect('/');
    }
};
